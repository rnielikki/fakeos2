import { ComponentPublicInstance } from 'vue';
import Observable from './core/observer'

// currently opened windows.
// the array is in the order of recent selection.
//- ADD TEST: window target array index should be same as z-index
let openedWin64s = new Array<ComponentPublicInstance>();
let currentWin64:ComponentPublicInstance | null = null;
document.addEventListener("mousedown",(e)=>select(null, e), true);

const addedObservable = new Observable<ComponentPublicInstance>();
const removedObservable = new Observable<ComponentPublicInstance>();

//- ADD TEST:only one or less window 'selected' is true
//- ADD TEST:and it's same as currentWin64 (if 0 selected then currentWin64 is null)
export default {
    register:function(target:ComponentPublicInstance){
        //@ts-ignore
        target.$data.zIndex = openedWin64s.length;
        selectAndPush(target);
        addedObservable.invoke(target)
    },
    unregister:function(target:ComponentPublicInstance){
        if(deleteWindow(target)) {
            removedObservable.invoke(target);
            currentWin64 = null;
            reorderZIndex();
        }
    },
    select:function(target:ComponentPublicInstance){
        if(currentWin64 === target) return;
        if(deleteWindow(target)){
            selectAndPush(target);
        }
    },
    deselect:function(){
        select(null);
    },
    isSelected:function(target:ComponentPublicInstance){
        return currentWin64 === target;
    }
}
export const Win64Events = {
    OnAdded:{
        subscribe:function(func:(target:ComponentPublicInstance)=>void){
            addedObservable.register(func);
        },
        unsubscribe:function(func:(target:ComponentPublicInstance)=>void):boolean{
            return addedObservable.unregister(func);
        }
    },
    OnRemoved:{
        subscribe:function(func:(target:ComponentPublicInstance)=>void){
            return removedObservable.register(func);
        },
        unsubscribe:function(func:(target:ComponentPublicInstance)=>void):boolean{
            return removedObservable.unregister(func);
        }
    }
}
function selectAndPush(target:ComponentPublicInstance){
    select(target);
    //@ts-ignore
    target.$data.zIndex = openedWin64s.length;
    openedWin64s.push(target);
}
function select(target:ComponentPublicInstance | null, e?:Event){
    const id = (e?.target as HTMLElement)?.dataset?.windowId
    if(id && id == (currentWin64 as any)?._uid){
        return;
    }
    if(currentWin64 !== null){
        //@ts-ignore
        currentWin64.$data.selected = false;
    }
    if(target !== null){
        //@ts-ignore
        target.$data.selected = true;
    }
    currentWin64 = target;
}
function deleteWindow(target:ComponentPublicInstance):boolean{
    const oldLength = openedWin64s.length;
    const targetId = (target as any)._uid
    openedWin64s = openedWin64s.filter((w:any)=>w._uid!==targetId);
    if(oldLength !== openedWin64s.length){
        reorderZIndex();
        return true;
    }
    else{
        return false;
    }
}
function reorderZIndex(){
    for(let i=0; i < openedWin64s.length; i++) {
        const data = openedWin64s[i].$data;
        //@ts-ignore
        data.selected = false;
        //@ts-ignore
        data.zIndex = i;
    }
}