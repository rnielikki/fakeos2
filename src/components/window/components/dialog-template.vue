<template>
    <div class="dialog">
        <p>{{ message }}</p>
        <h4 @click="SetResult(true)">Click to make true</h4>
        <h4 @click="SetResult(false)">Click to make false</h4>
        <h4 @click="SetResult('duck')">Click to make duck</h4>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
export default Vue.extend({
    name:'DialogTemplate',
    data:function(){
        return {
            result:""
        };
    },
    props:{
        title:String,
        message:String,
    },
    methods:{
        SetResult:function(value:any){
            this.result = value
        }
    }
})
</script>
<style scoped>
    .dialog {
        text-align: center;
    }
</style>