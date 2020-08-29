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
                menuInfo!.x = e.clientX + "px";
                menuInfo!.y = e.clientY + "px";
            }
            manager.setCallback(ChangePosition)
        });
    }
}