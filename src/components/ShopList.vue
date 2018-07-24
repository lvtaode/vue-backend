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
                        <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                        <el-button size="mini" @click="addFood(scope.$index,scope.row)">添加食品</el-button>
                        <el-button size="mini" type="danger" @click="deleteFood(scope.$index,scope.row)">删除</el-button>
                    </div>
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
           <el-dialog title="修改店铺信息" :visible.sync="dialogFormVisible">
               <el-form label-width="100px" v-model="selectTable">
                   <el-form-item label="店铺名称">
                       <el-input v-model="selectTable.name"></el-input>
                   </el-form-item>
                   <el-form-item label="详细地址">
                       <el-input v-model="selectTable.address"></el-input>
                       <span>当前城市 : {{city.name}}</span>
                   </el-form-item>
                   
                   <el-form-item label="店铺介绍">
                       <el-input v-model="selectTable.description"></el-input>
                   </el-form-item>
                   <el-form-item label="联系电话">
                       <el-input v-model="selectTable.phone"></el-input>
                   </el-form-item>
                   <el-form-item label="店铺分类">
                       <el-select>

                       </el-select>
                   </el-form-item>
                   <el-form-item label="商铺图片">
                       <el-upload
                            class="avatar_upload"
                            action="url">
                           <img v-if="url" src="https://elm.cangdu.org/img/164bca5796011.jpeg" class="avatar">
                           <i v-else class="el-icon-plus add"></i>
                       </el-upload>
                   </el-form-item>
               </el-form>
               <div slot="footer">
                   <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary">确 定</el-button>
               </div>
		   </el-dialog>
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
            this.$http.get('http://cangdu.org:8001/v1/cities?type=guess').then(res=>{
                this.city=res.data;
            })
            setTimeout(() => {
                this.loadData();
            }, 500); 
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
                        category:'nicai',
                        restaurant_id:'2'
                    }],
                selectTable:{},
                url:true,
                dialogFormVisible:false,
                count:0,
                limit:10,
                offset:0,
                city:null,
            }
        },
        methods:{
            // 每页多少条数据
            handleSizeChange:function(val){
                this.$message.success(`每页显示${val}条数据`);
                this.limit=val;
                this.loadData();
            },
            currentPage:function(val){
                 this.$message.success(`这是第${val}页`);
                 this.offset=(val-1)*this.limit;
                 console.log(this.offset);
                 this.loadData();
            },
            loadData:function(){
                this.$http.get('https://elm.cangdu.org/shopping/restaurants',{params:{
                    latitude:this.city.latitude,
                    longitude:this.city.longitude,
                    limit:this.limit,
                    offset:this.offset
                }}).then(res=>{
                   
                    this.shopList=res.data;
                });
                this.$http.get('https://elm.cangdu.org/shopping/restaurants/count').then(res=>{
                    this.count=res.data.count;
                })
            },
            handleEdit:function(index,row){
                this.selectTable=row;
                this.dialogFormVisible=true;
            },
            addFood:function(index,row){
                this.$router.push({path:'addGoods',query:{restaurant_id:row.id}});
            },
            deleteFood:function(index,row){
                this.shopList.splice(index,1);
                this.$message.success('删除成功');
            }
        }
    }
</script>

<style>
    @import '../style/common.css';
    .avatar_upload .el-upload{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .add{
        width: 120px;
        height: 120px;
        line-height: 120px;
        border-radius: 5px;
        font-size: 32px;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
     .avatar_upload .el-upload:hover {
        border-color: #20a0ff;
    }
</style>
