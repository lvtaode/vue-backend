<template>
    <div>
        <Header></Header>
        <div class="container">
            <el-table :data="orderList">

                 <el-table-column type="expand" >
                     <template slot-scope="props">
                         <el-form class="table-expand" inline label-position="left">
                             <el-form-item label="用户名"> 
                                 <span>{{props.row.user_name}}</span>
                             </el-form-item>
                             <el-form-item label="店铺名称">
                                 <span>{{props.row.shop_name}}</span>
                             </el-form-item>
                             <el-form-item label="收货地址">
                                 <span>{{props.row.receive_address}}</span>
                             </el-form-item>
                             <el-form-item label="店铺ID">
                                 <span>{{props.row.shop_id}}</span>
                             </el-form-item>
                             <el-form-item label="店铺地址">
                                 <span>{{props.row.shop_addr}}</span>
                             </el-form-item>
                         </el-form>
                     </template>
                </el-table-column>
                <el-table-column label="订单 ID" prop="orderId">
                </el-table-column>
                <el-table-column label="总价格" prop="total_price">     
                </el-table-column>
                <el-table-column label="订单状态" prop="order_status">  
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
            return{
                orderList:[
                    {
                        orderId:'1',
                        total_price:'8547.2',
                        order_status:'待支付',
                        user_name:'克雷格',
                        shop_name:'天下第一鸡',
                        receive_address:'赛博坦星球',
                        shop_id:'001',
                        shop_addr:'西安市未央区凤城五路赛高国际'
                    },
                    {
                        orderId:'2',
                        total_price:'8547.2',
                        order_status:'已完成',
                        user_name:'克雷格',
                        shop_name:'天下第一鸡',
                        receive_address:'赛博坦星球',
                        shop_id:'002',
                        shop_addr:'西安市未央区凤城五路赛高国际'
                    },
                    {
                        orderId:'3',
                        total_price:'8547.2',
                        order_status:'支付超时',
                        user_name:'克雷格',
                        shop_name:'天下第一鸡',
                        receive_address:'赛博坦星球',
                        shop_id:'003',
                        shop_addr:'西安市未央区凤城五路赛高国际'
                    },
                    {
                        orderId:'4',
                        total_price:'8547.2',
                        order_status:'待支付',
                        user_name:'克雷格',
                        shop_name:'天下第一鸡',
                        receive_address:'赛博坦星球',
                        shop_id:'004',
                        shop_addr:'西安市未央区凤城五路赛高国际'
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
    @import '../style/common.css';
</style>
