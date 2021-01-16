<template>
    <div style="text-align:center;">
        <div clasS="calendar-wrap">
            <div class="month-wrap">
                <span class="arrow" @click="changeMonth(-1)" @mousedown.stop>&#9664;</span>
                <span class="month">{{ month }} {{ year}}</span>
                <span class="arrow" @click="changeMonth(1)" @mousedown.stop>&#9654;</span>
            </div>
            <div class="days-table">
                <div v-for="emptyDay in firstDay" :key="emptyDay">
                </div>
                <div v-for="index in days" :key="'f_date-'+index" :class="{ sunday: (index+firstDay) % 7 === 1}">
                {{ index }}
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import systemDate from '@/system/time/current'
export default defineComponent({
    data:function(){
        var date = this.$props.date ? new Date(this.$props.date) : systemDate.currentDate;
        return {
            f_date:date
        }
    },
    props:{
        date:{
            type:Date,
            required:false
        }
    },
    computed:{
        month():number{ return this.$data.f_date.getMonth()+1 },
        day():number{ return this.$data.f_date.getDate() },
        year():number{ return this.$data.f_date.getFullYear() },
        days():number{
            //@ts-ignore
            return (new Date(this.year, this.month, 0)).getDate();
        },
        firstDay():number{
            //@ts-ignore
            return new Date(this.year, this.month-1, 1).getDay();
        }
    },
    methods:{
        changeMonth:function(change:number){
            Object.assign(this.$data,{"f_date":new Date(this.f_date.setMonth(this.month-1+change))});
        }
    }
})
</script>
<style scoped>
/* didn't use 'rem' to set the calendar size by using font size! */
.month-wrap{
    font-size:1.75em;
    display:flex;
    margin: 1.1rem .8rem;
    border-bottom: 1px solid #757575;
}
.days-table{
    display:inline-grid;
    grid-template-columns: repeat(7, 2.5em);
    font-size:1.25em;
}
.sunday{
    color:red;
}
.month {
    flex-grow:1
}
.arrow:hover{
    opacity: 0.4;
    cursor:pointer;
}
.calendar-wrap {
    display:inline-block;
}
</style>