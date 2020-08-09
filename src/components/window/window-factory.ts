import Window from './components/window.vue'
import WindowTitleOptions from './components/window-title-options'
import IWindowOptions, { WindowOptions, ModalOptions } from './components/window-options'
import DialogTemplate from './components/dialog-template.vue'
import MixinFactory from './mixins/window-mixin-factory'

let mainDesktop:HTMLElement | null = null;

export default {
    //options are propsData
    OpenProgram:function(programName:string, options?:object) {
        import(`@/softwares/${programName}/${programName}.vue`).then((component)=>{
            let comp:Vue;
            if(options){
                comp = new component.default({
                    propsData: options
                })
            }
            else{
                comp = new component.default();
            }
            OpenWindow(comp, programName, getIcon(programName));
        })
        .catch(()=>{
            this.OpenDialog(null, "Load Failed", `Couldn't find the ${programName}, or the program is corrupted?`)
        })
    },
    OpenModal:function(parent:Vue | null, content:Vue, callback?:(result:any)=>void){
        if(parent === null){
            throw "Error: Parent cannot be null";
        }
        let _window = new Window({
            propsData:{
                title:content?.$props?.title ?? "Modal Window",
                titleOptions: {hasMinimizer:false, hasMaximizer:false},
                windowOptions: content?.$props?.windowOptions ?? new ModalOptions(),
                parentElement:parent.$el,
                parentVue:parent,
                initToCenter: true
            },
            mixins:[ MixinFactory.CreateModalMixin() ]
        })
        if(callback && content.$props?.callback) {
            content.$props.callback = callback;
        }
        content.$mount()
        _window.$slots.default = [(content as any)._vnode];
        Object.assign(content.$data, { f_targetWindow: _window });
        _window.$mount();
        parent.$props.hasModal = true;
        parent.$el.appendChild(_window.$el);
    },
    OpenDialog:function(parent:Vue | null, title:string, message:string, callback?:(result:any)=>void, windowOptions?:IWindowOptions) {
        let _message = new DialogTemplate({
            propsData: {
                title:title,
                message: message,
                windowOptions:windowOptions ?? new ModalOptions({
                    defaultWidth:300,
                    defaultHeight:200,
                    minX:300,
                    minY:200
                })
            }
        });
        (parent == null)?OpenWindow(_message, undefined, undefined, true):this.OpenModal(parent, _message, callback);
    }
}
function OpenWindow(content:Vue, appName?:string, iconPath?:string, center:boolean = false) {
    if(mainDesktop == null){
        mainDesktop = document.querySelector(".desktop")
    }
    let props = content?.$props;
    let _window = new Window({
        propsData:{
            appName: appName,
            title:props?.title ?? "undefined... I mean, Untitled",
            titleOptions:props?.titleOptions ?? ({ hasMinimizer:true, hasMaximizer:true } as WindowTitleOptions),
            windowOptions:props?.windowOptions ?? new WindowOptions(),
            parentElement:mainDesktop,
            initToCenter: center,
            iconPath: iconPath
        },
        mixins:[ MixinFactory.CreateWindowMixin() ]
    });
    content.$mount()
    _window.$slots.default = [ (content as any)._vnode ];
    _window.$mount();
    Object.assign(content.$data, { f_targetWindow: _window });
    mainDesktop!.appendChild(_window.$el)
}
function getIcon(appName:string):string{
    try {
        return require("@/softwares/"+appName+"/icon.png");   
    }
    catch {
        return require("./default.png");
    }
}