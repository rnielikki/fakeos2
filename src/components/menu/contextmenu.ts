import { createDefaultMenuInfo } from './models/menu-info'
import MenuManager from './menu-manager'
import Global from '@/system/global'

export default {
    bind: function (el:HTMLElement, binding:any) {
        let menuInfo = binding?.value?.menuInfo ?? createDefaultMenuInfo();
        Global.getDesktop().then(desktop=>{
            let manager = new MenuManager(el,
                binding?.value?.value,
                "contextmenu",
                menuInfo,
                desktop.parentElement as HTMLElement);

            var ChangePosition = (e:MouseEvent)=>{
                let elementRect = el.getBoundingClientRect();
                var elementX = elementRect.left;
                var elementY = elementRect.top;
                //menuInfo!.x = (e.clientX - elementX) + "px";
                //menuInfo!.y = (e.clientY - elementY) + "px";
                menuInfo!.x = e.clientX + "px";
                menuInfo!.y = e.clientY + "px";
            }
            manager.setCallback(ChangePosition)
        });
    }
}