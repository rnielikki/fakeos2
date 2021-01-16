import windowFactory from '@/components/window/window-factory'
import { ComponentPublicInstance } from 'vue'

export default function(target:ComponentPublicInstance){
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
                        //@ts-ignore
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