import IFileInfo, { DirectoryInfo } from "./fileinfo";

export default {
    makeMutable:(fileInfo:IFileInfo | null)=>changeMutability(fileInfo, true),
    makeImmutable:(fileInfo:IFileInfo | null)=>changeMutability(fileInfo, false),
}

function changeMutability(fileInfo:IFileInfo | null, mutable:boolean){
    if(!fileInfo) return;
    fileInfo.mutable = mutable;
    if(fileInfo instanceof DirectoryInfo) {
        for (let file of fileInfo.files){
            changeMutability(file, mutable);
        }
    }
}