import IFileInfo, { DirectoryInfo, FileInfo } from './fileinfo';

const RootFileInfo:IFileInfo = {
    name:"",
    parent:null
}

function isMainExecutable(path:string):boolean{
    path = path.substring(2);
    let lastIndex = path.lastIndexOf("/");
    let dir = path.substring(0, lastIndex);
    let file = path.substring(lastIndex+1);
    return dir.replace("/", ".")+".vue" === file;
}
function toFileSystem(input:Array<string>, contentResolver:(path:string)=>string) {
    let root = {};
    for(let path of input){
        Object.assign(root, toFileSystemRecursive(root, path.substring(2).split("/"), path));
    }
    return root;
    function toFileSystemRecursive(root:object, path:string[], fullPath:string):object{
        if(path.length > 1 ){
            let folderName = path.shift();
            if(Object.prototype.hasOwnProperty.call(root, folderName!)) {
                Object.assign(Object(root)[folderName!], toFileSystemRecursive({}, path, fullPath));
            }
            else {
                Object(root)[folderName!] = toFileSystemRecursive({}, path, fullPath);
            }
            return root;
        }
        else{
            let _obj = {}
            Object(_obj)[path[0]] = contentResolver(fullPath.substring(2));
            return _obj;
        }
    }
}

function toDirectoryInfo(name:string, fileSystem:object, parent:IFileInfo):any {
    let obj = Object(fileSystem);
    let parentPath = (parent as DirectoryInfo)?.currentDirectory;
    let dir = new DirectoryInfo(name, parent, [], (parentPath?(parentPath + "/" + name):name));

    for(let key in obj){
        if(!Object.prototype.hasOwnProperty.call(obj, key)) continue;
        let contents = obj[key];
           let iFileInfo:IFileInfo;
           if(typeof contents == "string") {
                try {
                    iFileInfo = new FileInfo(key, dir, (contents)?JSON.parse(contents):null);
                }
                catch {
                    console.warn("Warning: File "+key+" has corrupted contents.")
                    iFileInfo = new FileInfo(key, dir);
                }
           }
           else {
                iFileInfo = toDirectoryInfo(key, contents, dir)
           }
           dir.files.push(iFileInfo);
    }
    return dir;
}

export let fileSystemObject = {
    "User":{
        "Images": toFileSystem(require.context("@/assets/images", true, /\.(jpe?g|png|gif|bmp)$/i).keys(), (name)=>"{\"name\":\""+name+"\"}"),
        "Musics": toFileSystem(require.context("@/assets/musics", true, /\.(mp3|ogg|wav)$/i).keys(), (name)=>"{\"name\":\""+name+"\"}"),
        "Desktop": {
            "asdf.jpg" :"",
            "aaa.png":"",
            "abcd.txt":"",
            "test.vue":""
        }
    },
    "Program":toFileSystem(require.context("@/softwares/", true, /^((?!core).)*\.vue$/).keys().filter(value=>isMainExecutable(value)),
        (fullPath)=> "{\"app\":\""+fullPath.substring(0, fullPath.lastIndexOf("/"))+"\"}"),
    "System": toFileSystem(require.context("@/softwares/core", true, /\.vue$/).keys().filter(value=>isMainExecutable(value)),
        (fullPath)=> "{\"app\":\"core/"+fullPath.substring(0, fullPath.lastIndexOf("/"))+"\"}")
}

const rootDrive:string = "C:";
const root = toDirectoryInfo(rootDrive, fileSystemObject, RootFileInfo);
export default root;

export let Path = {
    getAbsolutePath: function(path:string) {
        let pathArray = path.split("/").filter(p => p);
        if(pathArray.shift()!==rootDrive) return null;
        return this.getRelativePath(root, pathArray);
    },
    getRelativePath: function(dir:DirectoryInfo, pathArray:string[]) : IFileInfo | null {
        let currentDir = dir;
        for(let currentPath of pathArray) {
            let currentFile = currentDir.getFile(currentPath);
            if(currentFile instanceof DirectoryInfo) {
                currentDir = currentFile;
            }
            else {
                return currentFile;
            }
        }
        return currentDir;
    }
}