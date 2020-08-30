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
        add:function(fileInfo:IFileInfo, parent:DirectoryInfo){
            if(!parent.mutable) {
                this.showEditErrorDialog(fileInfo.name);
                return false;
            }
            if(!this.validNameCheck(fileInfo.name, parent)) {
                return false;
            }
            parent.files.push(fileInfo);
            return true;
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
        move:function(file:IFileInfo, target:DirectoryInfo){
            if(!file.mutable || !target.mutable){
                (file.mutable)?this.showEditErrorDialog(target.name):this.showEditErrorDialog(file.name);
                return false;
            }
            if(!this.validNameCheck(file.name, target)){
                return false;
            }
            let files = (file.parent as DirectoryInfo)?.files;
            let index = files?.indexOf(file);
            if(files == null || index < 0){
                this.showNotFoundErrorDialog(file.name);
                return false;
            }
            files.splice(index, 1);
            target.files.push(file);
            file.parent = target;
            if(file instanceof DirectoryInfo){
                file.setCurrentDirectory();
            }
            return true;
        },
        validNameCheck(name:string, parent:DirectoryInfo){
            if(name.indexOf('/') > -1) {
                this.showInvalidNameDialog(name);
                return false;
            }
            if(parent.getFile(name)) {
                this.showDuplicatedNameDialog(name);
                return false;
            }
            else {
                return true;
            }
        },
        showEditErrorDialog(fileName:string) {
            windowFactory.OpenDialog(null, "LOCKED File", `File ${fileName} is not edible.\nI mean, not editable.`);
        },
        showNotFoundErrorDialog(fileName:string) {
            windowFactory.OpenDialog(null, "REMOVED File", `File ${fileName} is 404.\nWe cannot find the file. Where are you?`);
        },
        showInvalidNameDialog(fileName:string) {
            windowFactory.OpenDialog(null, "INVALID Name", `${fileName} should not contain slash(/).`)
        },
        showDuplicatedNameDialog(fileName:string) {
            windowFactory.OpenDialog(null, "DUPLICATED Name", `${fileName} should not contain slash(/).`)
        }
    }
})