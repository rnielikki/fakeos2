<template>
<div class="f_desktop" id="f_desktop">
    <background />
    <StatusBar />
</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Background from './background.vue';
import Window from './window/components/window.vue'
import StatusBar from './statusbar/statusbar.vue'
import Menu from './menu/menu'
import { DirectiveOptions } from 'vue';

@Component({
    components: { Window, StatusBar, Background },
    directives: {
        menu: Menu
    }
})
export default class Desktop extends Vue {}
</script>
<style lang="scss" scoped>
    .f_desktop {
        position: absolute;
        left: 0; right: 0; top: 0; bottom: 0;
        overflow:hidden;
    }
</style>