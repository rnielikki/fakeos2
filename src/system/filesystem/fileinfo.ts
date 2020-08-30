import Mime, { MimeType } from "./mime"

export default interface IFileInfo {
    name:string;
    parent:IFileInfo | null;
    mutable:boolean;
}
export class FileInfo implements IFileInfo {
    name:string;
    parent:IFileInfo;
    appType:MimeType;
    data:object | null;
    mutable:boolean = true;
    constructor(name:string, parent:IFileInfo, data:object | null = null){
        this.name = name;
        this.parent = parent;
        this.data = data;
        this.appType = Mime.getType(name, data);
    }
}

export class ShortcutInfo implements IFileInfo {
    name:string;
    parent:IFileInfo
    originalPath:string;
    mutable:boolean = true;
    constructor(name:string, parent:IFileInfo, originalPath:string){
        this.name = name;
        this.parent = parent;
        this.originalPath = originalPath;
    }
}

export class DirectoryInfo implements IFileInfo {
    name:string;
    parent:IFileInfo
    files:IFileInfo[];
    private _currentDirectory:string;
    get currentDirectory() {
        return this._currentDirectory;
    }
    mutable:boolean = true;
    constructor(name:string, parent:IFileInfo, files:IFileInfo[] = [], currentDirectory?:string){
        this.name = name;
        this.parent = parent;
        this.files = files;
        this._currentDirectory = currentDirectory ?? this.getCurrentDirectory();
    }
    getFile = (fileName:string):IFileInfo | null => this.files.find(file=>file.name === fileName) ?? null;
    private getCurrentDirectory(){
        return getCurrentDirRecursive(this, "");
        function getCurrentDirRecursive(dir:DirectoryInfo, currentPath:string):string{
            if(!(dir instanceof DirectoryInfo)) throw "Error while getting current directory: directory did not reach the root. Looks like invalid directory?";
            let path = dir.name + "/" + currentPath;
            if(dir.parent.parent == null) {
                return currentPath;
            }
            else {
                return getCurrentDirRecursive(dir.parent as DirectoryInfo, path);
            }
        }
    }
    setCurrentDirectory(){
        this._currentDirectory = this.getCurrentDirectory();
    }
}