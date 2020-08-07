<template>
        <div class="window" v-movable="{ active:windowOptions.movable, handle: 'Window-title' }" v-resizable="{ active: windowOptions.resizable, minX: windowOptions.minX, minY: windowOptions.minY }">
            <Window-title v-if="titleOptions !== null" :targetWindow="this" :title="title" :hasMinimizer="titleOptions.hasMinimizer" :hasMaximizer="titleOptions.hasMaximizer" />
            <div class="window-content">
                <slot></slot>
            </div>
            <div v-if="hasModal" class="modal-background" ref="modalBackground"></div>
        </div>
</template>
<script lang="ts">
import { PropType } from 'vue'
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component'
import WindowBehaviours from '../logics/window-behaviours'
import WindowTitle from './window-title.vue'
import WindowTitleOptions from './window-title-options'
import IWindowOptions, { WindowOptions } from './window-options'

@Component({
        components:{ WindowTitle },
        directives: WindowBehaviours,
        props:{
            title:{
                type:String
            },
            titleOptions:{
                type: Object as PropType<WindowTitleOptions | null>
            },
            windowOptions:{
                type:Object as PropType<IWindowOptions>,
            },
            parentElement:{
                type:Element,
                required:true
            },
            parentVue:{
                type:Vue,
                required:false
            },
            hasModal:{
                type:Boolean,
                default:false
            }
        },
        destroyed:function(){
            this.$props.parentElement.removeChild(this.$el);
        }
    })
export default class Window extends Vue {}
</script>
<style lang="scss">
@import 'src/scss/colorset.scss';
    .window {
        background-color: $window-background;
        border:1px solid $window-border;
        min-width: 600px;
        min-height:400px;
        position: absolute;
        display:flex;
        flex-direction: column;
        /* non user select */
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
        &-content {
            color:$content-foreground; /* window-foreground */
            text-align:initial;
            flex-grow: 1;
        }
    }
    .modal-background {
        position:absolute;
        left:0;
        right:0;
        top:0;
        bottom:0
    }
</style>