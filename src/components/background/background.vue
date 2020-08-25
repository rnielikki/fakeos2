<template>
    <div class="f_background" id="f_background" v-contextmenu="{ value: menu }">
        <IconCollection :icons="icons" :direction="direction" />
    </div>
</template>
<script lang="ts">
import VueCopmonent from 'vue'
import { Component, Vue } from 'vue-property-decorator';
import ContextMenu from '../menu/contextmenu'
import WindowFactory from '../window/window-factory'
import IconCollection from '@/components/icon/icon-collection.vue'
import BackgroundMenu from './background-menu'
import BackgroundIcons from './background-icons'
import { IconDirection } from '../icon/models/icon-collection-model'

@Component({
    directives:{
        contextmenu: ContextMenu
    },
    components:{ IconCollection },
    data:function(){
        return {
            menu:BackgroundMenu,
            icons:BackgroundIcons,
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