import IconLoader from '../icon-loader'
import WindowFactory from '../../window/window-factory'

let id_current = 0;

export default class IconModel {
    label:string;
    icon:string;
    private _id:number
    public get id(){ return this._id; }
    action:Function;
    appName:string|null = null
    data:object|null = null
    constructor(label:string, icon:string, action:Function, appName?:string, data?:object){
        this.label = label;
        this.icon = icon;
        this.action = action;
        this._id=id_current++;
        if(appName) this.appName = appName;
        if(data) this.data = data;
    }
    static FromAppName(appName:string, options?:object):IconModel{
        let _index = appName.lastIndexOf('/');
        let label = (_index < 0)?appName:appName.substring(_index+1);
        let icon = IconLoader.getIcon(appName);
        let action = (op?:object)=>{
            WindowFactory.OpenProgram(appName, {...(options ?? {}), ...(op ?? {})})
        }
        return new IconModel(label, icon, action, appName, options)
    }
}