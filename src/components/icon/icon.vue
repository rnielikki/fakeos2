<template>
    <div v-contextMenu="{ value: value }" class="f_collection-icon"
    @mousedown="$emit('selected')" @dragstart="dragging" @dragend="dragged" @drop="dropped" @dragover.prevent  @dragover="dragToApp"
    :class="{ selected:isSelected }">
        <img :src="this.model.icon" draggable="false" />
        <div class="f_collection-icon-label" :contenteditable="editable" @mousedown.stop ref="label">{{ model.label }}</div>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import ContextMenu from '../menu/contextmenu'
import windowFactory from '../window/window-factory'
import IconModel from './models/icon-model'
import backgroundMenu from '../background/background-menu'

let f_dragTarget:Vue | null = null

export default Vue.extend({
    name:"Icon",
    directives:{ ContextMenu },
    data:function(){
        return {
            value:[
                {
                    label:"Open",
                    action:()=>this.$emit('open-icon', this.model)
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
            type:Object as PropType<IconModel>
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

        }
    },
    destroyed:function(){
        this.$el?.parentElement?.removeChild(this.$el)
    }
})
</script>
<style lang="scss">
.f_collection-icon {
    @import 'src/scss/colorset.scss';
    position:relative;
    display:inline-block;
    text-align:center;
    &-label {
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
        .f_collection-icon-label {
            color:$selected-foreground;
            overflow-y:visible !important;
        }
    }
}
div {
    vertical-align:middle;
}
</style>