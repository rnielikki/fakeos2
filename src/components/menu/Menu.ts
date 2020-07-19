import Menu from './menu.vue';
import MenuInfo from './models/menu-info';
export default {
    bind: function (el:HTMLElement, binding:any) {
        el.style.position = "relative";
        var bindingType:string = binding?.type ?? "click";
        if(bindingType == "contextmenu") throw "For right-click menu, use v-contextmenu (contextmenu.ts) instead.";
        var menuInfo = binding?.value?.menuInfo ?? new MenuInfo();
        var menu = new Menu({ propsData: {
            value : binding?.value?.value,
            menuInfo: menuInfo
        }});
        var ShowMenu = (e:Event)=>{
            e.preventDefault();
            menuInfo.show = true;
            document.addEventListener("mousedown", ()=> menuInfo.show=false, { once: true, capture: false });
            e.stopPropagation();
        }
        menu.$mount();
        el.appendChild(menu.$el);
        el.addEventListener(bindingType, ShowMenu);
    }
}
