import IFileInfo from '@/system/filesystem/fileinfo';

interface IconGlobalType {
    dropTarget:IFileInfo | null;
}

let IconGlobal:IconGlobalType = {
    dropTarget:null
}

export default IconGlobal;