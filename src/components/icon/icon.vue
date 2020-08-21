<template>
    <div v-contextMenu="{ value: value }" class="f_background-icon" @dblclick="model.action" draggable="true" @dragstart="dragging" @dragend="dragged" @drop="dropped" @dragover.prevent>
        <img :src="this.model.icon" draggable="false" />
        <div class="f_background-icon-label" :contenteditable="editable" @mousedown.stop ref="label">{{ model.label }}</div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ContextMenu from '../menu/contextmenu'
import windowFactory from '../window/window-factory'
import IconModel from './models/icon-model'

let f_dragTarget:Vue | null = null

export default Vue.extend({
    name:"Icon",
    directives:{ ContextMenu },
    data:function(){
        return {
            value:[
                {
                    label:"Open",
                    action:this.model.action
                },
                {
                    label: "Rename",
                    action:()=>(this as any).editLabel()
                },
                {
                    label: "Delete",
                    action:()=>this.$destroy()
                },
            ],
            editable:false
        }
    },
    props:{
        model:{
            type:IconModel
        }
    },
    methods:{
        editLabel:function(){
            this.editable = true;
            let labelElement = this.$refs.label as HTMLElement;
            labelElement.focus();
            document.addEventListener("mousedown",()=>{
                    this.editable=false;
                })
        },
        dragging:function(){
            (this.$el as HTMLElement).style.opacity = "0.5"
        },
        dragged:function(){
            (this.$el as HTMLElement).style.opacity = "1"
            if(f_dragTarget){
                (this.$parent as any).changeOrder(this, f_dragTarget)
                f_dragTarget = null;
            }
        },
        dropped:function(e:Event){
            f_dragTarget = this;
        },
    },
    destroyed:function(){
        this.$el?.parentElement?.removeChild(this.$el)
    }
})
</script>
<style lang="scss">
.f_background-icon {
    @import 'src/scss/colorset.scss';
    position:relative;
    display:inline-block;
    margin:.8rem .5rem;
    &-label {
        text-shadow:2px 0px 0px #000, -2px 0px 0px #000, 0px -2px 0px #000, 0px 2px 0px #000;
        color:#fff;
        &[contenteditable=true]{
            background-color:#fff;
            color:#000;
            text-shadow:none;
        }
        &.selected {
            color:$selected-foreground;
            background-color:$selected-background;
        }
    }
    img {
        width:64px;
        height:64px;
    }
}
</style>