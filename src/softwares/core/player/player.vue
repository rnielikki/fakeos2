<template>
    <div>
        <div @click="open" class="open-button">Open</div>
        <div>
            <div class="sound-controller" @click="play">Play</div>
            <div class="sound-controller" @click="pause">Pause</div>
            <div class="sound-controller" @click="stop">Stop</div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import { WindowOptions } from '@/components/window/components/window-options'
import Sound from '@/system/sound/sound'
import { FileInfo } from '@/system/filesystem/fileinfo'
import { checkType } from '@/system/filesystem/mime'
import AppValidator from '@/system/app/app-validator'
import explorerModal from '@/softwares/core/explorer/explorer-modal'
import GlobalPath from '@/system/filesystem/globalPath';

export default Vue.extend({
    name:"Player",
    mixins:[ AppValidator(checkType.ifSound) ],
    data:function(){
        return {
            title:`Player: (${this.$props.sender?.name ?? ""})`,
            soundRes:null,
            f_file:this.$props.sender,
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
        let sender = this.$props.sender;
        if(sender) {
            this.startPlaying(this.$props.sender);  
         }
    },
    methods:{
        open:function(){
            explorerModal.open(this, this.$data.f_file ?? GlobalPath.Music, (file:FileInfo)=>{
                this.$data.f_file = file;
                this.$data.f_targetWindow.f_title = `Player: (${file?.name ?? ""})`
            }, checkType.ifSound)
        },
        startPlaying:function(music:FileInfo){
            let realName = Object(music.data)?.name;
            if(!realName) return;
            this.$data.soundRes = new Sound(realName)
        },
        play:function(){
            this.$data.soundRes?.play()
        },
        pause:function(){
            this.$data.soundRes?.pause()
        },
        stop:function(){
            this.$data.soundRes?.stop(false)
        }
    },
    watch:{
        f_file:function(value){
            if(this.$data.soundRes){
                this.$data.soundRes.stop();
            }
            this.startPlaying(value);
        }
    },
    beforeDestroy:function(){
        if(this.$data.soundRes){
            this.$data.soundRes.stop()
        }
    }
})
</script>
<style lang="scss" scoped>
    @import 'src/scss/colorset.scss';
    .open-button {
        border:1px solid $window-border;
        padding:.4rem .6rem;
        display:inline-block;
        &:hover {
            background-color:$content-foreground;
            color:$content-background;
        }
    }
    .sound-controller{
        border:1px solid $window-border;
        padding:.3rem .4rem;
        display:inline-block;
    }
</style>