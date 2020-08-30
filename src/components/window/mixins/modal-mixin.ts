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

        if(this.$data.functionName){
            let content = (this as any).getContent();
            let parentContent = (this.$parent as any).getContent();
            let functionName = this.$data.functionName;
            if(content?.$data){
                if(Object.prototype.hasOwnProperty.call(parentContent, functionName)){
                    parentContent[functionName](content.$data.result)
                }
                else{
                    console.warn(functionName + " does not exist on the parent")
                }
            }
        }
    }
});