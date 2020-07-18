<template>
    <input type="text" :placeholder=placeholder />
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'UiInput',
    props: {
        placeholder:String
    }
})
</script>