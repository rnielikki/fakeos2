import windowFactory from '@/components/window/window-factory';
import Vue, { PropType } from 'vue';
import { FileInfo } from '../filesystem/fileinfo';

export default function(validator:(sender:FileInfo)=>unknown){
    return Vue.extend({
        props:{
            sender:{
                type:Object as PropType<FileInfo>,
                required:false
            }
        },
        mounted:function(){
            let sender = this.$props.sender;
            if(!sender){
                return;
            }
            if(sender.disposed){
                this.f_throwError(`The file ${sender.name} does not exist.`);
                return;
            }
            if(!(validator && validator(sender))){
                this.f_throwError(`The file format is wrong or corrupted.`);
                return;
            }
        },
        methods:{
            f_throwError:function(content:string){
                this.$nextTick(()=>{
                    windowFactory.OpenDialog(this, "Error while opening", content, undefined, ()=>this.$data.f_targetWindow.close());
                })
            }
        }
    })
}