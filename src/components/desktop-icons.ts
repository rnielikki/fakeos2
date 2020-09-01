import FilesystemEditor from '@/system/filesystem/filesystem-editor';
import { DesktopIcons } from '@/system/filesystem/filesystem-default';
import { Path } from '@/system/filesystem/filesystem';
import { DirectoryInfo } from '@/system/filesystem/fileinfo';

export default function(){
    let desktop = Path.getAbsolutePath("C:/User/Desktop") as DirectoryInfo;
    for (let key in DesktopIcons){
        if(!Object.prototype.hasOwnProperty.call(DesktopIcons, key)) continue;
        let original = Path.getAbsolutePath(Object(DesktopIcons)[key]);
        if(!original) continue;
        FilesystemEditor.addShortcut(original, desktop);
    }
}