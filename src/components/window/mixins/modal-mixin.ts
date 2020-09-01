import Vue from 'vue'
import WindowManager from '@/system/window-manager'

export default Vue.extend({
    mounted:function(){
        this.$parent.$props.modal = this;
        WindowManager.select(this.$parent)
        this.$el.addEventListener("mousedown", ()=>WindowManager.select(this.$parent), true);
        this.$data.selected = true;
    },
    beforeDestroy:function(){
        WindowManager.select(this.$parent)
        this.$parent.$props.modal = null;

        if(this.$data.callback){
            let content = (this as any).getContent();
            let parentContent = (this.$parent as any).getContent();
            let callback = this.$data.callback;
            if(content?.$data){
                callback(content.$data.result)
            }
        }
    }
});