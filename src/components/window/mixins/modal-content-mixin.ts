import Vue from 'vue'
export default Vue.extend({
    props:{
        result:{},
        callback:{
            type:Function,
            default:()=>{}
        }
    },
    methods:{
        SetResult:function(value:any){
            this.$props.result = value
        }
    },
    beforeDestroy:function(){
        this.$props.callback?.call(this, this.$props?.result ?? null)
    }
});