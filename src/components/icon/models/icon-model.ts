import WindowFactory from '../../window/window-factory'
import IFileInfo, { FileInfo, DirectoryInfo } from '@/system/filesystem/fileinfo'
import { Path } from '@/system/filesystem/filesystem'

let id_current = 0;

export default class IconModel {
    label:string;
    icon:string;
    private _id:number
    public get id(){ return this._id; }
    action:Function;
    data:object|null = null
    fileInfo:IFileInfo;
    constructor(fileInfo:IFileInfo){
        this.fileInfo = fileInfo;
        this.label = fileInfo.name;
        [this.icon, this.action] = getAppInfo(fileInfo);
        this._id=id_current++;
    }
}

function getAppInfo(fileInfo:IFileInfo):[string, Function]{
    let appName:string;
    let icon:string="";
    let data:object | null;
    let asFileInfo : FileInfo;
    switch(true){
        case fileInfo instanceof FileInfo:
            asFileInfo = (fileInfo as FileInfo)!;
            appName = asFileInfo.appType?.app ?? "";
            icon = asFileInfo.appType?.icon;
            if(asFileInfo.appType?.typeName !== "application/vue"){
                data = asFileInfo.data;
            }
            break;
        case fileInfo instanceof DirectoryInfo:
            appName = "core/explorer";
            data = { path: Path.getAbsolutePath((fileInfo as DirectoryInfo).currentDirectory) }
            icon = require("@/softwares/core/explorer/icon.png");
            break;
    }
    return [icon, (op?:object)=>{
        WindowFactory.OpenProgram(appName, {...(data ?? {}), ...(op ?? {})})
    }]
}