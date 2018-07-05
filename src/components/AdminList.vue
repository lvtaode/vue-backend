<template>
    <div>
        <Header></Header>
        <div class="container">
            <el-table :data="userList" height="520" highlight-current-row>
                <el-table-column fixed type="index" width="100"></el-table-column>
                <el-table-column label="姓名" prop="user_name" width="220">
                </el-table-column>
                <el-table-column label="注册日期" prop="register_date" width="220">
                </el-table-column>
                <el-table-column label="地址" prop="addr">
                </el-table-column>
                <el-table-column label="权限" prop="admin">
                </el-table-column>
            </el-table>
             <div class="pagination">
                <el-pagination 
                 @size-change="handleSizeChange"
                 @current-change="currentPage"
                 :total="100" 
                 layout="total,sizes,prev, pager, next"  
                 :page-sizes="[10,20,30,40]"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from './Header'
    export default {
        components:{
            Header
        },
        data(){
            return {
                userList:[
                    {
                        user_name:'柯景腾',
                        register_date:"2008-05-01",
                        addr:'台北',
                        admin:'管理员'
                    },
                    {
                        user_name:'柯景腾',
                        register_date:"2008-05-01",
                        addr:'台北',
                        admin:'管理员'
                    },
                    {
                        user_name:'柯景腾',
                        register_date:"2008-05-01",
                        addr:'台北',
                        admin:'管理员'
                    },
                    {
                        user_name:'柯景腾',
                        register_date:"2008-05-01",
                        addr:'台北',
                        admin:'管理员'
                    },
                    {
                        user_name:'柯景腾',
                        register_date:"2008-05-01",
                        addr:'台北',
                        admin:'管理员'
                    },
                    {
                        user_name:'柯景腾',
                        register_date:"2008-05-01",
                        addr:'台北',
                        admin:'管理员'
                    },
                    {
                        user_name:'柯景腾',
                        register_date:"2008-05-01",
                        addr:'台北',
                        admin:'管理员'
                    },
                    {
                        user_name:'柯景腾',
                        register_date:"2008-05-01",
                        addr:'台北',
                        admin:'管理员'
                    },{
                        user_name:'柯景腾',
                        register_date:"2008-05-01",
                        addr:'台北',
                        admin:'管理员'
                    },{
                        user_name:'柯景腾',
                        register_date:"2008-05-01",
                        addr:'台北',
                        admin:'管理员'
                    }
                ]
            }
        },
        methods:{
            // 每页多少条数据
            handleSizeChange:function(val){
                this.$message.success(`每页显示${val}条数据`);
            },
            currentPage:function(val){
                 this.$message.success(`这是第${val}页`);
            }
        }
    }
</script>
<style>
    @import '../style/common';
</style>
