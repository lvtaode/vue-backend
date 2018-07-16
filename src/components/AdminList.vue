<template>
    <div>
        <Header></Header>
        <div class="container">
            <el-table :data="userList" highlight-current-row height="520">
                <el-table-column fixed type="index" width="100"></el-table-column>
                <el-table-column label="姓名" prop="user_name" width="220">
                </el-table-column>
                <el-table-column label="注册日期" prop="create_time" width="220">
                </el-table-column>
                <el-table-column label="地址" prop="city">
                </el-table-column>
                <el-table-column label="权限" prop="admin">
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
        mounted:function(){
            this.getData();
            this.$http.get('https://elm.cangdu.org/admin/count').then(res=>{
                console.log(res.data.count);
                this.count=res.data.count;
            });
        },
        data(){
            return {
                userList:[
                    {
                        user_name:'周杰伦',
                        create_time:"2008-05-01",
                        city:'台北',
                        admin:'管理员'
                    }
                ],
                offset:1,
                limit:10,
                count:0
            }
        },
        methods:{
            // 每页多少条数据
            handleSizeChange:function(val){
                this.$message.success(`每页显示${val}条数据`);
                this.limit=val;
                this.getData();
            },
            currentPage:function(val){
                 this.$message.success(`这是第${val}页`);
                 this.offset=val;
                 this.getData();    
            },
            getData:function(){
                this.$http.get('https://elm.cangdu.org/admin/all',{params:{limit:this.limit,offset:this.offset}}).then(res=>{
                console.log(res.data.data);
                this.userList=res.data.data;
            })
          }
        }
    }
</script>
<style>
    @import '../style/common';
</style>
