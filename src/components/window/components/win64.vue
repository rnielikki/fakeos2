<template>
        <div v-show="!this.minimized"
            :class="['window', { selected: selected && modal === null }]"
            v-movable="{ active:windowOptions.movable && title !== null, handle: 'Win64-title' }"
            :data-movable="windowOptions.movable"
            :style="{ zIndex: zIndex }"
            >
            <resizer v-if="windowOptions.resizable && modal===null"
            v-show="!maximized" :minWidth="windowOptions.minWidth"
            :minHeight="windowOptions.minHeight" ref="resizer" :target="currentElement" />
            <Win64-Title
                v-if="title !== null"
                :targetWindows="this"
                :title="f_title"
                :hasMinimizer="hasMinimizer"
                :hasMaximizer="windowOptions.resizable"
                :iconPath="iconPath"
                v-contextMenu="{ value: rightClickMenu }"
            />
            <div class="window-content" @contextmenu.stop v-once>
                <Win64-Menu v-if="windowMenu" :menu="windowMenu" />
                <slot></slot>
            </div>
            <div v-if="modal!==null" class="modal-background" ref="modalBackground" @contextmenu.prevent.stop></div>
        </div>
</template>
<script lang="ts">
import VueType, { PropType, defineComponent, ComponentPublicInstance } from 'vue'
import Component from 'vue-class-component'

import Movable from '@/system/core/movable-directive'
import Win64Title from './win64-title.vue'
import IWin64Options, { Win64Options } from './win64-options'
import Win64Manager from '@/system/window-manager';
import Win64Menu from './win64-menu.vue'

import Resizer from '../logics/resizer.vue'
import Position from '../logics/position'

import { IMenuComponent } from '@/components/menu/models/menu-model'
import ContextMenu from '../../menu/contextmenu'

export default defineComponent({
        name: "Win64",
        components: {
            "Win64-Title": Win64Title,
            "Resizer":Resizer,
            "Win64-Menu":Win64Menu 
        },
        directives: {
            Movable,
            contextMenu: ContextMenu
        },
        data:function(){
            return {
                minimized:false,
                maximized:false,
                currentElement:null,
                positionState:new Position(0, 0, 0, 0),
                zIndex:0,
                selected:false,
                f_title:(this as any).title
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
                type:Object as PropType<IWin64Options>,
            },
            parentElement:{
                type:Element,
                required:true
            },
            modal:{
                type:Object as PropType<ComponentPublicInstance | null>,
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
            (this as any).initWin64State();
            if(this.$props.windowOptions?.maximizeOnStart){
                this.$nextTick(()=>(this as any).maximize())
            }
        },
        methods:{
            initWin64State:function() {
                let el = this.$el as HTMLElement
                let winOptions = this.$props.windowOptions;
                el.style.width = (winOptions?.defaultWidth??0<=0)?"auto":winOptions!.defaultWidth + "px",
                el.style.height = (winOptions?.defaultHeight??0<=0)?"auto":winOptions!.defaultHeight + "px",
                el.style.minWidth = (this.$props.windowOptions?.minWidth ?? 400) + "px",
                el.style.minHeight = (this.$props.windowOptions?.minHeight ?? 300) + "px"
                let bind = this;
                this.$nextTick(function(){
                    if(bind.$props.initToCenter){
                        let parentBoundingBox = bind.$props.parentElement.getBoundingClientRect();
                        let _width = bind.$props.windowOptions?.defaultWidth ?? 600;
                        let _height = bind.$props.windowOptions?.defaultHeight?? 400;
                        if(_width < 0 || _height < 0){
                            let thisBoundingbox = bind.$el.getBoundingClientRect();
                            _width = (_width < 0)?thisBoundingbox.width:_width;
                            _height = (_height < 0)?thisBoundingbox.height:_height;
                        }
                        let resultWidth = (parentBoundingBox.width - _width);
                        let resultHeight = (parentBoundingBox.height - _height);
                        el.style.left = ((resultWidth > 0)? resultWidth/2 : 0).toString() + "px"
                        el.style.top = ((resultHeight > 0)? resultHeight/2 : 0).toString() + "px"
                    }
                    else {
                        el.style.left = "0px"
                        el.style.top = "0px"
                    }
                })
            },
            minimize:function() {
                if(!this.$props.hasMinimizer) return;

                if(this.$props.modal){
                    Win64Manager.select(this);
                    return;
                }

                let minimized = this.$data.minimized;
                if(minimized) {
                    Win64Manager.select(this)
                }
                else {
                    Win64Manager.deselect()
                }
                this.$data.minimized = !minimized;
            },
            maximize:function() {
                if(!this.$props.windowOptions?.resizable) return;

                if(this.$props.modal){
                    Win64Manager.select(this);
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
                    Win64Manager.select(this);
                    return;
                }
                this.$.appContext.app.unmount(this.parentElement);
            },
            getContent:function(){
                return ((this.$slots.default)?this.$slots.default:null);
            }
        },/*
        beforeUnmount:function(){
            let slot = this.$slots.default;
            if(slot){
                slot.unmount();
            }
        },*/
        unmounted:function(){
            this.$props.parentElement.removeChild(this.$el);
        }
    })
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
            display:flex;
            flex-direction: column;
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