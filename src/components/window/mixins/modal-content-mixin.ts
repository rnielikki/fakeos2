import Vue from 'vue'
export default Vue.extend({
    data:function(){
        return {
            result:false as any
        }
    },
    props:{
        functionName:{
            type:String,
            required:false
        }
    },
    methods:{
        setResult:function(res:any){
            this.result = res;
        }
    }
});