import IconLoader from '../icon-loader'
import WindowFactory from '../../window/window-factory'

export default class IconModel {
    label:string;
    icon:string;
    action:Function;
    constructor(label:string, icon:string, action:Function){
        this.label = label;
        this.icon = icon;
        this.action = action;
    }
    static FromAppName(appName:string, options?:object):IconModel{
        let _index = appName.lastIndexOf('/');
        let label = (_index < 0)?appName:appName.substring(_index+1);
        let icon = IconLoader.getIcon(appName);
        let action = ()=>{
            WindowFactory.OpenProgram(appName, options)
        }
        return new IconModel(label, icon, action)
    }
}