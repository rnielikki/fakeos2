import Window from '../components/window/components/Window.vue'
import Observable from './core/observer'
// currently opened windows.
// the array is in the order of recent selection.
//- ADD TEST: window target array index should be same as z-index
let openedWindows = new Array<Window>();
let currentWindow:Window | null = null;
document.addEventListener("mousedown",()=>select(null), true);

let addedObservable = new Observable<Window>();
let removedObservable = new Observable<Window>();

//- ADD TEST:only one or less window 'selected' is true
//- ADD TEST:and it's same as currentWindow (if 0 selected then currentWindow is null)
export default {
    register:function(target:Window){
        target.$data.zIndex = openedWindows.length;
        selectAndPush(target);
        addedObservable.invoke(target)
    },
    unregister:function(target:Window){
        if(deleteWindow(target)) {
            removedObservable.invoke(target);
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
            addedObservable.register(func);
        },
        unsubscribe:function(func:(target:Window)=>void):boolean{
            return addedObservable.unregister(func);
        }
    },
    OnRemoved:{
        subscribe:function(func:(target:Window)=>void){
            return removedObservable.register(func);
        },
        unsubscribe:function(func:(target:Window)=>void):boolean{
            return removedObservable.unregister(func);
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