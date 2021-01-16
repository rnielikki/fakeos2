import MainWin64Mixin from './main-window-mixin'
import ModalMixin from './modal-mixin'
import Win64ConfirmSaving from './window-confirm-saving'

export default {
    CreateWin64Mixin:function(confirmSaving?:object){
        if(confirmSaving){
            const _confirm = Win64ConfirmSaving(confirmSaving);
            return [ _confirm, MainWin64Mixin ]
        }
        else{
            return [ MainWin64Mixin ]
        }
    },
    CreateModalMixin:function(){
        return ModalMixin
    }
}