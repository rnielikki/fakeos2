<template>
    <draggable-collection class="iconCollection" :collection="allWindows" :horizontal="true" size="2.1rem" gap="0.9rem" collectionKeyName="_uid">
        <template v-slot:default="model">
            <window-icon :targetApp="model.model" v-on:dragend.native="model.dragend" />
        </template>
    </draggable-collection>
</template>
<script lang="ts">
import Vue from 'vue'
import WindowIcon from './window-icon.vue'
import { WindowEvents } from '@/system/window-manager'
import DraggableCollection from '@/system/core/draggable/draggable-collection.vue'

export default Vue.extend({
    name: 'WindowStatus',
    components:{ WindowIcon, DraggableCollection },
    data:function(){
        return {
            allWindows:new Array<Window>()
        }
    },
    created:function(){
        WindowEvents.OnAdded.subscribe((win)=>{
            this.$data.allWindows.push(win);
        });
        WindowEvents.OnRemoved.subscribe((win)=>{
            let id = (win as any)._uid
            this.$set(this.$data, "allWindows", this.$data.allWindows.filter((w:any)=>w._uid !== id))
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