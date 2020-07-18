<template>
    <div class="resizer">
        <div v-for="resizerType in ResizerTypes" :key="resizerType" :class="'resizer-'+resizerType">
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
//import Resizer from './resizer'
import ResizerCollection from './resizer';

export default Vue.extend({
    name: 'Resizer',
    props:{
        target:HTMLElement,
        minX:Number,
        minY:Number
    },
    created: function(){
        Object.assign(this, { ResizerTypes:['top', 'bottom', 'left', 'right', 'topleft', 'topright', 'bottomleft', 'bottomright'] });
    },
    mounted: function(){
        new ResizerCollection(this, this.$props.target, this.minX, this.minY);
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