<template>
    <div class="f_popup-content">
        <div @mousedown="openInternetWin64">Open Internet Win64...</div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Win64Factory from '@/components/window/window-factory'
export default defineComponent({
    methods:{
        openInternetWin64:function(){
            return Win64Factory.OpenSetting("internet")
        }
    }
})
</script>
<style lang="scss" scoped>
    @import 'src/scss/colorset.scss';
    .f_popup-content{
        background-color:$statusbar-background;
        border:1px solid $window-border;
        color:$statusbar-foreground;
        padding:.4rem .6rem;
    }
</style>