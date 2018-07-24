<template>
    <div class="login_page">
       <transition name="form-fade" mode="in-out">
       
        <section class="login_box" v-show="showLogin">
            <p class="slogan">elm后台管理系统</p>
            <div class="form_box">
                <el-form :model="loginForm" ref="loginForm" :rules="rules">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                         type="primary" 
                         @click="submit('loginForm')"
                         style="width:100%;font-size:20px;">登 录</el-button>
                    </el-form-item>
                </el-form>
                <div style="color:red;font-size:12px;">
                    <p>温馨提示:</p>
                    <p>未登陆过的新用户,自动注册</p>
                    <p>注册过的用户可凭账号密码登录</p>
                </div>
            </div>
        </section>

     </transition> 
    </div>
</template>
<script>
    import {mapState,mapActions} from 'vuex';
    import { setTimeout } from 'timers';
    export default{
        data(){
            return{
                loginForm:{
                    username:'',
                    password:''
                },
                showLogin:false,
                rules:{
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				}
            }
        },
        computed: {
			// ...mapState(['adminInfo'])
		},
        mounted(){
            this.showLogin=true;
        },
        methods:{
            submit(formName){
                // console.log(this.$refs[formName].validate);
                this.$refs[formName].validate(valid=>{
                    if(valid){
                        console.log(this.loginForm.username);
                        var that=this;
                        this.$http.post('https://elm.cangdu.org/admin/login',{
                            user_name:this.loginForm.username,
                            password:this.loginForm.password
                        }).then(res=>{
                            console.log(res.data);
                            if(res.data.status==1){
                                this.$message.success(res.data.success);
                                this.$router.push('main');
                            }else{
                                 this.$message.error(res.data.message);
                            }
                        })
                        
                        //  setTimeout(()=>{
                        //     this.$router.push('/main');
                        // },1500);
                    }else{
                        this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
                    }
                })
                
               
            }
                
        },
        watch: {
			adminInfo: function (newValue){
                console.log(newValue);
				if (newValue.id) {
					this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
					this.$router.push('manage')
				}
			}
		}
    }
</script>
<style>
    .login_page{
        width: 100%;
        height:100vh;
        background-color: #324057;
    }
    .login_box{
        text-align: center;
        width: 360px;
        height: 300px;
        position: absolute;
        left: 50%;
        top:50%;
        margin-top: -160px;
        margin-left: -180px;
    }
    .slogan{
        font-size:34px;
        color:#fff;
    }
    .form_box{
        margin-top: 40px;
        width: 360px;
        padding: 10px 15px 5px;
        box-sizing: border-box;
        border-radius: 10px;
        height: 260px;
        background-color:#fff;
    }
    .form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
    .form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
