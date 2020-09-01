<template>
    <div class="f_status-icon-collection">
        <sound-icon />
        <internet-icon />
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import SoundIcon from './icons/sound/sound-icon.vue'
import InternetIcon from './icons/internet/internet.vue'
export default Vue.extend({
    name:'IconStatus',
    components:{ SoundIcon, InternetIcon }
})
</script>
<style scoped>
    div {
        padding:0 .6rem;
        display: inline-block;
    }
</style>
<style>
.f_status-icon-collection > div {
    position: relative;
}
.f_status-icon-collection img{
    width:2.1rem;
}
</style>