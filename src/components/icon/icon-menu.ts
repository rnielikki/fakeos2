import Vue from 'vue'
import { DirectoryInfo } from '@/system/filesystem/fileinfo'
import FilesystemEditor from '@/system/filesystem/filesystem-editor';
import { showDialogIfError } from '@/system/filesystem/file-edit-result'

export default Vue.extend({
    data:function(){
        return {
            value:[
                {
                    label:"Open",
                    action:()=>this.$emit('open-icon', (this as any).model)
                },
                {
                    label: "Rename",
                    action:()=>(this as any).editLabel()
                },
                {
                   label: "Delete",
                    action:()=>(this as any).delete()
                },
            ],
            editable:false
        }
    },
    methods:{
        editLabel:function(){
            this.editable = true;
            let labelElement = this.$refs.label as HTMLElement;
            this.$nextTick(()=>{
                labelElement.focus();
            })
            document.addEventListener("mousedown",()=>{
                    this.editable=false;
            }, { once: true })
        },
        delete:function(){
            let _info = this.$props.model.fileInfo;
            showDialogIfError(_info.name, FilesystemEditor.delete(_info));
        },
        move:function(target:DirectoryInfo){
            let _info = this.$props.model.fileInfo;
            showDialogIfError(_info.name, FilesystemEditor.move(_info, target));
        }
    }
})