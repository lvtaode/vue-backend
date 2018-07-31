<template>
    <div>
        <top-head></top-head>
        <header class="title">管理员信息</header>
        <div class="box">
            <ul>
                <li><span>姓&nbsp;&nbsp;&nbsp;&nbsp;名:</span><span>{{adminInfo.user_name}}</span></li>
                <li><span>管理员ID:</span><span>{{adminInfo.id}}</span></li>
                <li><span>管理员权限:</span><span>{{adminInfo.admin}}</span></li>
                <li><span> 注册时间:</span><span>{{adminInfo.create_time}}</span></li>
                <li>
                    <span>更换头像:</span>
                    <el-upload
                      class="uploadImg"
                       :action="baseUrl + '/admin/update/avatar/'+adminInfo.id"
                       :before-upload="beforeImgUpload"
                       :show-file-list="false"
                       :on-success="uploadImg">
                      <img v-if="adminInfo.avatar" class="avatar" :src="baseImgPath + adminInfo.avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>    
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import topHead from './Header'
    import {mapState} from 'vuex'
    import {baseUrl,baseImgPath} from "@/config/env"
    export default {
        data(){
            return{
                baseUrl,
                baseImgPath
            }
        },
        // mounted(){
        //     this.loadData();
        // },
        components:{
            topHead
        },
        computed:{
            ...mapState(['adminInfo'])
        },
        methods:{
            // loadData(){
            //     this.$http.get('https://elm.cangdu.org/v1/user/5').then(res=>{
            //         console.log(res.data);
            //         this.userData=res.data;
            //     })
            // },
            beforeImgUpload(file){
                console.log(this.adminInfo);
                const fileType=(file.type==="image/png") || (file.type==="image/jpeg");
                const fileSize=(file.size/1024/1024)<2;
                if(!fileType){
                    this.$message.error("上传图片必须是png或者jpg格式");
                }
                if(!fileSize){
                    this.$message.error("上传图片大小不能超过2M");
                    
                }
            },
            uploadImg(res,file){
                console.log(res);
                // console.log(file);
                if(res.status==1){
                    this.adminInfo.avatar = res.image_path;
                }else{
                    this.$message.error("上传图片失败");
                }
            }
        }
    }
</script>
<style>
    .box{
        width: 600px;
        min-height:500px;
        margin:10px auto;
        border-radius:10px;
        background-color: #f7f7f7;
    }
    .box ul li{
        color: #666;
        font-size: 17px;
        padding:20px;
    }
    .box ul li span:first-child{
        font-size:20px;
        display: inline-block;
        text-align: left;
        width: 115px;
        color: #0aa1ed;
        font-family: '黑体', Courier, monospace;
    }
    .uploadImg{
        border: 1px dashed #d9d9d9;
        margin-top: 15px;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width:120px;
        height: 120px;
    }
    .uploadImg:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 30px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
