<template>
    <div>
        <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="3"><router-link to="{name:'article1'}">广告管理</router-link></el-menu-item>
            <el-menu-item index="4"><router-link to="/article">文章管理</router-link></el-menu-item>
            <el-button type="primary" plain @click="loginOut">退出</el-button>
        </el-menu>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                this.activeIndex=key;
                console.log(key, keyPath);
            },
            loginOut(){
                this.$store.commit('changeLogin','loginOut');
                this.$router.push('/login');
            }
        }
    }
</script>
<style>
    .el-header{
        padding:0;
    }
</style>