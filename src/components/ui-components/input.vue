<template>
    <input type="text" :placeholder=placeholder />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'UiInput',
    props: {
        placeholder:String
    }
})
</script>