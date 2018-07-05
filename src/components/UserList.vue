<template>
    <div>
        <Header></Header>
        <div class="container">
            <el-table border :data="userList" height="520" highlight-current-row>
                <el-table-column fixed type="index" width="100"></el-table-column>
                <el-table-column label="注册日期" property="register_time" width="220">
                </el-table-column>
                <el-table-column label="用户姓名" property="username" width="220">
                </el-table-column>
                <el-table-column label="注册地址" property="address">
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
                        register_time:'2012-02-23',
                        username:'刘三姐',
                        address:'陕西省西安市'
                    },
                    {
                        register_time:'2012-02-23',
                        username:'刘三姐',
                        address:'陕西省西安市'
                    },
                    {
                        register_time:'2012-02-23',
                        username:'刘三姐',
                        address:'陕西省西安市'
                    },
                    {
                        register_time:'2012-02-23',
                        username:'刘三姐',
                        address:'陕西省西安市'
                    },
                    {
                        register_time:'2012-02-23',
                        username:'刘三姐',
                        address:'陕西省西安市'
                    },
                    {
                        register_time:'2012-02-23',
                        username:'刘三姐',
                        address:'陕西省西安市'
                    },
                    {
                        register_time:'2014-09-03',
                        username:'马大哈',
                        address:'上海市南京路'
                    },
                    {
                        register_time:'2015-10-01',
                        username:'苏三大妈',
                        address:'苏州市吴中区'
                    },
                    {
                        register_time:'2018-04-25',
                        username:'陈二哈',
                        address:'陕西省咸阳市'
                    },
                    {
                        register_time:'2012-02-23',
                        username:'刘三姐',
                        address:'陕西省西安市'
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
