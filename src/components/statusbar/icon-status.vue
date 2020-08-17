<template>
    <div><sound-icon /></div>
</template>
<script lang="ts">
import Vue from 'vue'
import SoundIcon from './icons/sound-icon.vue'
export default Vue.extend({
    name:'IconStatus',
    components:{ SoundIcon }
})
</script>
<style scoped>
    div {
        padding:0 .6rem;
    }
</style>