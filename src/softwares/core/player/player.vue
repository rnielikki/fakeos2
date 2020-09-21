<template>
    <div>
        Now this is playing! If you're using Internet Explorer, I'm (not) sorry.
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import { WindowOptions } from '@/components/window/components/window-options'
import Sound from '@/system/sound/sound'
import { FileInfo } from '@/system/filesystem/fileinfo'
import { checkType } from '@/system/filesystem/mime'
import AppValidator from '@/system/app/app-validator'

export default Vue.extend({
    name:"Player",
    mixins:[ AppValidator(checkType.ifSound) ],
    data:function(){
        return {
            title:"Player 1",
            soundRes:null,
            windowOptions:
                new WindowOptions({
                    defaultWidth:-1,
                    defaultHeight:-1,
                    minWidth:300,
                    minHeight:200,
                    resizable:false
                })
        }
    },
    mounted:function() {
        let realName = Object(this.$props.sender?.data)?.name;
        if(!realName) return;
        this.$data.soundRes = new Sound(realName)
    },
    beforeDestroy:function(){
        this.$data.soundRes?.stop()
    }
})
</script>
<style scoped>
    audio {
        width:100%;
    }
</style>