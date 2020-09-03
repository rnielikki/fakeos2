<template>
    <div class="file-properties">
        <div class="file-title">
            <img :src="icon.icon" />
            <div>
                <p class="file-label">{{ icon.label }}</p>
                <p class="file-desc">{{ fileTypeName }}</p>
            </div>
        </div>
        <div class="file-text">
            <p class="file-text-label">Path</p>
            <p class="file-text-content">{{ file.currentPath }}</p>
        </div>
        <div v-if="icon.isShortcut" class="file-text">
            <p class="file-text-label">Original path</p>
            <p class="file-text-content">{{ file.originalFile.currentPath }}</p>
        </div>
        <ui-button text="Open Path" :clicked="()=>open(file)" />&nbsp;
        <ui-button v-if="icon.isShortcut" text="Open Original path" :clicked="()=>open(file.originalFile)"  />
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import IconModel from '@/components/ui-components/icon/models/icon-model'
import FileType from '@/system/filesystem/file-type';
import IFileInfo from '@/system/filesystem/fileinfo';
import { WindowOptions } from '@/components/window/components/window-options'
import UiButton from '@/components/ui-components/button.vue'
import WindowFactory from '@/components/window/window-factory';

export default Vue.extend({
    components:{ UiButton},
    data:function(){
        return {
            title:"Properties",
            file:this.icon.fileInfo,
            windowOptions:
                new WindowOptions({
                    defaultWidth:-1,
                    defaultHeight:-1,
                    minWidth:300,
                    minHeight:200,
                    resizable:false
                })
        }
    },
    props:{
        icon:{
            type:Object as PropType<IconModel>,
            required:true
        }
    },
    computed:{
        fileTypeName(){
            switch((this.icon as any).fileInfo.fileType){
                case FileType.Directory:
                    return "Directory"
                case FileType.File:
                    return "File"
                case FileType.Shortcut:
                    return "Shortcut"
            }
            return "Unknown"
        }
    },
    methods:{
        open:function(fileInfo:IFileInfo){
            WindowFactory.OpenProgram("core/explorer", undefined,
            {
                path:fileInfo.parent,
                defaultSelection:fileInfo
            })
        }
    }
})
</script>
<style scoped>
.file-properties {
    margin:.85rem;
}
.file-title, .file-title > * {
    display:inline-block;
    vertical-align: middle;
    white-space: nowrap;
}
.file-title > img {
    margin-right:.97rem;
}
.file-label {
    font-size:1.5rem;
    margin:.2rem;
}
.file-desc {
    font-size:.95rem;
    margin:.17rem;
}
img{
    width:48px;
    height:48px;
}
.file-text {
    border-top:1px solid #000
}
.file-text-content {
    margin-top:.64rem;
}
.file-text-label {
    font-weight: bold;
    margin-bottom:.64rem;
}
</style>