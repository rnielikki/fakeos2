import Window from '../components/window/components/Window.vue'
let currentWindows = new Array<Window>();
document.querySelector(".background")?.addEventListener("mousedown", deselectAll);
export default {
    register:function(target:Window){
        target.$props.zIndex = currentWindows.length;
        selectAndPush(target);
    },
    unregister:function(target:Window){
        currentWindows = currentWindows.filter(_window =>_window !== target);
    },
    select:function(target:Window){
        let targetIndex = currentWindows.indexOf(target);
        if(targetIndex !== -1){
            currentWindows.splice(targetIndex, 1)[0];
            selectAndPush(target);
        }
    },
    deselect:function(){
        deselectAll();
    }
}
function selectAndPush(target:Window){
    deselectAll();
    target.$props.selected = true;
    target.$props.zIndex = currentWindows.length;
    currentWindows.push(target);
}
function deselectAll(){
    for(let i=0; i < currentWindows.length; i++) {
        let props = currentWindows[i].$props;
        props.selected = false;
        props.zIndex = i;
    }
}