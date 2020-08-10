<template>
<div :class="{selected: this.targetApp.$props.selected }">
    <img :src="iconPath">
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Window from '@/components/window/components/window.vue'
import WindowManager from '@/system/window-manager'

export default Vue.extend({
    props:{
        iconPath:String,
        targetApp:Window
    },
    mounted:function(){
        this.$el.addEventListener("mousedown", ()=>{
            let isCurrent = WindowManager.isSelected(this.$props.targetApp);
            if(this.$props.targetApp.minimized || isCurrent) {
                this.$props.targetApp.minimize();
            }
            else if(!isCurrent) {
                WindowManager.select(this.$props.targetApp)
            }
        }, true);
    }
})
</script>
<style lang="scss" scoped>
@import 'src/scss/colorset.scss';
    div{
        display: inline-block;
        width:2.1rem; height:2.1rem;
        vertical-align: middle;
        margin:0 .2rem;
        &.selected {
            background-color:$statusbar-selected;
        }
    }
    img {
        width:100%;
        height:100%;
    }
</style>