<template>
    <div @dragover.prevent :style="calculatedSize">
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name:"DropTarget",
    props:{
        horizontal:{
            type:Boolean,
            default:true
        },
        gap: {
            type:String,
            default:"0.75rem"
        },
        size: {
            type:String,
            default:"100%"
        }
    },
    computed:{
        calculatedSize:function(){
            if(this.horizontal) {
                return {
                    width:this.gap,
                    height:this.size
                }
            }
            else {
                return {
                    width:this.size,
                    height:this.gap
                }
            }
        }
    }
})
</script>