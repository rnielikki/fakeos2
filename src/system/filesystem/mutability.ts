import IFileInfo, { DirectoryInfo } from "./fileinfo";
import FileType from './file-type';

export default {
    makeMutable:(fileInfo:IFileInfo | null)=>changeMutability(fileInfo, true),
    makeImmutable:(fileInfo:IFileInfo | null)=>changeMutability(fileInfo, false),
}

function changeMutability(fileInfo:IFileInfo | null, mutable:boolean){
    if(!fileInfo) return;
    fileInfo.mutable = mutable;
    if(fileInfo.fileType == FileType.Directory) {
        let files = (fileInfo as DirectoryInfo).files
        for (let file of files){
            changeMutability(file, mutable);
        }
    }
}