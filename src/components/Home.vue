<template>
    <div  v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading">
        <top-head></top-head>
        <header class="title">数据统计</header>
        <section class="data_section">
            <el-row :gutter="20" style="margin-bottom:10px;margin-left:30px">
                <el-col :span="5"><div class="data_list today_head">当日数据</div></el-col>
				<el-col :span="5"><div class="data_list"><span>{{userCount}}</span> 新增用户</div></el-col>
				<el-col :span="5"><div class="data_list"><span>{{orderCount}}</span> 新增订单</div></el-col>
                <el-col :span="5"><div class="data_list"><span>{{adminCount}}</span> 新增管理员</div></el-col>
			</el-row>
            <el-row :gutter="20" style="margin-bottom:10px;margin-left:30px">
                <el-col :span="5"><div class="data_list all_head">总数据</div></el-col>
                <el-col :span="5"><div class="data_list"><span>{{allUserCount}}</span> 注册用户</div></el-col>
                <el-col :span="5"><div class="data_list"><span>{{allOrderCount}}</span> 订单</div></el-col>
                <el-col :span="5"><div class="data_list"><span>{{allAdminCount}}</span> 管理员</div></el-col>
            </el-row>
        </section>
        <div id="chart">

        </div>
    </div>
</template>

<script>
    import topHead from './Header';
    import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/toolbox';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/component/tooltip';
    import dtime from 'time-formater'
    import { setTimeout } from 'timers';
    export default{
        mounted(){
            
             for (let i = 6; i > -1; i--) {
                const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD');
                this.sevenDay.push(date);
            }
            this.loadData();
            this.getSevenData();
            
             var that=this;
             setTimeout(function(){
                 that.loading=false;
                 that.drawLine();
                //  console.log(1);
                },3000);
        },
        data(){
            return{
                loading:true,
                userCount:null,
                allUserCount:null,
                orderCount:null,
                allOrderCount:null,
                adminCount:null,
                allAdminCount:null,
                sevenDay:[],
                sevenData:[[],[],[]]
            }
        },
        methods: {
           getSevenData(){
    			const apiArr = [[],[],[]];
    			this.sevenDay.forEach(item => {
                    
    				apiArr[0].push( this.$http.get('https://elm.cangdu.org/statis/user/'+item+'/count').then(res=>{
                        return res.data.count;
                    }))
                    apiArr[1].push( this.$http.get('https://elm.cangdu.org/statis/order/'+item+'/count').then(res=>{
                        return res.data.count;
                    }))
                    apiArr[2].push( this.$http.get('https://elm.cangdu.org/statis/admin/'+item+'/count').then(res=>{
                        return res.data.count;
                    }))
    			})
                const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]];
                // console.log(promiseArr);
    			Promise.all(promiseArr).then(res => {
                    // console.log(res);
    				const resArr = [[],[],[]];
					res.forEach((item, index) => {
						resArr[Math.floor(index/7)].push(item)	
                    })
                    this.sevenData = resArr;
                    // console.log(this.sevenData);
    			}).catch(err => {
    				console.log(err)
    			})
    		},
           async drawLine() {
                    // console.log(this.sevenData);
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('chart'));
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '走势图',
                        subtext: '数据来源:东拼西凑'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['新注册用户', '新增订单', '新增管理员']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['bar', 'line']},
                            restore: {},
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: this.sevenDay
                    },
                    
                    yAxis: [
                        {
                          type: 'value',
                          name: '用户',
                          min: 0,
                          max: 200,
                          position: 'left',
                          axisLine: {
                              lineStyle: {
                                  color: '#999'
                              }
                          },
                          axisLabel: {
                              formatter: '{value}'
                          }
                        },
                        {
                          type: 'value',
                          name: '订单',
                          min: 0,
                          max: 200,
                          position: 'right',
                          axisLine: {
                              lineStyle: {
                                  color: '#999'
                              }
                          },
                          axisLabel: {
                              formatter: '{value}'
                          }
                        },
                    ],
                    series: [
                        {
                            color:'#5793f3',
                            name:'新注册用户',
                            type:'line',
                            data:this.sevenData[0],
                            yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            color:'#675bba',
                            name:'新增订单',
                            type:'line',
                            data:this.sevenData[1],
                            yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            color:'#d14a61',
                            name:'新增管理员',
                            type:'line',
                            data:this.sevenData[2],
                            yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        }]
                    });
                },
                 async loadData(){
                        const today = dtime(new Date().getTime()).format('YYYY-MM-DD');
                        
                        this.$http.get('https://elm.cangdu.org/statis/user/'+today+'/count').then(res=>{
                            this.userCount=res.data.count;
                        });
                        this.$http.get('https://elm.cangdu.org/statis/admin/'+today+'/count').then(res=>{
                            this.adminCount=res.data.count;
                        });
                        this.$http.get('https://elm.cangdu.org/statis/order/'+today+'/count').then(res=>{
                            this.orderCount=res.data.count;
                        });
                        this.$http.get('https://elm.cangdu.org/v1/users/count').then(res=>{
                            this.allUserCount=res.data.count;
                        });
                        this.$http.get('https://elm.cangdu.org/bos/orders/count').then(res=>{
                            this.allOrderCount=res.data.count;
                        });
                        this.$http.get('https://elm.cangdu.org/admin/count').then(res=>{
                            this.allAdminCount=res.data.count;
                        });

                },
            },
        components: {
    		topHead
        },
        watch:{
           dsf: function(){
                this.loadData();
            }
            // sevenDay: function (){
            //     this.drawLine();
            //     console.log(1);
            // }
        }
    }
</script>
<style>
    .data_section{
        width: 90%;
        margin:20px auto;
    }
    
    .data_list{
        height: 40px;
        line-height: 40px;
        border-radius: 6px;
        text-align: center;
        background-color: #E5E9F2;
    }
    .data_list span{
        font-size:1.5em;
    }
    .today_head{
        color:#fff;
        background-color: #FF9800;
        font-size: 24px;
    }
    .all_head{
        color:#fff;
        background-color: #20A0FF;
        font-size: 24px;
    }
    #chart{
        width:90%;
        margin:100px auto 0;
        height: 500px;
    }
</style>
