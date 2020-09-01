<template>
    <div class="f_popup-content">
        <div @mousedown="openInternetWindow">Open Internet Window...</div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import WindowFactory from '@/components/window/window-factory'
export default Vue.extend({
    methods:{
        openInternetWindow:function(){
            return WindowFactory.OpenSetting("internet")
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