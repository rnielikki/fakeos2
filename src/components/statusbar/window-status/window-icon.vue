<template>
        <div
            :class="[{selected: this.targetApp.$data.selected }, 'f_status-window-icon']"
            v-contextMenu="{
                value: targetApp.rightClickMenu,
                menuInfo: menuInfo
            }"
            :style="{ backgroundImage: 'url('+targetApp.$props.iconPath+')' }"
            @click="selectOrMinimize"
            @dragend="$emit('dragend')"
            :data-window-id="this.targetApp._.uid"
            @dragover.prevent>
        </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Win64 from '@/components/window/components/win64.vue'
import WindowManager from '@/system/window-manager'

//import { IMenuComponent } from '@/components/menu/models/menu-model'
import ContextMenu from '../../menu/contextmenu'
import PopupInfo, { popupDirection } from '../../popups/popup-info'
import { PropType, ComponentPublicInstance } from 'vue'

export default defineComponent({
    props:{
        targetApp:{
            type:Object as PropType<ComponentPublicInstance>,
            required:true
        }
    },
    directives:{ contextMenu:ContextMenu },
    computed:{
        menuInfo:function(){
            return new PopupInfo({ direction: popupDirection.topRight })
        }
    },
    mounted:function(){
        this.$el.addEventListener("mousedown,",(e:Event)=>e.stopPropagation(),false)
    },
    methods:{
        selectOrMinimize:function(){
            let app = this.$props.targetApp;
            //@ts-ignore
            if(WindowManager.isSelected(app) || app.minimized) {
                //@ts-ignore
                app.minimize();
            }
            else {
                //@ts-ignore
                WindowManager.select(app)
            }
        }
    },
    emits:['dragend']
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