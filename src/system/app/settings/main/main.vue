<template>
    <div>
        <h1>Settings</h1>
        <div class="setting-table">
            <setting-item name="background" />
            <setting-item name="info" />
            <setting-item name="internet" />
            <setting-item name="language" />
            <setting-item name="time" />
            <setting-item name="user" />
            <setting-item name="help" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SettingItem from './setting-item.vue'

export default defineComponent({
    name:'Settings',
    components:{ SettingItem },
    data:function(){
        return {
            title: "Settings",
        }
    }
})
</script>
<style scoped>
h1 {
    font-weight: normal;
    font-family: 'Segoe UI';
    text-align: center;
}
.setting-table {
    display:grid;
    grid-template:repeat(auto-fill, 10rem)/repeat(auto-fill, 10rem)
}
</style>