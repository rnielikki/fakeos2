import Explorer from './explorer.vue'
import windowFactory from '@/components/window/window-factory';
import { passFileFromExplorer, saveOnExplorer } from '@/components/ui-components/icon/icon-mixins';
import IFileInfo, { FileInfo } from '@/system/filesystem/fileinfo';
import FileType from '@/system/filesystem/file-type';
import Mime from '@/system/filesystem/mime'

export default {
    open:function(windowParent:Vue, path:IFileInfo, callback:Function, filter?:Function){
        let isDirectory = path.fileType === FileType.Directory;
        let defaultPath = (isDirectory)?path:path.parent;
        let defaultItem = (isDirectory)?null:path;
    
        let content = new Explorer({
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
    save:function(windowParent:Vue, file:FileInfo, callback?:Function, filter?:Function){
        if(filter && !filter(file)) return;
        let extension = Object.keys(Mime.list).find((k:string)=>Object(Mime.list)[k] == file.appType) ?? ""
    
        let content = new Explorer({
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
                let savedFile = (content as any).saveFile(result.dir, file.data, extension);
                if(callback) callback({ ...result, file:savedFile });
            }
        })
    }
}