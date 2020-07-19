<template>
    <div class="menu-anchor" :style="{ left: menuInfo.x + 'px', top:menuInfo.y + 'px' }" v-if="menuInfo.show">
        <div class="menu-wrapper" :style="this.directionStyle">
            <div v-for="(item, key) in value" :key="key" class="menu-item">
                {{ item.label }}
            </div>
        </div>
    </div>
</template>
<script lang="ts">
// eslint-disable-next-line no-unused-vars
import Vue, { PropType } from 'vue'
// eslint-disable-next-line no-unused-vars
import { IMenuComponent } from './models/menu-model'
// eslint-disable-next-line no-unused-vars
import MenuInfo, { MenuDirection } from './models/menu-info'
export default Vue.extend({
    name:'Menu',
    props:{
        value:{
            type:Array as PropType<IMenuComponent[]>,
            default: ()=>[]
        },
        menuInfo: {
            type:Object as PropType<MenuInfo>,
            default: ()=>{ return new MenuInfo()}
        }
    },
    created:function(){
            var menuInfo = this.$props.menuInfo;
            var directionStyle;
            switch(menuInfo.direction){
                case MenuDirection.topLeft:
                    directionStyle = { right: 0, bottom: 0 };
                    break;
                case MenuDirection.topRight:
                    directionStyle = { left: 0, bottom: 0 }
                    break;
                case MenuDirection.bottomLeft:
                    directionStyle = { right: 0, top: 0 }
                    break;
                case MenuDirection.bottomRight:
                    directionStyle = { left: 0, top: 0 }
                    break;
            }
            Object.assign(this, { directionStyle: directionStyle });
        }
})
</script>
<style lang="scss">
    @import 'src/scss/colorset.scss';
    .menu-wrapper{
        position: absolute;
        background-color:$menu-background;
        border:1px solid $menu-border;
        .menu-item {
            color:$menu-foreground;
            display:block;
            margin:0;
            padding: .6rem .8rem;
            white-space: nowrap;
        }
        .menu-item:hover{
                cursor:default;
        }
        .menu-item:not(.deactivated):hover {
                background-color: $selected-background;
                color: $selected-foreground;
            }
        .menu-item.deactivated {
                opacity:0.8;
        }
    }
    .menu-anchor{
        width: 0;
        height: 0;
        position: absolute;
        z-index:20;
        overflow: visible;
    }
</style>