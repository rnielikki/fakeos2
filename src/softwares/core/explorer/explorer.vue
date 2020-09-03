<template>
    <div :class="['container', 'f_interactive', {'small':isModal}]">
        <div class="index-wrapper f_non-interactive">
            <div class="index" ref="label" />
            <img :src="require('./up.png')" @click="()=>goToParent(f_path.parent)" />
        </div>

        <icon-collection :path="f_path" class="content f_interactive"
        :defaultSelection="defaultSelection"
        @open-icon="(item)=>openIcon(item)" ref="collection"
        v-contextMenu="{ value: value }" :small="isModal" :filter="filter" />

        <div class="index-wrapper f_non-interactive" v-if="isModal && isSave">
            <input type="text" ref="name" class="input-text" />
            <ui-button text="Save" :clicked="()=>{ setResult({ ok:true, dir:f_path }); $data.f_targetWindow.close() }" />
        </div>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import IconCollection from "@/components/ui-components/icon/icon-collection.vue";
import IFileInfo, { DirectoryInfo } from '@/system/filesystem/fileinfo'
import DefaultDrive, { Path } from "@/system/filesystem/filesystem";
import { explorerIconSet, defaultFileAction } from '@/components/ui-components/icon/icon-mixins'
import IconModel from '@/components/ui-components/icon/models/icon-model'
import ContextMenu from '@/components/menu/contextmenu'
import explorerMenu from './menu'
import Root from '@/system/filesystem/filesystem'
import { WindowOptions } from '@/components/window/components/window-options'
import UiButton from '@/components/ui-components/button.vue'

export default Vue.extend({
    components:{ IconCollection, UiButton },
    directives:{ ContextMenu },
    data:function(){
        let winOptions = (this.isModal)?new WindowOptions({
                    defaultWidth:500,
                    defaultHeight:350,
                    minWidth:500,
                    minHeight:350,
                    resizable:false
                }):new WindowOptions();
        return {
            title:"Explorer",
            f_path:this.path,
            value: explorerMenu(this),
            windowOptions:winOptions
        }
    },
    mixins:[ explorerIconSet ],
    props:{
        path:{
            type:Object as PropType<DirectoryInfo>,
            default:()=>DefaultDrive,
            validator:function(value){
                return !value.disposed
            }
        },
        defaultSelection:{
            type:Object as PropType<IFileInfo>,
            default:null
        },
        isModal:{
            type:Boolean,
            default:false
        },
        isSave:{
            type:Boolean,
            default:false
        },
        filter:{
            type:Function,
            required:false
        }
    },
    mounted:function(){
        //nexTick for default value update.
        this.$nextTick(()=>{
            //no other way to make DOM updated.
            (this.$refs.label as HTMLElement).innerText = this.path.currentPath;
        })
    },
    watch:{
        f_path:function(){
            //NOTE: Won't work if it doesn't updated via "ref"
            if(!this.$refs.collection) return;
            (this.$refs.collection as any).f_path = this.f_path;
            (this.$refs.label as HTMLElement).innerText = this.f_path.currentPath;
        }
    }
})
</script>
<style lang="scss" scoped>
@import 'src/scss/colorset.scss';
.container {
    display:flex;
    flex-direction: column;
    height:100%;
}
.content {
    width:auto;
    flex-grow:1;
    box-sizing: border-box;
    color:$content-foreground;
}
.index-wrapper{
    display: grid;
    grid-template-columns: 1fr auto;
    align-items:center;
}
.index-wrapper {
    margin: .75rem .75rem .45rem 1.1rem;
    .index {
        padding: .6rem .4rem;;
    }
    img{
        width:3rem;
        height:3rem;
    }
}
.content{
    margin:.75rem;
    padding:1.5rem 0;
}
.small {
    .index-wrapper{
        margin: .35rem .45rem;
        .index {
            padding: .35rem .45rem;;
        }
        img {
            width:1.67rem;
            height:1.67rem;
        }
    }
    .content{
        margin:.45rem;
        padding:.75rem 0;
    }
}
.index, .content {
    background-color:$content-background;
    border:1px solid $window-button-border;
}
.input-text {
    height: 1.75rem;
    margin-right: .6rem;
}
</style>