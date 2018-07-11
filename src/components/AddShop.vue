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
                    ticket:''
                },
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
                    ]
                }
            },
        components:{
            Header
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
</style>
