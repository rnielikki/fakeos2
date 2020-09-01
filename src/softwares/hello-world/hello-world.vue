<template>
    <div>
        <h1 @click="GetSomeMessage">Click to change the result!</h1>
        <h2 ref="wtf">{{ testText }}</h2>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import WindowFactory from '../../components/window/window-factory'
import AppMenu from './menu'

export default Vue.extend({
    name:'HelloWorld',
    data:function(){
        return {
            f_targetWindow:null,
            title: "hello world?",
            menu:AppMenu(this),
            testText:"nothing---"
        }
    },
    methods:{
        GetSomeMessage:function(){
            WindowFactory.OpenDialog(this.f_targetWindow, "animal question?", "Which type are you?", [
                {
                    text:"Moo",
                    value:"Cow"
                },
                {
                    text:"Meow",
                    value:"Cat"
                },
                {
                    text:"Hau",
                    value:"Dog"
                },
                {
                    text:"Quack",
                    value:"Duck"
                }
            ], this.setText)
        },
        setText:function(result:string){
            (this.$refs.wtf as HTMLElement).innerText = result
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