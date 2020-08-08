<template>
        <div class="window"
            v-movable="{ active:windowOptions.movable, handle: 'Window-title' }"
            v-resizable="{ active: windowOptions.resizable, minX: windowOptions.minX, minY: windowOptions.minY }"
            :style="initWindowState"
            >
            <Window-title
                v-if="titleOptions !== null"
                :targetWindow="this"
                :title="title"
                :hasMinimizer="titleOptions.hasMinimizer"
                :hasMaximizer="titleOptions.hasMaximizer"
                :appName="appName"
            />
            <div class="window-content">
                <slot></slot>
            </div>
            <div v-if="hasModal" class="modal-background" ref="modalBackground"></div>
        </div>
</template>
<script lang="ts">
import VueType, { PropType } from 'vue'
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
            appName:{
                type:String,
                required:false
            },
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
                type:VueType,
                required:false
            },
            hasModal:{
                type:Boolean,
                default:false
            },
            initToCenter:{
                type:Boolean,
                default:false
            }
        },
        computed:{
            initWindowState(){
                let stateInfo = {
                        left:"0px",
                        top:"0px",
                        width:this.$props.windowOptions.defaultWidth + "px",
                        height:this.$props.windowOptions.defaultHeight + "px",
                        minWidth:this.$props.windowOptions.minX + "px",
                        minHeight:this.$props.windowOptions.minY + "px"
                    }
                if(this.$props.initToCenter){
                    let parentBoundingBox = this.$props.parentElement.getBoundingClientRect();
                    stateInfo.left = (parentBoundingBox.width - this.$props.windowOptions.defaultWidth)/2 + "px"
                    stateInfo.top = (parentBoundingBox.height - this.$props.windowOptions.defaultHeight)/2 + "px"
                }
                return stateInfo;
            }
        },
        beforeDestroy:function(){
            let slot = this.$slots.default;
            if(slot && slot[0]){
                slot[0]?.context?.$destroy();
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