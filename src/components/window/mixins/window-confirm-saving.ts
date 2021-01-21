import Vue, { defineComponent } from 'vue'
import windowFactory from '../window-factory';
import { OkCancelButton } from '../components/dialogs/dialog-model';
import WindowManager from '@/system/window-manager';

export default function(message:object){
    const title = Object(message)?.title ?? "You have unchanged data";
    const content = Object(message)?.content ?? "Are you sure to exit?";
    return defineComponent({
        methods:{
            close:function(){
                //@ts-ignore
                if(!this.$props.modal && (this as any).getContent().f_confirmSaving.fileChanged){
                    windowFactory.OpenDialog((this as any).getContent(), title, content, OkCancelButton,(result:boolean)=>{
                        //@ts-ignore
                        this.$.appContext.app.unmount(this.parentElement);
                    })
                }
                //@ts-ignore
                else if(this.$props.modal){
                    //@ts-ignore
                    this.$.appContext.app.unmount(this.parentElement);
                    return;
                }
                else{
                    //@ts-ignore
                    this.$.appContext.app.unmount(this.parentElement);
                }
            }
        }
    })
}