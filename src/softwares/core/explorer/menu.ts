import WindowFactory from '@/components/window/window-factory';
import filesystemEditor from '@/system/filesystem/filesystem-editor';
import { DirectoryInfo } from '@/system/filesystem/fileinfo';
import { showDialogIfError } from '@/system/filesystem/file-edit-result';
import IconModel from '@/components/ui-components/icon/models/icon-model'

export default function(target:Vue){
    return [
        {
            label: "New Folder",
            action: ()=> showDialogIfError(
                filesystemEditor.add(
                new DirectoryInfo("New Folder", target.$data.f_path),
                target.$data.f_path
                ),
                "New Folder"
            )
        },
        {
            label: "Open in new window",
            action: ()=> WindowFactory.OpenProgram("core/explorer", undefined, {
                path:target.$data.f_path
            })
         },
        {
            label: "Properties",
            action:()=>WindowFactory.OpenSetting("file-properties", {
                icon: new IconModel(target.$data.f_path)
            })
        }
    ]
}