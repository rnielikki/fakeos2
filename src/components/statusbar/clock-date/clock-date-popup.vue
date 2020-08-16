<template>
    <div class="f_clockdate-content">
        <div class="f_clockdate-clock" ref="currentTime"></div>
        <div>INSERT CALENDAR HERE!</div>
    </div>
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
    watch:{
        currentTime:function(val){
            (this.$refs.currentTime as HTMLElement).innerText = val;
        }
    },
    beforeDestroy:function(){
        ClockObserver.seconds.unsubscribe(this.clockChanger)
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
</style>