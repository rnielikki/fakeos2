<template>
    <div class="item-wrapper">
        <div v-for="option in options" :key="option.value" @click="()=>select(option.value)" :class="['item', {'selected':option.value == currentValue }]">
            {{ option.name }}
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent,  PropType } from 'vue'

interface selectButtonModel {
    name:string;
    value:string;
}

export default defineComponent({
    data: function(){
        return { currentValue:"" }
    },
    props: {
        options:{
            type:Array as PropType<selectButtonModel[]>,
            required:true
        },
        defaultValue:{
            type:String,
            default:""
        }
    },
    created:function(){
        this.currentValue = this.defaultValue
    },
    methods:{
        select:function(value:string){
            this.currentValue = value;
            this.$emit('select-item', value)
        }
    }
})
</script>
<style lang="scss" scoped>
@import 'src/scss/colorset.scss';
.item-wrapper {
    display: inline-block;
    margin:.2rem .3rem;
    .item {
        padding:.4rem .6rem;
        border:1px solid $window-border;
        display: inline-block;
        &.selected {
            background-color:$selected-background;
            color:$selected-foreground;
        }
    }
}
</style>