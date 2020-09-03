<template>
    <div class="viewer-root">
        <div class="editor" contenteditable="true" ref="content">{{ f_file.data.content }}</div>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import { FileInfo } from '@/system/filesystem/fileinfo'
import { checkType } from '@/system/filesystem/mime';
import { WindowOptions } from '@/components/window/components/window-options';
import explorerModal from '@/softwares/core/explorer/explorer-modal'
import AppMenu from './menu'

export default Vue.extend({
    data:function(){
        return {
            title:`Text Editor - ${this.sender.name}`,
            menu:AppMenu(this),
            f_file:this.sender
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
            explorerModal.open(this, this.f_file, (file:FileInfo)=>this.f_file = file, checkType.ifText)
        },
        saveFile:function(){
            Object(this.f_file!.data).content = (this.$refs.content as HTMLElement).innerText;
            explorerModal.save(this, this.f_file);
        },
        setContent(value:string){
            //@ts-ignore
            this.$refs.content.innerText = value;
        }
    },
    watch:{
        f_file:function(file){
            this.setContent(file.data.content);
        }
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