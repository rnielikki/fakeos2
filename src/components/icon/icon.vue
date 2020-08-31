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
import { DirectoryInfo, FileInfo } from '@/system/filesystem/fileinfo'
import IconMenu from './icon-menu'
import IconGlobal from './models/icon-global'
import iconGlobal from './models/icon-global'

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
            if(IconGlobal.dragTarget){
                IconGlobal.dragTarget = null;
            }
        },
        dropped:function(e:Event){
            IconGlobal.dragTarget = this.model.fileInfo;
        },
        dragToApp:function(e:Event){
            if(iconGlobal.dragTarget instanceof DirectoryInfo) {
                let dir = iconGlobal.dragTarget as DirectoryInfo;
                if(this.$props.model.fileInfo.parent !== iconGlobal.dragTarget) {
                    (this as any).move(iconGlobal.dragTarget);
                }
            }
            else if(iconGlobal.dragTarget instanceof FileInfo) {
                let data = this.$props.model.fileInfo.data;
                let appName = ((iconGlobal.dragTarget as FileInfo)?.data as any)?.app;
                if(!appName
                || !data
                || (IconGlobal.dragTarget as FileInfo)?.appType.typeName !== "application/vue"
                || appName !== this.$props.model?.fileInfo?.appType?.app) {
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