<template>
    <div class="root">
        <h1>Internet settings</h1>
        <p>You should be connected to internet to boot FakeOS.</p>
        <h3 ref="status"></h3>
        <ui-button text="Test internet Status" :clicked="this.checkInternet" />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import UiButton from '@/components/ui-components/button.vue'
import Win64Factory from '@/components/window/window-factory'

export default defineComponent({
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
            Win64Factory.OpenDialog(this, "Connection check", "Now you're "+ifOnline+".");
        },
        setStatus:function(){
            Object.assign(this.$data,{"status":(navigator.onLine)?"Online":"Offline"})
        }
    },
    beforeUnmount:function(){
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