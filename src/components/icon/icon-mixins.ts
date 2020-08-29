import Vue from 'vue'
import IFileInfo, { DirectoryInfo, FileInfo } from '@/system/filesystem/fileinfo'
import WindowFactory from '../window/window-factory'
import { Path } from '@/system/filesystem/filesystem'
import IconModel from './models/icon-model'

export let defaultDirectoryAction = Vue.extend({
    methods:{
        openDirectory:function(dirInfo:DirectoryInfo) {
            WindowFactory.OpenProgram("core/explorer", { path:Path.getAbsolutePath(dirInfo.currentDirectory) });
        }
    }
})

export let defaultFileAction = Vue.extend({
    methods:{
        openFile:function(fileInfo:FileInfo) {
            let data:object | null = null;
            let appName:string;
            if(fileInfo.appType?.typeName !== "application/vue"){
                data = fileInfo.data;
                appName = fileInfo.appType?.app ?? "";
            }
            else {
                appName = Object(fileInfo.data).app;
            }
            WindowFactory.OpenProgram(appName, data ?? {})
        }
    }
})

export let openDirectoryOnExplorer = Vue.extend({
    methods:{
        openDirectory:function(dirInfo:DirectoryInfo){
            Vue.set(this.$data, "f_path", dirInfo);
         }
    }
})
//
export let backgroundIconSet = Vue.extend({
    mixins:[ defaultDirectoryAction, defaultFileAction ],
    methods:{
        openIcon:function(model:IconModel) {
            model.isDirectory?(this as any).openDirectory(model.fileInfo):(this as any).openFile(model.fileInfo);
        }
    }
})
export let explorerIconSet = Vue.extend({
    mixins:[ openDirectoryOnExplorer, defaultFileAction ],
    methods:{
        openIcon:function(model:IconModel) {
            model.isDirectory?(this as any).openDirectory(model.fileInfo):(this as any).openFile(model.fileInfo);
        },
        goToParent:function(dirInfo:DirectoryInfo){
            if(!(dirInfo instanceof DirectoryInfo)) return;
            (this as any).openDirectory(dirInfo);
        }
    }
})