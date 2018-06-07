<style lang="scss">
  @import './src/style/base.scss'
</style>
<template>
  <div>
    <el-container>
      <el-header>
        <headerbar></headerbar>
      </el-header>
      <el-container>
        <el-main>
            <router-view name="body"></router-view>
            <router-view name="footer"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
    import headerbar from 'components/headerbar.vue';
    export default{
        data(){
            return{

            }
        },
        created(){
          console.log(this.$router);
        },
        components:{
            headerbar,
        },
        watch: {


        },

    }

</script>