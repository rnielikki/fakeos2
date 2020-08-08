import Vue from 'vue'
import WindowManager from '@/system/window-manager'
export default Vue.extend({
    created:function(){
        WindowManager.register(this);
    },
    mounted:function(){
        this.$el.addEventListener("mousedown", ()=>WindowManager.select(this), true);
    },
    beforeDestroy:function(){
        WindowManager.unregister(this);
    }
});