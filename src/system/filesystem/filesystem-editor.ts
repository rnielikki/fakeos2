import Vue from 'vue'
import IFileInfo, { DirectoryInfo } from '@/system/filesystem/fileinfo'
import FileEditResult from './file-edit-result'

export default {
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
        let nameCheck = this.validNameCheck(fileInfo.name, parent)
        if(nameCheck !== FileEditResult.Success) {
            return nameCheck;
        }
        parent.files.push(fileInfo);
        return FileEditResult.Success;
    },
    delete:function(fileInfo:IFileInfo):FileEditResult{
        if(!fileInfo.mutable) {
            return FileEditResult.Immutable;
        }
        if(fileInfo instanceof DirectoryInfo){
            let files = fileInfo.files
            for(let file of files) {
                let result = this.delete(file);
                if(result !== FileEditResult.Success)
                return result;
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
        return FileEditResult.Success;
    },
    move:function(file:IFileInfo, target:DirectoryInfo):FileEditResult{
        if(!file.mutable || !target.mutable){
            return FileEditResult.Immutable;
        }
        let nameCheck = this.validNameCheck(file.name, target)
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
        if(file instanceof DirectoryInfo){
            file.setCurrentDirectory();
        }
        return FileEditResult.Success;
    },
    validNameCheck(name:string, parent:DirectoryInfo):FileEditResult{
        if(name.indexOf('/') > -1) {
            return FileEditResult.InvalindName;
        }
        if(parent.getFile(name)) {
            return FileEditResult.DuplicatedName;
        }
        else {
            return FileEditResult.Success;
        }
    },
}