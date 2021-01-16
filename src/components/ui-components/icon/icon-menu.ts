import Vue, { defineComponent } from 'vue'
import { DirectoryInfo } from '@/system/filesystem/fileinfo'
import FilesystemEditor from '@/system/filesystem/filesystem-editor';
import FileEditResult, { showDialogIfError } from '@/system/filesystem/file-edit-result'
import Win64Factory from '@/components/window/window-factory';

export default defineComponent({
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
                    label:"Create Shortcut",
                    action:()=>(this as any).addShortcut()
                },
                {
                   label: "Delete",
                    action:()=>(this as any).delete()
                },
                {
                    label: "Properties",
                     action:()=>(this as any).openProperties()
                }
            ],
            editable:false
        }
    },
    methods:{
        editLabel:function(){
            //@ts-ignore
            if(!this.$props.model.fileInfo.mutable){
                //@ts-ignore
                showDialogIfError(FileEditResult.Immutable, this.$props.model.fileInfo.name)
                return;
            }
            this.editable = true;
            const labelElement = this.$refs.label as HTMLElement;
            const oldText = labelElement.textContent;
            this.$nextTick(()=>{
                labelElement.focus();
            })
            document.addEventListener("mousedown",()=>{
                //@ts-ignore
                const editResult = FilesystemEditor.editFileName(this.$props.model.fileInfo, labelElement.textContent ?? "");
                if(editResult !== FileEditResult.Success) {
                    showDialogIfError(editResult, labelElement.textContent??"");
                    labelElement.textContent = oldText;
                }
                this.editable=false;
            }, { once: true })
        },
        delete:function(){
            //@ts-ignore
            const _info = this.$props.model.fileInfo;
            showDialogIfError(FilesystemEditor.delete(_info), _info.name);
        },
        move:function(target:DirectoryInfo){
            //@ts-ignore
            const _info = this.$props.model.fileInfo;
            showDialogIfError(FilesystemEditor.move(_info, target), _info.name, target.name);
        },
        openProperties:function(){
            Win64Factory.OpenSetting("file-properties", {
                //@ts-ignore
                icon:this.$props.model
            });
        },
        addShortcut:function(){
            //@ts-ignore
            const _fileInfo = this.$props.model.fileInfo;
            showDialogIfError(FilesystemEditor.addShortcut(_fileInfo), _fileInfo.name);
        }
    }
})