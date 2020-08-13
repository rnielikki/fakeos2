import Window from '../components/window/components/Window.vue'
// currently opened windows.
// the array is in the order of recent selection.
//- ADD TEST: window target array index should be same as z-index
let openedWindows = new Array<Window>();
let currentWindow:Window | null = null;
document.addEventListener("mousedown",()=>select(null), true);

let onAdded = new Array<Function>();
let onRemoved = new Array<Function>();

//- ADD TEST:only one or less window 'selected' is true
//- ADD TEST:and it's same as currentWindow (if 0 selected then currentWindow is null)
export default {
    register:function(target:Window){
        target.$data.zIndex = openedWindows.length;
        selectAndPush(target);
        onAdded.forEach(func=>func(target));
    },
    unregister:function(target:Window){
        if(deleteWindow(target)) {
            onRemoved.forEach(func=>func(target));
            currentWindow = null;
            reorderZIndex();
        }
    },
    select:function(target:Window){
        if(currentWindow === target) return;
        if(deleteWindow(target)){
            selectAndPush(target);
        }
    },
    deselect:function(){
        select(null);
    },
    isSelected:function(target:Window){
        return currentWindow === target;
    }
}
export let WindowEvents = {
    OnAdded:{
        subscribe:function(func:(target:Window)=>void){
            onAdded.push(func);
        },
        unsubscribe:function(func:(target:Window)=>void){
            onAdded = onAdded.filter(f=>f!==func)
        }
    },
    OnRemoved:{
        subscribe:function(func:(target:Window)=>void){
            onRemoved.push(func);
        },
        unsubscribe:function(func:(target:Window)=>void){
            onRemoved = onAdded.filter(f=>f!==func)
        }
    }
}
function selectAndPush(target:Window){
    select(target);
    target.$data.zIndex = openedWindows.length;
    openedWindows.push(target);
}
function select(target:Window | null){
    if(currentWindow !== null){
        currentWindow.$data.selected = false;
    }
    if(target !== null){
        target.$data.selected = true;
    }
    currentWindow = target;
}
function deleteWindow(target:Window):boolean{
    let oldLength = openedWindows.length;
    let targetId = (target as any)._uid
    openedWindows = openedWindows.filter((w:any)=>w._uid!==targetId);
    if(oldLength !== openedWindows.length){
        reorderZIndex();
        return true;
    }
    else{
        return false;
    }
}
function reorderZIndex(){
    for(let i=0; i < openedWindows.length; i++) {
        let data = openedWindows[i].$data;
        data.selected = false;
        data.zIndex = i;
    }
}