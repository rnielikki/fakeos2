<template>
    <div class="statusbar">
        <Ui-button text = "Start"
         v-menu="{
             value: [{ label: 'Help' }, { label: 'Do nothing' }, { label: 'Sleep' }, { label: 'Turn Off'}],
             menuInfo: startMenuInfo
          }" />
        <Window-status />
        <Icon-status />
        <Clock-date />
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import UiButton from '../ui-components/button.vue'
import ClockDate from './clock-date.vue'
import WindowStatus from './window-status.vue'
import IconStatus from './icon-status.vue'

import Menu from '../menu/menu'
import MenuInfo, { MenuDirection } from '../menu/models/menu-info'

export default Vue.extend({
    name:'Statusbar',
    components: { UiButton, WindowStatus, ClockDate, IconStatus },
    directives: { Menu },
    data:function(){
        return { startMenuInfo: new MenuInfo({ direction: MenuDirection.topRight}) }
    }
})
</script>
<style lang="scss" scoped>
    @import 'src/scss/colorset.scss';
    .statusbar {
        position:absolute;
        display: flex;
        align-items: center;
        padding:.2rem;
        left:0;
        right:0;
        bottom:0;
        background-color: $window-background;
        text-align: left;
    }
</style>