import Vue from 'vue'
export default Vue.extend({
    beforeDestroy:function(){
        console.log(this);
    }
});