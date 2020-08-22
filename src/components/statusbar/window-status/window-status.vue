<template>
    <div>
        <window-icon v-for="(win, index) in allWindows" :key="win._uid" :iconPath="win.$props.iconPath" :targetApp="win"
        v-draggable="{
            index: index,
            collection: allWindows,
            data: win,
            gap: '.45rem',
            horizontal:false
        }"
        ></window-icon>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import WindowIcon from './window-icon.vue'
import { WindowEvents } from '@/system/window-manager'
import Draggable from '@/system/core/draggable'

export default Vue.extend({
    name: 'WindowStatus',
    components:{ WindowIcon },
    directives: { Draggable },
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