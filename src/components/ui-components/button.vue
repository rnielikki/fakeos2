<template>
    <div v-on:click="clicked">{{ text }}</div>
</template>
<script lang="ts">
//provides basic button with default theme.
import Vue from 'vue'
export default Vue.extend({
    name: 'UiButton',
    props:{
        text: String,
        clicked: {
            type: Function,
            default: () => null
        }
    }
})
</script>
<style lang="scss" scoped>
    @import 'src/scss/colorset.scss';
    div {
        background-color: $window-button-background;
        color: $window-button-foreground;
        border:1px solid $window-button-border;
        padding: .48rem .64rem;
        display:inline-block;
        text-align: center;
    }
</style>