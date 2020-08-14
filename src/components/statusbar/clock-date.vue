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
export default Vue.extend({
    name:'ClockDate',
    data:function(){
        return {
            date:Formatter.getDayFormat(CurrentDateTime.currentDate),
            time:""
        }
    },
    created:function(){
        Timer.seconds.subscribe((dateTime)=>this.$data.time = Formatter.getTimeFormat(dateTime!))
    }
})
</script>
<style lang="scss" scoped>
    .clockdate{
        text-align: center;
    }
    .date{
        font-size:80%
    }
</style>