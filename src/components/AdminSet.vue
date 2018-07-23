<template>
    <div>
        <top-head></top-head>
        <header class="title">管理员信息</header>
        <div class="box">
            <ul>
                <li><span>姓&nbsp;&nbsp;&nbsp;&nbsp;名:</span><span>测试一下</span></li>
                <li><span>管理员ID:</span><span>12350</span></li>
                <li><span>管理员权限:</span><span>普通管理员</span></li>
                <li><span> 注册时间:</span><span>2018-07-03 17:29</span></li>
                <li>
                    <span>更换头像:</span>
                    <el-upload
                      class="uploadImg"
                      :action="url">
                      <img v-if="true" class="avatar" src="../assets/timg.jpg">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>    
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import topHead from './Header'
    export default {
        data(){
            return{
                url:''
            }
        },
        components:{
            topHead
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
