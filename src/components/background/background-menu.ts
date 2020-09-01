import WindowFactory from '../window/window-factory'
export default [
    {
    label: 'Open...',
    submenu:[
        {label:'sub1test'},
        {label:'test2',
        submenu:
            [
                { label:'lol' },
                {
                    label: 'Next...',
                    action:function(){
                        WindowFactory.OpenProgram("hello-world");
                    }
                }
            ]
        }
    ]
    },
    {
        label: 'Play for me',
        action:function(){
        WindowFactory.OpenProgram("core/player")
        }
    },
    {
        label: 'Set Background',
        action:function(){
            WindowFactory.OpenSetting("background");
        }
    }
]