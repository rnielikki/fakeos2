import Menu from './menu.vue';
import MenuInfo from './models/menu-info';
import { IMenuComponent } from './models/menu-model'

export default class MenuManager{
    element:HTMLElement;
    bindingType:string;
    value:IMenuComponent[];
    menu:Vue | null = null;
    menuInfo:MenuInfo;
    callback:((e:MouseEvent)=>void) | null = null
    constructor(el:HTMLElement, value:IMenuComponent[], menuInfo:MenuInfo, bindingType:string){
        this.element = el;
        this.value = value;
        this.menuInfo = menuInfo;
        this.bindingType = bindingType;
        el.style.position = "relative";
        el.addEventListener(bindingType, this.ShowMenu);
    }
    //1. v-if attaches too many <!-- --> damn
    //2. option can be changed depending on the state (any state - system or software)
    createMenu = ()=>{
        this.menu = new Menu({ propsData: {
            value : this.value,
            menuInfo: this.menuInfo,
            onDeleted: this.RemoveMenu
        }});
        this.menu.$mount();
        this.element.appendChild(this.menu.$el);
    }
    RemoveMenu = ()=>{
        if(!this.menu) return;
        this.menu.$destroy();
        this.element.removeChild(this.menu.$el);
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