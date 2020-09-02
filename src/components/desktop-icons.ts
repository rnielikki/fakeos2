import FilesystemEditor from '@/system/filesystem/filesystem-editor';
import { DesktopIcons } from '@/system/filesystem/filesystem-default';
import { Path } from '@/system/filesystem/filesystem';
import GlobalPath from '@/system/filesystem/globalPath'

export default function(){
    for (let key in DesktopIcons){
        if(!Object.prototype.hasOwnProperty.call(DesktopIcons, key)) continue;
        let original = Path.getAbsolutePath(Object(DesktopIcons)[key]);
        if(!original) continue;
        FilesystemEditor.addShortcut(original, GlobalPath.Desktop);
    }
}