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
import ModalContentMixin from '../mixins/modal-content-mixin'

export default Vue.extend({
    name:'DialogTemplate',
    props:{
        title:String,
        message:String,
    },
    mixins:[ ModalContentMixin ]
})
</script>
<style scoped>
    .dialog {
        text-align: center;
    }
</style>