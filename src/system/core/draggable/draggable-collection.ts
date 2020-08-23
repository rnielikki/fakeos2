//provides collection of reordering by dragging.

import { nextTick } from 'vue/types/umd';

//do NOT use with absolute/fixed element.
const dragTarget = document.createElement("div");
(function(){
    dragTarget.addEventListener("dragover", (e)=>e.preventDefault);
})();
let dropInfo:{targetIndex:number, collection:Array<object>, item:object } | null = null;

export default {
            /*
    bind:function (el:HTMLElement, binding:any) {

        let index = binding?.value?.index
        let collection = binding?.value?.collection;
        let data = binding?.value?.data
        if(!collection) {
            throw "on usage [draggable] index, collection or data is not defined"
        }
        let gap = binding?.value?.gap;
        el.draggable = true;
        let _dragTarget = dragTarget.cloneNode(false) as HTMLElement;
        if(binding?.value?.horizontal){
            _dragTarget.style.width = "100%";
            _dragTarget.style.height = gap ?? "0.75rem";
        }
        else{
            _dragTarget.style.height="100%";
            _dragTarget.style.width = gap ?? "0.75rem";
            _dragTarget.style.display="inline-block"
        }
        el.addEventListener("dragend", (e)=>endDrag(e, data, collection));
        let beforeNode = _dragTarget.cloneNode(false) as HTMLElement;
        let afterNode = _dragTarget.cloneNode(false) as HTMLElement;
        //el.insertAdjacentElement("afterbegin", beforeNode);
        //el.insertAdjacentElement("beforeend", afterNode);
        beforeNode.addEventListener("drop", ()=> drop(collection, data))
        afterNode.addEventListener("drop", ()=>drop(collection, data))
    },
            */
    inserted:function(el:HTMLElement, binding:any, vnode:any){ //maybe needs "updated" too?
        let collection = binding?.value?.collection;
        if(!collection) {
            throw "on usage [draggable] index, collection or data is not defined"
        }
        /*
        let _dragTarget = dragTarget.cloneNode(false) as HTMLElement;
        let gap = binding?.value?.gap;
        if(binding?.value?.horizontal){
            _dragTarget.style.width = "100%";
            _dragTarget.style.height = gap ?? "0.75rem";
        }
        else{
            _dragTarget.style.height="100%";
            _dragTarget.style.width = gap ?? "0.75rem";
            _dragTarget.style.display="inline-block"
        }
        */
        let index = 0;
        for(let child of vnode.children){
            child.elm.draggable = true;
            child.elm.addEventListener("dragend", (e:Event)=>endDrag(e, collection[index++], collection))
        }
    }
}
function endDrag(e:Event, item:object, collection:object[]){
    e.preventDefault();
    if(dropInfo){
        let itemIndex = collection.indexOf(item);
        if(itemIndex == -1) return;
        if(Object.prototype.isPrototypeOf.call(Object.getPrototypeOf(item), dropInfo?.item)) {
            let movingItem = collection.splice(itemIndex, 1)[0];
            dropInfo.collection.splice(dropInfo.targetIndex, 0, movingItem);
        }
        dropInfo = null;
    }
}
function drop(collection:object[], index:number) {
    dropInfo = {
        targetIndex:index,
        collection:collection,
        item: collection[index]
    }
}