<template>
    <div class="container">
        <div class="index">TEST</div>
        <icon-collection :path="path" class="content" />
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import IconCollection from "@/components/icon/icon-collection.vue";
import { DirectoryInfo } from '@/system/filesystem/fileinfo'
import DefaultDrive from "@/system/filesystem/filesystem";

export default Vue.extend({
    components:{ IconCollection},
    data:function(){
        return {
            title:"Explorer"
        }
    },
    props:{
        path:{
            type:Object as PropType<DirectoryInfo>,
            default:()=>DefaultDrive
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