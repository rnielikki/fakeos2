<template>
    <div class="root">
        <img :src="icon">
        <h1>{{ userName }}</h1>
        <p class="auth">Just a normal user, not admin</p>
        <h3>Other users...</h3>
        <p><span style="font-weight:bold">Mielikki</span>: <span class="auth">Administrator</span></p>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SystemName from '@/system/system-name'

export default defineComponent({
    data:function(){
        return {
            title:"User Info"
        }
    },
    computed:{
        userName:function(){
            return SystemName.user;
        },
        icon:function(){
            return require("./icon.svg");
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