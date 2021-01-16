import Explorer from './explorer.vue'
import windowFactory from '@/components/window/window-factory';
import { passFileFromExplorer, saveOnExplorer } from '@/components/ui-components/icon/icon-mixins';
import IFileInfo, { FileInfo } from '@/system/filesystem/fileinfo';
import FileType from '@/system/filesystem/file-type';
import Mime from '@/system/filesystem/mime'
import { ComponentPublicInstance, createApp } from 'vue'

export default {
    open:function(windowParent:ComponentPublicInstance, path:IFileInfo, callback:Function, filter?:Function){
        const isDirectory = path.fileType === FileType.Directory;
        const defaultPath = (isDirectory)?path:path.parent;
        const defaultItem = (isDirectory)?null:path;
    
        const content = createApp(Explorer, {
            propsData:{
                path:defaultPath,
                defaultSelection:defaultItem,
                isModal:true,
                filter:filter
            },
            mixins:[ passFileFromExplorer ]
        });
        windowFactory.OpenModal(windowParent, content, (result:IFileInfo)=>{ if(result) callback(result) })
    },
    save:function(windowParent:ComponentPublicInstance, file:FileInfo, callback?:Function, filter?:Function){
        if(filter && !filter(file)) return;
        const extension = Object.keys(Mime.list).find((k:string)=>Object(Mime.list)[k] == file.appType) ?? ""

        const content = createApp(Explorer, {
            propsData:{
                path:file.parent,
                isModal:true,
                isSave:true,
                filter:filter
            },
            mixins:[ saveOnExplorer ]
        });
        windowFactory.OpenModal(windowParent, content, (result:any)=>{
            if(result?.ok===true){
                const savedFile = (content as any).saveFile(result.dir, file.data, extension);
                if(callback) callback({ ...result, file:savedFile });
            }
        })
    }
}