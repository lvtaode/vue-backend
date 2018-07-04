<template>
    <div>
        <top-header></top-header>
        <div class="edit-box">
            <quill-editor class="editer" v-model="content">
            </quill-editor>
        </div>
        <div class="btn">
            <el-button type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import topHeader from './Header'
    import { quillEditor } from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    export default {
        data(){
            return{
                content:"<h3>文本编辑 . . .</h3>"
            }
            
        },
        components:{
            topHeader,
            quillEditor
        },
        methods:{
            submit(){
                console.log(this.content);
                this.$message.success('提交成功...');
            }
        }
    }
</script>

<style>
    .edit-box{
        width: 95%;
        min-height: 400px;
        margin:40px auto;
        /* border: 1px solid red; */
    }
    .editer{
        height: 400px;
    }
    .btn{
        text-align: center;
        margin-top:100px;
    }
</style>
