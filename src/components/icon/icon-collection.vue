<template>
    <div class="iconCollection" :style="gridFlow">
        <icon v-for="value in icons" :key="value.id" :model="value" @dragover="changeOrder" />
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import Icon from '@/components/icon/icon.vue'
import IconModel from './models/icon-model'
import { IconDirection } from './models/icon-collection-model'

export default Vue.extend({
    name:"IconCollection",
    components:{ Icon },
    data:function(){
        return {
            selected:null
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
    methods:{
        changeOrder:function(sender:Vue, target:Vue){
            //@ts-ignore
            let senderModel = sender.$props.model;
            let targetModel = target.$props.model;
            let senderIndex = this.icons.findIndex(icon=>icon.id === senderModel.id);
            let targetIndex = this.icons.findIndex(icon=>icon.id === targetModel.id)
            this.$set(this.$props.icons, senderIndex, targetModel);
            this.$set(this.$props.icons, targetIndex, senderModel);
        }
    }
})
</script>
<style scoped>
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