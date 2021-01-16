<template>
  <div id="app">
      <Desktop />
      <blue-screen v-if="error" :info="info" :error="errorInfo" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Desktop from './components/desktop.vue';
import BlueScreen from './components/bluescreen.vue'
import FileSystem from '@/system/filesystem/filesystem'

export default defineComponent({
  name:'App',
  components: {
    Desktop, BlueScreen
  },
  data(){
    return {
      error: false
    }
  },
  errorCaptured(err, vm, info){
    this.$data.error = true;
    Object.assign(this.$data,{
      info: info,
      errorInfo: err
    });
  }
})
</script>

<style lang="scss">
html, body, #app {
  height:100%;
  overflow:hidden;
  margin:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
