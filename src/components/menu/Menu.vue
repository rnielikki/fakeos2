<template>
    <div class="menu-anchor" :style="{ left: popupInfo.x, top:popupInfo.y }">
        <div class="menu-wrapper" :style="this.directionStyle">
            <Menu-label v-for="(item, key) in value" :key="key" :item="item" :onDeleted="onDeleted">
                <Menu v-if="HasSubMenu(item)" :value="item.submenu" :popupInfo="defaultInfo" :onDeleted="onDeleted" />
            </Menu-label>
        </div>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import { IMenuComponent, MenuItem, ParentMenuItem } from './models/menu-model'
import PopupInfo, { PopupDirection } from '../popups/popup-info'
import { defaultSubmenuInfo } from './models/menu-info'
import MenuLabel from './menu-label.vue'

export default Vue.extend({
    name:'Menu',
    components:{ MenuLabel },
    data:function(){
        return {
            defaultInfo: defaultSubmenuInfo
            };
    },
    props:{
        value:{
            type:Array as PropType<IMenuComponent[]>,
            default: ()=>[]
        },
        popupInfo: {
            type:Object as PropType<PopupInfo>
        },
        onDeleted:Function
    },
    computed:{
        directionStyle:function(){
            return this.$props.popupInfo.direction;
        }
    },
    methods:{
        HasSubMenu:(item:IMenuComponent)=>Object.prototype.hasOwnProperty.call(item, "submenu"),
        IsActivated:function(item:IMenuComponent){
            if(Object.prototype.hasOwnProperty.call(item, "action")){
                return true;
            }
            else return false;
        },
    }
})
</script>
<style lang="scss">
    @import 'src/scss/colorset.scss';
    .menu-anchor{
        width: 0;
        height: 0;
        position: absolute;
        z-index:20;
        overflow: visible;
    }
    .menu-wrapper{
        position: absolute;
        background-color:$menu-background;
        border:1px solid $menu-border;
    }
</style>