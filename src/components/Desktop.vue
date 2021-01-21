<template>
<div class="f_desktop" id="f_desktop">
    <background />
    <!--<StatusBar />-->
</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Background from './background/background.vue';
//import StatusBar from './statusbar/statusbar.vue'
import Menu from './menu/menu'
import DesktopIcons from './desktop-icons'

export default defineComponent({
    components: { /*StatusBar,*/ Background },
    directives: {
        menu: Menu
    },
    created:function(){
        DesktopIcons();
    }
})
</script>
<style lang="scss" scoped>
    .f_desktop {
        position: absolute;
        left: 0; right: 0; top: 0; bottom: 0;
        overflow:hidden;
        display:flex;
        flex-direction: column;
    }
</style>