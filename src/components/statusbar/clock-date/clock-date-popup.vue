<template>
    <div class="f_clockdate-content">
        <clock class="f_clockdate-clock" />
        <calendar class="cal" />
        <div class="popup-button" @mousedown="openTimeSettingWindow">Clock Settings</div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Clock from '@/components/ui-components/datetime/clock.vue'
import WindowFactory from '@/components/window/window-factory'
import Calendar from '@/components/ui-components/datetime/calendar.vue'

export default Vue.extend({
    name:'ClockDatePopup',
    components: { Clock, Calendar },
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
            font-size: 1.97rem;
            padding: .47rem;
            display: block;
        }
    }
    .popup-button {
        border:1px solid $window-border;
        padding:.4rem .35rem;
    }
    .cal {
        font-size:90%;
        padding:0 .8rem 1.75rem .8rem
    }
</style>