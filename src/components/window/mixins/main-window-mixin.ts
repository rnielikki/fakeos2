import Vue, { defineComponent } from 'vue'
import Win64Manager from '@/system/window-manager'

export default defineComponent({
    created:function(){
        Win64Manager.register(this);
    },
    mounted:function(){
        this.$el.addEventListener("mousedown", ()=>Win64Manager.select(this), true);
    },
    beforeUnmount:function(){
        Win64Manager.unregister(this);
    },
    watch:{
        selected:function(value){
            //@ts-ignore
            if(this.$props.modal !== null) {
                //@ts-ignore
                this.$props.modal.$data.selected = value;
            }
        }
    }
});