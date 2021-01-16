import Vue, { defineComponent } from 'vue'
import { DirectoryInfo, FileInfo, ShortcutInfo } from '@/system/filesystem/fileinfo'
import Win64Factory from '../../window/window-factory'
import IconModel from './models/icon-model'
import FileType from '@/system/filesystem/file-type'
import windowManager from '@/system/window-manager'
import modalContentMixin from '@/components/window/mixins/modal-content-mixin'
import filesystemEditor from '@/system/filesystem/filesystem-editor'
import FileEditResult, { showDialogIfError } from '@/system/filesystem/file-edit-result'

export const defaultDirectoryAction = defineComponent({
    methods:{
        openDirectory:function(dirInfo:DirectoryInfo) {
            Win64Factory.OpenProgram("core/explorer", undefined, { path:dirInfo });
        }
    }
})

export const defaultFileAction = defineComponent({
    methods:{
        openFile:function(fileInfo:FileInfo) {
            if((this as any).isModal) return;
            let data:object | null = null;
            let appName:string;
            if(fileInfo.appType?.typeName !== "application/vue"){
                data = fileInfo.data;
                appName = fileInfo.appType?.app ?? "";
            }
            else {
                appName = Object(fileInfo.data).app;
            }
            Win64Factory.OpenProgram(appName, fileInfo, data ?? {})
        }
    }
})

export const openDirectoryOnExplorer = defineComponent({
    methods:{
        openDirectory:function(dirInfo:DirectoryInfo){
            Object.assign(this.$data, {"f_path": dirInfo})
            //@ts-ignore
            windowManager.select(this.$data.f_targetWindow)
         }
    }
})

export const passFileFromExplorer = defineComponent({
    mixins:[ modalContentMixin ],
    methods:{
        openFile:function(fileInfo:FileInfo){
            //@ts-ignore
            const targetWindows = this.$data.f_targetWindow;
            (this as any).setResult(fileInfo);
            targetWindows.close();
        }
    }
})

export const saveOnExplorer = defineComponent({
    mixins:[ modalContentMixin ],
    data:function(){
        return { name: "anything"}
    },
    methods:{
        openFile:function(fileInfo:FileInfo){
        },
        saveFile:function(parent:DirectoryInfo, data:any, extension:string=""){
            const nameText = (this.$refs.name as HTMLInputElement).value;
            const name = nameText + extension;
            const addResult = filesystemEditor.add(new FileInfo(name, parent, data), parent)
            if(addResult == FileEditResult.Success) {
                return parent.getFile(name)
            }
            else{
                showDialogIfError(addResult, name);
                return null;
            }
        }
    }
})


const openAny = defineComponent({
    methods:{
        openIcon:function(model:IconModel) {
            const fileInfo = (model.isShortcut)?(model.fileInfo as ShortcutInfo).originalFile:model.fileInfo;
            (fileInfo.fileType == FileType.Directory)?(this as any).openDirectory(fileInfo):(this as any).openFile(fileInfo);
        }
    }
});
//
export const backgroundIconSet = defineComponent({
    mixins:[ defaultDirectoryAction, defaultFileAction, openAny ],
})

export const explorerIconSet = defineComponent({
    mixins:[ openDirectoryOnExplorer, defaultFileAction, openAny ],
    methods:{
        goToParent:function(dirInfo:DirectoryInfo){
            if(dirInfo.fileType !== FileType.Directory) return;
            (this as any).openDirectory(dirInfo);
        }
    }
})