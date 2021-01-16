<template>
    <div class="bsod">
        <div class="bsod-content">
        <h1 class="bsod-head">:(</h1>
        <p>Your PC ran into the hell that it couldn't be rescued, and now it needs YOU. <span title="We respect GDPR :)">We're just collecting your personal data</span>, and then we'll restart you.</p>
        <p>NaN% complete</p>
        <p class="small">For more information about this, it's {{ error }}</p>
        <p class="small">Error code:  {{ info }}</p>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Desktop from './components/desktop.vue';

export default defineComponent({
    name:'BlueScreen',
    props:{
        error:String,
        info:String
    }
});
</script>
<style lang="scss" scoped>
.bsod{
    background-color:royalblue;
    color:#fff;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: left;
    font-size:125%;
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 9999;
    padding:15%;
    &-head{
        font-size: 15rem;
        margin: .5rem;
        font-weight: normal;
        font-family: serif;
    }
    &-content{
        font-size: 2rem;
    }
}
.bsod .small{
    font-size:70%;
}
</style>