export default interface IFileInfo {
    name:string;
    path:string;
    mutable:boolean;
}
export class FileInfo implements IFileInfo {
    name:string;
    path:string;
    mutable:boolean;
    constructor(name:string, path:string, mutable:boolean = true){
        this.name = name;
        this.path = path;
        this.mutable = mutable;
    }
}

export class ShortcutInfo implements IFileInfo {
    name:string;
    path:string;
    originalPath:string;
    mutable:boolean;
    constructor(name:string, path:string, originalPath:string, mutable:boolean = true){
        this.name = name;
        this.path = path;
        this.originalPath = originalPath;
        this.mutable = mutable;
    }
}

export class DirectoryInfo implements IFileInfo {
    name:string;
    path:string;
    files:IFileInfo[];
    mutable:boolean;
    constructor(name:string, path:string, files:IFileInfo[] = [], mutable:boolean = true){
        this.name = name;
        this.path = path;
        this.files = files;
        this.mutable = mutable;
    }
}