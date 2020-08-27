<template>
    <div class="f_background" id="f_background" v-contextmenu="{ value: menu }">
        <IconCollection :path="path" :direction="direction" style="z-index:-1" />
    </div>
</template>
<script lang="ts">
import VueCopmonent from 'vue'
import { Component, Vue } from 'vue-property-decorator';
import ContextMenu from '../menu/contextmenu'
import WindowFactory from '../window/window-factory'
import IconCollection from '@/components/icon/icon-collection.vue'
import BackgroundMenu from './background-menu'
import { Path } from '@/system/filesystem/filesystem'
import { IconDirection } from '../icon/models/icon-collection-model'
import { DirectoryInfo } from '@/system/filesystem/fileinfo';

@Component({
    directives:{
        contextmenu: ContextMenu
    },
    components:{ IconCollection },
    data:function(){
        return {
            menu:BackgroundMenu,
            path:Path.getAbsolutePath("C:/System") as DirectoryInfo,
            direction:IconDirection.column
        }
    }
})
export default class Background extends Vue {}
</script>
<style lang="scss" scoped>
    .f_background {
        z-index:0;
        width:100%;
        height:100%;
        left:0;top:0;right:0;bottom:0;
        background:#008080/* url('../../assets/logo.png') repeat*/;
        position:relative;
        overflow: hidden;
    }
</style>
<style>
    .f_background > .iconCollection .f_collection-icon-label {
        text-shadow:2px 0px 0px #000, -2px 0px 0px #000, 0px -2px 0px #000, 0px 2px 0px #000;
        color:#fff;
    }
</style>