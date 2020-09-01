<template>
        <div
            :class="[{selected: this.targetApp.$data.selected }, 'f_status-window-icon']"
            v-contextMenu="{
                value: targetApp.rightClickMenu,
                menuInfo: menuInfo
            }"
            :style="{ backgroundImage: 'url('+targetApp.$props.iconPath+')' }"
            @click="selectOrMinimize"
            :data-window-id="this.targetApp._uid"
            @dragover.prevent>
        </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Window from '@/components/window/components/window.vue'
import WindowManager from '@/system/window-manager'

//import { IMenuComponent } from '@/components/menu/models/menu-model'
import ContextMenu from '../../menu/contextmenu'
import PopupInfo, { popupDirection } from '../../popups/popup-info'

export default Vue.extend({
    props:{
        targetApp:Window
    },
    directives:{ contextMenu:ContextMenu },
    computed:{
        menuInfo:function(){
            return new PopupInfo({ direction: popupDirection.topRight })
        }
    },
    mounted:function(){
        this.$el.addEventListener("mousedown,",e=>e.stopPropagation(),false)
    },
    methods:{
        selectOrMinimize:function(){
            let app = this.$props.targetApp;
            if(WindowManager.isSelected(app) || app.minimized) {
                this.$props.targetApp.minimize();
            }
            else {
                WindowManager.select(app)
            }
        }
    }
})
</script>
<style lang="scss" scoped>
@import 'src/scss/colorset.scss';
    .f_status-window-icon{
        display: inline-block;
        width:2.1rem; height:2.1rem;
        vertical-align: middle;
        margin:0;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        border:1px solid $statusbar-selected;
        position: relative;
        &.selected {
            background-color:$statusbar-selected;
        }
    }
</style>