import Menu from './menu.vue'
import MenuInfo from './models/menu-info'
export default {
    bind: function (el:HTMLElement, binding:any) {
        el.style.position = "relative";
        var menu:Vue | null;
        let elementRect = el.getBoundingClientRect();
        var elementX = elementRect.left;
        var elementY = elementRect.top;
        var createMenu = ()=>{
            let menuInfo = binding?.value?.menuInfo ?? new MenuInfo();
            menu = new Menu({ propsData: {
                value : binding?.value?.value,
                menuInfo: menuInfo
            }});
            menu.$props.menuInfo!.show = true;
            menu.$mount();
            el.appendChild(menu.$el);
        }
        var RemoveMenu = ()=>{
            menu!.$destroy();
            el.removeChild(menu!.$el);
            menu = null;
        }
        var ShowMenu = (e:MouseEvent)=>{
            if(menu == null){
                createMenu();
            }
            e.preventDefault();
            menu!.$props.menuInfo!.show = true;
            document.addEventListener("mousedown", RemoveMenu, { once: true, capture: false });
            menu!.$props.menuInfo!.x = (e.clientX - elementX) + "px";
            menu!.$props.menuInfo!.y = (e.clientY - elementY) + "px";
            e.stopPropagation();
        }
        el.addEventListener("contextmenu", ShowMenu);
    }
}