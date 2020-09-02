<template>
    <div class="dialog">
        <div class="message">{{ message }}</div>
        <diV class="buttons">
            <ui-button v-for="(btn, key) in buttons" :key="key" class="button" :clicked="setAction(btn.value)" :text="btn.text" />
        </div>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import ModalContentMixin from '../../mixins/modal-content-mixin'
import IWindowOptions from '../window-options'
import UiButton from '@/components/ui-components/button.vue'
import DialogButton, { OKButton } from './dialog-model'

export default Vue.extend({
    name:'DialogTemplate',
    components:{ UiButton },
    mixins:[ ModalContentMixin ],
    data:function(){
        return {
            hasMinimizer:false
        }
    },
    props:{
        message:String,
        windowOptions: {
            type:Object as PropType<IWindowOptions>
        },
        buttons:{
            type:Array as PropType<DialogButton[]>,
            default:()=>OKButton
        }
    },
    methods:{
        setAction:function(value:any){
            return ()=>{
                let targetWnidow = this.$data.f_targetWindow;
                if(!targetWnidow.$parent && this.$props.callback) {
                    this.$props.callback(value);
                }
                else {
                    (this as any).setResult(value);
                }
                targetWnidow.close()
            };
        }
    }
})
</script>
<style scoped>
    .dialog {
        text-align: center;
        padding:1.15rem;
    }
    .message {
        margin:0 .6rem;
        white-space:pre;
    }
    .buttons {
        margin-top:.97rem
    }
    .button {
        margin:0 .47rem;
    }
</style>