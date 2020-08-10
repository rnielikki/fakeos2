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
import WindowTitleOptions from '../window-title-options'
import UiButton from '@/components/ui-components/button.vue'
import DialogButton, { OKButton } from './dialog-model'

export default Vue.extend({
    name:'DialogTemplate',
    components:{ UiButton },
    props:{
        title:String,
        message:String,
        windowOptions: {
            type:Object as PropType<IWindowOptions>
        },
        titleOptions: {
            type:Object as PropType<WindowTitleOptions>,
            default:()=>({ hasMinimizer:false, hasMaximizer:false} as WindowTitleOptions)
        },
        buttons:{
            type:Array as PropType<DialogButton[]>,
            default:()=>OKButton
        }
    },
    mixins:[ ModalContentMixin ],
    methods:{
        setAction:function(value:any){
            return ()=>{ (this as any).SetResult(value); this.$data.f_targetWindow.close() };
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
        margin:0 .6rem
    }
    .buttons {
        margin-top:.97rem
    }
    .button {
        margin:0 .47rem;
    }
</style>