import IFileInfo, { DirectoryInfo, FileInfo } from './fileinfo';
import DefaultFileSystem from './filesystem-default'
//import Initializer from './initializer';
import Mutability from './mutability'
import FileType from './file-type';

const RootFileInfo:IFileInfo = {
    name:"",
    parent:null,
    mutable:false,
    fileType:FileType.Empty,
    currentPath:"",
    disposed:false
}

function toDirectoryInfo(name:string, fileSystem:object, parent:IFileInfo):any {
    const obj = Object(fileSystem);
    const dir = new DirectoryInfo(name, parent, []);

    for(const key in obj){
        if(!Object.prototype.hasOwnProperty.call(obj, key)) continue;
        const contents = obj[key];
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

export const Path = {
    getAbsolutePath: function(path:string) {
        const pathArray = path.split("/").filter(p => p);
        if(pathArray.shift()!==rootDrive) return null;
        return this.getRelativePath(root, pathArray);
    },
    getRelativePath: function(dir:DirectoryInfo, pathArray:string[]) : IFileInfo | null {
        let currentDir = dir;
        for(const currentPath of pathArray) {
            const currentFile = currentDir.getFile(currentPath);
            if(currentFile?.fileType == FileType.Directory) {
                currentDir = (currentFile as DirectoryInfo);
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
Path.getAbsolutePath("C:/")!.mutable = false;
export default root;