<template>
    <div>
        <window-icon v-for="(window, key) in allWindows" :key="key" :iconPath="window.$props.iconPath" :targetApp="window"></window-icon>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import WindowIcon from './window-icon.vue'
import { WindowEvents } from '@/system/window-manager'

export default Vue.extend({
    name: 'WindowStatus',
    components:{ WindowIcon },
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