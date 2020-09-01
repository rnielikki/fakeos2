<template>
    <div class="f_clockdate-content">
        <clock class="f_clockdate-clock" />
        <div>INSERT CALENDAR HERE!</div>
        <div class="popup-button" @mousedown="openTimeSettingWindow">Clock Settings</div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Clock from '@/system/time/clock.vue'
import WindowFactory from '@/components/window/window-factory'

export default Vue.extend({
    name:'ClockDatePopup',
    components: { Clock },
    methods:{
        openTimeSettingWindow:function(){
            return WindowFactory.OpenSetting("time")
        }
    }
})
</script>
<style lang="scss" scoped>
    @import 'src/scss/colorset.scss';
    .f_clockdate{
        &-content{
            background-color:$statusbar-background;
            border:1px solid $window-border;
            color:$statusbar-foreground;
            padding:.4rem .6rem;
        }
        &-clock {
            font-size:1.27rem;
            padding: .2rem .4rem;
        }
    }
    .popup-button {
        border:1px solid $window-border;
        padding:.27px .35px;
    }
</style>