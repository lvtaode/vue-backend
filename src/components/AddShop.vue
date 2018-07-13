<template>
    <div>
        <Header></Header>
        <el-row style="margin-top:50px;">
            <el-col :span="12" :offset="4">
                <el-form :model="formData" ref="formData" label-width="110px">
                    <el-form-item label="店铺名称">
                        <el-input v-model="formData.shop_name"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址">
                        <el-input placeholder="请输入地址" v-model="formData.addr"></el-input>
                    </el-form-item>    
                    <el-form-item label="联系电话">
                        <el-input v-model="formData.phoneNum"></el-input>
                    </el-form-item>     
                    <el-form-item label="店铺简介">
                        <el-input v-model.number="formData.shop_intro" maxlength="11"></el-input>
                    </el-form-item>    
                    <el-form-item label="店铺标语">
                        <el-input v-model="formData.slogn" maxlength="11"></el-input>
                    </el-form-item>  
                    <el-form-item label="店铺分类">
                        <el-cascader
						  :options="categoryOptions"
						  v-model="selectedCategory"
						  change-on-select
						></el-cascader>
                    </el-form-item>    
                    <el-form-item label="店铺特点" style="white-space: nowrap;">
                        <span>品牌保证</span>
						<el-switch v-model="formData.is_premium"></el-switch>
                        <span>蜂鸟专送</span>
                        <el-switch v-model="formData.delivery_mode"></el-switch>
                        <span>新开店铺</span>
                        <el-switch v-model="formData.new_shop"></el-switch>
                    </el-form-item>
                    <el-form-item style="white-space: nowrap;">    
                        <span>外卖保</span>
                        <el-switch v-model="formData.bao"></el-switch>
                        <span>准时达</span>
                        <el-switch v-model="formData.ontime"></el-switch>
                        <span>开发票</span>
                        <el-switch v-model="formData.ticket"></el-switch>
                    </el-form-item>
                    <el-form-item label="配送费">
                        <el-input-number v-model="formData.float_delivery_fee" :min="0" :max="20"></el-input-number>
                    </el-form-item>
                    <el-form-item label="起送价">
                        <el-input-number v-model="formData.float_minimum_order_amount" :min="0" :max="100"></el-input-number>
                    </el-form-item>
                    <el-form-item label="营业时间">
                        <el-time-select
                        placeholder="起始时间"
                        v-model="formData.startTime"
                        :picker-options="{
                            start: '05:30',
							step: '00:15',
							end: '23:30'
                        }"
                        ></el-time-select>
                        <el-time-select
                        placeholder="结束时间"
                        v-model="formData.endTime"
                        :picker-options="{
                            start: '10:30',
							step: '00:15',
							end: '23:30'
                        }"
                        ></el-time-select>
                    </el-form-item>
                    <el-form-item label="上传店铺头像">
                        <el-upload class="img-upload" :action='formData.test'>
                            <img v-if="formData.avatar" src="" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="上传营业执照">
                        <el-upload class="img-upload" :action="formData.test">
                            <img v-if="formData.lisense" src="" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="上传餐饮服务许可证">
                        <el-upload class="img-upload" :action="formData.test">
                            <img v-if="formData.permission" src="" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="优惠活动">
                        <el-select v-model="activityValue" @change="selectActivity" placeholder="activityValue">
                            <el-option 
                            v-for="item in options" 
                            :value="item.value" 
                            :key="item.value"
                            :label="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-table 
                        style="min-width:600px;" 
                        :data="activities" 
                        align="center" 
                        :row-class-name="tableRowClassName">
                        <el-table-column 
                            label="活动标题"
                            align="center"
                            width="120"
                            prop="icon_name">
                        </el-table-column>
                        <el-table-column 
                            label="活动名称" 
                            align="center" 
                            width="120"
                            prop="name"
                        >
                        </el-table-column>
                        <el-table-column 
                            label="活动详情" 
                            align="center"
                            prop="description">
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="120">
                            <template slot-scope="scope">
                                <el-button size="small" type="danger" @click="handleDelete(scope.$index)">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-form-item class="button_submit">
                        <el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Header from './Header'
    export default {
        data(){
            return{
                formData:{
                    shop_name:'',
                    addr:'',
                    phoneNum:'',
                    shop_intro:'',
                    slogn:'',
                    is_premium:'',
                    delivery_mode:'',
                    bao:'',
                    new_shop:'',
                    ontime:'',
                    ticket:'',
                    float_delivery_fee:5,
                    float_minimum_order_amount:20,
                    startTime:'',
                    endTime:'',
                    avatar:'',
                    test:''
                },
                activityValue:'满减优惠',
                options: [{
		          	value: '满减优惠',
		          	label: '满减优惠'
                    }, 
                    {
                        value: '优惠大酬宾',
                        label: '优惠大酬宾'
                    }, 
                    {
                        value: '新用户立减',
                        label: '新用户立减'
                    }, 
                    {
                        value: '进店领券',
                        label: '进店领券'
                    }],
                selectedCategory: ['快餐便当', '简餐'],
                categoryOptions:[{          
                    value: '1',
                    label: '异国料理',
                    children: [{
                            value: '11',
                            label: '日韩料理' 
                            }]
                    },
                    {          
                    value: '2',
                    label: '快餐便当',
                    children: [{
                            value: '21',
                            label: '简餐' 
                            }]
                    },
                    {          
                    value: '3',
                    label: '小吃夜宵',
                    children: [{
                            value: '31',
                            label: '小龙虾' 
                            }]
                    },
                    {          
                    value: '4',
                    label: '蔬菜水果',
                    children: [{
                            value: '41',
                            label: '香蕉桔子' 
                            }]
                    }
                    ],
                    activities: [{
		        	icon_name: '减',
		        	name: '满减优惠',
		        	description: '满30减5，满60减8',
                    },
                    {
		        	icon_name: '减',
		        	name: '满减优惠',
		        	description: '满30减5，满60减8',
                    },
                    {
		        	icon_name: '减',
		        	name: '满减优惠',
		        	description: '满30减5，满60减8',
                    },
                    {
		        	icon_name: '减',
		        	name: '满减优惠',
		        	description: '满30减5，满60减8',
			        }]
                }
            },
        components:{
            Header
        },
        methods:{
            submitForm:function(data){
                this.$message({
                    type:'success',
                    message:'创建成功'
                });
            },
            tableRowClassName({row, rowIndex}) {
		        if (rowIndex=== 1) {
		        	return 'info-row';
		        } else if (rowIndex=== 3) {
		        	return 'positive-row';
		        }
		        return '';
		    },
            handleDelete(index){
                console.log(index);
		    	this.activities.splice(index, 1)
            },
            selectActivity(){
                console.log("dianjile...");
                this.$prompt("请输入活动详情","提示",{
                    confirmButtonText: '确定',
		          	cancelButtonText: '取消'
                }).then((value)=>{
                    console.log(value);
                })
            }
        }
    }
</script>
<style>
    @import '../style/common.css';
    .el-form-item span,.el-switch{
        font-size: 1.1em;
    }
    .el-form-item .el-switch{
        margin-right: 15px;
    }
    .el-upload{
        border:1px dashed #ddd;
    }
    .el-upload:hover{
        border-color:#0aa1ed;
    }
    .avatar{
        width: 120px;
        height: 120px;
        display: block;
    }
    .avatar-uploader-icon{
        font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
    }
    .button_submit{
        text-align: center;
        margin-top: 30px;
    }
    .el-table .info-row {
	    background: #bedff3;
	}

	 .el-table .positive-row {
	    background: #e2f0e4;
	}
</style>
