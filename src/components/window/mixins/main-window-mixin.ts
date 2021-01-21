import { defineComponent } from 'vue'
import WindowManager from '@/system/window-manager'

export default defineComponent({
    created(){
    },
    mounted(){
        WindowManager.register(this);
        this.$el.addEventListener("mousedown", ()=>WindowManager.select(this), true);
    },
    beforeUnmount(){
        //WindowManager.unregister(this);
    },
    watch:{
        selected(value){
            //@ts-ignore
            if(this.$props.modal !== null) {
                //@ts-ignore
                this.$props.modal.$data.selected = value;
            }
        }
    },
    //emits:['mousedown']
});