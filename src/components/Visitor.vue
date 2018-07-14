<template>
    <div>
        <Header></Header>
        <div class="visitor">

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
        components:{
            Header
        }
    }
</script>