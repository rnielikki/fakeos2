<template>
    <div :class="['f_menu-item', { 'f_menu-parent': HasSubMenu, 'deactivated':!HasSubMenu && !IsActivated, 'activated':IsActivated }]" ref="label" v-on:mousedown.stop>
        <span class="f_menu-item-label">{{item.label}}</span>
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
        onDeleted:Function
    },
    mounted:function(){
        var checkActivated = (item:IMenuComponent)=>{
            if(Object.prototype.hasOwnProperty.call(item, "action")){
                this.$el.addEventListener("click", (e)=>{ (item as MenuItem).action(); this.onDeleted(); e.stopPropagation() });
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
    .f_menu-item {
        color:$menu-foreground;
        display:block;
        margin:0;
        padding: .6rem .8rem;
        white-space: nowrap;
        position:relative;
        text-align: left;
        &:hover{
            cursor:default;
        }
        &:not(.deactivated):hover {
            background-color: $selected-background;
            color: $selected-foreground;
        }
        &.deactivated {
        opacity:0.7;
        text-shadow: 1px 1px white;
        }
        &-label {
            display: inline-block;
            width:100%;
        }
    }
    .f_menu-parent{
        &::after{
            content:'\25BA';
            font-size:80%;
            margin-left:-0.4rem;
        }
        > .f_popup-anchor{
            display:none
        }
        &:hover > .f_popup-anchor {
            display: block;
        }
        .f_menu-item-label {
            padding-right:1.1rem;
            box-sizing: border-box;
        }
    }
</style>