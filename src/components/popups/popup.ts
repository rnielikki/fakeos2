import PopupInfo from './popup-info';
import PopupComponent from './popup.vue'
import { App, ComponentPublicInstance, createApp } from 'vue'
import instantiater from '@/system/instantiater';

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
        this.popupInfo = popupInfo ?? new PopupInfo();
        this.parentElement = parent ?? button;
        this.contentFactory = contentFactory;
        this.bindingType = bindingType;
        button.addEventListener(bindingType, this.show, false);
    }
    //1. v-if attaches too many <!-- --> damn
    //2. option can be changed depending on the state (any state - system or software)
    create = ()=>{
        this.childApp = this.contentFactory();
        this.popupContent = createApp(PopupComponent,{
            popupInfo: this.popupInfo
        });//.slots: [ this.childApp ];
        this.popupApp = instantiater.Mount(this.popupContent, this.parentElement);

        /* SLOT-FILL */
        this.popupElement = this.popupApp.$el;
        instantiater.SetSlot(this.childApp, this.popupElement!, ".f_popup-wrapper");
        this.parentElement.appendChild(this.popupElement!);
    }
    remove = ()=>{
        if(!this.popupContent) return;
        if(this.childApp!=null){
            instantiater.UnSetSlot(this.childApp);
        }
        this.parentElement.removeChild(this.popupElement!);
        this.popupContent?.unmount(this.parentElement!);
        this.popupContent = null;
        this.childApp = null;
        this.parentElement.classList.remove("f_popup-selected")
    }
    show = (e:Event)=>{
        if(this.callback !== null){
            this.callback(e as MouseEvent);
        }
        if(this.popupContent == null){
            this.create();
        }
        e.preventDefault();
        document.addEventListener("mousedown", this.remove, { once: true, capture: false });
        e.stopPropagation();
        this.parentElement.classList.add("f_popup-selected")
    }
}