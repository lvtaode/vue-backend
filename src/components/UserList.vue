<template>
    <div>
        <Header></Header>
        <div class="container">
            <el-table  :data="userList" highlight-current-row>
                <el-table-column fixed type="index" width="100"></el-table-column>
                <el-table-column label="注册日期" prop="registe_time" width="220">
                </el-table-column>
                <el-table-column label="用户姓名" prop="username" width="220">
                </el-table-column>
                <el-table-column label="注册地址" prop="city">
                </el-table-column>
            </el-table>
             <div class="pagination">
                <el-pagination 
                 @size-change="handleSizeChange"
                 @current-change="currentPage"
                 :total="count" 
                 layout="total,sizes,prev, pager, next"  
                 :page-sizes="[10,20,30,40,50]"
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
                userList:[{
                        register_time:'2012-02-23',
                        username:'刘三姐',
                        address:'陕西省西安市'
                    }],
                    limit:10,
                    offset:0,
                    count:0
            }
        },
        mounted:function(){
            this.loadData();
        },
        methods:{
            // 每页多少条数据
            handleSizeChange:function(val){
                this.limit=val;
                this.loadData();
                this.$message.success(`每页显示${val}条数据`);
            },
            currentPage:function(val){
                this.offset=(val-1)*this.limit;
                this.loadData();
                this.$message.success(`这是第${val}页`);
            },
            loadData:function(){
                this.$http.get('https://elm.cangdu.org/v1/users/count').then(res=>{
                    this.count=res.data.count;
                })
                this.$http.get('https://elm.cangdu.org/v1/users/list',{
                    params:{
                        offset:this.offset,
                        limit:this.limit
                    }
                }).then(res=>{
                    this.userList=res.data;
                })
            }
        }
    }
</script>
<style>
    @import '../style/common';
</style>
