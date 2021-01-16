<template>
    <div class="viewer-root">
        <div class="tools">
            <div @click="openImage" class="tools-button">Open</div>
            <div>
                <input type="range" min="0.01" max="2" step="0.1" ref="scaleBar" @change="(e)=>changeSize(e.target.value)" />
                <span ref="sizeLabel">100%</span>
            </div>
            <div class="tools-button" @click="()=>changeSize(1)">Original size</div>
        </div>
        <div class="image-wrapper">
            <img :src="imagePath" ref="image" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent,  PropType } from 'vue'
import IFileInfo, { FileInfo } from '@/system/filesystem/fileinfo'
import { checkType } from '@/system/filesystem/mime';
import { Win64Options } from '@/components/window/components/win64-options';
import explorerModal from '@/softwares/core/explorer/explorer-modal'
import windowFactory from '@/components/window/window-factory';
import AppValidator from '@/system/app/app-validator'
import GlobalPath from '@/system/filesystem/globalPath';

export default defineComponent({
    mixins:[ AppValidator(checkType.ifImage) ],
    data:function(){
        return {
            title:`Image Viewer: (${this.$props.sender?.name ?? ""})`,
            f_image:this.$props.sender,
            imagePath: Object(this.$props.sender?.data)?.name,
            windowOptions:new Win64Options({
                defaultWidth:640,
                defaultHeight:480,
                minWidth:300,
                minHeight:300,
                maximizeOnStart:true
            }),
            imageStatus:{
                scale:1
            }
        }
    },
    methods:{
        changeSize:function(scale:number){
            Object.assign(this.$data, {"imageStatus": { scale: scale ?? 1}});
        },
        openImage:function(){
            explorerModal.open(this, this.f_image ?? GlobalPath.Images, (file:FileInfo)=>{
                this.f_image = file;
                //@ts-ignore
                this.$data.f_targetWindow.f_title = `Image Viewer: (${file?.name ?? ""})`
            }, checkType.ifImage)
        }
    },
    watch:{
        imageStatus:function(value){
            (this.$refs.scaleBar as HTMLInputElement).value = value.scale;
            (this.$refs.image as HTMLElement).style.transform=`scale(${value.scale})`;
            (this.$refs.sizeLabel as HTMLElement).innerText=value.scale*100+"%";
        },
        f_image:function(value){
            (this.$refs.image as HTMLImageElement).src=value.data.name;
            this.changeSize(1);
        }
    }
})
</script>
<style scoped>
.viewer-root {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.tools {
    min-width:15rem;
}
.tools > div {
    display: inline-block;
    min-width:5rem;
    padding:.4rem .6rem;
    margin:.4rem .6rem;
    text-align: center;
}
.image-wrapper {
    overflow:auto;
    display:flex;
    justify-content: center;
    align-items: center;
}
.tools-button:hover {
    border:1px solid #666;
}
</style>