<template>
    <div class="f_popup-anchor" :style="{ left: popupInfo.x, top:popupInfo.y }">
        <div class="f_popup-wrapper" :style="this.directionStyle">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import PopupInfo, { popupDirection } from './popup-info';
export default Vue.extend({
    name:"Popup",
    props:{
        popupInfo:{
            type:PopupInfo
        },
    },
    computed:{
        directionStyle:function(){
            let direction = this.popupInfo.direction as object
            return direction;
        }
    }
})
</script>
<style lang="scss">
    .f_popup-anchor{
        width: 0;
        height: 0;
        position: absolute;
        z-index:20;
        overflow: visible;
    }
    .f_popup-wrapper{
        position: absolute;
    }
</style>