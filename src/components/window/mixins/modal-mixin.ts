import { defineComponent } from 'vue'
import WindowManager from '@/system/window-manager'

export default defineComponent({
    mounted:function(){
        //@ts-ignore
        this.$parent.$props.modal = this;
        //@ts-ignore
        WindowManager.select(this.$parent)
        //@ts-ignore
        this.$el.addEventListener("mousedown", ()=>WindowManager.select(this.$parent), true);
        //@ts-ignore
        this.$data.selected = true;
    },
    beforeUnmount:function(){
        //@ts-ignore
        WindowManager.select(this.$parent)
        //@ts-ignore
        this.$parent.$props.modal = null;

        //@ts-ignore
        if(this.$data.callback){
            const content = (this as any).getContent();
            //@ts-ignore
            const callback = this.$data.callback;
            if(content?.$data){
                callback(content.$data.result)
            }
        }
    }
});