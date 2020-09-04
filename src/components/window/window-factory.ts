import Window from './components/window.vue'
import IWindowOptions, { WindowOptions, ModalOptions } from './components/window-options'
import DialogTemplate from './components/dialogs/dialog-template.vue'
import MixinFactory from './mixins/window-mixin-factory'
import SystemGlobal from '@/system/global'
import DialogButton, { OKButton } from './components/dialogs/dialog-model'
import { IMenuComponent } from '../menu/models/menu-model'
import IconLoader from '../ui-components/icon/icon-loader'
import { FileInfo } from '@/system/filesystem/fileinfo'

export default {
    //options are propsData
    OpenProgram:function(fullProgramName:string, sender?:FileInfo, options?:object) {
        let _index = fullProgramName.lastIndexOf('/');
        let programName = (_index < 0)?fullProgramName:fullProgramName.substring(_index+1);
        import(`@/softwares/${fullProgramName}/${programName}.vue`).then((component)=>{
            let comp = getComponentInPromise(component, { ...(sender?{sender:sender}:{}), ...options});
            OpenWindow(comp, programName, IconLoader.getIcon(fullProgramName), comp.$data.menu);
        })
        .catch((err)=>{
            this.OpenDialog(null, "Load Failed", `Couldn't find the ${fullProgramName}, or the program is corrupted?`)
            console.warn(err)
        })
    },
    OpenModal:function(parent:Vue | null, content:Vue, callback?:Function){
        if(!parent){
            throw "Error: Modal needs parent";
        }
        let parentWindow = parent.$data.f_targetWindow;
        let _window = new Window({
            propsData:{
                title:content?.$data?.title ?? "Modal Window",
                hasMinimizer: false,
                windowOptions: content?.$data?.windowOptions ?? new ModalOptions(),
                parentElement:parentWindow.$el,
                initToCenter: true
            },
            mixins:[ MixinFactory.CreateModalMixin() ],
            parent: parentWindow
        })
        if(callback) {
            _window.$data.callback = callback;
        }
        content.$mount()
        _window.$slots.default = [(content as any)._vnode];
        Object.assign(content.$data, { f_targetWindow: _window });
        _window.$mount();
        parentWindow.$el.appendChild(_window.$el);
    },
    OpenDialog:function(parent:Vue | null, title:string, message:string, buttons:Array<DialogButton> = OKButton, callback?:Function, windowOptions?:IWindowOptions) {
        let _message = new DialogTemplate({
            propsData: {
                message: message,
                buttons:buttons,
                windowOptionsProp:windowOptions ?? new ModalOptions({
                    defaultWidth:-1,
                    defaultHeight:-1,
                    minWidth:300,
                    minHeight:100
                }),
                callback:callback
            }
        });
        _message.$data.title = title;
        (!parent)?OpenWindow(_message, undefined, undefined, undefined, true):this.OpenModal(parent, _message, callback);
    },
    OpenSetting:function(settingName:string="main", options?:object){
        import(`@/system/app/settings/${settingName}/${settingName}.vue`).then((comp)=>{
            OpenWindow(getComponentInPromise(comp, options), undefined, require("@/system/app/settings/icon.png"));
        }).catch((err)=>{
            this.OpenDialog(null, "Load Failed", `Setting ${settingName} does not exist!`)
            console.warn(err);
        })
    }
}
function OpenWindow(content:Vue, appName?:string, iconPath?:string, menu?:{content?:IMenuComponent[], rightClick?:IMenuComponent[]}, center:boolean = false) {
    let _window = new Window({
        propsData:{
            appName: appName,
            title:content?.$data?.title,
            hasMinimizer:content?.$data?.hasMinimizer ?? true,
            windowOptions:content?.$data?.windowOptions ?? new WindowOptions(),
            parentElement:SystemGlobal.background,
            initToCenter: center,
            iconPath: iconPath,
            windowMenu:menu?.content ?? [],
            rightClickMenu: menu?.rightClick ?? undefined
        },
        mixins: MixinFactory.CreateWindowMixin(content.$data?.f_confirmSaving)
    });
    if(!_window.$props.rightClickMenu){
        _window.$props.rightClickMenu=[];
    }
    else{
        _window.$props.rightClickMenu.push({ label: "--"})
    }
    _window.$props.rightClickMenu = _window.$props.rightClickMenu.concat(createRightClickMenu(_window));
    content.$mount()
    _window.$slots.default = [ (content as any)._vnode ];
    _window.$mount();
    Object.assign(content.$data, { f_targetWindow: _window });
    SystemGlobal.background!.appendChild(_window.$el)
}

function getComponentInPromise(component:any, options?:any){
    if(options){
        return new component.default({
            propsData: options
        })
    }
    else{
        return new component.default();
    }
}

function createRightClickMenu(_window:Window){
    let _anyWindow = _window as any;
    let _actions=[
        {
            label: "Close",
            action:_anyWindow.close
        }
    ]
    if(_window.$props.windowOptions.resizable) {
        _actions.unshift({
            label:"Maximize",
            action:_anyWindow.maximize
        })
    }
    if(_window.$props.hasMinimizer) {
        _actions.unshift({
            label:"Minimize",
            action:_anyWindow.minimize
        })
    }
    return _actions;
}