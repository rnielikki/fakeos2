<template>
    <div class="root">
        <h1>Language setting</h1>
        <p>Currently we provide :</p>
        <ul>
            <li @click="()=>setLanguage('')">Default language</li>
            <li @click="()=>setLanguage('uppercase')" title="Exclamation language">EXCLAMATION LANGUAGE</li>
            <li @click="()=>setLanguage('lowercase')" title="Lowercase language">lowercase language</li>
            <li @click="()=>setLanguage('dingbats')" style="font-family:Wingdings, Webdings" title="Dingbat language">Dingbat language</li>
        </ul>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Globals from '@/system/global'
export default defineComponent({
    data:function(){
        return {
            title:"Language settings",
            desktop: Globals.desktop as HTMLElement
        }
    },
    methods:{
        setLanguage:function(language:string){
            this.desktop.style.fontFamily="";
            this.desktop.style.textTransform="";
            switch(language){
                case "uppercase":
                    this.desktop.style.textTransform="uppercase";
                    break;
                case "lowercase":
                    this.desktop.style.textTransform="lowercase";
                    break;
                case "dingbats":
                    this.desktop.style.fontFamily="Wingdings, Webdings";
                    break;
            }
        }
    }
})
</script>
<style lang="scss" scoped>
@import 'src/scss/colorset.scss';
.root {
    padding:2.7rem;
    text-align:center;
}
ul {
    line-height: 2.25rem;
    padding-left:0;
    background-color:$content-background;
    color:$content-foreground;
    border:1px solid $window-border;
}
li {
    color:$content-foreground;
    font-size:150%;
    text-decoration: none;
    padding:.25rem;
    list-style-type: none;
    &:hover {
        background-color:$selected-background;
        color:$selected-foreground
    }
}
</style>