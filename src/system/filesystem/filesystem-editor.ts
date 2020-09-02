import Vue from 'vue'
import IFileInfo, { DirectoryInfo, ShortcutInfo } from '@/system/filesystem/fileinfo'
import FileEditResult from './file-edit-result'
import FileType from './file-type';

export default {
    editFileName:function(fileInfo:IFileInfo, name:string){
        if(!fileInfo.mutable) {
            return FileEditResult.Immutable;
        }
        if(fileInfo.name === name) return FileEditResult.Success;
        let nameCheck = validNameCheck(name, fileInfo.parent as DirectoryInfo)
        if(nameCheck !== FileEditResult.Success) {
            return nameCheck;
        }
        fileInfo.name = name;
        return this.editFile(fileInfo, fileInfo);
    },
    editFile:function(oldFile:IFileInfo, newFile:IFileInfo):FileEditResult{
        if(!oldFile.mutable) {
            return FileEditResult.Immutable;
        }
        let files = (oldFile.parent as DirectoryInfo).files;
        let index = files.indexOf(oldFile);
        Vue.set(files, index, newFile);
        return FileEditResult.Success;
    },
    add:function(fileInfo:IFileInfo, parent:DirectoryInfo):FileEditResult{
        if(!parent.mutable) {
            return FileEditResult.Immutable;
        }
        fileInfo.name = getUniqueName(fileInfo, parent);
        parent.files.push(fileInfo);
        return FileEditResult.Success;
    },
    addShortcut(fileInfo:IFileInfo, destination?:DirectoryInfo){
        if(fileInfo.fileType == FileType.Shortcut) {
            return FileEditResult.DoubleShortcut;
        }
        let dest = destination ?? (fileInfo.parent as DirectoryInfo);
        if(!dest.mutable) {
            return FileEditResult.Immutable;
        }
        let shortcut = new ShortcutInfo(getUniqueName(fileInfo, dest), dest, fileInfo);
        dest.files.push(shortcut);
        return FileEditResult.Success;
    },
    delete:function(fileInfo:IFileInfo):FileEditResult{
        if(!fileInfo.mutable || !fileInfo.parent?.mutable) {
            return FileEditResult.Immutable;
        }
        if(fileInfo.fileType == FileType.Directory){
            let files = (fileInfo as DirectoryInfo).files;
            while(files.length > 0){
                let result = this.delete(files[0]);
                if(result !== FileEditResult.Success) return result;
            }
        }
        let parent = (fileInfo.parent as DirectoryInfo).files;
        let index = parent.indexOf(fileInfo);
        if(index > -1){
            (fileInfo.parent as DirectoryInfo).files.splice(index, 1)
        }
        else {
            return FileEditResult.NotFound;
        }
        fileInfo.disposed = true;
        return FileEditResult.Success;
    },
    move:function(file:IFileInfo, target:DirectoryInfo):FileEditResult{
        if(file.parent == target){
            return FileEditResult.Success;
        }
        if(isParent(target, file as DirectoryInfo)) {
            return FileEditResult.Recursive;
        }
        if(!file.mutable || !target.mutable){
            return FileEditResult.Immutable;
        }
        let nameCheck = validNameCheck(file.name, target)
        if(nameCheck !== FileEditResult.Success) {
            return nameCheck;
        }
        let files = (file.parent as DirectoryInfo)?.files;
        let index = files?.indexOf(file);
        if(files == null || index < 0){
            return FileEditResult.NotFound;
        }
        files.splice(index, 1);
        target.files.push(file);
        file.parent = target;
        if(file.fileType == FileType.Directory){
            (file as DirectoryInfo).setCurrentDirectory();
        }
        return FileEditResult.Success;
    }
}
function validNameCheck(name:string, parent:DirectoryInfo):FileEditResult{
    if(!name || name.indexOf('/') > -1) {
        return FileEditResult.InvalindName;
    }
    if(parent.getFile(name)) {
        return FileEditResult.DuplicatedName;
    }
    else {
        return FileEditResult.Success;
    }
}
function getUniqueName(fileInfo:IFileInfo, parent:DirectoryInfo){
    let splitIndex = fileInfo.name.lastIndexOf(".")
    let originalName = "";
    let ext = "";
    if(fileInfo.fileType == FileType.Directory || splitIndex == -1){
        originalName = fileInfo.name;
    }
    else {
        originalName = fileInfo.name.substring(0, splitIndex);
        ext = fileInfo.name.substring(splitIndex);
    }
    let name = fileInfo.name;
    let nameCheck = validNameCheck(name, parent);
    let count = 1;
    while(nameCheck == FileEditResult.DuplicatedName) {
        name = `${originalName} (${++count})${ext}`;
        nameCheck = validNameCheck(name, parent)
    }
    return name;
}
function isParent(file:IFileInfo, parent:DirectoryInfo):boolean{
    if(file.parent == null){
        return false;
    }
    else if(file == parent){
        return true;
    }
    else{
        return isParent(file.parent, parent);
    }
}