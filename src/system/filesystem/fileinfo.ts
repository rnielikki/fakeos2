export default interface IFileInfo {
    name:string;
    parent:IFileInfo | null
    mutable:boolean;
}
export class FileInfo implements IFileInfo {
    name:string;
    parent:IFileInfo;
    data:object | null;
    mutable:boolean;
    constructor(name:string, parent:IFileInfo, data:object | null = null, mutable:boolean = true){
        this.name = name;
        this.parent = parent;
        this.data = data;
        this.mutable = mutable;
    }
}

export class ShortcutInfo implements IFileInfo {
    name:string;
    parent:IFileInfo
    originalPath:string;
    mutable:boolean;
    constructor(name:string, parent:IFileInfo, originalPath:string, mutable:boolean = true){
        this.name = name;
        this.parent = parent;
        this.originalPath = originalPath;
        this.mutable = mutable;
    }
}

export class DirectoryInfo implements IFileInfo {
    name:string;
    parent:IFileInfo
    files:IFileInfo[];
    mutable:boolean;
    constructor(name:string, parent:IFileInfo, files:IFileInfo[] = [], mutable:boolean = true){
        this.name = name;
        this.parent = parent;
        this.files = files;
        this.mutable = mutable;
    }
}