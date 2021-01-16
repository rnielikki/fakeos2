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
        const files = (fileInfo as DirectoryInfo).files
        for (const file of files){
            changeMutability(file, mutable);
        }
    }
}