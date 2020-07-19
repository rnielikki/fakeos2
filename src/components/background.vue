<template>
    <div class="background" v-contextmenu="{ value: [{ label: 'Open...' }, { label: 'Display settings' }, { label: 'Theme'}] }">
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContextMenu from './menu/contextmenu'
@Component({
    directives:{
        contextmenu: ContextMenu
    }
})
export default class Background extends Vue {}
</script>
<style lang="scss" scoped>
    .background {
        z-index:0;
        height:100%; 
        left:0;top:0;right:0;bottom:0;
        background:darkslateblue url('../assets/logo.png') repeat;
    }
</style>