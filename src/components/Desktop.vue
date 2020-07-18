<template>
<div class="desktop">
    <window title="my first app">
        <div>this is content</div>
    </window>
    <window title="my second app" :titleButtons="{minimize:false, maximize:false}">
        <div> content2 </div>
        <div> content 3 </div>
        <Menu :value="[{ label: 'asdf' }, { label: 'aaa' }, { label: 'xxx'}]">
            <div>click me</div>
        </Menu>
    </window>
    <StatusBar />
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Window from './window/Window.vue'
import StatusBar from './statusbar/StatusBar.vue'
import Menu from './menu/Menu.vue'

export default Vue.extend({
    components: { Window, StatusBar, Menu }
})
</script>
<style lang="scss" scoped>
    .desktop {
        position: absolute;
        left: 0; right: 0; top: 0; bottom: 0;
        background:darkslateblue url('../assets/logo.png') repeat;
        overflow:hidden;
    }
</style>