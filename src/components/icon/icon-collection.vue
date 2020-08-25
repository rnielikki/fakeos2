<template>
    <draggable-collection class="iconCollection" :style="gridFlow" :collection="icons" :horizontal="false">
             <template v-slot:default="model">
                 <icon :model="model.model"
                 v-on:dragend.native="model.dragend"
                 @selected="()=>select(model.model.id)"
                :isSelected ="selected===model.model.id"
                draggable="true" />
            </template>
    </draggable-collection>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import Icon from '@/components/icon/icon.vue'
import IconModel from './models/icon-model'
import { IconDirection } from './models/icon-collection-model'
import DraggableCollection from '@/system/core/draggable/draggable-collection.vue'
import DropTarget from '@/system/core/draggable/drop-target.vue'

export default Vue.extend({
    name:"IconCollection",
    components:{ Icon, DraggableCollection },
    data:function(){
        return {
            selected:-1
        }
    },
    props:{
        icons:{
            type:Array as PropType<IconModel[]>,
            default:()=>[]
        },
        direction:{
            type:Number as PropType<IconDirection>,
            default:()=>IconDirection.row
        },/*
        path:{
            type:String,
            required:true
        }*/
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