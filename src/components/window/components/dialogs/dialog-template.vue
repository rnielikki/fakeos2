<template>
    <div class="dialog">
        <div class="message">{{ message }}</div>
        <div class="buttons">
            <ui-button v-for="(btn, key) in buttons" :key="key" class="button" :clicked="setAction(btn.value)" :text="btn.text" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent,  PropType } from 'vue'
import ModalContentMixin from '../../mixins/modal-content-mixin'
import IWin64Options from '../win64-options'
import UiButton from '@/components/ui-components/button.vue'
import DialogButton, { OKButton } from './dialog-model'

export default defineComponent({
    name:'DialogTemplate',
    components:{ UiButton },
    mixins:[ ModalContentMixin ],
    data:function(){
        return {
            hasMinimizer:false,
            windowOptions: this.windowOptionsProp
        }
    },
    props:{
        message:String,
        buttons:{
            type:Array as PropType<DialogButton[]>,
            default:()=>OKButton
        },
        windowOptionsProp: {
            type:Object as PropType<IWin64Options>
        }
    },
    methods:{
        setAction:function(value:any){
            return ()=>{
                //@ts-ignore
                let targetWindows = this.$data.f_targetWindow;
                (this as any).setResult(value);
                targetWindows.close()
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