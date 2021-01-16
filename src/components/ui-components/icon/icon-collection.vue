<template>
    <draggable-collection class="iconCollection" :style="gridFlow" :collection="icons" :horizontal="horizontal" ref="collection" collectionKeyName="id" @drop="dropToCollection" >
             <template v-slot:default="model">
                 <icon :model="model.model"
                 :small="small"
                 @dragend="(e)=>model.dragend(e)"
                 @open-icon="$emit('open-icon', model.model)"
                 @selected="()=>select(model.model.id)"
                :isSelected ="selected===model.model.id"
                draggable="true" />
            </template>
    </draggable-collection>
</template>
<script lang="ts">
import { defineComponent,  PropType } from 'vue'
import Icon from '@/components/ui-components/icon/icon.vue'
import IconModel from './models/icon-model'
import { IconDirection } from './models/icon-collection-model'
import DraggableCollection from '@/system/core/draggable/draggable-collection.vue'
import DropTarget from '@/system/core/draggable/drop-target.vue'
import IFileInfo, { FileInfo, DirectoryInfo } from '@/system/filesystem/fileinfo'
import windowFactory from '../../window/window-factory'
import IconGlobal from './models/icon-global'
import FileType from '@/system/filesystem/file-type'

export default defineComponent({
    name:"IconCollection",
    components:{ "icon":Icon, "draggable-collection":DraggableCollection },
    data:function(){
        return {
            selected:-1,
            icons:new Array<IconModel>(),
            f_path:this.path,
            files:this.path.files,
            horizontal:true
        }
    },
    props:{
        direction:{
            type:Number as PropType<IconDirection>,
            default:()=>IconDirection.row
        },
        path:{
            type:Object as PropType<DirectoryInfo>,
            required:true,
            validator:function(value:IFileInfo){
                return !value.disposed
            }
        },
        defaultSelection:{
            type:Object as PropType<IFileInfo>,
            default:null
        },
        small:{
            type:Boolean,
            default:false
        },
        filter:{
            type:Function,
            required:false
        }
    },
    computed:{
        gridFlow:function(){
            if(this.horizontal){
                return { flexDirection: "row" }
            }
            else{
                return { flexDirection: "column" }
            }
        }
    },
    created:function(){
        //@ts-ignore
        this.horizontal = (this.direction == IconDirection.row);
        this.generateIcons(this.f_path);
        //@ts-ignore
        this.selected = (this.defaultSelection)?this.f_path.files.indexOf(this.defaultSelection):-1;
    },
    mounted:function(){
        document.addEventListener("mousedown", this.deselect, true);
        //@ts-ignore
        this.$nextTick(()=>{this.select(this.selected)});
    },
    methods: {
        log:function(item:any){
            console.log(item);
        },
        select:function(id:number) {
            this.selected = id
        },
        deselect:function(){
            this.select(-1);
        },
        generateIcons: function(f_path:DirectoryInfo) {
            let files = f_path.files;
            if(this.filter){
                files = files.filter(file=>(file.fileType == FileType.Directory) || this.filter(file)===true)
            }
            this.icons = files.map(file => new IconModel(file))
        },
        dropToCollection:function(){
            IconGlobal.dropTarget = this.f_path
        }
    },
    watch:{
        f_path:function(value) {
            this.files = value.files;
            Object.assign(this.$data, {"f_path": value as DirectoryInfo});
        },
        files:function(newValue, oldValue){
            this.generateIcons(this.f_path);
        }
    },
    emits:['open-icon', 'dragend']
})
</script>
<style lang="scss" scoped>
@import 'src/scss/colorset.scss';
/* flexbox for line change */
    .iconCollection {
        display:flex;
        justify-content: flex-start;
        align-content: flex-start;
        flex-wrap:wrap;
        width:100%;
        height:100%;
        overflow:auto;
    }
</style>