<template>
    <div>
        <!--to be fixed to unique -->
        <icon v-for="(value, key) in icons" :key="key" :model="value" />
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import Icon from '@/components/icon/icon.vue'
import IconModel from './models/icon-model'

export default Vue.extend({
    name:"IconCollection",
    components:{ Icon },
    data:function(){
        return {
            selected:null
        }
    },
    props:{
        icons:{
            type:Array as PropType<IconModel[]>,
            default:()=>[]
        }
    }
})
</script>