<template>
    <div style="padding:2.7rem">
        <h1>Help Page</h1>
        <div>
            <ul>
                <li>
                    <a href="https://github.com/rnielikki/fakeos2">GitHub Page</a>
                </li>
                <li>
                    <a href="https://github.com/rnielikki/fakeos2/issues">Bug Report / Request Feature</a>
                </li>
                <li>
                    <a href="https://github.com/rnielikki/fakeos2/wiki">Documentation</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data:function(){
        return {
            title:"Help page"
        }
    }
})
</script>
<style lang="scss" scoped>
@import 'src/scss/colorset.scss';
    ul {
        line-height: 2.25rem;
    }
    a {
        color:$content-foreground;
        font-size:150%;
        text-decoration: none;
        padding:.25rem;
        &:hover {
            background-color:$selected-background;
            color:$selected-foreground
        }
    }
</style>