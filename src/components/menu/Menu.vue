<template>
<div>
    <div :style="display">
        <slot></slot>
    </div>
    <div v-if="this.show">
        <menu-content :value="value" :position="position.positionStatus" />
    </div>
</div>
</template>
<script lang="ts">
// eslint-disable-next-line no-unused-vars
import Vue, { PropType } from 'vue'
import MenuContent from './menu-content.vue'
// eslint-disable-next-line no-unused-vars
import { IMenuComponent } from './models/menu-model'
export default Vue.extend({
    name:'Menu',
    components: { MenuContent },
    data:function() {
        return {
            show: false,
            position: {
                positionStatus:{ x:0, y:0 }
            }
        }
    },
    props:{
        display:{
            type:String,
            default: "inline-block"
        },
        eventType:{
            type:String,
            default: "contextmenu"
        },
        value:{
            type:Array as PropType<IMenuComponent[]>,
            default: []
        }
    },
    mounted:function(){
        //console.log((this as any)._vnode.children[0]);
        //this.$children.push(new MenuContent());
        var cnt = new MenuContent({ propsData:{value: this.value} });
        cnt.$mount(this.$el);
        console.log(cnt);
        //new MenuContent(); //what happens?
        //this.$children[0].$el.addEventListener(this.eventType, (e)=>ShowMenu(this, e as MouseEvent));
        /*
        var ShowMenu = (sender:any, e:MouseEvent)=>{
            if(!e) throw ("Event type must be MouseEvent");
            e.preventDefault();
            sender.show = true;
            document.addEventListener("mousedown", ()=>sender.show=false, { once: true, capture: false });
            sender.position.x = e.clientX;
            sender.position.y = e.clientY;
            e.stopPropagation();
        }
        */
    }
})
</script>