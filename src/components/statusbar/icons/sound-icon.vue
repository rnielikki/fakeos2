<template>
    <div>
        <span class="icon" v-if="volume==0">&#128263;</span>
        <span class="icon" v-else>&#128266;</span>
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
                volume:SoundManager.masterSound
            }
    },
    mounted:function(){
        new Popup(this.$el as HTMLElement, ()=>new SoundIconPopup(), "click", new PopupInfo({
            direction:popupDirection.topLeft,
            x:"100%"
        }));
        SoundManager.MasterChangeListener.Add((vol)=>this.$set(this.$data, "volume", vol));
    }
})
</script>
<style scoped>
    .icon{
        font-size:1.5rem;
    }
</style>