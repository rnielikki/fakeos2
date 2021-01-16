import Win64Factory from '../window/window-factory'
import filesystemEditor from '@/system/filesystem/filesystem-editor';
import { DirectoryInfo } from '@/system/filesystem/fileinfo';
import GlobalPath from '@/system/filesystem/globalPath'
import { showDialogIfError } from '@/system/filesystem/file-edit-result';

export default [
    {
        label: "New Folder",
        action: ()=> showDialogIfError(
            filesystemEditor.add(
            new DirectoryInfo("New Folder", GlobalPath.Desktop),
            GlobalPath.Desktop
            ),
            "New Folder"
        )
    },
    {
        label: 'Set Background',
        action:function(){
            Win64Factory.OpenSetting("background");
        }
    }
]