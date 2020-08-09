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
    },
    watch:{
        selected:function(value){
            if(this.$props.modal !== null) {
                this.$props.modal.$props.selected = value;
            }
        }
    }
});