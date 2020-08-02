import Menu from './menu.vue';
import MenuInfo from './models/menu-info';
export default {
    bind: function (el:HTMLElement, binding:any) {
        el.style.position = "relative";
        var bindingType:string = binding?.type ?? "click";
        if(bindingType == "contextmenu") throw "For right-click menu, use v-contextmenu (contextmenu.ts) instead.";
        var menu:Vue | null;
        var createMenu = ()=>{
            let menuInfo = binding?.value?.menuInfo ?? new MenuInfo();
            menu = new Menu({ propsData: {
                value : binding?.value?.value,
                menuInfo: menuInfo
            }});
            menu.$mount();
            el.appendChild(menu.$el);
        }
        var RemoveMenu = ()=>{
            //v-if attaches too many <!-- --> damn
            menu!.$destroy();
            el.removeChild(menu!.$el);
            menu = null;
        }
        var ShowMenu = (e:Event)=>{
            if(menu == null){
                createMenu();
            }
            e.preventDefault();
            menu!.$props.menuInfo!.show = true;
            document.addEventListener("mousedown", RemoveMenu, { once: true, capture: false });
            e.stopPropagation();
        }
        el.addEventListener(bindingType, ShowMenu);
    }
}
