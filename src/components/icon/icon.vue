<template>
    <div v-contextMenu="{ value: value }" class="f_background-icon"
    @mousedown="$emit('selected')" @dblclick="model.action" @dragstart="dragging" @dragend="dragged" @drop="dropped" @dragover.prevent  @dragover="dragToApp"
    :class="{ selected:isSelected }">
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
        },
        isSelected:{
            type:Boolean,
            default:false
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
                f_dragTarget = null;
            }
        },
        dropped:function(e:Event){
            f_dragTarget = this;
        },
        dragToApp:function(){
            //@ts-ignore
            if(this.model.data && f_dragTarget?.model?.appName === this.model.appName !== null) {
                //@ts-ignore
                f_dragTarget.model.action(this.model.data);
            }
            /*
            let senderModel = sender.$props.model;
            let targetModel = target.$props.model;
            let senderIndex = this.icons.findIndex(icon=>icon.id === senderModel.id);
            let targetIndex = this.icons.findIndex(icon=>icon.id === targetModel.id)
            this.$set(this.$props.icons, senderIndex, targetModel);
            this.$set(this.$props.icons, targetIndex, senderModel);
            */
        }
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
    &-label {
        text-shadow:2px 0px 0px #000, -2px 0px 0px #000, 0px -2px 0px #000, 0px 2px 0px #000;
        color:#fff;
        overflow-wrap: break-word;
        width: 75px;
        height:1rem;
        overflow-y:hidden;
        &[contenteditable=true]{
            background-color:#fff;
            color:#000;
            text-shadow:none;
        }
    }
    img {
        width:64px;
        height:64px;
    }
    &.selected {
        background-color:$selected-background;
        .f_background-icon-label {
            color:$selected-foreground;
            overflow-y:visible !important;
        }
    }
}
div {
    vertical-align:middle;
}
</style>