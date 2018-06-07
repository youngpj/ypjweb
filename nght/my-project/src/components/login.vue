<template>
    <div>
        <div class="login">
            <el-form  label-width="80px" >
                <el-form-item label="账号">
                    <el-input v-model="userInf.userName" auto-complete="on"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="userInf.password"></el-input>
                </el-form-item>
                <el-button type="primary" @click="login" auto-complete="on">登陆</el-button>
            </el-form>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default{
        data(){
            return{
                userInf:{
                    userName:'',
                    password:''
                }
            }
        },
        computed:{
            ...mapState(['isLogin','userData'])
        },
        methods:{
            login:function () {
                var _this=this;
                this.$ajax.get('/api/logreg/getcode/',{
                    params: {
                        mobile: _this.userInf.userName,
                        codetype:_this.userInf.password,
//                        code:'123456',
//                        nick:'dapang'
                    }
                }).then((res) => {
                    this.fullscreenLoading=false;
                    if(res.data.return_code==200){
                        this.$router.push('/')
                    }else{
                        this.$store.commit('changeLogin','login');
                        this.$router.push('/');
                        this.$message({
                            message: res.data.return_msg,
                            type: 'warning'
                        });
                    }
                }).catch( err => {
                    this.fullscreenLoading=false;
                    this.$message({
                        message: err,
                        type: 'warning'
                    });
                })
            },
        }
    }
</script>
<style lang="scss" scoped="" type="text/css">
    .login{
        height:500px;
        width:400px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        margin: 0 auto;
        -webkit-border-radius:10px;
        -moz-border-radius:10px;
        border-radius:10px;
        -moz-box-shadow:0 0 20px rgba(0,0,0,.1);
        -webkit-box-shadow:0 0 20px rgba(0,0,0,.1);
        box-shadow:0 0 20px rgba(0,0,0,.1);
    }
    .el-form{
        width:90%;
    }
    .el-button{
        float:right;
    }
</style>