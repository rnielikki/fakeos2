import WindowFactory from '../window/window-factory'
export default [
    { label: 'Help' },
    { label: 'settings' , action:()=>{ WindowFactory.OpenSetting() }},
    { label: 'Do nothing', action:()=>{ WindowFactory.OpenDialog(null, 'object Object', 'message') } },
    { label: 'Sleep' }, { label: 'Turn Off'}
]