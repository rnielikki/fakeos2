<template>
        <div v-show="!this.minimized"
            :class="['window', { selected: selected && modal === null }]"
            v-movable="{ active:windowOptions.movable && title !== null, handle: 'Window-title' }"
            :data-movable="windowOptions.movable"
            :style="{ zIndex: zIndex }"
            >
            <resizer v-if="windowOptions.resizable" v-show="!maximized" :minWidth="windowOptions.minWidth" :minHeight="windowOptions.minHeight" ref="resizer" :target="currentElement" />
            <Window-title
                v-if="title !== null"
                :targetWindow="this"
                :title="title"
                :hasMinimizer="hasMinimizer"
                :hasMaximizer="windowOptions.resizable"
                :iconPath="iconPath"
                v-contextMenu="{ value: rightClickMenu }"
            />
            <div class="window-content" @contextmenu.stop>
                <WindowMenu v-if="windowMenu" :menu="windowMenu" />
                <slot></slot>
            </div>
            <div v-if="modal!==null" class="modal-background" ref="modalBackground" @contextmenu.prevent.stop></div>
        </div>
</template>
<script lang="ts">
import VueType, { PropType } from 'vue'
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component'

import Movable from '@/system/core/movable-directive'
import WindowTitle from './window-title.vue'
import IWindowOptions, { WindowOptions } from './window-options'
import WindowManager from '@/system/window-manager';
import WindowMenu from './window-menu.vue'

import Resizer from '../logics/resizer.vue'
import Position from '../logics/position'

import { IMenuComponent } from '@/components/menu/models/menu-model'
import ContextMenu from '../../menu/contextmenu'

@Component({
        components:{ WindowTitle, Resizer, WindowMenu },
        directives: {
            Movable,
            contextMenu: ContextMenu
        },
        data:function(){
            return {
                minimized:false,
                maximized:false,
                currentElement:null,
                positionState:null,
                zIndex:0,
                selected:false,
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
                type:String,
                default:null
            },
            hasMinimizer:{
                type:Boolean
            },
            windowOptions:{
                type:Object as PropType<IWindowOptions>,
            },
            parentElement:{
                type:Element,
                required:true
            },
            modal:{
                type:Object as PropType<Window | null>,
                default:null
            },
            initToCenter:{
                type:Boolean,
                default:false
            },
            windowMenu:{
                type:Array as PropType<IMenuComponent[]>
            },
            rightClickMenu:{
                type:Array as PropType<IMenuComponent[]>
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
                let winOptions = this.$props.windowOptions;
                el.style.width = (winOptions.defaultWidth<=0)?"auto":winOptions.defaultWidth + "px",
                el.style.height = (winOptions.defaultHeight<=0)?"auto":winOptions.defaultHeight + "px",
                el.style.minWidth = this.$props.windowOptions.minWidth + "px",
                el.style.minHeight = this.$props.windowOptions.minHeight + "px"
                this.$nextTick(function(){
                    if(this.$props.initToCenter){
                        let parentBoundingBox = this.$props.parentElement.getBoundingClientRect();
                        let _width = this.$props.windowOptions.defaultWidth;
                        let _height = this.$props.windowOptions.defaultHeight;
                        if(_width < 0 || _height < 0){
                            let thisBoundingbox = this.$el.getBoundingClientRect();
                            _width = (_width < 0)?thisBoundingbox.width:_width;
                            _height = (_height < 0)?thisBoundingbox.height:_height;
                        }
                        el.style.left = (parentBoundingBox.width - _width)/2 + "px"
                        el.style.top = (parentBoundingBox.height - _height)/2 + "px"
                    }
                    else {
                        el.style.left = "0px"
                        el.style.top = "0px"
                    }
                })
            },
            minimize:function(e) {
                if(!this.$props.hasMinimizer) return;

                if(this.$props.modal){
                    WindowManager.select(this);
                    return;
                }

                let minimized = this.$data.minimized;
                if(minimized) {
                    WindowManager.select(this)
                }
                else {
                    WindowManager.deselect()
                }
                this.$data.minimized = !minimized;
            },
            maximize:function() {
                if(!this.$props.windowOptions.resizable) return;

                if(this.$props.modal){
                    WindowManager.select(this);
                    return;
                }

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
            },
            close:function(){
                if(this.$props.modal){
                    WindowManager.select(this);
                    return;
                }
                this.$destroy();
            },
            getContent:function(){
                return ((this.$slots.default)?this.$slots.default[0]:null)?.context;
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
            overflow:auto;
        }
        &:not(.selected) > .window-content .f_interactive div{
            pointer-events: auto;
        }
        &:not(.selected) > .window-content div,
        &:not(.selected) > .window-content:not(.window-content+.f_interactive),
        &:not(.selected) > .window-content div.f_non-interactive div,
        &:not(.selected) > .window-content div.f_non-interactive{
            pointer-events: none;
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