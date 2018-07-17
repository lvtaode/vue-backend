<template>
    <div>
        <Header></Header>
        <div class="container">
            <el-table :data="foodList">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form class="table-expand" inline label-position="left">
                            <el-form-item label="食品名称">
                                <span>{{props.row.name}}</span>
                            </el-form-item>
                            <el-form-item label="餐馆名称">
                                <span>{{props.row.restaurant_name}}</span>
                            </el-form-item>
                            <el-form-item label="食品ID">
                                <span>{{props.row.item_id}}</span>
                            </el-form-item>
                            <el-form-item label="餐馆 ID">
                                <span>{{props.row.restaurant_id}}</span>
                            </el-form-item>
                            <el-form-item label="食品介绍">
                                <span>{{props.row.description}}</span>
                            </el-form-item>
                            <el-form-item label="餐馆地址">
                                <span>{{props.row.restaurant_address}}</span>
                            </el-form-item>
                            <el-form-item label="食品评分">
                                <span>{{props.row.rating}}</span>
                            </el-form-item>
                            <el-form-item label="食品分类">
                                <span>{{props.row.category_name}}</span>
                            </el-form-item>
                            <el-form-item label="月销量">
                                <span>{{props.row.month_sales}}</span>
                            </el-form-item>               
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="食品名称" prop="name"></el-table-column>
                <el-table-column label="食品介绍" prop="description"></el-table-column>
                <el-table-column label="评分" prop="rating"></el-table-column>
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
                 :total="count" 
                 layout="total,sizes,prev, pager, next"  
                 :page-sizes="[10,20,30,40,50]">
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
            this.$http.get('https://elm.cangdu.org/shopping/v2/foods/count').then(res=>{
                // console.log(res.data);
                this.count=res.data.count;
            })
            this.loadData();
        },
        data(){
            return{
                foodList:[
                    {
                        name:'黄焖鸡',
                        description:'大吉大利,今晚吃鸡',
                        rating:'4.8',
                        food_id:'12',
                        sale_count:'456',
                        restaurant_name:'天下第一鸡',
                        restaurant_id:'001',
                        restaurant_address:'热河路303',
                        category_name:'熟肉'
                    }
                ],
                count:0,
                offset:0,
                limit:10
            }
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
                // console.log(this.offset)
                this.loadData();
                 this.$message.success(`这是第${val}页`);
            },
            loadData:function(){
                this.$http.get('https://elm.cangdu.org/shopping/v2/foods',{params:{limit:this.limit,offset:this.offset}}).then(res=>{
                        console.log(res.data);
                        this.foodList=res.data;
                    }
                )
            }
        }       
    }
</script>

<style>
    @import '../style/common';

</style>
