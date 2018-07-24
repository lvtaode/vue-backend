<template>
    <div class="header_container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" v-bind:key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
		<el-dropdown placement="top" style="margin-right:50px" @command="handleCommand">
			<img src="../assets/timg.jpg" class="avator">
			<el-dropdown-menu  slot="dropdown" >
				<el-dropdown-item command="home">首页</el-dropdown-item>
				<el-dropdown-item command="singout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>
<script>
	export default{
		methods:{
			handleCommand(command){
				if(command=="home"){
					this.$router.push('/main')
				}else if(command=="singout"){
					
					this.$router.push('/');
					this.$message.success('退出成功');
				}
			}
		}
	}
</script>
<style>
	.header_container{
			background-color: #f7f7f7;
			height: 60px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 20px;
		}
	.avator{
		width:50px;
		height:50px;
		border-radius: 50%;
		/* margin-right: 50px; */
	}
</style>
