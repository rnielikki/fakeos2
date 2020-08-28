<template>
    <div class="container">
        <div class="index">{{ path.currentDirectory }}</div>
        <icon-collection :path="f_path" class="content" :defaultDirectoryActionFactory="changePath" @open-icon="(item)=>openIcon(item)" />
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import IconCollection from "@/components/icon/icon-collection.vue";
import { DirectoryInfo } from '@/system/filesystem/fileinfo'
import DefaultDrive, { Path } from "@/system/filesystem/filesystem";
import { explorerIconSet } from '@/components/icon/icon-mixins'
import IconModel from '@/components/icon/models/icon-model'

export default Vue.extend({
    components:{ IconCollection},
    data:function(){
        return {
            title:"Explorer",
            f_path:DefaultDrive
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
        this.$set(this, "f_path", this.path);
    },
    methods:{
        changePath: function(dirInfo:DirectoryInfo){
            return (obj?:object)=>{
                this.$props.path = Path.getAbsolutePath(dirInfo.currentDirectory);
            }
        }
    },
    watch:{
        f_path:{
            handler:function(){ this.$forceUpdate(); },
            immediate: true,
            deep: true
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
    padding:1.5rem;
    width:auto;
    flex-grow:1;
    box-sizing: border-box;
    background-color:$content-background;
    color:$content-foreground;
}
</style>