import Vue from 'vue'
import MainWindowMixin from './main-window-mixin'

export default {
    CreateWindowMixin:function(){
        return MainWindowMixin
    },
    CreateModalMixin:function(){
        return Vue.extend({
            beforeDestroy:function(){
                this.$props.parentVue.hasModal = false;
            }
        });
    },
    CreateModalContentMixin:function(callback:(result:any)=>void){
        return Vue.extend({
            props:{
                result:{}
            },
            beforeDestroy:function(){
                callback.call(this, this.$props?.result ?? null)
            }
        });
    }
}