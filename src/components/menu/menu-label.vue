<template>
    <div :class="{ 'menu-parent': HasSubMenu, 'deactivated':!HasSubMenu && !IsActivated, 'activated':IsActivated }" ref="label" class="menu-item" v-on:mousedown.stop>
        {{item.label}}
        <slot></slot>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import { IMenuComponent, MenuItem, ParentMenuItem } from './models/menu-model'
export default Vue.extend({
    name:'MenuLabel',
    data:()=>{
        return {
            HasSubMenu: false,
            IsActivated: false
        }
    },
    props:{
        item:Object as PropType<IMenuComponent>,
    },
    mounted:function(){
        var checkActivated = (item:IMenuComponent)=>{
            if(Object.prototype.hasOwnProperty.call(item, "action")){
                this.$el.addEventListener("click", (item as MenuItem).action);
                return true;
            }
            else return false;
        }

        this.HasSubMenu = Object.prototype.hasOwnProperty.call(this.item, "submenu"),
        this.IsActivated = checkActivated(this.item);
    }
})
</script>
<style lang="scss">
@import 'src/scss/colorset.scss';
    .menu-item {
        color:$menu-foreground;
        display:block;
        margin:0;
        padding: .6rem .8rem;
        white-space: nowrap;
        position:relative;
        text-align: left;
    }
    .menu-item:hover{
            cursor:default;
    }
    .menu-item:not(.deactivated):hover {
            background-color: $selected-background;
            color: $selected-foreground;
        }
    .menu-item.deactivated {
        opacity:0.7;
        text-shadow: 1px 1px white;
    }
    .menu-parent{
        &::after{
            content:'\25BA';
            float:right;
            font-size:80%;
        }
        > .menu-anchor{
            display:none
        }
        &:hover > .menu-anchor {
            display: block;
        }
    }
</style>