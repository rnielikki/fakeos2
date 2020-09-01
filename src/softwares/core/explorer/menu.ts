import windowFactory from '@/components/window/window-factory';
import Explorer from './explorer.vue'
import filesystemEditor from '@/system/filesystem/filesystem-editor';
import { DirectoryInfo } from '@/system/filesystem/fileinfo';

export default function(target:Vue){
    return [
        {
            label: "New Folder",
            action: ()=> filesystemEditor.add(
                new DirectoryInfo("New Folder", target.$data.f_path),
                target.$data.f_path
            )
        },
        {
            label: "Open in new window",
            action: ()=> windowFactory.OpenProgram("core/explorer", {
                path:target.$data.f_path
            })
         },
        {
            label: "Properties..."
        }
    ]
}