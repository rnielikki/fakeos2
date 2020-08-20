<template>
    <desktop-icon label = "test" appName="hello-world" />
</template>
<script lang="ts">
import Vue from 'vue'
import DesktopIcon from '@/components/desktop-icon/desktop-icon.vue'

export default Vue.extend({
    name:"IconCollection",
    components:{ DesktopIcon }
})
</script>