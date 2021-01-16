import { createDefaultMenuInfo } from './models/menu-info'
import MenuManager from './menu-manager'
import Global from '@/system/global'

export default {
    beforeMount: function (el:HTMLElement, binding:any) {
        const menuInfo = binding?.value?.menuInfo ?? createDefaultMenuInfo();
        Global.getDesktop().then(desktop=>{
            const manager = new MenuManager(el,
                binding?.value?.value,
                "contextmenu",
                menuInfo,
                desktop.parentElement as HTMLElement);

            const ChangePosition = (e:MouseEvent)=>{
                menuInfo!.x = e.clientX + "px";
                menuInfo!.y = e.clientY + "px";
            }
            manager.setCallback(ChangePosition)
        }).catch(error=>console.error(error));
    }
}