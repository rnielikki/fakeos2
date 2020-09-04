<template>
    <div class="viewer-root">
        <div class="editor" contenteditable="true" ref="content" @input="dataChange">{{ sender.data.content }}</div>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import { FileInfo } from '@/system/filesystem/fileinfo'
import { checkType } from '@/system/filesystem/mime';
import { WindowOptions } from '@/components/window/components/window-options';
import explorerModal from '@/softwares/core/explorer/explorer-modal'
import AppMenu from './menu'
import windowFactory from '@/components/window/window-factory';
import { OkCancelButton } from '@/components/window/components/dialogs/dialog-model';

export default Vue.extend({
    data:function(){
        return {
            title:`Text Editor - ${this.sender.name}`,
            menu:AppMenu(this),
            f_file:this.sender,
            f_confirmSaving:{
                title:"Save before exit",
                content:"Do you want to leave? really?",
                fileChanged:false
            },
        }
    },
    props:{
        sender:{
            type:Object as PropType<FileInfo>,
            required:true,
            validator:function(value){
                if(value.disposed) return false;
                let mimeName = value.appType.typeName
                return checkType.ifText(value);
            }
        }
    },
    methods:{
        openFile:function(){
            explorerModal.open(this, this.$data.f_file, (file:FileInfo)=>{
                windowFactory.OpenProgram("core/text-editor", file);
            }, checkType.ifText)
        },
        saveFile:function(){
            Object(this.$data.f_file!.data).content = (this.$refs.content as HTMLElement).innerText;
            explorerModal.save(this, this.$data.f_file,(result:object)=>{
                let ok = Object(result).ok;
                if(ok){
                    this.$data.f_targetWindow.f_title = `Text Editor - ${Object(result).file.name}`
                }
                this.f_confirmSaving.fileChanged = !ok
            });
        },
        dataChange:function(e:Event){
            this.$data.f_confirmSaving.fileChanged = true;
        }
    },
    beforeDestroy:function(){
        windowFactory.OpenDialog(this, "Data not saved", "Do you want to leave without saving?", OkCancelButton, (result:boolean)=>{
            if(result){ this.$data.f_targetWindow.close(); }
        })
        return;
    }
})
</script>
<style lang="scss" scoped>
@import 'src/scss/colorset.scss';
.viewer-root {
    flex-grow:1;
}
.editor {
    width:100%;
    height:100%;
    overflow:auto;
    padding:.4rem .7rem;
    color:$content-foreground;
    background-color:$content-background;
    white-space:pre;
}
</style>