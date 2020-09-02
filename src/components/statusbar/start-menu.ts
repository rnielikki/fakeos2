import WindowFactory from '../window/window-factory'
import { OkCancelButton } from '../window/components/dialogs/dialog-model'
import { DirectoryInfo } from '@/system/filesystem/fileinfo'
import globalPath from '@/system/filesystem/globalPath'
export default [
    {
        label: 'Help',
        action:()=>{ WindowFactory.OpenSetting("help") }
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
    { label: 'Settings' , action:()=>{ WindowFactory.OpenSetting() }},
    { label: 'Sleep' },
    {
        label: 'Restart',
        action:()=>{
            WindowFactory.OpenDialog(null, 'Confirming', 'All of your settings will be removed!\nDo you really want to restart?',
                OkCancelButton,
                (result:boolean)=>{
                    if(result) location.reload();
                })
        }
    },
    {
        label: 'Turn Off',
        action:()=>{ WindowFactory.OpenDialog(null, 'Cannot turn off', 'We cannot count our sheeps for technical reason.\nUnderflow, I guess.') }
    }
]

function getPrograms(pathDir:DirectoryInfo){
    return pathDir.files.map(item=>{
        return {
            label:item.name,
            action:()=>WindowFactory.OpenProgram(item.name)
        };
    })
}