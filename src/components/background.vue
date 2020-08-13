<template>
    <div class="f_background" id="f_background" v-contextmenu="{
        value: menu }">
    </div>
</template>
<script lang="ts">
import VueCopmonent from 'vue'
import { Component, Vue } from 'vue-property-decorator';
import ContextMenu from './menu/contextmenu'
import WindowFactory from './window/window-factory'

@Component({
    directives:{
        contextmenu: ContextMenu
    },
    data:function(){
        return {
            menu:[
                {
                label: 'Open...',
                submenu:[
                    {label:'sub1test'},
                    {label:'test2',
                    submenu:[
                        { label:'lol' },
                        {
                            label: 'Next...',
                            action:function(){
                                WindowFactory.OpenProgram("hello-world");
                            }
                        }              
                    ]
                }
            ]
            },
            { label: 'Display settings' },
            { label: 'Theme'}
            ]
        }
    }
})
export default class Background extends Vue {}
</script>
<style lang="scss" scoped>
    .f_background {
        z-index:0;
        height:100%; 
        left:0;top:0;right:0;bottom:0;
        background:darkslateblue url('../assets/logo.png') repeat;
    }
</style>