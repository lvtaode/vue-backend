<template>
	<div id="manage">
		<!-- 左边菜单栏 -->
		<el-col :span="4" >
			<el-menu>
				<el-menu-item index="1">首页</el-menu-item>
				<el-submenu index="2">
					<template slot="title">数据管理</template>
					<el-menu-item index="2-1">用户列表</el-menu-item>
					<el-menu-item index="2-2">商家列表</el-menu-item>
					<el-menu-item index="2-3">食品列表</el-menu-item>
					<el-menu-item index="2-4">订单列表</el-menu-item>
					<el-menu-item index="2-5">管理员列表</el-menu-item>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">添加数据</template>
					<el-menu-item index="3-1">添加商铺</el-menu-item>
					<el-menu-item index="3-2">添加商品</el-menu-item>
				</el-submenu>
			</el-menu>
		</el-col>
		<!-- 右边内容 -->
		<el-col :span="20">

		</el-col>
	</div>
</template>

<style>
	
</style>
