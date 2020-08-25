import IFileInfo, { DirectoryInfo, FileInfo } from './fileinfo';

export let fileSystemObject = {
    "C:":{
        "Users":{
            "Images": toFileSystem(require.context("@/assets/images", true, /\.(jpe?g|png|gif|bmp)$/i).keys()),
            "Musics": toFileSystem(require.context("@/assets/musics", true, /\.(mp3|ogg|wav)$/i).keys())
        },
        "Program":toFileSystem(require.context("@/softwares/", true, /^((?!core).)*\.vue$/).keys().filter(value=>isMainExecutable(value))),
        "System": toFileSystem(require.context("@/softwares/core", true, /\.vue$/).keys().filter(value=>isMainExecutable(value)))
    }
}

export default

function isMainExecutable(path:string):boolean{
    path = path.substring(2);
    let lastIndex = path.lastIndexOf("/");
    let dir = path.substring(0, lastIndex);
    let file = path.substring(lastIndex+1);
    return dir.replace("/", ".")+".vue" === file;
}
function toFileSystem(input:Array<string>) {
    let root = {};
    for(let path of input){
        Object.assign(root, toFileSystemRecursive(root, path.substring(2).split("/")));
    }
    return root;
    function toFileSystemRecursive(root:object, path:string[]):object{
        if(path.length > 1 ){
            let folderName = path.shift();
            if(Object.prototype.hasOwnProperty.call(root, folderName!)) {
                Object.assign(Object(root)[folderName!], toFileSystemRecursive({}, path));
            }
            else {
                Object(root)[folderName!] = toFileSystemRecursive({}, path);
            }
            return root;
        }
        else{
            let _obj = {}
            Object(_obj)[path[0]] = "";
            return _obj;
        }
    }
}

function toDirectoryInfo(fileSystem:object, parent:IFileInfo) {
    let _obj = Object(fileSystem);
    for(let key in fileSystem){
        if(!Object.prototype.hasOwnProperty.call(fileSystem, key)) continue;
        let value = _obj[key];
        if(typeof value == "string") {
            return new FileInfo(key, parent, (value)?JSON.parse(value):null);
        }
        else {
            //new DirectoryInfo(key, parent);
        }
    }
}