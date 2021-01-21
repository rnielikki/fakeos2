import Win64 from './components/win64.vue'
import IWin64Options, { Win64Options, ModalOptions } from './components/win64-options'
import DialogTemplate from './components/dialogs/dialog-template.vue'
import MixinFactory from './mixins/window-mixin-factory'
import SystemGlobal from '@/system/global'
import DialogButton, { OKButton } from './components/dialogs/dialog-model'
import { IMenuComponent } from '../menu/models/menu-model'
import IconLoader from '../ui-components/icon/icon-loader'
import { FileInfo } from '@/system/filesystem/fileinfo'
import { App, ComponentPublicInstance, createApp } from 'vue'
import instantiater from '@/system/instantiater'

export default {
    //options are props
    OpenProgram:function(fullProgramName:string, sender?:FileInfo, options?:object) {
        const _index = fullProgramName.lastIndexOf('/');
        const programName = (_index < 0)?fullProgramName:fullProgramName.substring(_index+1);
        import(`@/softwares/${fullProgramName}/${programName}.vue`).then((component)=>{
            const comp = getComponentInPromise(component, { ...(sender?{sender:sender}:{}), ...options});
            OpenWin64(comp, programName, IconLoader.getIcon(fullProgramName), component.default.data.menu);
        })
        .catch((err)=>{
            this.OpenDialog(null, "Load Failed", `Couldn't find the ${fullProgramName}, or the program is corrupted?`)
            console.warn(err)
        })
    },
    OpenModal:function(parent:ComponentPublicInstance | null, content:App<Element>, callback?:Function){
        if(!parent){
            throw "Error: Modal needs parent";
        }
        //@ts-ignore
        const data = content._component.data();
        //@ts-ignore
        const parentWin64 = parent.$data.f_targetWindow;
        const _window = createApp(Win64, {
                //@ts-ignore
                title:data?.title ?? "Modal Alert!",
                hasMinimizer: ()=>false,
                //@ts-ignore
                windowOptions: data?.windowOptions ?? new ModalOptions(),
                parentElement:parentWin64.$el,
                initToCenter: ()=>true
        }).mixin([ MixinFactory.CreateModalMixin() ]);

        const mountedWindow = instantiater.Mount(_window, parent.$el??SystemGlobal.background);
        const mountedContent = instantiater.SetSlot(content, mountedWindow.$el, ".window-content div");
        parentWin64.$el.appendChild(mountedWindow.$el);
        if(callback) {
            //@ts-ignore
            mountedWindow.$data.callback = callback;
        }
        Object.assign(mountedContent!.$data, { f_targetWindow: _window });
        Object.assign(mountedContent!, { parent: parentWin64 });
    },
    OpenDialog:function(parent:ComponentPublicInstance | null, title:string, message:string, buttons:Array<DialogButton> = OKButton, callback?:Function, windowOptions?:IWin64Options) {
        const _message = createApp(DialogTemplate,{
            message: message,
            buttons:buttons,
            title:title,
            windowOptions:windowOptions ?? new ModalOptions({
                defaultWidth:-1,
                defaultHeight:-1,
                minWidth:300,
                minHeight:100
            }),
            callback:callback
        });
        (!parent)?OpenWin64(_message, undefined, undefined, undefined, true):this.OpenModal(parent, _message, callback);
    },
    OpenSetting:function(settingName:string="main", options?:object){
        import(`@/system/app/settings/${settingName}/${settingName}.vue`).then((comp)=>{
            OpenWin64(getComponentInPromise(comp, options), undefined, require("@/system/app/settings/icon.png"));
        }).catch((err)=>{
            this.OpenDialog(null, "Load Failed", `Setting ${settingName} does not exist!`)
            console.error(err);
        })
    }
}
function OpenWin64(content:App<Element>, appName?:string, iconPath?:string, menu?:{content?:IMenuComponent[], rightClick?:IMenuComponent[]}, center:boolean = false) {
    //@ts-ignore
    const data = content._component.data();
    const prop = content._props;
    const _window = createApp(Win64,{
            appName: appName,
            //@ts-ignore
            title:data?.title ?? prop.title,
            //@ts-ignore
            hasMinimizer:data?.hasMinimizer ?? true,
            //@ts-ignore
            windowOptions:data?.windowOptions ?? prop.windowOptions ?? new Win64Options(),
            parentElement:SystemGlobal.background,
            initToCenter: center,
            iconPath: iconPath,
            windowMenu:menu?.content ?? [],
            rightClickMenu: menu?.rightClick ?? undefined
        }
    )
    .mixin(MixinFactory.CreateWin64Mixin(data?.f_confirmSaving));
    //@ts-ignore
    if(!_window._props.rightClickMenu){
        //@ts-ignore
        _window._props.rightClickMenu=[];
    }
    else{
        //@ts-ignore
        _window._props.rightClickMenu.push({ label: "--"})
    }
    //@ts-ignore
    _window._props.rightClickMenu = _window._props?.rightClickMenu?.concat(createRightClickMenu(_window));
    const mountedWindow = instantiater.Mount(_window, SystemGlobal.background);
    const mountedContent = instantiater.SetSlot(content, mountedWindow.$el, ".window-content div");
    Object.assign(mountedContent!.$data, { f_targetWindow: _window });
}

function getComponentInPromise(component:any, options?:any){
    if(options){
        return createApp(component.default, options)
    }
    else{
        return createApp(component.default);
    }
}

function createRightClickMenu(_window:App<Element>){
    const _anyWin64 = _window as any;
    const _actions=[
        {
            label: "Close",
            action:_anyWin64.close
        }
    ]
    //@ts-ignore
    if(_window._props.windowOptions?.resizable) {
        _actions.unshift({
            label:"Maximize",
            action:_anyWin64.maximize
        })
    }
    //@ts-ignore
    if(_window._props.hasMinimizer) {
        _actions.unshift({
            label:"Minimize",
            action:_anyWin64.minimize
        })
    }
    return _actions;
}
