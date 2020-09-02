import WindowFactory from '../window/window-factory'
import filesystemEditor from '@/system/filesystem/filesystem-editor';
import { DirectoryInfo } from '@/system/filesystem/fileinfo';
import GlobalPath from '@/system/filesystem/globalPath'

export default [
    {
        label: "New Folder",
        action: ()=> filesystemEditor.add(
            new DirectoryInfo("New Folder", GlobalPath.Desktop),
            GlobalPath.Desktop
        )
    },
    {
        label: 'Set Background',
        action:function(){
            WindowFactory.OpenSetting("background");
        }
    }
]