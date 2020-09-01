<template>
    <div>
        <img :src="iconStatus">
    </div>
</template>
<script lang="ts">
import InternetPopup from './internet-popup.vue'
import Popup from '@/components/popups/popup'
import PopupInfo, { popupDirection } from '@/components/popups/popup-info'

import Vue from 'vue'
export default Vue.extend({
    data:function(){
        return {
            iconStatus:"",
            isOnline:navigator.onLine
        }
    },
    created:function(){
        this.setStatusIcon();
        window.addEventListener("online", this.setStatusIcon);
        window.addEventListener("offline", this.setStatusIcon);
    },
    mounted:function(){
        new Popup(this.$el as HTMLElement, ()=>new InternetPopup(), "click", new PopupInfo({
            direction:popupDirection.topLeft,
            x:"100%"
        }));
    },
    methods:{
        setStatusIcon:function(){
            this.isOnline = navigator.onLine;
            Vue.set(this.$data,"iconStatus", this.getStatusIcon())
        },
        getStatusIcon:function(){
            let ifOnline = (navigator.onLine)?"connected":"disconnected"
            return require(`./images/${ifOnline}.png`);
        }
    },
    beforeDestroy:function(){
        window.removeEventListener("online", this.setStatusIcon);
        window.removeEventListener("offline", this.setStatusIcon);
    }
})
</script>