import { App } from "vue";

//For Vue 3 compatibility
export default {
    Mount: function(app:App<Element>, target:Element){
        const frag = document.createElement("div");
        frag.classList.add("temp-parent");
        const mounted = app.mount(frag);
        target.appendChild(mounted.$el);
        frag.remove();
        //const realTarget = target.firstChild as Element;
        //const mounted = app.mount(realTarget ?? target);
        return mounted;
    },
    //Slot filling is marked as - /* SLOT-FILL */
    SetSlot: function(app:App<Element>, element:Element, classQuery:string){
        const target = element.querySelector(classQuery);
        if(target==null){
            console.warn("target "+classQuery+" not found from element "+element.tagName+" while attaching to "+app.component.name);
            return;
        }
        return app.mount(target);
    },
    UnSetSlot: function(app:App<Element>){
        if(app._container){
            app.unmount(app._container);
        }
    }
}