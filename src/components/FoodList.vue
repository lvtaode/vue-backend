<template>
    <div>
        <Header></Header>
        <div class="container">
            <el-table :data="foodList">
                <el-table-column label="食品名称" prop="food_name"></el-table-column>
                <el-table-column label="食品介绍" prop="food_intro"></el-table-column>
                <el-table-column label="评分" prop="score"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template>
                        <el-button size="mini">编辑</el-button>
                        <el-button size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import Header from './Header'
    export default {
        components:{
            Header
        },
        data(){
            return{
                foodList:[
                    {
                        food_name:'黄焖鸡',
                        food_intro:'大吉大利,今晚吃鸡',
                        score:'4.8'
                    },
                    {
                        food_name:'黄焖鸡',
                        food_intro:'大吉大利,今晚吃鸡',
                        score:'4.8'
                    },
                    {
                        food_name:'黄焖鸡',
                        food_intro:'大吉大利,今晚吃鸡',
                        score:'4.8'
                    },
                    {
                        food_name:'黄焖鸡',
                        food_intro:'大吉大利,今晚吃鸡',
                        score:'4.8'
                    }
                ]
            }
        }       
    }
</script>

<style>
    @import '../style/common';

</style>
