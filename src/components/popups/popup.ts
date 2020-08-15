import PopupInfo from './popup-info';

export default class Popup {
    parentElement:HTMLElement;
    bindingType:string;
    popupContent:Vue | null = null;
    popupInfo:PopupInfo;
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
        this.popupContent = this.contentFactory();
        this.popupContent.$mount();
        this.parentElement.appendChild(this.popupContent.$el);
    }
    remove = ()=>{
        if(!this.popupContent) return;
        this.popupContent.$destroy();
        this.parentElement.removeChild(this.popupContent.$el);
        this.popupContent = null;
    }
    show = (e:Event)=>{
        if(this.popupContent == null){
            this.create();
        }
        e.preventDefault();
        this.popupContent!.$props.popupInfo.show = true;
        document.addEventListener("mousedown", this.remove, { once: true, capture: false });
        if(this.callback !== null)
            this.callback(e as MouseEvent);
        e.stopPropagation();
    }
}