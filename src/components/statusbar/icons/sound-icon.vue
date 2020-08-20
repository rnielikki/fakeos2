<template>
    <div class="sound-icon">
        <img  class="icon" :src=soundIcon />
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import SoundIconPopup from './sound-icon-popup.vue'
import SoundManager from '@/system/sound/sound-manager'
import Popup from '../../popups/popup'
import PopupInfo, { popupDirection } from '../../popups/popup-info'

export default Vue.extend({
    name:'SoundIcon',
    data:function(){
        return {
                volume:0,
                icons:[
                    "", //sound0
                    "", //sound1
                    "", //sound2
                    ""  //sound3
                ],
                soundIcon:"./images/sound1.png"
            }
    },
    created:function(){
        this.$data.volume = this.getSoundScale(SoundManager.masterSound);
    },
    mounted:function(){
        new Popup(this.$el as HTMLElement, ()=>new SoundIconPopup(), "click", new PopupInfo({
            direction:popupDirection.topLeft,
            x:"100%"
        }));
        SoundManager.MasterChangeListener.Add((vol)=>this.$set(this.$data, "volume", this.getSoundScale(vol)));
    },
    methods:{
        getSoundScale:function(volume:number){
            return Math.ceil(volume*2.1);
        },
        getSoundIcon:function(scale:number){
            if(!this.$data.icons[scale]) {
                this.$data.icons[scale] = require(`./images/sound${this.$data.volume}.png`);
            }
            return this.$data.icons[scale];
        }
    },
    watch:{
        volume:function(value) {
            if(!this.$data.icons[this.$data.volume]) {
                this.$data.icons[this.$data.volume] = require(`./images/sound${this.$data.volume}.png`);
            }
            this.$set(this.$data, "soundIcon",this.getSoundIcon(this.$data.volume));
        },
    }
})
</script>
<style scoped>
    .sound-icon {
        position: relative;
    }
    .icon{
        width:2.1rem;
    }
</style>