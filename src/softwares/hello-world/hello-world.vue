<template>
    <div>
        <h1 @click="GetSomeMessage">Click to change the result!</h1>
        <h2> {{ testText }}</h2>
        <h2 ref="asdf"></h2>
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
            f_targetWindow:null,
            resultText:""
        }
    },
    props:{
        testText:{
            type:String,
            default:":P"
        }
    },
    methods:{
        GetSomeMessage:function(){
            WindowFactory.OpenDialog(this.f_targetWindow, "untitled", "this is a message", (res:any) =>{
                Vue.set(this.$props, "testText", res?.toString());  
            })
        }
    },
    watch:{
        testText:function(val){
            (this.$refs.asdf as HTMLElement).innerText = val; //this works but testText never updated
            //this.$forceUpdate() //doesn't work.
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