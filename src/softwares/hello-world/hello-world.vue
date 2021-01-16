<template>
    <div class="root">
        <h1>Welcome to the FakeOS 2 Pre 1!</h1>
        <div class="content">
            <p>FakeOS 2 is very weird Vue-kernel-based Operating System!</p>
            <p>This version is not stable, so you may not like it...</p>
            <p>But anyway, enjoy!</p>
            <p>Oh, you can contribute, too! See more on help settings! :)</p>
            <br><br>
            <p>Sincerely,</p>
            <p>Mielikki (@rnielikki on GitHub)</p>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Win64Factory from '../../components/window/window-factory'
import AppMenu from './menu'

export default defineComponent({
    name:'HelloWorld',
    data:function(){
        return {
            f_targetWindow:null,
            title: "hello world?",
            menu:AppMenu(this),
            testText:"nothing---"
        }
    }
})
</script>
<style scoped>
.root {
    margin:1.5rem 2.7rem;
    text-align:center;
}
h1 {
    font-weight: normal;
    font-family: 'Segoe UI';
}
.content{
    font-size:1.27rem;
}
</style>