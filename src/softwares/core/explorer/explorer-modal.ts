import Explorer from './explorer.vue'
import windowFactory from '@/components/window/window-factory';
import { passFileFromExplorer } from '@/components/ui-components/icon/icon-mixins';
import IFileInfo from '@/system/filesystem/fileinfo';
import FileType from '@/system/filesystem/file-type';

export default function(windowParent:Vue, path:IFileInfo, callback:Function){
    let isDirectory = path.fileType === FileType.Directory;
    let defaultPath = (isDirectory)?path:path.parent;
    let defaultItem = (isDirectory)?null:path;

    let content = new Explorer({
        propsData:{
            path:defaultPath,
            defaultSelection:defaultItem,
            isModal:true,
        },
        mixins:[ passFileFromExplorer ]
    });
    windowFactory.OpenModal(windowParent, content, callback)
}