<template>
    <div class="f_menu">
        <Menu-label v-for="(item, key) in value" :key="key" :item="item" :onDeleted="onDeleted">
            <Popup class="f_menu" :popupInfo="submenuInfo" v-if="HasSubMenu(item)">
                <Menu :value="item.submenu" :onDeleted="onDeleted" />
            </Popup>
        </Menu-label>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import { IMenuComponent, MenuItem, ParentMenuItem } from './models/menu-model'
import Popup from '../popups/popup.vue'
import { createDefaultSubmenuInfo } from './models/menu-info'
import MenuLabel from './menu-label.vue'

export default Vue.extend({
    name:'Menu',
    components:{ MenuLabel, Popup },
    data:function(){
        return {
            submenuInfo: createDefaultSubmenuInfo()
        };
    },
    props:{
        value:{
            type:Array as PropType<IMenuComponent[]>,
            default: ()=>[]
        },
        onDeleted:Function
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
    .f_menu{
        background-color:$menu-background;
        border:1px solid $menu-border;
    }
</style>