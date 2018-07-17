<template>
    <div>
        <Header></Header>
        <div class="container">
            <el-table :data="shopList">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form class="table-expand" inline label-position="left">
                            <el-form-item label="店铺名称">
                                <span>{{props.row.name}}</span>
                            </el-form-item>
                            <el-form-item label="店铺地址">
                                <span>{{props.row.address}}</span>
                            </el-form-item>
                            <el-form-item label="店铺介绍">
                                <span>{{props.row.description}}</span>
                            </el-form-item>
                            <el-form-item label="店铺ID">
                                <span>{{props.row.id}}</span>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <span>{{props.row.phone}}</span>
                            </el-form-item>
                            <el-form-item label="评分">
                                <span>{{props.row.rating}}</span>
                            </el-form-item>
                            <el-form-item label="销售量">
                                <span>{{props.row.recent_order_num}}</span>
                            </el-form-item>
                            <el-form-item label="分类">
                                <span>{{props.row.category}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="店铺名称" prop="name"></el-table-column>
                <el-table-column label="店铺地址" prop="address"></el-table-column>
                <el-table-column label="店铺介绍" prop="description"></el-table-column>
                <el-table-column label="操作">
                    <div slot-scope="scope">
                        <el-button size="mini">编辑</el-button>
                        <el-button size="mini" >添加食品</el-button>
                        <el-button size="mini" type="danger">删除</el-button>
                    </div>
                </el-table-column>
            </el-table>
             <div class="pagination">
                <el-pagination 
                 @size-change="handleSizeChange"
                 @current-change="currentPage"
                 :total="100" 
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
            this.loadData();
        },
        data(){
             return {
                shopList: [{
                        name: '好滋好味鸡蛋仔',
                        address: '上海市普陀区真北路',
                        category: '江浙小吃、小吃零食',
                        description: '荷兰优质淡奶，奶香浓而不腻',
                        id: '10333',
                        phone:'18745698751',
                        recent_order_num:'5645',
                        rating:'4.5',
                        category:'nicai'
                    }]
            }
        },
        methods:{
            // 每页多少条数据
            handleSizeChange:function(val){
                this.$message.success(`每页显示${val}条数据`);
            },
            currentPage:function(val){
                 this.$message.success(`这是第${val}页`);
            },
            loadData:function(){
                this.$http.get('https://elm.cangdu.org/shopping/restaurants?latitude=34.34127&longitude=108.939842').then(res=>{
                    console.log(res.data);
                    this.shopList=res.data;
                })
            }
        }
    }
</script>

<style>
    @import '../style/common.css';
</style>
