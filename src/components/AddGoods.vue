<template>
    <div>
        <Header></Header>
        <el-row>
            <el-col :span="14" :offset="4">
                <!-- 选择种类 -->
                <header class="form_title">选择食品种类</header>
                <el-form v-model="categoryForm" label-width="110px" class="form">
                    <el-row class="category_select">
                        <el-form-item label="食品种类">
                            <el-select v-model="categoryForm.categorySelect" style="width:100%;">
                                <el-option 
                                    v-for="item in categoryForm.categoryList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row class="add_category_row" :class="showAddCategory?'showEdit':''">
                        <div class="add_category">
                            <el-form-item label="食品种类" prop="name">
                                <el-input v-model="categoryForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="种类描述" prop="description">
                                <el-input v-model="categoryForm.description"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary">提交</el-button>
                            </el-form-item>
                        </div>
                    </el-row>
                    <div class="add_button" @click="trigger">
                        <i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
                        <i class="el-icon-caret-bottom edit_icon" v-else></i>
                        <span>添加食品种类</span>
                    </div>
                </el-form>

                <!-- 添加食品 -->
                <header class="form_title">添加食品</header>
                <el-form v-model="foodForm" label-width="110px" class="form food_form">
                    <el-form-item label="食品名称" prop="name">
                        <el-input v-model="foodForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="食品活动" prop="activity">
                        <el-input v-model="foodForm.activity"></el-input>
                    </el-form-item>
                    <el-form-item label="食品详情" prop="description">
                        <el-input v-model="foodForm.description"></el-input>
                    </el-form-item>
                    <el-form-item label="上传食品图片">
                        <el-upload :action="url">
                          <img v-if="foodForm.image_path" :src="baseImgPath + foodForm.image_path" class="avatar_upload">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="食品特点">
                        <el-select v-model="foodForm.attributes" multiple placeholder="请选择">
                            <el-option v-for="item in attributes" 
                            :value="item.value" 
                            :label="item.label"
                            :key="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="食品规格">
                        <el-radio v-model="foodSpecs" label="one">单规格</el-radio>
                        <el-radio v-model="foodSpecs" label="more">多规格</el-radio>
                    </el-form-item>
                    <el-row v-if="foodSpecs=='one'">
                        <el-form-item label="包装费">
                            <el-input-number v-model="foodForm.specs[0].packing_cost" :min="0" :max="100"></el-input-number>
                        </el-form-item>
                        <el-form-item label="价格">
                            <el-input-number v-model="foodForm.specs[0].price" :min="0" :max="1000"></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row style="text-align:center" v-else>
                        <el-button type="success" @click="dialogShow=true" style="margin-bottom:20px;">添加规格</el-button>
                        <el-table :data="foodForm.specs" align="center" style="width:85%;margin:0 auto;">
                            <el-table-column prop="specs" label="规格"></el-table-column>
                            <el-table-column prop="packing_cost" label="包装费"></el-table-column>
                            <el-table-column prop="price" label="价格"></el-table-column>
                            <el-table-column label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-button type="danger" size="samll"
                                    @click="handleDelete(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-form-item style="margin:20px 0 0 88px;">
                        <el-button type="primary" @click="addFood('foodForm')">确认添加商品</el-button>
                    </el-form-item>
                </el-form>
                <el-dialog title="添加规格" :visible.sync="dialogShow">
                    <el-form :model="specsForm">
                        <el-form-item label="规格" label-width="100px" prop="specs">
                            <el-input v-model="specsForm.specs"></el-input>
                        </el-form-item>
                        <el-form-item label="包装费" label-width="100px">
                            <el-input-number v-model="specsForm.packing_cost" :min="0" :max="100"></el-input-number>
                        </el-form-item>
                        <el-form-item label="价格" label-width="100px">
                            <el-input-number v-model="specsForm.price" :min="0" :max="1000"></el-input-number>
                        </el-form-item>
                    </el-form>
                <div slot="footer" class="dialog-footer">
				    <el-button @click="dialogShow = false">取 消</el-button>
				    <el-button type="primary" @click="addspecs">确 定</el-button>
				  </div>
                </el-dialog>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Header from './Header'
    export default {
        data(){
            return{
                categoryForm: {
                    categoryList: [
                        {value:1,label:"烤肉"},
                        {value:2,label:"卤肉"},
                        {value:3,label:"烟熏肉"},
                        {value:4,label:"酱牛肉"},
                        {value:5,label:"生肉"}],
                    categorySelect: '',
                    name: '',
                    description: '',
                },
                foodForm:{
                    name:'',
                    activity:'',
                    description:'',
                    attributes:[],
                    specs: [{
    					specs: '默认',
			          	packing_cost: 0,
			          	price: 20,
    				}],
                },
                attributes:[{
                            value:1,
                            label:'酸'    
                        },
                        {
                            label:'甜',
                            value:2
                        },
                        {
                            label:'苦',
                            value:3
                        },
                        {
                            label:'辣',
                            value:4
                        }],
                specsForm: {
		          	specs: '',
		          	packing_cost: 0,
		          	price: 20,
		        },
                showAddCategory:false,
                url:'',
                foodSpecs:"one",
                dialogShow:false
            }
        },
        components:{
            Header
        },
        methods:{
            trigger:function(){
                this.showAddCategory=!this.showAddCategory;
            },
            handleDelete:function(index){
                this.foodForm.specs.splice(index,1);
            },
            addFood:function(foodForm){
                console.log(foodForm);
            },
            addspecs:function(){
                this.$message.success("添加成功");
                console.log(this.dialogShow);
                this.dialogShow=false;
            }
        }
    }
</script>
<style>
    .form_title{
        text-align: center;
        font-size: 22px;
        font-weight:500;
        margin: 40px 0 20px;
    }
    .form{
        min-width: 400px;
        margin-bottom: 30px;
        transition: all .5s;
        border-radius: 6px;
    }
    .form:hover{
        box-shadow:0 2px 4px 0 rgba(232,237,250,.5);
    }
    .category_select{
		border: 1px solid #eaeefb;
		padding: 10px 30px 10px 10px;
		border-top-right-radius: 6px;
		border-top-left-radius: 6px;
	}
    .add_category_row{
        height: 0;
		overflow: hidden;
		transition: all .5s;
		background: #f9fafc;
    }
    .showEdit{
		height: 185px;
	}
    .add_category{
        background: #f9fafc;
		padding: 10px 30px 0px 10px;
		border: 1px solid #eaeefb;
		border-top: none;
    }
    .add_button{
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #EAEEFB;
        border-top:none;
        color: #cccccc;
        border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
        transition: all .5s;
    }
    .add_button:hover{
        background-color: #F9FAFC;
        color:#20A0FF;
    }
    .edit_icon{
        font-size: 20px;
    }
    .food_form{
		border: 1px solid #eaeefb;
		padding: 10px 30px 10px 10px;
    }
     .el-upload{
        border:1px dashed #ddd;
        border-radius:5px; 
    }
    .el-upload:hover{
        border-color:#0aa1ed;
    }
    .avatar_upload{
        width: 120px;
        height: 120px;
        display: block;
    }
    .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
</style>
