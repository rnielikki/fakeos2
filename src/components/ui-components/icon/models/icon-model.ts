import IFileInfo, { FileInfo, DirectoryInfo, ShortcutInfo } from '@/system/filesystem/fileinfo'
import FileType from '@/system/filesystem/file-type';

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
    private _isShortcut:boolean;
    public get isShortcut(){ return this._isShortcut; }
    constructor(fileInfo:IFileInfo){
        this.fileInfo = fileInfo;
        this.label = fileInfo.name;
        this._isDirectory = (fileInfo.fileType == FileType.Directory);
        this._isShortcut = (fileInfo.fileType == FileType.Shortcut);
        this.icon = this.getIcon(fileInfo);
        this._id=id_current++;
    }
    private getIcon(fileInfo:IFileInfo):string{
        if(fileInfo.fileType == FileType.Shortcut) {
            return this.getIcon((fileInfo as ShortcutInfo).originalFile);
        }
        return (fileInfo.fileType == FileType.Directory)?require("@/softwares/core/explorer/icon.png"):(fileInfo as FileInfo).appType?.icon
    }
}