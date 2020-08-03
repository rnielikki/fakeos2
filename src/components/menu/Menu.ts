//import Menu from './menu.vue';
import MenuInfo from './models/menu-info';
import MenuManager from './menu-manager'

export default {
    bind: function (el:HTMLElement, binding:any) {
        new MenuManager(el,
            binding?.value?.value,
            binding?.value?.menuInfo ?? new MenuInfo()
            , "click");
    }
}
