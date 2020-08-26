export default interface IFileInfo {
    name:string;
    parent:IFileInfo | null
}
export class FileInfo implements IFileInfo {
    name:string;
    parent:IFileInfo;
    data:object | null;
    constructor(name:string, parent:IFileInfo, data:object | null = null){
        this.name = name;
        this.parent = parent;
        this.data = data;
    }
}

export class ShortcutInfo implements IFileInfo {
    name:string;
    parent:IFileInfo
    originalPath:string;
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
    constructor(name:string, parent:IFileInfo, files:IFileInfo[] = []){
        this.name = name;
        this.parent = parent;
        this.files = files;
    }
    getFile = (fileName:string):IFileInfo | null => this.files.find(file=>file.name === fileName) ?? null;
}