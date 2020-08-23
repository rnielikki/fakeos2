<template>
    <div style="position:relative;">
        <div class="draggable-background" @dragover.prevent @drop="()=>drop(collection.length-1)"></div>
        <div v-for="(item, index) in collection" :key="index" :style="computedCss">
            <drop-target :horizontal="horizontal" :gap="gap" v-on:drop.native="()=>drop(index)" :size="size" />
            <slot v-bind:model="item" v-bind:dragend="(e)=>endDrag(e, item, collection)"></slot>
        </div>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import DropTarget from './drop-target.vue'

//DropInfo should be global for communication between elements (e.g. icon move from folder window to background)
//Don't move it to data
const EmptyDropInfo = { targetIndex: -1, collection:[] as Array<unknown>, item:{} as object }
let dropInfo = { ...EmptyDropInfo }

export default Vue.extend({
    name:"DraggableCollection",
    components: { DropTarget },
    props:{
        collection:{
            type:Array as PropType<unknown[]>,
            default:()=>[]
        },
        horizontal: {
            type:Boolean,
            default:false
        },
        gap: {
            type:String,
            default:"1.5rem"
        },
        size: {
            type:String,
            default:"100%"
        }
    },
    methods:{
        endDrag:function(e:Event, item:object, collection:object[]){
            e.preventDefault();
            if(dropInfo.targetIndex > -1){
                let itemIndex = collection.indexOf(item);
                if(itemIndex == -1) return;
                if(Object.prototype.isPrototypeOf.call(Object.getPrototypeOf(item), dropInfo?.item)) {
                    let movingItem = collection.splice(itemIndex, 1)[0];
                    dropInfo.collection.splice(dropInfo.targetIndex, 0, item);
                }
                dropInfo = { ...EmptyDropInfo };
            }
        },
        drop:function(index:number) {
            dropInfo = {
                targetIndex:index,
                collection:this.collection,
                item: this.collection[index] as object
            }
        }
    },
    computed:{
        computedCss:function(){
            if(this.horizontal){
                return { display: "inline-block" }
            }
            else{
                return { }
            }
        }
    }
})
</script>
<style scoped>
.draggable-background {
    position:absolute;
    top:0;left:0;right:0;bottom:0;
}
</style>