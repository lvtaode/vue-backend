<template>
    <div>
        <Header></Header>
        <el-row style="margin-top:50px;">
            <el-col :span="12" :offset="4">
                <el-form :model="formData"  label-width="110px" ref="formData" :rules="rules">
                    <el-form-item label="店铺名称" prop="name">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="address">
                        <el-autocomplete style="width: 100%;"
                            placeholder="请输入地址" 
                            v-model="formData.address"
                            :fetch-suggestions="suggestAddress">
                        </el-autocomplete>
                        <span>当前城市:{{city.name}}</span>
                    </el-form-item>    
                    <el-form-item label="联系电话" prop="phone">
                        <el-input v-model.number="formData.phone" max-length="11"></el-input>
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
                        <el-upload class="img-upload" 
                                :action="baseUrl + '/v1/addimg/shop'"
                                :show-file-list="false"
                                :before-upload="beforeImgUpload"
                                :on-success="avatarUpload">
                            <img v-if="formData.avatar" :src="baseImgPath+formData.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="上传营业执照">
                        <el-upload class="img-upload" 
                                  :action="baseUrl + '/v1/addimg/shop'"
                                  :show-file-list="false"
                                  :before-upload="beforeImgUpload"
                                  :on-success="lisenseUpload"
                                  >
                            <img v-if="formData.lisense" :src="baseImgPath+formData.lisense" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="上传餐饮服务许可证">
                        <el-upload class="img-upload" 
                                   :action="baseUrl + '/v1/addimg/shop'"
                                   :show-file-list="false"
                                   :before-upload="beforeImgUpload"
                                   :on-success="permissionUpload"
                                   >
                            <img v-if="formData.permission" :src="baseImgPath+formData.permission" class="avatar">
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
        mounted(){
            this.loadData();
        },
        data(){
            return{
                rules: {
					name: [
						{ required: true, message: '请输入店铺名称', trigger: 'blur' },
					],
					address: [
						{ required: true, message: '请输入详细地址', trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '请输入联系电话' },
						{ type: 'number', message: '电话号码必须是数字' }
					],
                },
                city:{name:''},
                list:[],
                formData:{
                    name:'',
                    address:'',
                    phone:'',
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
                    lisense:'',
                    permission:''
                },
                activityValue:'请选择',
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
                categoryOptions:[],
                activities: [{
                        icon_name: '减',
                        name: '满减优惠',
                        description: '满30减5，满60减8',
                    }],
                baseUrl:'//elm.cangdu.org',
                baseImgPath:'//elm.cangdu.org/img/'
                }
            },
        components:{
            Header
        },
        methods:{
            beforeImgUpload:function(file){
                // console.log(file);
                const fileSize=(file.size/1024/1024)<2;
                const fileType=(file.type=="image/jpeg") || (file.type=="image/png");
                if(!fileType){
                    this.$message.error("上传图片格式不正确,只能是jpg/png");
                };
                if(!fileSize){
                    this.$message.error("上传图片大小不能超过2M");
                }
            },
            avatarUpload(res,file){
                console.log(res);
                if(res.status==1){
                    this.formData.avatar=res.image_path;
                }else{
                    thsi.$message.error("上传图片失败!");
                }
            },
            lisenseUpload(res,file){
                
                if(res.status==1){
                    this.formData.lisense=res.image_path;
                }else{
                    thsi.$message.error("上传图片失败!");
                }
            },
            permissionUpload(res,file){
                
                if(res.status==1){
                    this.formData.permission=res.image_path;
                }else{
                    thsi.$message.error("上传图片失败!");
                }
            },
            submitForm(formName){
                this.$refs[formName].validate(valid=>{
                    console.log(valid);
                    if(valid){
                        console.log(this.formData);
                        this.$message({
                            type:'success',
                            message:'创建成功'
                        });
                        this.formData={
                                    name:'',
                                    address:'',
                                    phone:'',
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
                                    avatar:''
                                }
                    }else{
                        this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
                    }
                })
                
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
                this.$prompt("请输入活动详情","提示",{
                    confirmButtonText: '确定',
		          	cancelButtonText: '取消'
                }).then(({value})=>{
                    console.log(value);
                    if(value==null){
                        this.$message({
                            type:'info',
                            message:"请输入活动详情"
                        });
                        return;
                    }
                    let newObj = {};
                    
                    switch(this.activityValue){
                        case '满减优惠':
		          			newObj= {
		          				icon_name: '减',
					        	name: '满减优惠',
					        	description: value,
		          			}
		          			break;
		          		case '优惠大酬宾':
		          			newObj= {
		          				icon_name: '特',
					        	name: '优惠大酬宾',
					        	description: value,
		          			}
		          			break;
		          		case '新用户立减':
		          			newObj= {
		          				icon_name: '新',
					        	name: '新用户立减',
					        	description: value,
		          			}
		          			break;
		          		case '进店领券':
		          			newObj= {
		          				icon_name: '领',
					        	name: '进店领券',
					        	description: value,
		          			}
		          			break;
                    }
                    this.activities.push(newObj);
                }).catch(()=>{
                    this.$message({
                        type:'info',
                        message:'取消输入'
                    });
                })
            },
           async suggestAddress(queryString,cb){
                // if(queryString){
                    var url='https://elm.cangdu.org/v1/pois';
                    var cityid=this.city.id;
                    // console.log(cityid,queryString)
                    this.$http.get(url,{params:{
                        type: 'search',
                        city_id: cityid,
                        keyword: queryString
                    }}).then(res=>{
                        this.list=res.data;
                    });
                    //  console.log(this.list);
                     if (this.list instanceof Array) {
		    				this.list.map(item => {
		    					item.value = item.address;
		    					return item;
                            })
		    				cb(this.list)
	    				}
                },
            loadData(){
                this.$http.get('http://cangdu.org:8001/v1/cities?type=guess').then(res=>{
                    this.city=res.data;
                });
                this.$http.get('http://elm.cangdu.org/shopping/v2/restaurant/category').then(res=>{
                    // console.log(res.data);
                    let result=res.data;
                    result.forEach(item=>{
                        if(item.sub_categories.length){
                            const addNew={
                                label:item.name,
                                value:item.name,
                                children:[]
                            }
                            item.sub_categories.forEach((subitem,index)=>{
                                if(index==0){
                                    return
                                }
                                addNew.children.push({
                                    value: subitem.name,
						        	label: subitem.name
                                })
                            })
                            // console.log(addNew);
                            this.categoryOptions.push(addNew);
                        }
                    })
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
