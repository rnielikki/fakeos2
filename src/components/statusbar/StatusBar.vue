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
import ClockDate from './clock-date/clock-date.vue'
import WindowStatus from './window-status/window-status.vue'
import IconStatus from './icon-status.vue'
import StartMenu from './start-menu'

import Menu from '../menu/menu'
import PopupInfo, { PopupDirection, popupDirection } from '../popups/popup-info'

export default Vue.extend({
    name:'Statusbar',
    components: { WindowStatus, ClockDate, IconStatus },
    directives: { Menu },
    data:function(){
        return {
            startMenu : StartMenu,
            startMenuInfo: new PopupInfo({ direction: popupDirection.topRight})
        }
    }
})
</script>
<style lang="scss" scoped>
    @import 'src/scss/colorset.scss';
    .statusbar {
        display: flex;
        align-items: center;
        padding:.2rem;;
        background-color: $statusbar-background;
        color:$statusbar-foreground;
        text-align: left;
    }
    .start-icon{
        position: relative;
        &:hover img {
            opacity:0.7;
        }
    }
</style>