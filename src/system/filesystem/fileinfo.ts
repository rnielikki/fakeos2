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
    originalFile:IFileInfo;
    mutable:boolean = true;
    constructor(name:string, parent:IFileInfo, originalFile:IFileInfo){
        this.name = name;
        this.parent = parent;
        if(originalFile instanceof ShortcutInfo) throw "Shortcut origin should be real file or directory";
        this.originalFile = originalFile;
    }
}

export class DirectoryInfo implements IFileInfo {
    private _name:string;
    parent:IFileInfo
    files:IFileInfo[];
    private _currentDirectory:string;
    get currentDirectory() {
        return this._currentDirectory;
    }
    get name(){
        return this._name;
    }
    set name(value:string){
        this._name = value;
        this.setCurrentDirectory();
    }
    mutable:boolean = true;
    constructor(name:string, parent:IFileInfo, files:IFileInfo[] = []){
        this._name = name;
        this.parent = parent;
        this.files = files;
        this._currentDirectory = this.getCurrentDirectory();
    }
    getFile = (fileName:string):IFileInfo | null => this.files.find(file=>file.name === fileName) ?? null;
    private getCurrentDirectory(){
        return getCurrentDirRecursive(this, "");
        function getCurrentDirRecursive(dir:DirectoryInfo, currentPath:string):string{
            if(dir.parent == null) {
                return currentPath;
            }
            if(!(dir instanceof DirectoryInfo)) throw "Error while getting current directory: directory did not reach the root. Looks like invalid directory?";
            return getCurrentDirRecursive(dir.parent as DirectoryInfo, dir.name + "/" + currentPath);
        }
    }
    setCurrentDirectory(){
        this._currentDirectory = this.getCurrentDirectory();
    }
}