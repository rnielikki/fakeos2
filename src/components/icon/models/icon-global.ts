import IFileInfo from '@/system/filesystem/fileinfo';

interface IconGlobalType {
    dragTarget:IFileInfo | null;
}

let IconGlobal:IconGlobalType = {
    dragTarget:null
}

export default IconGlobal;