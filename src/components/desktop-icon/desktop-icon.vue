<template>
    <div v-contextMenu="{ value: value }" class="f_background-icon" @dblclick="openApp">
        <img :src=icon />
        <div class="f_background-icon-label" :contenteditable="editable" @mousedown.stop ref="label">{{ label }}</div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ContextMenu from '../menu/contextmenu'
import windowFactory from '../window/window-factory'
export default Vue.extend({
    name:"DesktopIcon",
    directives:{ ContextMenu },
    data:function(){
        return {
            value:[
                {
                    label:"Open",
                    action:()=>(this as any).openApp()
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
        icon:{
            type:String,
            default:require("@/system/resources/window-icon.png")
        },
        label:{
            type:String
        },
        appName:{
            type:String
        },
        appOptions:{
            type:Object,
            default:undefined
        }
    },
    methods:{
        openApp:function(){
            if(!this.appName) return;
            windowFactory.OpenProgram(this.appName, this.appOptions);
        },
        editLabel:function(){
            this.editable = true;
            let labelElement = this.$refs.label as HTMLElement;
            labelElement.focus();
            console.log(getSelection())
            document.addEventListener("mousedown",()=>{
                    this.editable=false;
                    this.$props.label = labelElement.innerText;
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
    position:absolute;
    &-label {
        text-shadow:2px 0px 0px #000, -2px 0px 0px #000, 0px -2px 0px #000, 0px 2px 0px #000;
        color:#fff;
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
}
</style>