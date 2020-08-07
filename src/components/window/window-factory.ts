import Window from './components/window.vue'
import WindowTitleOptions from './components/window-title-options'
import { WindowOptions, ModalOptions } from './components/window-options'
import DialogTemplate from './components/dialog-template.vue'
import MixinFactory from './mixins/window-mixin-factory'

let mainDesktop:HTMLElement | null = null;

export default {
    OpenWindow:function(content:Vue) {
        if(mainDesktop == null){
            mainDesktop = document.querySelector(".desktop")
        }
        let data = content?.$data;
        let _window = new Window({
            propsData:{
                title:data?.title ?? "undefined... I mean, Untitled",
                titleOptions:data?.titleOptions ?? ({ hasMinimizer:true, hasMaximizer:true } as WindowTitleOptions),
                windowOptions:data?.windowOptions ?? new WindowOptions(),
                parentElement:mainDesktop
            },
            mixins:[ MixinFactory.CreateWindowMixin() ]
        });
        content.$mount()
        _window.$slots.default = [ (content as any)._vnode ];
        _window.$mount();
        Object.assign(content.$data, { f_targetWindow: _window });
        mainDesktop!.appendChild(_window.$el)
    },
    OpenModal:function(parent:Vue | null, content:Vue, callback:(result:any)=>void){
        if(parent === null){
            throw "Error: Parent cannot be null";
        }
        let _window = new Window({
            propsData:{
                title:content?.$props?.title ?? "Modal Window",
                titleOptions: {hasMinimizer:false, hasMaximizer:false},
                windowOptions: content?.$props?.windowOptions ?? new ModalOptions(),
                parentElement:parent.$el,
                parentVue:parent
            },
            mixins:[ MixinFactory.CreateModalMixin(callback) ]
        })
        content.$mount()
        _window.$slots.default = [(content as any)._vnode];
        Object.assign(content.$data, { f_targetWindow: _window });
        _window.$mount();
        parent.$props.hasModal = true;
        parent.$el.appendChild(_window.$el);
    },
    OpenDialog:function(parent:Vue | null, title:string, message:string, callback:(result:any)=>void) {
        let _message = new DialogTemplate({
            propsData: {
                title:title,
                message: message
            }
        })
        this.OpenModal(parent, _message, callback);
    }
}