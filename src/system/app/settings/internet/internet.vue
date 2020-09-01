<template>
    <div class="root">
        <h1>Internet settings</h1>
        <p>You should be connected to internet to boot FakeOS.</p>
        <h3 ref="status"></h3>
        <ui-button text="Test internet Status" :clicked="this.checkInternet" />
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
            title:"Internet settings",
            status:""
        }
    },
    created:function(){
        this.setStatus();
        window.addEventListener("online", this.setStatus);
        window.addEventListener("offline", this.setStatus);
    },
    methods:{
        checkInternet:function(){
            let ifOnline = (navigator.onLine)?"online":"offline"
            WindowFactory.OpenDialog(this.$data.f_targetWindow, "Connection check", "Now you're "+ifOnline+".");
        },
        setStatus:function(){
            Vue.set(this.$data,"status",(navigator.onLine)?"Online":"Offline")
        }
    },
    beforeDestroy:function(){
        window.removeEventListener("online", this.setStatus);
        window.removeEventListener("offline", this.setStatus);
    },
    watch:{
        status:function(value){
            (this.$refs.status as HTMLElement).innerText = value;
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