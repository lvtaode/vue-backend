<template>
    <div>
        <Header></Header>
        <div class="container">
            <el-table :data="shopList">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form class="table-expand" inline label-position="left">
                            <el-form-item label="店铺名称">
                                <span>{{props.row.shop_name}}</span>
                            </el-form-item>
                            <el-form-item label="店铺地址">
                                <span>{{props.row.address}}</span>
                            </el-form-item>
                            <el-form-item label="店铺介绍">
                                <span>{{props.row.desc}}</span>
                            </el-form-item>
                            <el-form-item label="店铺ID">
                                <span>{{props.row.shopId}}</span>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <span>{{props.row.phone}}</span>
                            </el-form-item>
                            <el-form-item label="评分">
                                <span>{{props.row.score}}</span>
                            </el-form-item>
                            <el-form-item label="销售量">
                                <span>{{props.row.sale_num}}</span>
                            </el-form-item>
                            <el-form-item label="分类">
                                <span>{{props.row.kind}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="店铺名称" prop="shop_name"></el-table-column>
                <el-table-column label="店铺地址" prop="address"></el-table-column>
                <el-table-column label="店铺介绍" prop="intro"></el-table-column>
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
                shopList: [
                    {
                        shop_name: '好滋好味鸡蛋仔',
                        address: '上海市普陀区真北路',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        shopId: '10333',
                        sale_num:'5645',
                        phone:'18745698751',
                        score:'4.5',
                        kind:'nicai'
                    }, 
                    {
                        shop_name: '好滋好味鸡蛋仔',
                        address: '上海市普陀区真北路',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        shopId: '10333',
                        sale_num:'5645',
                        phone:'18745698751',
                        score:'4.5',
                        kind:'nicai'
                    },
                    {
                        shop_name: '好滋好味鸡蛋仔',
                        address: '上海市普陀区真北路',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        shopId: '10333',
                        sale_num:'5645',
                        phone:'18745698751',
                        score:'4.5',
                        kind:'nicai'
                    },
                    {
                        shop_name: '好滋好味鸡蛋仔',
                        address: '上海市普陀区真北路',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        shopId: '10333',
                        phone:'18745698751',
                        sale_num:'5645',
                        score:'4.5',
                        kind:'nicai'
                    },
                    {
                        shop_name: '好滋好味鸡蛋仔',
                        address: '上海市普陀区真北路',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        shopId: '10333',
                        phone:'18745698751',
                        sale_num:'5645',
                        score:'4.5',
                        kind:'nicai'
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
            }
        }
    }
</script>

<style>
    @import '../style/common.css';
    .table-expand label{
        width: 90px;
        color: #99a9bf;
    }
    .table-expand .el-form-item{
        /* margin-right: 0; */
        margin-bottom: 0;
        width: 45%;
    }
</style>
