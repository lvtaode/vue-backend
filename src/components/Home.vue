<template>
    <div>
        <top-head></top-head>
        <header class="title">数据统计</header>
        <section class="data_section">
            <el-row :gutter="20" style="margin-bottom:10px;margin-left:30px">
                <el-col :span="5"><div class="data_list today_head">当日数据</div></el-col>
				<el-col :span="5"><div class="data_list"><span>32</span> 新增用户</div></el-col>
				<el-col :span="5"><div class="data_list"><span>17</span> 新增订单</div></el-col>
                <el-col :span="5"><div class="data_list"><span>55</span> 新增管理员</div></el-col>
			</el-row>
            <el-row :gutter="20" style="margin-bottom:10px;margin-left:30px">
                <el-col :span="5"><div class="data_list all_head">总数据</div></el-col>
                <el-col :span="5"><div class="data_list"><span>11673</span> 注册用户</div></el-col>
                <el-col :span="5"><div class="data_list"><span>4747</span> 订单</div></el-col>
                <el-col :span="5"><div class="data_list"><span>17172</span> 管理员</div></el-col>
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
    export default{
        mounted(){
             this.drawLine();
        },
        data(){
            return{

            }
        },
        methods: {
                drawLine() {
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
                        data: ["2018-07-08","2018-07-09","2018-07-10","2018-07-11","2018-07-12","2018-07-13","2018-07-14"]
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
                            data:[152,23,56,78,65,105,59],
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
                            data:[15,3,62,81,38,45,77],
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
                            data:[96,35,89,78,52,15,148],
                            yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        }]
                    });
                }
            },
        components: {
    		topHead
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
