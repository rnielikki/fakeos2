import PopupInfo from './popup-info';
import PopupComponent from './popup.vue'
import { App, ComponentPublicInstance, createApp } from 'vue'

export default class Popup {
    parentElement:HTMLElement;
    bindingType:string;
    popupContent:App<Element> | null = null;
    popupElement:Element | null = null;
    popupInfo:PopupInfo;
    callback:((e:MouseEvent)=>void) | null = null
    contentFactory:(()=>App<Element>);
    private childApp:App<Element> | null = null;
    private popupApp:ComponentPublicInstance | null = null;
    constructor(button:HTMLElement, contentFactory:()=>App<Element>, bindingType:string, popupInfo?:PopupInfo, parent?:HTMLElement){
        this.parentElement = parent ?? button;
        this.contentFactory = contentFactory;
        this.bindingType = bindingType;
        this.popupInfo = popupInfo ?? new PopupInfo();
        button.addEventListener(bindingType, this.show, false);
    }
    //1. v-if attaches too many <!-- --> damn
    //2. option can be changed depending on the state (any state - system or software)
    create = ()=>{
        this.childApp = this.contentFactory();
        this.popupContent = createApp(PopupComponent,{
            popupInfo: this.popupInfo
        });//.slots: [ this.childApp ];
        this.popupApp = this.popupContent.mount(this.parentElement);
        this.popupElement = this.popupApp.$el;
        this.childApp.mount(this.popupElement!);
        this.parentElement.appendChild(this.popupElement!);
    }
    remove = ()=>{
        if(!this.popupContent) return;
        this.childApp?.unmount(this.popupElement!);
        this.parentElement.removeChild(this.popupElement!);
        this.popupContent?.unmount(this.parentElement!);
        this.popupContent = null;
        this.childApp = null;
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