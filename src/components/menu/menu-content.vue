<template>
    <div class="menu-wrapper">
        <div v-for="(item, key) in value" :key="key" class="menu-item">
            {{ item.label }}
        </div>
    </div>
</template>
<script lang="ts">
// eslint-disable-next-line no-unused-vars
import Vue, { PropType } from 'vue'
// eslint-disable-next-line no-unused-vars
import { IMenuComponent } from './models/menu-model'
// eslint-disable-next-line no-unused-vars
import Position from './models/position'
export default Vue.extend({
    props:{
        value:{
            type:Array as PropType<IMenuComponent[]>,
            default: ()=>[]
        },
        position: {
            type:Object as PropType<Position>,
            default: ()=>{ return { x:0, y:0 }}
        }
    },
    watch:{
        position: function(/*newValue*/)
        {
            console.log(this);
            /*
            this.elm.style.left = newValue.x;
            this.elm.style.top = newValue.y;
            */
        }
    }
})
</script>
<style lang="scss">
    @import 'src/scss/colorset.scss';
    .menu-wrapper{
        position: absolute;
        z-index:20;
        background-color:$menu-background;
        border:1px solid $menu-border;
        .menu-item {
            color:$menu-foreground;
            display:block;
            margin:0;
            padding: .6rem .8rem;
        }
        .menu-item:not(.deactivated):hover {
            background-color: $selected-background;
            color: $selected-foreground;
        }
        .menu-item .deactivated {
            opacity:0.8;
        }
    }
</style>