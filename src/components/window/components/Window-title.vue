<template>
    <div class="window-title">
        <img v-if="appName" :src="iconPath" />
        <span class="window-title-text">{{ title }}</span>
        <div class="window-title-buttons">
            <Ui-button v-if="hasMinimizer" text = "_" />
            <Ui-button v-if="hasMaximizer" text = "[]" />
            <Ui-button :clicked="close" text = "x" />
        </div>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import UiButton from '../../ui-components/button.vue'
import WindowTitleOptions from './window-title-options'

export default Vue.extend({
    name:'Window-title',
    props:{
        appName:String,
        title:String,
        hasMinimizer:Boolean,
        hasMaximizer:Boolean,
        targetWindow:{
            type:Vue,
            required:true
        }
    },
    components:{
        UiButton
    },
    computed:{
        iconPath:function(){
            try {
                return require("../../../softwares/"+this.$props.appName+"/icon.png");   
            }
            catch {
                return require("../default.png");
            }
        }
    },
    methods:{
        close(e:Event){
            this.targetWindow.$destroy();
        }
    }
})
</script>
<style lang="scss" scoped>
    @import 'src/scss/colorset.scss';
    .window-title {
        background-color:$titlebar-background;
        padding:0.5rem 0.7rem;
        text-align: left;
        &-text{
            color: $titlebar-foreground;
        }
        &-buttons {
            white-space: nowrap;
            float:right;
            div {
                display: inline-block;
                width:1rem; height:1rem;
                font-size:.8rem;
                padding:.1rem;
                margin-left:.27rem;
            }
        }
        img {
            width:1.1rem;
            height:1.1rem;
            margin-right:.6rem;
            vertical-align: middle;
        }
    }
    ui-button {
        padding:.1rem;
    }
</style>