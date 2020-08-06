<template>
    <div>
        <h1>Hello world! this is main content.</h1>
        <p> :P </p>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name:'HelloWorld',
    data:function(){
        return {
            title:"my title"
        }
    }
})
</script>
<style scoped>
h1 {
    font-weight: normal;
    font-family: 'Segoe UI';
}
</style>