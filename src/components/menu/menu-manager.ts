import Menu from './menu.vue';
import PopupInfo from '../popups/popup-info';
import { IMenuComponent } from './models/menu-model'
import Popup from '../popups/popup'
import { createDefaultMenuInfo } from './models/menu-info'
import { createApp } from 'vue';

export default class MenuManager{
    value:IMenuComponent[];
    popup:Popup;
    callback:((e:MouseEvent)=>void) | null = null
    constructor(el:HTMLElement,  value:IMenuComponent[], bindingType:string, popupInfo?:PopupInfo, parent?:HTMLElement){
        this.value = value;
        this.popup = new Popup(el, this.menuFactory, bindingType, popupInfo ?? createDefaultMenuInfo(), parent);
    }
    setCallback(callback:((e:MouseEvent)=>void)){
        this.popup.callback = callback
    }
    menuFactory = ()=>{
        return createApp(Menu,
        {
            value : this.value,
            onDeleted: this.popup.remove
        });
    }
}