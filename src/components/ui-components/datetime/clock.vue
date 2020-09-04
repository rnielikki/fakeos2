<template>
    <span>{{ currentTime }}</span>
</template>
<script lang="ts">
import Vue from 'vue'
import SystemClock from '@/system/time/current'
import ClockFormatter from '@/system/time/formatter'
import ClockObserver from '@/system/time/timer'
export default Vue.extend({
    name:'ClockDatePopup',
    data:function(){
        return {
            currentTime:""
        };
    },
    mounted:function(){
        this.clockChanger(SystemClock.currentDate)
        ClockObserver.seconds.subscribe(this.clockChanger);
    },
    computed:{
        clockChanger:function(){
            return (date:Date)=>{
                this.$set(this.$data, "currentTime", ClockFormatter.getTimeFormat(date))
            }
        }
    },
    beforeDestroy:function(){
        ClockObserver.seconds.unsubscribe(this.clockChanger)
    }
})
</script>