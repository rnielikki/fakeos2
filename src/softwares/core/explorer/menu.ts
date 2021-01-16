import Win64Factory from '@/components/window/window-factory';
import filesystemEditor from '@/system/filesystem/filesystem-editor';
import { DirectoryInfo } from '@/system/filesystem/fileinfo';
import { showDialogIfError } from '@/system/filesystem/file-edit-result';
import IconModel from '@/components/ui-components/icon/models/icon-model'
import { ComponentPublicInstance } from 'vue'

export default function(target:ComponentPublicInstance){
    return [
        {
            label: "New Folder",
            action: ()=> showDialogIfError(
                filesystemEditor.add(
                //@ts-ignore
                new DirectoryInfo("New Folder", target.$data.f_path),
                //@ts-ignore
                target.$data.f_path
                ),
                "New Folder"
            )
        },
        {
            label: "Open in new window",
            action: ()=> Win64Factory.OpenProgram("core/explorer", undefined, {
                //@ts-ignore
                path:target.$data.f_path
            })
         },
        {
            label: "Properties",
            action:()=>Win64Factory.OpenSetting("file-properties", {
                //@ts-ignore
                icon: new IconModel(target.$data.f_path)
            })
        }
    ]
}