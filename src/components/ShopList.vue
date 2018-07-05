<template>
    <div>
        <Header></Header>
        <div class="container">
            <el-table :data="shopList">
                <!-- <el-table-column type="expand">
                    <template scope="props">
                        <el-form>
                            <el-form-item label="店铺名称">
                                <span>{{props.row.name}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column> -->
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
                shopList: [{
                        shop_name: '李想大虾',
                        intro: '好吃不贵',
                        address: '上海市普陀区金沙江路 1518 弄'
                        }, 
                        {
                        shop_name: '李想大虾',
                        intro: '好吃不贵',
                        address: '广东省广州市越秀区越华路112号珠江国际大厦5/6楼'
                        }, 
                        {
                        shop_name: '李想大虾',
                        intro: '好吃不贵',
                        address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                        shop_name: '李想大虾',
                        intro: '好吃不贵',
                        address: '广东省广州市越秀区越华路112号珠江国际大厦5/6楼'
                    }]
            }
        }
    }
</script>

<style>
    @import '../style/common.css'
</style>
