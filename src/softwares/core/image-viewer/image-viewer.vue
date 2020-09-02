<template>
    <div>
        <img :src="imagePath" />
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import { FileInfo } from '@/system/filesystem/fileinfo'
import { checkType } from '@/system/filesystem/mime';
export default Vue.extend({
    data:function(){
        return {
            imagePath: Object(this.image.data)?.name
        }
    },
    props:{
        image:{
            type:Object as PropType<FileInfo>,
            required:true,
            validator:function(value){
                if(value.disposed) return false;
                let mimeName = value.appType.typeName
                return checkType.ifImage(value);
            }
        }
    }
})
</script>