import Menu from './menu.vue';
import PopupInfo from '../popups/popup-info';
import { IMenuComponent } from './models/menu-model'
import Popup from '../popups/popup'
import { defaultMenuInfo } from './models/menu-info'

export default class MenuManager{
    value:IMenuComponent[];
    popup:Popup;
    callback:((e:MouseEvent)=>void) | null = null
    constructor(el:HTMLElement,  value:IMenuComponent[], bindingType:string, popupInfo?:PopupInfo){
        this.value = value;
        this.popup = new Popup(el, this.menuFactory, bindingType, popupInfo ?? new PopupInfo());
    }
    setCallback(callback:((e:MouseEvent)=>void)){
        this.popup.callback = callback
    }
    menuFactory = ()=>{
        return new Menu({ propsData: {
            value : this.value,
            onDeleted: this.popup.remove
        }});
    }
}