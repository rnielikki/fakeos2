<template>
  <div id="app">
      <Desktop />
      <blue-screen v-if="error" :info="info" :error="errorInfo" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Desktop from './components/desktop.vue';
import BlueScreen from './components/bluescreen.vue'
import FileSystem from '@/system/filesystem/filesystem'

@Component({
  components: {
    Desktop, BlueScreen
  },
  errorCaptured(err, vm, info){
    this.$data.info = info;
    this.$data.errorInfo = err;
    this.$data.error = true;
  },
  data(){
    return {
      error: false,
      errorInfo: undefined,
      info: undefined
    }
  },
  mounted:function(){ console.log(FileSystem) }
})
export default class App extends Vue {}
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
