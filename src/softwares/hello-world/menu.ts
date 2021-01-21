import windowFactory from '@/components/window/window-factory'
import { ComponentPublicInstance } from 'vue'

export default function(target:ComponentPublicInstance){
    return {
        content:[
            {
                label:'file',
                submenu:[
                    {
                        label:"open",
                        submenu:[
                            { label:"from nothing" },
                            { label:"from asdf"}
                        ]
                    },
                    {
                        label:"close",
                        //@ts-ignore
                        action:()=> windowController.close(target.$data.f_targetWindow)
                    }
                ]
            },
            {
                label:'help',
                submenu:[
                    { label:"help us" },
                    {
                        label: "versin info",
                        action:()=>{
                            windowFactory.OpenDialog(target, "Version Info", "FakeOS2\nProgram info")
                        }
                    }
                ]
            }
        ],
        rightClick:[
            {
                label:'whatever',
                action:()=>{}
            }
        ]
    }
}