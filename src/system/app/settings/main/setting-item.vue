<template>
    <div class="item-wrapper" @click="openSetting">
        <div class="item-icon" :style="icon"></div>
        <div class="label">{{ name }}</div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import WindowFactory from '@/components/window/window-factory'
export default Vue.extend({
    props:{
        name:{
            type:String,
            required:true
        }
    },
    computed:{
        icon:function(){
            return { maskImage: "url('"+require(`../${this.name}/icon.svg`)+"')" }
        }
    },
    methods:{
        openSetting:function() {
            WindowFactory.OpenSetting(this.$props.name);
        }
    }
})
</script>
<style lang="scss" scoped>
@import 'src/scss/colorset.scss';
.item-wrapper {
    text-align: center;
    &:hover {
        background-color:$selected-background;
        color:$selected-foreground;
        .item-icon {
            background-color:$selected-foreground;
        }
    }
    .item-icon {
        background-color:$content-foreground;
        height:120px;
        mask:center no-repeat;
    }
    .label {
    text-transform: capitalize;
    }
}
</style>