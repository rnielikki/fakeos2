import Vue from 'vue'
import WindowManager from '@/system/window-manager'

export default Vue.extend({
    mounted:function(){
        this.$props.parentVue.$props.modal = this;
        WindowManager.select(this.$props.parentVue)
        this.$el.addEventListener("mousedown", ()=>WindowManager.select(this.$props.parentVue), true);
        //this.highlightThis();
    },
    beforeDestroy:function(){
        WindowManager.select(this.$props.parentVue)
        this.$props.parentVue.$props.modal = null;
    }
});