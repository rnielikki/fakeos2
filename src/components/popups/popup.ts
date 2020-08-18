import PopupInfo from './popup-info';
import PopupComponent from './popup.vue'

export default class Popup {
    parentElement:HTMLElement;
    bindingType:string;
    popupContent:Vue | null = null;
    popupInfo:PopupInfo;
    child:Vue | null = null;
    callback:((e:MouseEvent)=>void) | null = null
    contentFactory:(()=>Vue);
    constructor(button:HTMLElement, contentFactory:()=>Vue, bindingType:string, popupInfo?:PopupInfo){
        this.parentElement = button;
        this.contentFactory = contentFactory;
        this.bindingType = bindingType;
        this.popupInfo = popupInfo ?? new PopupInfo();
        button.style.position = "relative";
        button.addEventListener(bindingType, this.show);
    }
    //1. v-if attaches too many <!-- --> damn
    //2. option can be changed depending on the state (any state - system or software)
    create = ()=>{
        this.popupContent = new PopupComponent({
            propsData:{
                popupInfo: this.popupInfo
            }
        });
        this.child = this.contentFactory();
        this.child.$mount();
        this.popupContent.$slots.default = [ (this.child as any)._vnode ]
        this.popupContent.$mount();
        this.parentElement.appendChild(this.popupContent.$el);
    }
    remove = ()=>{
        if(!this.popupContent) return;
        this.popupContent.$destroy();
        this.child?.$destroy();
        this.parentElement.removeChild(this.popupContent.$el);
        this.popupContent = null;
        this.child = null;
        this.parentElement.classList.remove("f_popup-selected")
    }
    show = (e:Event)=>{
        if(this.popupContent == null){
            this.create();
        }
        e.preventDefault();
        document.addEventListener("mousedown", this.remove, { once: true, capture: false });
        if(this.callback !== null)
            this.callback(e as MouseEvent);
        e.stopPropagation();
        this.parentElement.classList.add("f_popup-selected")
    }
}