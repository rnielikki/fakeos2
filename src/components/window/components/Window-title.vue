<template>
    <div class="window-title">
        <span class="window-title-text">{{ title }}</span>
        <div class="window-title-buttons">
            <Ui-button v-if="options.minimize" text = "_" />
            <Ui-button v-if="options.maximize" text = "[]" />
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
        options:{
            type: Object as PropType<WindowTitleOptions>,
            default: () => ({ maximize: true, minimize:true } as WindowTitleOptions)
        },
    },
    components:{
        UiButton
    },
    methods:{
        close(){
            var el = this.$parent.$el;
            var parentEl = this.$parent.$parent.$el;
            this.$parent.$destroy();
            parentEl.removeChild(el);
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