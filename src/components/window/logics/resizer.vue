<template>
    <div class="resizer">
        <div v-for="resizerType in ResizerTypes" :key="resizerType" :class="'resizer-'+resizerType">
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ResizerCollection from './resizer';

export default Vue.extend({
    name: 'Resizer',
    data:function(){
        return {
            ResizerTypes:['top', 'bottom', 'left', 'right', 'topleft', 'topright', 'bottomleft', 'bottomright'],
            ifInit:false
        }
    },
    props:{
        target:{
            type: Element
        },
        minX:{
                type:Number,
                default:600
            },
        minY:{
                type:Number,
                default:400
            }
    },
    watch:{
        target:function(el:Element){
            if(this.$data.ifInit == false) {
                new ResizerCollection(this, this.$props.target, this.minX, this.minY);
                this.$data.ifInit = true;
            }
        }
    }
})
</script>
<style lang="scss">
$size : 5px;
$corner-size: 10px;
.resizer{
    width: 0;
    height: 0;
    overflow:visible;
    div{
        position:absolute;
        /* make temp visible */
        background-color:rgba(128,128,128,.5);
    }
    &-top, &-bottom, &-left, &-topleft, &-bottomleft {
        left: 0;
    }
    &-top, &-bottom, &-right, &-topright, &-bottomright {
        right: 0;
    }
    &-top, &-left, &-right, &-topleft, &-topright {
        top: 0;
    }
    &-bottom, &-left, &-right, &-bottomleft, &-bottomright {
        bottom: 0;
    }
    &-top, &-bottom {
        height: $size;
    }
    &-left, &-right {
        width: $size;
    }
    &-topleft, &-topright, &-bottomleft, &-bottomright {
        width: $corner-size;
        height: $corner-size;
    }

    &-top:hover, &-bottom:hover {
        cursor:ns-resize;
    }
    &-left:hover, &-right:hover{
        cursor:ew-resize;
    }
    &-bottomleft:hover, &-topright:hover {
        cursor:nesw-resize;
    }
    &-topleft:hover, &-bottomright:hover {
        cursor:nwse-resize;
    }
}
</style>