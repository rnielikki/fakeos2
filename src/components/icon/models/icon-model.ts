import IconLoader from '../icon-loader'
import WindowFactory from '../../window/window-factory'
import IFileInfo, { FileInfo } from '@/system/filesystem/fileinfo'

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
        this.icon = IconLoader.getIcon(fileInfo.name);
        this.action = getAction(fileInfo)
        this._id=id_current++;
    }
}

function getAction(fileInfo:IFileInfo){
    return (op?:object)=>{
        WindowFactory.OpenProgram(fileInfo.name, {...((fileInfo as FileInfo)?.data ?? {}), ...(op ?? {})})
    }
}