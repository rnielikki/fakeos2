import VueComponent from 'vue'
import Window from './components/window.vue'
import WindowTitleOptions from './components/window-title-options'
import IWindowOptions, { WindowOptions } from './components/window-options'
import DialogTemplate from './components/dialog-template.vue'

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
            } 
        });
        content.$mount()
        _window.$slots.default = [ (content as any)._vnode ];
        //add mixin (destroyed)
        _window.$mount();
        mainDesktop!.appendChild(_window.$el)
    },
    OpenModal:function(parent:HTMLElement, content:Vue, title?:string, windowOptions?:IWindowOptions){
        let _window = new Window({
            propsData:{
                title:title,
                titleOptions: {hasMinimizer:false, hasMaximizer:false},
                windowOptions: windowOptions,
                parentElement:parent
            }
        })
        _window.$slots.default?.push(content.$vnode);
        _window.$mount();
        parent.appendChild(_window.$el)
    },
    OpenDialog:function(parent:HTMLElement, message:string, title?:String, windowOptions?:IWindowOptions) {
        let _window = new Window({
            propsData:{
                title:title,
                titleOptions: {hasMinimizer:false, hasMaximizer:false},
                windowOptions: windowOptions,
                parentElement:parent
            }
        })
        let _message = new DialogTemplate({
            propsData: { message: message }
        })
        _window.$slots.default?.push((_message as any)._vnode);
        _window.$mount();
        parent.appendChild(_window.$el)
    }
}