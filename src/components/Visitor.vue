<template>
    <div>
        <Header></Header>
        <div id="visitor">
            <!-- <visitor-pie :pieData="pieData"></visitor-pie> -->
        </div>
    </div>
</template>
<script>
    import Header from './Header';
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
     export default {
         data(){
             return{
                
             }
         },
         components:{
            Header
        },
        mounted(){
            this.myChart = echarts.init(document.getElementById('visitor'));
            this.initData();
        },
        methods: {
            initData(){
                const option = {
                    title : {
                        text: '用户分布',
                        subtext: '',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['北京','上海','深圳','杭州','其他']
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:5602, name:'北京'},
                                {value:3656, name:'上海'},
                                {value:2656, name:'深圳'},
                                {value:3655, name:'杭州'},
                                {value:9955, name:'其他'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                this.myChart.setOption(option);
            }
        },
        watch: {
            pieData: function (){
                this.initData()
            }
        }
    }
</script>
<style>
    @import '../style/common.css';
    #visitor{
        width: 90%;
        height: 450px;
        margin: 30px auto 0;
    }
</style>
