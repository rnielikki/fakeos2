<template>
    <div class="dialog">
        <p>{{ message }}</p>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name:'DialogTemplate',
    props:{
        message:String
    }
})
</script>
<style scoped>
    .dialog {
        text-align: center;
    }
</style>