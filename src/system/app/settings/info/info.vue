<template>
    <div class="root">
        <h1>FakeOS Ver 2.</h1>
        <h3 clasS="normal">On <span class="highlight">Vue 2.6.11</span> Kernel: Written in <span class="highlight">TypeScript 3.9.6</span></h3>
        <p>{{ computerName }}</p>
        <p>{{ computerInfo.cpu }} ({{ computerInfo.arc }})</p>
        <p>{{ computerInfo.memory }} RAM</p>
        <p>This operating system is on since {{ uptime }}.</p>
        <p>Created by Mielikki, Owned by {{ userName }}</p>
        <ui-button text="check update" :clicked="checkUpdate" />
        <h2>Activation state</h2>
        <p>This operating system is not activated and expires within 14 days.</p>
        <ui-button text="activate" :clicked="activate" />
        <h2>Feedback</h2>
        <ui-button text="help center" :clicked="feedback" />
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import current from '@/system/time/current'
import UiButton from '@/components/ui-components/button.vue'
import WindowFactory from '@/components/window/window-factory'
import { OkCancelButton } from '@/components/window/components/dialogs/dialog-model'
import SystemName from '@/system/system-name'
export default Vue.extend({
    data:function(){
        return {
            title:"Computer information"
        }
    },
    components:{ UiButton },
    computed:{
        computerInfo:function(){
            return SystemName.computerInfo;
        },
        uptime:function(){
            return current.startDate;
        },
        userName:function(){
            return SystemName.user;
        },
        computerName:function(){
            return SystemName.computer;
        }
    },
    methods:{
        checkUpdate:function(){
            WindowFactory.OpenDialog(this.$data.f_targetWindow, "Found 1 update", "We found 1 offical virus as update. Do you want to install?", OkCancelButton,
                (result:boolean)=>{
                    (result)?
                        WindowFactory.OpenDialog(this.$data.f_targetWindow, "Cannot find the update", "You didn't pay the bitcoin so you cannot update it.\nIf you want to pay it, please send money to me.")
                        :WindowFactory.OpenDialog(this.$data.f_targetWindow, "lol", "I will find you and I will install virus on your computer!")
                }
            );
        },
        activate:function(){
            WindowFactory.OpenDialog(this.$data.f_targetWindow, "Error", "To activate your computer, update your computer first.")
        },
        feedback:function(){
            WindowFactory.OpenSetting("help");
        }
    }
})
</script>
<style scoped>
.root {
    padding:2.7rem;
    text-align:center;
}
h1 {
    margin-top:0;
}
.normal {
    font-weight: normal;
}
.highlight {
    font-weight: bold;;
}
</style>