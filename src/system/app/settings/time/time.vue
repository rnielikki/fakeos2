<template>
    <div class="root">
        <h1><clock class="f_clockdate-clock" /></h1>
        <div>{{ day }}</div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Clock from '@/system/time/clock.vue'
import SystemClock from '@/system/time/current'
import ClockFormatter from '@/system/time/formatter'

export default Vue.extend({
    components: { Clock },
    data:function(){
        return {
            title:"Time settings"
        }
    },
    computed:{
        day:function(){
            return ClockFormatter.getDayFormat(SystemClock.currentDate)
        }
    }
})
</script>
<style scoped>
.root {
    padding:2.7rem;
    text-align:center;
}
</style>