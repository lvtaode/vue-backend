<template>
    <div>
        <Header></Header>
        <div class="container">
            <el-table :data="foodList">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form class="table-expand" inline label-position="left">
                            <el-form-item label="食品名称">
                                <span>{{props.row.food_name}}</span>
                            </el-form-item>
                            <el-form-item label="餐馆名称">
                                <span>{{props.row.restaurant_name}}</span>
                            </el-form-item>
                            <el-form-item label="食品ID">
                                <span>{{props.row.food_id}}</span>
                            </el-form-item>
                            <el-form-item label="餐馆 ID">
                                <span>{{props.row.restaurant_id}}</span>
                            </el-form-item>
                            <el-form-item label="食品介绍">
                                <span>{{props.row.food_intro}}</span>
                            </el-form-item>
                            <el-form-item label="餐馆地址">
                                <span>{{props.row.restaurant_addr}}</span>
                            </el-form-item>
                            <el-form-item label="食品评分">
                                <span>{{props.row.score}}</span>
                            </el-form-item>
                            <el-form-item label="食品分类">
                                <span>{{props.row.food_kind}}</span>
                            </el-form-item>
                            <el-form-item label="月销量">
                                <span>{{props.row.sale_count}}</span>
                            </el-form-item>               
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="食品名称" prop="food_name"></el-table-column>
                <el-table-column label="食品介绍" prop="food_intro"></el-table-column>
                <el-table-column label="评分" prop="score"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="mini">编辑</el-button>
                        <el-button size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange"
                 @current-change="currentPage"
                 :total="100" 
                 layout="total,sizes,prev, pager, next"  
                 :page-sizes="[10,20,30,40]">

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
                foodList:[
                    {
                        food_name:'黄焖鸡',
                        food_intro:'大吉大利,今晚吃鸡',
                        score:'4.8',
                        food_id:'12',
                        sale_count:'456',
                        restaurant_name:'天下第一鸡',
                        restaurant_id:'001',
                        restaurant_addr:'热河路303',
                        food_kind:'熟肉'
                    },
                    {
                        food_name:'黄焖鸡',
                        food_intro:'大吉大利,今晚吃鸡',
                        score:'4.8',
                        food_id:'22',
                        sale_count:'456',
                        restaurant_name:'天下第一鸡',
                        restaurant_id:'002',
                        restaurant_addr:'热河路303',
                        food_kind:'熟肉'
                    },
                    {
                        food_name:'黄焖鸡',
                        food_intro:'大吉大利,今晚吃鸡',
                        score:'4.8',
                        food_id:'32',
                        sale_count:'456',
                        restaurant_name:'天下第一鸡',
                        restaurant_id:'003',
                        restaurant_addr:'热河路303',
                        food_kind:'熟肉'
                    },
                    {
                        food_name:'黄焖鸡',
                        food_intro:'大吉大利,今晚吃鸡',
                        score:'4.8',
                        food_id:'42',
                        sale_count:'456',
                        restaurant_name:'天下第一鸡',
                        restaurant_id:'004',
                        restaurant_addr:'热河路303',
                        food_kind:'熟肉'
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
