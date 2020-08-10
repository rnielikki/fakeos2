<template>
        <div v-show="!this.minimized"
            :class="['window', { selected: selected && modal === null }]"
            v-movable="{ active:windowOptions.movable, handle: 'Window-title' }"
            :data-movable="windowOptions.movable"
            :style="{ zIndex: zIndex }"
            >
            <resizer v-if="windowOptions.resizable" v-show="!maximized" :minX="windowOptions.minX" :minY="windowOptions.minY" ref="resizer" :target="currentElement" />
            <Window-title
                v-if="titleOptions !== null"
                :targetWindow="this"
                :title="title"
                :hasMinimizer="titleOptions.hasMinimizer"
                :hasMaximizer="titleOptions.hasMaximizer"
                :iconPath="iconPath"
            />
            <div class="window-content">
                <slot></slot>
            </div>
            <div v-if="modal!==null" class="modal-background" ref="modalBackground"></div>
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
import windowManager from '@/system/window-manager';
import Resizer from '../logics/resizer.vue'
import Position from '../logics/position'

@Component({
        components:{ WindowTitle, Resizer },
        directives: WindowBehaviours,
        data:function(){
            return {
                minimized:false,
                maximized:false,
                currentElement:null,
                positionState:null
            }
        },
        props:{
            appName:{
                type:String,
                required:false
            },
            iconPath:{
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
            modal:{
                type:Object as PropType<Window | null>,
                default:null
            },
            initToCenter:{
                type:Boolean,
                default:false
            },
            selected:{
                type:Boolean,
                default:true
            },
            zIndex:{
                type:Number,
                default:0
            }
        },
        watch:{
            maximized: function(value) {
                if(value) {
                    let htmlElement = this.$el as HTMLElement
                    //save state
                    let currentBoundingBox = this.$el.getBoundingClientRect();
                    this.$data.positionState = new Position(currentBoundingBox.width, currentBoundingBox.height, currentBoundingBox.top, currentBoundingBox.left);
                    //maximize
                    htmlElement.style.top = "0px";
                    htmlElement.style.left = "0px";
                    htmlElement.style.width = "100%";
                    htmlElement.style.height = "100%";
                }
                else {
                    //release state
                    this.$data.positionState.setStyle(this.$el as HTMLElement)
                }
            }
        },
        mounted:function(){
            this.$data.currentElement = this.$el;
            (this as any).initWindowState();
        },
        methods:{
            initWindowState:function() {
                let el = this.$el as HTMLElement
                el.style.width = this.$props.windowOptions.defaultWidth + "px",
                el.style.height = this.$props.windowOptions.defaultHeight + "px",
                el.style.minWidth = this.$props.windowOptions.minX + "px",
                el.style.minHeight = this.$props.windowOptions.minY + "px"
                
                if(this.$props.initToCenter){
                    let parentBoundingBox = this.$props.parentElement.getBoundingClientRect();
                    el.style.left = (parentBoundingBox.width - this.$props.windowOptions.defaultWidth)/2 + "px"
                    el.style.top = (parentBoundingBox.height - this.$props.windowOptions.defaultHeight)/2 + "px"
                }
                else {
                    el.style.left = "0px"
                    el.style.top = "0px"
                }
            },
            minimize:function() {
                let minimized = this.$data.minimized;
                if(minimized) {
                    windowManager.select(this)
                }
                else {
                    windowManager.deselect()
                }
                this.$data.minimized = !minimized;
            },
            maximize:function() {
                if(this.$data.maximized) {
                    //unmaximize
                    this.$data.maximized = false;
                    this.$props.windowOptions.movable = true;
                }
                else {
                    //maximize
                    this.$data.maximized = true;
                    this.$props.windowOptions.movable = false;
                }
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