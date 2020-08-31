<template>
    <div v-contextMenu="{ value: value }" class="f_collection-icon"
    @mousedown="$emit('selected')" @dragstart="dragging" @dragend="dragged" @drop="dropped" @dragover.prevent
    :class="{ selected:isSelected }">
        <img :src="this.model.icon" draggable="false" />
        <div class="f_collection-icon-label" :contenteditable="editable" @mousedown.stop ref="label">{{ model.label }}</div>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import ContextMenu from '../menu/contextmenu'
import WindowFactory from '../window/window-factory'
import IconModel from './models/icon-model'
import backgroundMenu from '../background/background-menu'
import { DirectoryInfo, FileInfo, ShortcutInfo } from '@/system/filesystem/fileinfo'
import IconMenu from './icon-menu'
import IconGlobal from './models/icon-global'

export default Vue.extend({
    name:"Icon",
    directives:{ ContextMenu },
    mixins: [ IconMenu ],
    props:{
        model:{
            type:Object as PropType<IconModel>
        },
        isSelected:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        dragging:function(){
            (this.$el as HTMLElement).style.opacity = "0.5"
        },
        dragged:function(e:Event){
            (this.$el as HTMLElement).style.opacity = "1"
            this.dragToApp(e);
            if(IconGlobal.dropTarget){
                IconGlobal.dropTarget = null;
            }
        },
        dropped:function(e:Event){
            IconGlobal.dropTarget = this.model.fileInfo;
        },
        dragToApp:function(e:Event){
            let _target = (IconGlobal.dropTarget instanceof ShortcutInfo)?
                IconGlobal.dropTarget.originalFile
                :IconGlobal.dropTarget;
            let _fileInfo = (this.$props.model.fileInfo instanceof ShortcutInfo)?
                this.$props.model.fileInfo.originalFile
                :this.$props.model.fileInfo;
                
            if(_target instanceof DirectoryInfo) {
                let dir = _target as DirectoryInfo;
                if(this.$props.model.fileInfo !== _target) {
                    (this as any).move(_target);
                }
            }
            else if(_target instanceof FileInfo) {
                let data = _fileInfo.data;
                let appName = ((_target as FileInfo)?.data as any)?.app;
                if(!appName
                || !data
                || (_target as FileInfo)?.appType.typeName !== "application/vue"
                || appName !== _fileInfo?.appType?.app) {
                    return;
                }
                WindowFactory.OpenProgram(appName, data);
            }
            e.stopPropagation();
        }
    }
})
</script>
<style lang="scss">
.f_collection-icon {
    @import 'src/scss/colorset.scss';
    position:relative;
    display:inline-block;
    text-align:center;
    &-label {
        overflow-wrap: break-word;
        width: 75px;
        height:1rem;
        overflow-y:hidden;
        &[contenteditable=true]{
            background-color:$content-background;
            color:$content-foreground;
            border:1px solid $content-foreground;
            text-shadow:none;
        }
    }
    img {
        width:64px;
        height:64px;
    }
    &.selected {
        background-color:$selected-background;
        .f_collection-icon-label {
            color:$selected-foreground;
            overflow-y:visible !important;
        }
    }
}
div {
    vertical-align:middle;
}
</style>