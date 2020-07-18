<template>
    <div class="statusbar"><ui-button text = "Start" /><window-status /><clock-date /></div>
</template>
<script lang="ts">
import Vue from 'vue'
import UiButton from '../ui-components/button.vue'
import ClockDate from './ClockDate.vue'
import WindowStatus from './WindowStatus.vue'
export default Vue.extend({
    name:'StatusBar',
    components: { UiButton, WindowStatus, ClockDate }
})
</script>
<style lang="scss" scoped>
    @import 'src/scss/colorset.scss';
    .statusbar {
        position:absolute;
        display: flex;
        align-items: center;
        padding:.2rem;
        left:0;
        right:0;
        bottom:0;
        background-color: $window-background;
        text-align: left;
    }
</style>