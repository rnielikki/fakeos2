<template>
    <div class="root">
        <div class="index">{{ path.currentDirectory }}</div>
        <image-viewer :path="path" class="content" @image-selected="(img)=>selectImage(img)" />
        <div class="selection-group">
            <select-button
                :options="[{ name:'Fit', value:'cover' }, { name:'Tile', value:'auto' }]"
                :defaultValue="currentBackgroundSetting.size"
                @select-item ="(value)=>setBackgroundSize(value)"
            />
            <select-button
                :options="[{ name:'Top', value:'0%' }, { name:'Center', value:'50%' }, { name:'Bottom', value:'100%' }]"
                :defaultValue="currentBackgroundSetting.positionY"
                @select-item ="(value)=>setBackgroundPositionY(value)"
            />
            <select-button
                :options="[{ name:'Left', value:'0%' }, { name:'Center', value:'50%' }, { name:'Right', value:'100%' }]"
                :defaultValue="currentBackgroundSetting.positionX"
                @select-item ="(value)=>setBackgroundPositionX(value)"
            />
            <select-button
                :options="[{ name:'Repeat', value:'repeat' }, { name:'Don\'t repeat', value:'no-repeat' }]"
                :defaultValue="currentBackgroundSetting.repeat"
                @select-item ="(value)=>setBackgroundRepeat(value)"
            />
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ImageViewer from '@/components/ui-components/image-viewer.vue'
import SelectButton from '@/components/ui-components/select-button.vue'
import { Path } from '@/system/filesystem/filesystem'
import { DirectoryInfo, FileInfo } from '@/system/filesystem/fileinfo'
import GlobalPath from '@/system/filesystem/globalPath'
import SystemGlobal from '@/system/global'

export default Vue.extend({
    components:{ ImageViewer, SelectButton },
    data:function(){
        let _background = SystemGlobal.background as HTMLElement
        return {
            title:"Background settings",
            path:GlobalPath.Images,
            background:_background,
            currentBackgroundSetting:{
                size:(_background.style.backgroundSize)?_background.style.backgroundSize:"auto",
                positionX:(_background.style.backgroundPositionX)?_background.style.backgroundPositionX:"0%",
                positionY:(_background.style.backgroundPositionY)?_background.style.backgroundPositionY:"0%",
                repeat:(_background.style.backgroundRepeat)?_background.style.backgroundRepeat:"repeat"
            }
        }
    },
    methods:{
        selectImage(image:string){
            this.background.style.backgroundImage=`url('${image}')`;
        },
        setBackgroundSize:function(val:string){
            this.background.style.backgroundSize = val;
        },
        setBackgroundPositionX(val:string){
            this.background.style.backgroundPositionX = val;
        },
        setBackgroundPositionY(val:string){
            this.background.style.backgroundPositionY = val;
        },
        setBackgroundRepeat(val:string){
            this.background.style.backgroundRepeat = val;
        }
    }
})
</script>
<style lang="scss" scoped>
@import 'src/scss/colorset.scss';
.root {
    display:flex;
    flex-direction: column;
    height:100%;
}
.index {
    margin: .75rem .75rem .45rem 1.1rem;
    padding: .6rem .4rem;;
    background-color:$content-background;
    border:1px solid $window-button-border;
}
.content {
    flex-grow:1;
}
.selection-group {
    text-align: center;
    margin-bottom:.67rem;
}
</style>