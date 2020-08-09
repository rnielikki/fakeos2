import Vue from 'vue'
import MainWindowMixin from './main-window-mixin'
import ModalMixin from './modal-mixin'

export default {
    CreateWindowMixin:function(){
        return MainWindowMixin
    },
    CreateModalMixin:function(){
        return ModalMixin
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