<template>
    <div>
        <div class="f_window-content-menu" v-for="(menuItem, key) in menu" :key="key" v-menu="{
            value:menuItem.submenu,
            menuInfo:getWindowInfo
        }">
            {{ menuItem.label }}
        </div>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import { IMenuComponent } from '../../menu/models/menu-model'
import menu from '@/components/menu/menu'
import PopupInfo, { popupDirection } from '../../popups/popup-info'

export default Vue.extend({
    name:"WindowMenu",
    directives:{ menu },
    props:{
        menu:{
            type:Array as PropType<IMenuComponent[]>,
            required:true
        }
    },
    computed:{
        getWindowInfo:function(){
            return new PopupInfo({ direction: popupDirection.bottomRight, y:"100%" })
        }
    }
})
</script>
<style lang="scss">
@import 'src/scss/colorset.scss';
    .f_window-content-menu {
        display: inline-block;
        padding:.4rem .3rem;
        min-width:2.3rem;
        text-align:center;
        box-sizing: border-box;
        position: relative;
        &:hover {
            background-color: $selected-foreground;
            color: $selected-background;
        }
        &.f_popup-selected {
            background-color: $selected-background;
            color: $selected-foreground;
        }
    }
</style>