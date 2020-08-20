<template>
    <div>
        <img :src=icon />
        <div>{{ label }}</div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ContextMenu from '../menu/contextmenu'
export default Vue.extend({
    name:"DesktopIcon",
    directives:{ ContextMenu },
    data:function(){
        return {
            value:[
                {
                    label:"open"
                },
                {
                    label: "rename"
                },
                {
                    label: "delete"
                }
            ]
        }
    },
    props:{
        icon:{
            type:String,
            default:require("@/system/resources/window-icon.png")
        },
        label:{
            type:String
        }
    },
    destroyed:function(){
        this.$el?.parentElement?.removeChild(this.$el)
    }
})
</script>