import Win64Factory from '../window/window-factory'
import { OkCancelButton } from '../window/components/dialogs/dialog-model'
import { DirectoryInfo, FileInfo } from '@/system/filesystem/fileinfo'
import globalPath from '@/system/filesystem/globalPath'
export default [
    {
        label: 'Help',
        action:()=>{ Win64Factory.OpenSetting("help") }
    },
    {
        label:'Programs',
        submenu:[
            {
                label:"System",
                submenu:getPrograms(globalPath.System)
            },
            ...getPrograms(globalPath.Program)
        ]
    },
    { label: 'Settings' , action:()=>{ Win64Factory.OpenSetting() }},
    { label: 'Sleep' },
    {
        label: 'Restart',
        action:()=>{
            Win64Factory.OpenDialog(null, 'Confirming', 'All of your settings will be removed!\nDo you really want to restart?',
                OkCancelButton,
                (result:boolean)=>{
                    if(result) location.reload();
                })
        }
    },
    {
        label: 'Turn Off',
        action:()=>{ Win64Factory.OpenDialog(null, 'Cannot turn off', 'We cannot count our sheeps for technical reason.\nUnderflow, I guess.') }
    }
]

function getPrograms(pathDir:DirectoryInfo){
    return pathDir.files.map(item=>{
        const realFileName = Object(((item as DirectoryInfo).getFile(item.name+".vue") as FileInfo)?.data)?.app;
        if(!realFileName) return { label:"Error" }
        return {
            label:item.name,
            action:()=>Win64Factory.OpenProgram(realFileName)
        };
    })
}