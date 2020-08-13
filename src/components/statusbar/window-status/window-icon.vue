<template>
<div
    :class="{selected: this.targetApp.$data.selected }"
    v-contextMenu="{
        value: targetApp.rightClickMenu,
        menuInfo: menuInfo
    }">
    <img :src="iconPath">
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Window from '@/components/window/components/window.vue'
import WindowManager from '@/system/window-manager'

//import { IMenuComponent } from '@/components/menu/models/menu-model'
import ContextMenu from '../../menu/contextmenu'
import MenuInfo, { MenuDirection } from '../../menu/models/menu-info'

export default Vue.extend({
    props:{
        iconPath:String,
        targetApp:Window
    },
    directives:{ contextMenu:ContextMenu },
    mounted:function(){
        this.$el.addEventListener("mousedown", ()=>{
            let isCurrent = WindowManager.isSelected(this.$props.targetApp);
            if(this.$props.targetApp.minimized || isCurrent) {
                this.$props.targetApp.minimize();
            }
            else if(!isCurrent) {
                WindowManager.select(this.$props.targetApp)
            }
        }, true);
    },
    computed:{
        menuInfo:function(){
            return new MenuInfo({ direction: MenuDirection.topRight })
        }
    }
})
</script>
<style lang="scss" scoped>
@import 'src/scss/colorset.scss';
    div{
        display: inline-block;
        width:2.1rem; height:2.1rem;
        vertical-align: middle;
        margin:0 .2rem;
        &.selected {
            background-color:$statusbar-selected;
        }
    }
    img {
        width:100%;
        height:100%;
    }
</style>