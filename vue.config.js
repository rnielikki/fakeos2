 
module.exports = {
  /*
  configureWebpack:{
    resolve:{
      alias:{
        vue$: "vue/dist/vue.esm-bundler.js"
      }
    }
  },*/
  runtimeCompiler:true,
    publicPath: process.env.NODE_ENV === 'production'
      ? '/fakeos2/'
      : '/'   
  }