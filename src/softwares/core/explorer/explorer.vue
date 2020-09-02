<template>
    <div class="container f_interactive">
        <div class="index-wrapper f_non-interactive">
            <div class="index" ref="label" />
            <img :src="require('./up.png')" @click="()=>goToParent(f_path.parent)" />
        </div>
        <icon-collection :path="f_path" class="content f_interactive"
        @open-icon="(item)=>openIcon(item)" ref="collection"
        v-contextMenu="{ value: value }" />
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import IconCollection from "@/components/ui-components/icon/icon-collection.vue";
import IFileInfo, { DirectoryInfo } from '@/system/filesystem/fileinfo'
import DefaultDrive, { Path } from "@/system/filesystem/filesystem";
import { explorerIconSet } from '@/components/ui-components/icon/icon-mixins'
import IconModel from '@/components/ui-components/icon/models/icon-model'
import ContextMenu from '@/components/menu/contextmenu'
import explorerMenu from './menu'
import Root from '@/system/filesystem/filesystem'

export default Vue.extend({
    components:{ IconCollection},
    directives:{ ContextMenu },
    data:function(){
        return {
            title:"Explorer",
            f_path:DefaultDrive,
            value: explorerMenu(this)
        }
    },
    mixins:[ explorerIconSet ],
    props:{
        path:{
            type:Object as PropType<DirectoryInfo>,
            default:()=>DefaultDrive
        }
    },
    created:function(){
        this.$set(this.$data, "f_path", this.path);
    },
    mounted:function(){
        //nexTick for default value update.
        this.$nextTick(()=>{
            //no other way to make DOM updated.
            (this.$refs.label as HTMLElement).innerText = this.path.currentDirectory;
        })
    },
    watch:{
        f_path:function(){
            //NOTE: Won't work if it doesn't updated via "ref"
            if(!this.$refs.collection) return;
            (this.$refs.collection as any).f_path = this.f_path;
            (this.$refs.label as HTMLElement).innerText = this.f_path.currentDirectory;
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
    margin:.75rem;
    padding:1.5rem 0;
    width:auto;
    flex-grow:1;
    box-sizing: border-box;
    color:$content-foreground;
}
.index-wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
    margin: .75rem .75rem .45rem 1.1rem;
    align-items:center;
    .index {
        padding: .6rem .4rem;;
    }
    img{
        width:3rem;
        height:3rem;
    }
}
.index, .content {
    background-color:$content-background;
    border:1px solid $window-button-border;
}
</style>