import IFileInfo from '@/system/filesystem/fileinfo';

interface IconGlobalType {
    dropTarget:IFileInfo | null;
}

const IconGlobal:IconGlobalType = {
    dropTarget:null
}

export default IconGlobal;