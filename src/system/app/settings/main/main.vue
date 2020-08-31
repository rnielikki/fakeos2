<template>
    <div>
        <h1>Settings</h1>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name:'Settings',
    data:function(){
        return {
            title: "Settings",
        }
    }
})
</script>
<style scoped>
h1 {
    font-weight: normal;
    font-family: 'Segoe UI';
    text-align: center;
}
</style>