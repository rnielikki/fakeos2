import WindowManager from "@/system/window-manager";
import { ComponentPublicInstance } from "vue";

export default {
    minimize:function(win:ComponentPublicInstance) {
        const winInfo = disassemble(win);
        if(!winInfo.props.hasMinimizer) return;
        if(winInfo.props.modal){
            WindowManager.select(win);
            return;
        }

        const minimized = winInfo.data.minimized;
        if(minimized) {
            WindowManager.select(win)
        }
        else {
            WindowManager.deselect()
        }
        winInfo.data.minimized = !minimized;
    },
    maximize:function(win:ComponentPublicInstance) {
        const winInfo = disassemble(win);
        if(!winInfo.props.windowOptions?.resizable) return;

        if(winInfo.props.modal){
            WindowManager.select(win);
            return;
        }

        if(winInfo.data.maximized) {
            //unmaximize
            winInfo.data.maximized = false;
            winInfo.props.windowOptions.movable = true;
        }
        else {
            //maximize
            winInfo.data.maximized = true;
            winInfo.props.windowOptions.movable = false;
        }
    },
    close:function(win:ComponentPublicInstance){
        const winInfo = disassemble(win);
        if(winInfo.props.modal){
            WindowManager.select(win);
            return;
        }
        winInfo.app.unmount(winInfo.app._container)
    },
}

function disassemble(win:ComponentPublicInstance){
    if(win.$data){
        return {
            data: win.$data,
            props: win.$props,
            app:win.$.appContext.app
        }
    }
    else{
        return {
            //@ts-ignore
            data: win._data, props: win._props, app:win._context.app
        }
    }
}