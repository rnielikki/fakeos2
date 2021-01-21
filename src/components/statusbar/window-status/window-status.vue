<template>
    <draggable-collection class="windows-collection" :collection="allWin64s" :horizontal="true" gap="0.9rem" collectionKeyName="_.uid">
        <template v-slot:default="model">
            <window-icon :targetApp="model.model" v-on:dragend="(e)=>model.dragend(e)" />
        </template>
    </draggable-collection>
</template>
<script lang="ts">
import { ComponentPublicInstance, defineComponent } from 'vue'
import Win64Icon from './window-icon.vue'
import { Win64Events } from '@/system/window-manager'
import DraggableCollection from '@/system/core/draggable/draggable-collection.vue'

export default defineComponent({
    name: 'Win64Status',
    components:{ "window-icon":Win64Icon, "draggable-collection":DraggableCollection },
    data:function(){
        return {
            allWin64s:new Array<ComponentPublicInstance>()
        }
    },
    created:function(){
        Win64Events.OnAdded.subscribe((win)=>{
            this.$data.allWin64s.push(win);
        });
        Win64Events.OnRemoved.subscribe((win)=>{
            let id = (win as any)._.uid
            Object.assign(this.$data, {"allWin64s": this.$data.allWin64s.filter((w:any)=>w._.uid !== id)})
        });
    }
})
</script>
<style scoped>
div {
    flex-grow:1;
    flex-shrink: 1;
}
</style>