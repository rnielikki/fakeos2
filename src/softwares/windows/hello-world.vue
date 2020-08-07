<template>
    <div>
        <h1 @click="GetSomeMessage">Click to change the result!</h1>
        <h2> :P </h2>
        <p>{{ testText }}</p>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import WindowFactory from '../../components/window/window-factory'

export default Vue.extend({
    name:'HelloWorld',
    data:function(){
        return {
            title:"my title",
            testText:"---",
            f_targetWindow:null
        }
    },
    methods:{
        GetSomeMessage:function(){
            WindowFactory.OpenDialog(this.f_targetWindow, "untitled", "this is a message", (res) => console.log(res?.toString()))
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