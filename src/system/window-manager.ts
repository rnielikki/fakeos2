import Window from '../components/window/components/Window.vue'
// currently opened windows.
// the array is in the order of recent selection.
//- ADD TEST: window target array index should be same as z-index
let openedWindows = new Array<Window>();
let currentWindow:Window | null = null;
document.querySelector(".background")?.addEventListener("mousedown", ()=>select(null));

let onAdded = new Array<Function>();
let onRemoved = new Array<Function>();

//- ADD TEST:only one or less window 'selected' is true
//- ADD TEST:and it's same as currentWindow (if 0 selected then currentWindow is null)
export default {
    register:function(target:Window){
        target.$props.zIndex = openedWindows.length;
        selectAndPush(target);
        onAdded.forEach(func=>func(target));
    },
    unregister:function(target:Window){
        deleteWindow(target);
        currentWindow = null;
        reorderZIndex();
        onRemoved.forEach(func=>func(target));
    },
    select:function(target:Window){
        if(currentWindow === target) return;
        if(deleteWindow(target)){
            selectAndPush(target);
        }
    },
    deselect:function(){
        select(null);
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
    target.$props.zIndex = openedWindows.length;
    openedWindows.push(target);
}
function select(target:Window | null){
    if(currentWindow !== null){
        currentWindow.$props.selected = false;
    }
    if(target !== null){
        target.$props.selected = true;
    }
    currentWindow = target;
}
function deleteWindow(target:Window):boolean{
    let targetIndex = openedWindows.indexOf(target);
    if(targetIndex !== -1){
        openedWindows.splice(targetIndex, 1);
        reorderZIndex(targetIndex);
        return true;
    }
    else{
        return false;
    }
}
function reorderZIndex(targetIndex:number = 0){
    for(let i=targetIndex; i < openedWindows.length; i++) {
        let props = openedWindows[i].$props;
        props.selected = false;
        props.zIndex = i;
    }
}