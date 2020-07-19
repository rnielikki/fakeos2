import Menu from './menu.vue'
import MenuInfo from './models/menu-info'
export default {
    bind: function (el:HTMLElement, binding:any) {
        el.style.position = "relative";
        var menuInfo:MenuInfo = binding?.value?.menuInfo ?? new MenuInfo();
        var menu = new Menu({ propsData: {
            value : binding?.value?.value,
            menuInfo: menuInfo
        }});
        let elementRect = el.getBoundingClientRect();
        var elementX = elementRect.left;
        var elementY = elementRect.top;
        var ShowMenu = (e:MouseEvent)=>{
            e.preventDefault();
            menuInfo.show = true;
            document.addEventListener("mousedown", ()=>menuInfo.show=false, { once: true, capture: false });
            menuInfo.x = e.clientX - elementX;
            menuInfo.y = e.clientY - elementY;
            e.stopPropagation();
        }
        menu.$mount();
        el.appendChild(menu.$el);
        el.addEventListener("contextmenu", ShowMenu);
    }
}