<template>
    <div class="window-title" @dblclick="targetWindows.maximize">
        <img v-if="iconPath" :src="iconPath" />
        <span class="window-title-text">{{ title }}</span>
        <div class="window-title-buttons">
            <Ui-button v-if="hasMinimizer" :clicked="targetWindows.minimize" text = "_" />
            <Ui-button v-if="hasMaximizer" :clicked="targetWindows.maximize" text = "[]" />
            <Ui-button :clicked="close" text = "x" />
        </div>
    </div>
</template>
<script lang="ts">
import { ComponentPublicInstance, defineComponent,  PropType } from 'vue'
import UiButton from '../../ui-components/button.vue'
import Win64 from './win64.vue'

export default defineComponent({
    name:'Win64-title',
    props:{
        iconPath:String,
        title:String,
        hasMinimizer:Boolean,
        hasMaximizer:Boolean,
        targetWindows:{
            type:Object as PropType<ComponentPublicInstance>,
            required:true
        }
    },
    components:{
        UiButton
    },
    methods:{
        close(e:Event){
            (this.targetWindows as any).close();
        }
    }
})
</script>
<style lang="scss">
    @import 'src/scss/colorset.scss';
    .window.selected{
        .window-title{
            background-color:$titlebar-active-background;
            &-text{
            color: $titlebar-active-foreground;
            }
        }
    }
    .window-title {
        background-color:$titlebar-deactive-background;
        padding:0.5rem 0.7rem;
        text-align: left;
        &-text{
            color: $titlebar-deactive-foreground;
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