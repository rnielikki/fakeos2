import Vue from 'vue'
import MainWindowMixin from './main-window-mixin'
import ModalMixin from './modal-mixin'

export default {
    CreateWindowMixin:function(){
        return MainWindowMixin
    },
    CreateModalMixin:function(){
        return ModalMixin
    }
}