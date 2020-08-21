<template>
    <div v-contextMenu="{ value: value }" class="f_background-icon" @dblclick="model.action">
        <img :src="this.model.icon" />
        <div class="f_background-icon-label" :contenteditable="editable" @mousedown.stop ref="label">{{ model.label }}</div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ContextMenu from '../menu/contextmenu'
import windowFactory from '../window/window-factory'
import IconModel from './models/icon-model'

export default Vue.extend({
    name:"DesktopIcon",
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
                }
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
            console.log(getSelection())
            document.addEventListener("mousedown",()=>{
                    this.editable=false;
                    console.log(this.model.label)
                })
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
    position:absolute;
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