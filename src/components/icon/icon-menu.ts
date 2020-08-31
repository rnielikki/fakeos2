import Vue from 'vue'
import { DirectoryInfo } from '@/system/filesystem/fileinfo'
import FilesystemEditor from '@/system/filesystem/filesystem-editor';
import FileEditResult, { showDialogIfError } from '@/system/filesystem/file-edit-result'

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
            let oldText = labelElement.textContent;
            this.$nextTick(()=>{
                labelElement.focus();
            })
            document.addEventListener("mousedown",()=>{
                let editResult = FilesystemEditor.editFileName(this.$props.model.fileInfo, labelElement.textContent ?? "");
                if(editResult !== FileEditResult.Success) {
                    showDialogIfError(editResult, labelElement.textContent??"");
                    labelElement.textContent = oldText;
                }
                this.editable=false;
            }, { once: true })
        },
        delete:function(){
            let _info = this.$props.model.fileInfo;
            showDialogIfError(FilesystemEditor.delete(_info), _info.name);
        },
        move:function(target:DirectoryInfo){
            let _info = this.$props.model.fileInfo;
            showDialogIfError(FilesystemEditor.move(_info, target), _info.name, target.name);
        }
    }
})