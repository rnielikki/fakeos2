import Vue, { defineComponent } from 'vue'
import Win64Manager from '@/system/window-manager'

export default defineComponent({
    mounted:function(){
        //@ts-ignore
        this.$parent.$props.modal = this;
        //@ts-ignore
        Win64Manager.select(this.$parent)
        //@ts-ignore
        this.$el.addEventListener("mousedown", ()=>Win64Manager.select(this.$parent), true);
        //@ts-ignore
        this.$data.selected = true;
    },
    beforeUnmount:function(){
        //@ts-ignore
        Win64Manager.select(this.$parent)
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