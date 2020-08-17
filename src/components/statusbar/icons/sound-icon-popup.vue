<template>
    <div>
        <div class="f_sound-content" @mousedown.stop>
            <input type="range" min="0" max="1" step="0.1" :value="masterSound" @change="changed" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SoundManager from '@/system/sound/sound-manager'
import soundManager from '@/system/sound/sound-manager'

export default Vue.extend({
    name:'SoundIconPopup',
    methods:{
        changed:function(e:Event) {
            let _vol = (e?.target as any)?.value
            SoundManager.masterSound = _vol;
        }
    },
    computed:{
        masterSound:function(){
            return SoundManager.masterSound
        }
    }
})
</script>

<style lang="scss" scoped>
    @import 'src/scss/colorset.scss';
    .f_sound-content{
        background-color:$statusbar-background;
        border:1px solid $window-border;
        color:$statusbar-foreground;
        padding:.4rem .6rem;
    }
</style>