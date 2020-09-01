<template>
    <div class="root">
        <h1>Internet settings</h1>
        <p>You should be connected to internet to boot FakeOS.</p>
        <ui-button text="Check Internet Status" :clicked="this.checkInternet" />
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import UiButton from '@/components/ui-components/button.vue'
import WindowFactory from '@/components/window/window-factory'

export default Vue.extend({
    components:{ UiButton },
    data:function(){
        return {
            title:"Internet settings"
        }
    },
    methods:{
        checkInternet:function(){
            let ifOnline = (navigator.onLine)?"online":"offline"
            WindowFactory.OpenDialog(this.$data.f_targetWindow, "Connection check", "Now you're "+ifOnline+".");
        }
    }
})
</script>
<style scoped>
.root {
    padding:2.7rem;
    text-align:center;
}
.auth{
    font-size:90%;
    opacity:0.9;
}
</style>