<template>
<div class="desktop">
    <background />
    <Window title="my first app">
        <div>this is content</div>
    </Window>
    <Window title="my second app" :titleButtons="{minimize:false, maximize:false}">
        <div> content2 </div>
        <div> content 3 </div>
        <div v-menu="{ value: [{ label: 'asdf' }, { label: 'aaa' }, { label: 'xxx'}] }">Click me?</div>
    </Window>
    <StatusBar />
</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Background from './background.vue';
import Window from './window/window.vue'
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
    .desktop {
        position: absolute;
        left: 0; right: 0; top: 0; bottom: 0;
        overflow:hidden;
    }
</style>