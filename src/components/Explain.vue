<template>
    <div class="explain_page">
        <top-head></top-head>
        <div class="explain">
            <p>node-elm后台管理系统</p>
            <p>第一次登录的用户可以自动注册成为普通管理员</p>
            <p>普通管理员可以添加,修改信息</p>
            <p>超级管理员可以删除信息</p>
        </div>
    </div>
</template>
<script>
    import topHead from './Header'
    export default {
        components:{
            topHead
        }
    }
</script>
<style>
    .explain{
        padding-top:30px;
        width: 100%;
        color:#333;
        text-align: center;
        font-size: 26px;
        line-height: 80px;
    }
</style>
