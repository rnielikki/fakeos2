import Vue from 'vue'
import { DirectoryInfo, FileInfo, ShortcutInfo } from '@/system/filesystem/fileinfo'
import WindowFactory from '../../window/window-factory'
import IconModel from './models/icon-model'
import FileType from '@/system/filesystem/file-type'
import windowManager from '@/system/window-manager'
import modalContentMixin from '@/components/window/mixins/modal-content-mixin'
import filesystemEditor from '@/system/filesystem/filesystem-editor'

export let defaultDirectoryAction = Vue.extend({
    methods:{
        openDirectory:function(dirInfo:DirectoryInfo) {
            WindowFactory.OpenProgram("core/explorer", undefined, { path:dirInfo });
        }
    }
})

export let defaultFileAction = Vue.extend({
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
            WindowFactory.OpenProgram(appName, fileInfo, data ?? {})
        }
    }
})

export let openDirectoryOnExplorer = Vue.extend({
    methods:{
        openDirectory:function(dirInfo:DirectoryInfo){
            Vue.set(this.$data, "f_path", dirInfo);
            windowManager.select(this.$data.f_targetWindow)
         }
    }
})

export let passFileFromExplorer = Vue.extend({
    mixins:[ modalContentMixin ],
    methods:{
        openFile:function(fileInfo:FileInfo){
            let targetWindow = this.$data.f_targetWindow;
            (this as any).setResult(fileInfo);
            targetWindow.close();
        }
    }
})

export let saveOnExplorer = Vue.extend({
    mixins:[ modalContentMixin ],
    data:function(){
        return { name: "anything"}
    },
    methods:{
        openFile:function(fileInfo:FileInfo){
        },
        saveFile:function(parent:DirectoryInfo, data:any, extension:string=""){
            let nameText = (this.$refs.name as HTMLInputElement).value;
            let name = nameText + extension;
            filesystemEditor.add(new FileInfo(name, parent, data), parent);
        }
    }
})


let openAny = Vue.extend({
    methods:{
        openIcon:function(model:IconModel) {
            let fileInfo = (model.isShortcut)?(model.fileInfo as ShortcutInfo).originalFile:model.fileInfo;
            (fileInfo.fileType == FileType.Directory)?(this as any).openDirectory(fileInfo):(this as any).openFile(fileInfo);
        }
    }
});
//
export let backgroundIconSet = Vue.extend({
    mixins:[ defaultDirectoryAction, defaultFileAction, openAny ],
})

export let explorerIconSet = Vue.extend({
    mixins:[ openDirectoryOnExplorer, defaultFileAction, openAny ],
    methods:{
        goToParent:function(dirInfo:DirectoryInfo){
            if(dirInfo.fileType !== FileType.Directory) return;
            (this as any).openDirectory(dirInfo);
        }
    }
})