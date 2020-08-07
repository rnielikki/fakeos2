import Vue from 'vue'
import MainWindowMixin from './main-window-mixin'

export default {
    CreateWindowMixin:function(){
        return MainWindowMixin
    },
    CreateModalMixin:function(callback:(result:any)=>void){
        return Vue.extend({
            beforeDestroy:function(){
                this.$props.parentVue.hasModal = false;
                callback(this.$data.result);
            }
        });
    }
}