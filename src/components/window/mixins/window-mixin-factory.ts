import MainWindowMixin from './main-window-mixin'
import ModalMixin from './modal-mixin'
import WindowConfirmSaving from './window-confirm-saving'

export default {
    CreateWindowMixin:function(confirmSaving?:object){
        if(confirmSaving){
            let _confirm = WindowConfirmSaving(confirmSaving);
            return [ _confirm, MainWindowMixin ]
        }
        else{
            return [ MainWindowMixin ]
        }
    },
    CreateModalMixin:function(){
        return ModalMixin
    }
}