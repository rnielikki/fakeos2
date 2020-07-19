<template>
    <div class="bluescreen">
        <h1>Error</h1>
        <p>{{ error }}</p>
        <p>You can start your computer</p>
        <p>{{ info }}</p>
        <p></p>
        <p class="small">press any key to continue...</p>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Desktop from './components/desktop.vue';

@Component({
    props:{
        error:String,
        info:String
    }
})
export default class BlueScreen extends Vue {}
</script>
<style scoped>
.bluescreen{
    background-color:steelblue;
    color:#fff;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size:125%;
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 9999;
}
.bluescreen .small{
    font-size:80%;
}
</style>