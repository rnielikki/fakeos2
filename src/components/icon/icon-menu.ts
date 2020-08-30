import Vue from 'vue'
import IFileInfo, { DirectoryInfo } from '@/system/filesystem/fileinfo'
import windowFactory from '../window/window-factory';

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
        delete:function(info?:IFileInfo){
            let fileInfo = info ?? this.$props.model.fileInfo;
            if(fileInfo.mutable) {
                this.showEditErrorDialog(fileInfo.name);
                return false;
            }
            if(fileInfo instanceof DirectoryInfo){
                let files = fileInfo.files
                for(let file of files) {
                    if(this.delete(file) == false)
                    return false;
                }
            }
            let parent = (this.$props.model.fileInfo.parent as DirectoryInfo).files;
            let index = parent.indexOf(fileInfo);
            if(index > -1){
                (this.$props.model.fileInfo.parent as DirectoryInfo).files.splice(index, 1)
            }
            else {
                this.showNotFoundErrorDialog(fileInfo.name);
                return false;
            }
            this.$destroy();
            return true;
        },
        showEditErrorDialog(fileName:string) {
            windowFactory.OpenDialog(null, "LOCKED File", `File ${fileName} is not edible.\nI mean, not editable.`);
        },
        showNotFoundErrorDialog(fileName:string) {
            windowFactory.OpenDialog(null, "REMOVED File", `File ${fileName} is 404.\nWe cannot find the file. Where are you?`);
        }
    }
})