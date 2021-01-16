<template>
    <span>{{ currentTime }}</span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SystemClock from '@/system/time/current'
import ClockFormatter from '@/system/time/formatter'
import ClockObserver from '@/system/time/timer'
export default defineComponent({
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
                Object.assign(this.$data, {"currentTime": ClockFormatter.getTimeFormat(date)})
            }
        }
    },
    beforeUnmount:function(){
        ClockObserver.seconds.unsubscribe(this.clockChanger)
    }
})
</script>