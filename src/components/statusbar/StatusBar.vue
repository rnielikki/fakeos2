<template>
    <div class="statusbar">
        <div class="start-icon"
         v-menu="{
             value: startMenu,
             menuInfo: startMenuInfo
          }">
          <img :src="require('./start.png')" />
          </diV>
        <Window-status />
        <Icon-status />
        <Clock-date />
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ClockDate from './clock-date.vue'
import WindowStatus from './window-status/window-status.vue'
import IconStatus from './icon-status.vue'
import StartMenu from './start-menu'

import Menu from '../menu/menu'
import MenuInfo, { MenuDirection } from '../menu/models/menu-info'

export default Vue.extend({
    name:'Statusbar',
    components: { WindowStatus, ClockDate, IconStatus },
    directives: { Menu },
    data:function(){
        return {
            startMenu : StartMenu,
            startMenuInfo: new MenuInfo({ direction: MenuDirection.topRight})
        }
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
        background-color: $statusbar-background;
        color:$statusbar-foreground;
        text-align: left;
    }
    .start-icon:hover img {
        opacity:0.7;
    }
</style>