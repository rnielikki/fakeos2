<template>
    <div>
        Now this is playing! If you're using Internet Explorer, I'm (not) sorry.
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { WindowOptions } from '@/components/window/components/window-options'
import Sound from '@/system/sound/sound'

export default Vue.extend({
    name:"Player",
    data:function(){
        return {
            title:"Player 1",
            soundRes:null
        }
    },
    props:{
        windowOptions:{
            type:WindowOptions,
            default:()=>new WindowOptions({
                defaultHeight:-1,
                resizable:false
            })
        }
    },
    mounted:function() {
        this.$data.soundRes = new Sound(require("@/assets/musics/sample.mp3"))
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