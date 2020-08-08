<template>
    <div class="clockdate">
        <div class="clock">{{ time }}</div>
        <div class="date">{{ date }}</div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Clock from '../../system/clock'
export default Vue.extend({
    name:'ClockDate',
    data:function(){
        return {
            date:Clock.currentDay,
            time:Clock.currentTime
        }
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