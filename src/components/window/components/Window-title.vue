<template>
    <div class="window-title">
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
    }
    ui-button {
        padding:.1rem;
    }
</style>