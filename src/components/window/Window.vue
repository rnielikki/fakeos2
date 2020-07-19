<template>
    <div class="window" v-movable="{ active:movable, handle: 'Window-title' }" v-resizable="{ active: resizable, minX: minX, minY: minY }">
        <Window-title v-if="hasTitleBar" :title=title :options="titleButtons" />
        <div class="window-content">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import WindowBehaviours from './logics/window-behaviours'
import WindowTitle from './components/window-title.vue'
import WindowTitleOptions from './components/window-title-options'
//import { Prop } from 'vue-property-decorator'

export default Vue.extend({
    name:'Window',
    props:{
        title:String,
        titleButtons:{
            type: Object as PropType<WindowTitleOptions>,
            default: () => ({ maximize: true, minimize:true } as WindowTitleOptions)
        },
        hasTitleBar:{
            type:Boolean,
            default:true
        },
        movable:{
            type:Boolean,
            default:true
        },
        resizable:{
            type:Boolean,
            default:true
        },
        minX:{
            type:Number,
            default:600,
        },
        minY:{
            type:Number,
            default:400
        },
        defaultWidth:{
            type:Number,
            default:800
        },
        defaultHeight:{
            type:Number,
            default:600
        }
    },
    created:function(){
        if(this.$props.defaultWidth < this.$props.minX) {
            throw "[Window] error: Default width cannot be smaller than minimum width";
        }
        if(this.defaultHeight < this.minY) {
            throw "[Window] error: Default height cannot be smaller than minimum height";
        }
    },
    mounted:function(){
        var elem = this.$el as HTMLElement;
        elem.style.width = this.$props.defaultWidth + "px";
        elem.style.height = this.$props.defaultHeight + "px";
    },
    components:{
        WindowTitle
    },
    directives: WindowBehaviours,
})
</script>
<style lang="scss" scoped>
    @import 'src/scss/colorset.scss';
    .window {
        background-color: $window-background;
        border:1px solid $window-border;
        min-width: 600px;
        min-height:400px;
        position: absolute;
        display:flex;
        flex-direction: column;
        /* non user select */
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
        &-content {
            color:$content-foreground; /* window-foreground */
            text-align:initial;
            flex-grow: 1;
        }
    }
</style>