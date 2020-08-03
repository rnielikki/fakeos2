<template>
    <div class="menu-anchor" :style="{ left: menuInfo.x, top:menuInfo.y }">
        <div class="menu-wrapper" :style="this.directionStyle">
            <Menu-label v-for="(item, key) in value" :key="key" :item="item">
                <Menu v-if="HasSubMenu(item)" :value="item.submenu" :menuInfo="defaultInfo" />
            </Menu-label>
        </div>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import { IMenuComponent, MenuItem, ParentMenuItem } from './models/menu-model'
import MenuInfo, { MenuDirection, defaultSubmenuInfo } from './models/menu-info'
import MenuLabel from './menu-label.vue'

//import MenuWrapper from './menu-wrapper.vue'
export default Vue.extend({
    name:'Menu',
    components:{ MenuLabel },
    data:function(){
        return { defaultInfo: defaultSubmenuInfo };
    },
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
    },/*
    mounted:function(){
        var content = this.$refs.container as HTMLElement;
        for(let item of this.value){
            content.appendChild(this.SetMenuItem(item));
        }
    },*/
    methods:{
        HasSubMenu:(item:IMenuComponent)=>Object.prototype.hasOwnProperty.call(item, "submenu"),
        IsActivated:function(item:IMenuComponent){
            if(Object.prototype.hasOwnProperty.call(item, "action")){
                console.log(this.$refs)
                //element.addEventListener("mousedown", (item as MenuItem).action);
                return true;
            }
            else return false;
        },
        /*
        SetMenuItem: function(item:IMenuComponent) {
            var label = document.createElement("div");
                label.classList.add("menu-item");
                label.innerText = item.label;
            if(Object.prototype.hasOwnProperty.call(item, "submenu")){
                var wrapper = new Menu({
                    propsData:{
                        value: (item as ParentMenuItem).submenu,
                        menuInfo:new MenuInfo({ direction: MenuDirection.bottomRight, x:"100%" })
                    }
                });
                wrapper.$mount();
                label.appendChild(wrapper.$el)
                label.classList.add("menu-parent")
                return label;
            }
            else {
                if(Object.prototype.hasOwnProperty.call(item, "action")){
                    label.addEventListener("mousedown", (item as MenuItem).action);
                }
                else{
                    label.classList.add("deactivated");
                }
                return label;
            }
            //return item.label;
        }*/
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