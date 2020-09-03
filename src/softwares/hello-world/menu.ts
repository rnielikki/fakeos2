import windowFactory from '@/components/window/window-factory'

export default function(target:Vue){
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
                        action:()=>target.$data.f_targetWindow.close()
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