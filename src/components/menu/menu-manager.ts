import Menu from './menu.vue';
import MenuInfo from './models/menu-info';
import { IMenuComponent } from './models/menu-model'

export default class MenuManager{
    element:HTMLElement;
    bindingType:string;
    value:IMenuComponent[];
    menu:Vue | null;
    menuInfo:MenuInfo;
    callback:((e:MouseEvent)=>void) | null = null
    constructor(el:HTMLElement, value:IMenuComponent[], menuInfo:MenuInfo, bindingType:string){
        this.element = el;
        this.value = value;
        this.menuInfo = menuInfo;
        this.bindingType = bindingType;
        this.menu = null;
        el.style.position = "relative";
        el.addEventListener(bindingType, this.ShowMenu);
    }
    createMenu = ()=>{
        this.menu = new Menu({ propsData: {
            value : this.value,
            menuInfo: this.menuInfo
        }});
        this.menu.$mount();
        this.element.appendChild(this.menu.$el);
    }
    RemoveMenu = ()=>{
        //v-if attaches too many <!-- --> damn
        this.menu!.$destroy();
        this.element.removeChild(this.menu!.$el);
        this.menu = null;
    }
    ShowMenu = (e:Event)=>{
        if(this.menu == null){
            this.createMenu();
        }
        e.preventDefault();
        this.menu!.$props.menuInfo!.show = true;
        document.addEventListener("mousedown", this.RemoveMenu, { once: true, capture: false });
        if(this.callback !== null)
            this.callback(e as MouseEvent);
        e.stopPropagation();
    }
}