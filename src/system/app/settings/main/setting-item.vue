<template>
    <div class="item-wrapper" @click="openSetting">
        <div class="item-icon" :style="icon"></div>
        <div class="label">{{ name }}</div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Win64Factory from '@/components/window/window-factory'
export default defineComponent({
    props:{
        name:{
            type:String,
            required:true
        }
    },
    computed:{
        icon:function():unknown{
            return { maskImage: "url('"+require(`../${this.$props.name}/icon.svg`)+"')" }
        }
    },
    methods:{
        openSetting:function() {
            Win64Factory.OpenSetting(this.$props.name);
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