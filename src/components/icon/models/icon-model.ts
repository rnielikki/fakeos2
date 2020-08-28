import IFileInfo, { FileInfo, DirectoryInfo } from '@/system/filesystem/fileinfo'

let id_current = 0;

export default class IconModel {
    label:string;
    icon:string;
    private _id:number
    public get id(){ return this._id; }
    data:object|null = null
    fileInfo:IFileInfo;
    private _isDirectory:boolean;
    public get isDirectory(){ return this._isDirectory; }
    constructor(fileInfo:IFileInfo){
        this.fileInfo = fileInfo;
        this.label = fileInfo.name;
        this._isDirectory = (fileInfo instanceof DirectoryInfo);
        this.icon = (this.isDirectory)?require("@/softwares/core/explorer/icon.png"):(fileInfo as FileInfo).appType?.icon;
        this._id=id_current++;
    }
}