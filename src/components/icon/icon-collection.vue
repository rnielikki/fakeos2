<template>
    <div class="iconCollection" :style="gridFlow">
        <icon v-for="(value, index) in icons" :key="value.id" :model="value"
        @selected="()=>select(value.id)"
        :isSelected ="selected===value.id"
        v-draggable="{
            index: index,
            collection: icons,
            data: value,
            horizontal:true
        }" />
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import Icon from '@/components/icon/icon.vue'
import IconModel from './models/icon-model'
import { IconDirection } from './models/icon-collection-model'
import Draggable from '@/system/core/draggable'

export default Vue.extend({
    name:"IconCollection",
    components:{ Icon },
    data:function(){
        return {
            selected:-1
        }
    },
    directives: { Draggable },
    props:{
        icons:{
            type:Array as PropType<IconModel[]>,
            default:()=>[]
        },
        direction:{
            type:Number as PropType<IconDirection>,
            default:()=>IconDirection.row
        }
    },
    computed:{
        gridFlow:function(){
            if(this.direction == IconDirection.row){
                return { flexDirection: "row" }
            }
            else{
                return { flexDirection: "column" }
            }
        }
    },
    mounted:function(){
        document.addEventListener("mousedown", this.deselect, true)
    },
    methods: {
        select:function(id:number) {
            this.selected = id
        },
        deselect:function(){
            this.select(-1);
        }
    }
})
</script>
<style lang="scss" scoped>
@import 'src/scss/colorset.scss';
/* flexbox for line change */
    .iconCollection {
        display:flex;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap:wrap;
        width:100%;
        height:100%;
        overflow:auto;
    }
</style>