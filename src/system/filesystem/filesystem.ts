import IFileInfo, { DirectoryInfo, FileInfo } from './fileinfo';
import DefaultFileSystem from './filesystem-default'
//import Initializer from './initializer';
import Mutability from './mutability'

const RootFileInfo:IFileInfo = {
    name:"",
    parent:null,
    mutable:false
}

function toDirectoryInfo(name:string, fileSystem:object, parent:IFileInfo):any {
    let obj = Object(fileSystem);
    let dir = new DirectoryInfo(name, parent, []);

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

const rootDrive:string = "C:";
const root = toDirectoryInfo(rootDrive, DefaultFileSystem, RootFileInfo);
root.mutable = false;

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


Mutability.makeImmutable(Path.getAbsolutePath("C:/Program"))
Mutability.makeImmutable(Path.getAbsolutePath("C:/System"))
Path.getAbsolutePath("C:/User")!.mutable = false;
export default root;