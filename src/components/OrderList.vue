<template>
    <div>
        <Header></Header>
        <div class="container">
            <el-table :data="orderList"  
                @expand-change="expand"
                >

                 <el-table-column type="expand">
                     <template slot-scope="props">
                         <el-form class="table-expand" inline label-position="left">
                             <el-form-item label="用户名"> 
                                 <span>{{props.row.username}}</span>
                             </el-form-item>
                             <el-form-item label="店铺名称">
                                 <span>{{props.row.shop_name}}</span>
                             </el-form-item>
                             <el-form-item label="收货地址">
                                 <span>{{props.row.address}}</span>
                             </el-form-item>
                             <el-form-item label="店铺ID">
                                 <span>{{props.row.restaurant_id}}</span>
                             </el-form-item>
                             <el-form-item label="店铺地址">
                                 <span>{{props.row.shop_address}}</span>
                             </el-form-item>
                         </el-form>
                     </template>
                </el-table-column>
                <el-table-column label="订单 ID" prop="id">
                </el-table-column>
                <el-table-column label="总价格" prop="total_amount">     
                </el-table-column>
                <el-table-column label="订单状态" prop="status">  
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
import { setTimeout } from 'timers';
    export default {
        components:{
            Header
        },
        data(){
            return{
                orderList:[],
                restaurant_id:null,
                count:0,
                limit:10,
                offset:0,
                expendRow: []
            }
        },
        created(){
            this.$http.get('https://elm.cangdu.org/bos/orders/count',{
                    params:{restaurant_id:this.restaurant_id}
                }).then(res=>{
                    this.count=res.data.count;
                });
            this.restaurant_id=this.$route.query.restaurant_id;
            this.loadData();
        },
        methods:{
            // 每页多少条数据
            handleSizeChange:function(val){
                console.log(val)
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
                this.$http.get('https://elm.cangdu.org/bos/orders',{
                    params:{
                        limit:this.limit,
                        offset:this.offset,
                        restaurant_id:this.restaurant_id
                    }
                }).then(res=>{
                        console.log(res.data);
                         this.orderList=[];
                        res.data.forEach((item,index) => {
                            const tableData = {};
                            tableData.id = item.id;
                            tableData.total_amount = item.total_amount;
                            tableData.status = item.status_bar.title;
                            tableData.user_id = item.user_id;
                            tableData.restaurant_id = item.restaurant_id;
                            tableData.address_id = item.address_id;
                            tableData.index = index;
                            tableData.address="";
                            tableData.username='';
                            tableData.shop_address='';
                            tableData.shop_name='';
                            this.orderList.push(tableData);
                        });
                    }
                );
            },
           expand:function(row){
                var restaurant_id=row.restaurant_id;
                var user_id=row.user_id;
                var address_id=row.address_id;
                console.log(user_id);
                this.$http.get('https://elm.cangdu.org/v1/addresse/'+address_id).then(res=>{
                    console.log(this.orderList[row.index]);
                    this.orderList[row.index].address=res.data.address;
                    }
                );
                this.$http.get('https://elm.cangdu.org/v1/user/'+user_id).then(res=>{
                    // console.log(res.data);
                    this.orderList[row.index].username=res.data.username;
                })
                this.$http.get('https://elm.cangdu.org/shopping/restaurant/'+restaurant_id).then(res=>{
                    // console.log(res.data);
                     this.orderList[row.index].shop_address=res.data.address;
                     this.orderList[row.index].shop_name=res.data.name;
                })
            }
        }
    }
</script>
<style>
    @import '../style/common.css';
</style>
