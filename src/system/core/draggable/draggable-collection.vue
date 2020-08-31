<template>
    <div style="position:relative;z-index:0;align-items:stretch" @dragover.prevent @drop="(e)=>drop(e, collection.length-1)">
        <div v-for="(item, index) in collection" :key="item[collectionKeyName]" :style="computedCss">
            <drop-target :horizontal="horizontal" :gap="gap" v-on:drop.native="(e)=>{ drop(e, index); }" :size="size" />
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
        collectionKeyName:{
            type:String,
            required:true
        },
        horizontal: {
            type:Boolean,
            default:true
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
                if(collection === dropInfo?.collection) {
                    let movingItem = collection.splice(itemIndex, 1)[0];
                    dropInfo.collection.splice(dropInfo.targetIndex, 0, item);
                }
                dropInfo = { ...EmptyDropInfo };
            }
        },
        drop:function(e:Event, index:number) {
            dropInfo = {
                targetIndex:index,
                collection:this.collection,
                item: this.collection[index] as object
            }
            e.stopPropagation();
        }
    },
    computed:{
        computedCss:function(){
            if(this.horizontal){
                return { display: "inline-block" }
            }
            else{
                return {}
            }
        }
    }
})
</script>