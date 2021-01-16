import Vue, { defineComponent } from 'vue'
export default defineComponent({
    data:function(){
        return {
            result:false as any
        }
    },
    props:{
        callback:{
            type:Function,
            required:false
        }
    },
    methods:{
        setResult:function(res:any){
            this.result = res;
        }
    }
});