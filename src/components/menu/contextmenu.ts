import Menu from './menu.vue'
import MenuInfo from './models/menu-info'
import MenuManager from './menu-manager'

export default {
    bind: function (el:HTMLElement, binding:any) {
        let menuInfo = binding?.value?.menuInfo ?? new MenuInfo()
        let manager = new MenuManager(el,
            binding?.value?.value,
            menuInfo
            , "contextmenu");

        let elementRect = el.getBoundingClientRect();
        var elementX = elementRect.left;
        var elementY = elementRect.top;

        var ChangePosition = (e:MouseEvent)=>{
            menuInfo!.x = (e.clientX - elementX) + "px";
            menuInfo!.y = (e.clientY - elementY) + "px";
        }
        manager.callback = ChangePosition;
    }
}