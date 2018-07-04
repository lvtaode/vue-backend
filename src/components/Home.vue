<template>
    <div>
        <top-head></top-head>
        <header class="title">数据统计</header>
        <section class="data_section">
            <el-row :gutter="20" style="margin-bottom:10px;margin-left:30px">
                <el-col :span="5"><div class="data_list today_head">当日数据</div></el-col>
				<el-col :span="5"><div class="data_list"><span>32</span> 新增用户</div></el-col>
				<el-col :span="5"><div class="data_list"><span>17</span> 新增订单</div></el-col>
                <el-col :span="5"><div class="data_list"><span>55</span> 新增管理员</div></el-col>
			</el-row>
            <el-row :gutter="20" style="margin-bottom:10px;margin-left:30px">
                <el-col :span="5"><div class="data_list all_head">总数据</div></el-col>
                <el-col :span="5"><div class="data_list"><span>11673</span> 注册用户</div></el-col>
                <el-col :span="5"><div class="data_list"><span>4747</span> 订单</div></el-col>
                <el-col :span="5"><div class="data_list"><span>17172</span> 管理员</div></el-col>
            </el-row>
        </section>
    </div>
</template>

<script>
    import topHead from './Header'
    export default{
        components: {
    		topHead
    	}
    }
</script>
<style>
    .data_section{
        width: 90%;
        margin:20px auto;
    }
    
    .data_list{
        height: 40px;
        line-height: 40px;
        border-radius: 6px;
        text-align: center;
        background-color: #E5E9F2;
    }
    .data_list span{
        font-size:1.5em;
    }
    .today_head{
        color:#fff;
        background-color: #FF9800;
        font-size: 24px;
    }
    .all_head{
        color:#fff;
        background-color: #20A0FF;
        font-size: 24px;
    }
</style>
