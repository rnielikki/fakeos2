<template>
    <div class="clockdate">
        <div class="clock">{{ time }}</div>
        <div class="date">{{ date }}</div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Timer from '@/system/time/timer'
import CurrentDateTime from '@/system/time/current'
import Formatter from '@/system/time/formatter'
import Popup from '../../popups/popup'
import ClockDatePopup from './clock-date-popup.vue'
import PopupInfo, { popupDirection } from '@/components/popups/popup-info'

export default Vue.extend({
    name:'ClockDate',
    data:function(){
        let current = CurrentDateTime.currentDate;
        return {
            date:Formatter.getDayFormat(current),
            time:Formatter.getHourMinuteFormat(current),
            f_private_today: current.getDate()
        }
    },
    created:function(){
        Timer.minutes.subscribe((dateTime)=>{
                this.$data.time = Formatter.getHourMinuteFormat(dateTime)
                if(dateTime.getDate()!=this.f_private_today) {
                    this.$data.date = Formatter.getDayFormat(CurrentDateTime.currentDate);
                }
            })
    },
    mounted:function(){
        new Popup(this.$el as HTMLElement, ()=>new ClockDatePopup(), "click", new PopupInfo({
            direction:popupDirection.topLeft,
            x:"100%"
        }));
    }
})
</script>
<style lang="scss" scoped>
    .clockdate{
        text-align: center;
        position: relative;
    }
    .date{
        font-size:80%
    }
</style>