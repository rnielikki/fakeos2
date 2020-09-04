import Vue from 'vue'
import windowFactory from '../window-factory';
import { OkCancelButton } from '../components/dialogs/dialog-model';
import WindowManager from '@/system/window-manager';

export default function(message:object){
    let title = Object(message)?.title ?? "You have unchanged data";
    let content = Object(message)?.content ?? "Are you sure to exit?";
    return Vue.extend({
        methods:{
            close:function(){
                if(!this.$props.modal && (this as any).getContent().f_confirmSaving.fileChanged){
                    windowFactory.OpenDialog((this as any).getContent(), title, content, OkCancelButton,(result:boolean)=>{
                        if(result) this.$destroy();
                    })
                }
                else if(this.$props.modal){
                    WindowManager.select(this);
                    return;
                }
                else{
                    this.$destroy();
                }
            }
        }
    })
}