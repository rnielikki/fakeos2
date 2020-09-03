import windowFactory from '@/components/window/window-factory'
import explorerModal from '../explorer/explorer-modal'
import { checkType } from '@/system/filesystem/mime'

export default function(target:Vue){
    return {
        content:[
            {
                label:'File',
                submenu:[
                    {
                        label:"Open",
                        action:()=>(target as any).openFile()
                    },
                    {
                        label:"Save",
                        action:()=>(target as any).saveFile()
                    },
                    {
                        label:"Close",
                        action:()=>target.$data.f_targetWindow.close()
                    }
                ]
            },
            {
                label:'Help',
                submenu:[
                    {
                        label: "Info",
                        action:()=>{
                            windowFactory.OpenDialog(target, "Text Editor", "FakeOS2 Text Editor\nVerson 0.30000000000000004")
                        }
                    }
                ]
            }
        ]
    }
}