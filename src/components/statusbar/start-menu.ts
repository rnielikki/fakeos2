import WindowFactory from '../window/window-factory'
export default [
    { label: 'Help' },
    { label: 'Do nothing', action:()=>{ WindowFactory.OpenDialog(null, 'object Object', 'message') } },
    { label: 'Sleep' }, { label: 'Turn Off'}
]