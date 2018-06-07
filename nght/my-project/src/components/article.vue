<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <el-row :gutter="10" class="demo-input-suffix">
            <el-col :span="3">AID</el-col>
            <el-col :span="9">
                <el-input placeholder="请输入内容" v-model="aid">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </el-col>
            <el-col :span="3">标题</el-col>
            <el-col :span="9">
                <el-input placeholder="请输入内容" v-model="title">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </el-col>
        </el-row>
        <el-row :gutter="10" class="demo-input-suffix">
            <div class="demo-input-suffix">
                <el-col :span="3">分类</el-col>
                <el-col :span="9">
                    <el-select v-model="catname" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </div>
        </el-row>
        <!--<el-row :gutter="10" class="demo-input-suffix">-->
            <!--<el-col :span="3">原作者</el-col>-->
            <!--<el-col :span="9">-->
                <!--<el-input placeholder="请输入内容" v-model="author">-->
                    <!--<i slot="prefix" class="el-input__icon el-icon-search"></i>-->
                <!--</el-input>-->
            <!--</el-col>-->
            <!--<el-col :span="3">来源</el-col>-->
            <!--<el-col :span="9">-->
                <!--<el-input placeholder="请输入内容">-->
                    <!--<i slot="prefix" class="el-input__icon el-icon-search"></i>-->
                <!--</el-input>-->
            <!--</el-col>-->
        <!--</el-row>-->
        <el-row :gutter="10" class="demo-input-suffix">
            <el-col :span="6"> <el-button type="primary" @click="filters">主要按钮</el-button></el-col>
        </el-row>
        <el-table
                :data="pageList"
                style="width: 100%">
            <el-table-column
                    label="aid">
                <template slot-scope="scope">
                    <span>{{ scope.row.aid }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="封面图">
                <template slot-scope="scope" width="100px;">
                    <span><img :src="scope.row.originalpic" alt=""></span>
                </template>
            </el-table-column>
            <el-table-column
                    label="标题">
                <template slot-scope="scope">
                    <span>{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="分类">
                <template slot-scope="scope">
                    <span>{{ scope.row.catname}}</span>
                </template>
            </el-table-column>
            <el-table-column label="管理">
                <template slot-scope="scope">
                    <div class="el-button-vertical">
                        <el-button size="mini">编辑</el-button>
                    </div>
                    <div class="el-button-vertical">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="更新时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.dateline}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="分享链接">
                <template slot-scope="scope">
                    <span>{{ scope.row.shareurl }}</span>
                </template>
            </el-table-column>

        </el-table>
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage1"
                    :page-sizes="[10, 20, 50,100]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalpageNum">
            </el-pagination>
        </div>
        <router-view name="article"></router-view>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                options: [{
                    value: '',
                    label: '全部'
                }, {
                    value: '活动运营',
                    label: '活动运营'
                }, {
                    value: '用户运营',
                    label: '用户运营'
                }, {
                    value: '新媒体运营',
                    label: '新媒体运营'
                }, {
                    value: 'aso',
                    label: 'aso'
                }, {
                    value: 'sem',
                    label: 'sem'
                }, {
                    value: '信息流',
                    label: '信息流'
                }, {
                    value: '广告营销',
                    label: '广告营销'
                }, {
                    value: '行业动态',
                    label: '行业动态'
                }
                ],
                catname: '',
                list:[],
                filterList:[],
                pageList:[],
                aid:'',
                title:'',
                currentPage1: 1,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                totalpageNum:100,
                onepageNum:'10',
                fullscreenLoading:false,
            }
        },
        created(){
            this.filters();
        },
        computed:{
        },
        methods:{
            filters:function () {
                var _this=this;
                this.fullscreenLoading=true;
                this.$ajax.get('/api/article/recommend/?size=1000').then((res) => {
                    this.fullscreenLoading=false;
                    if(res.data.return_code==200){
                        _this.list=res.data.return_data.list;
                        _this.filterList=this.list.filter(function (value,index) {
                           return (_this.aid.length===0?true:value.aid.toString().indexOf(_this.aid)!==-1)&&
                                (_this.title.length === 0 ? true :value.title.toString().indexOf(_this.title) !== -1)&&
                               (_this.catname.length === 0 ? true :value.catname.toString().indexOf(_this.catname) !== -1)
                         });
                        _this.handleCurrentChange(1);
                    }
                }).catch( err => {
                    this.fullscreenLoading=false;
                    this.$message({
                        message: err,
                        type: 'warning'
                    });
                })
            },
            filterDate:function() {
                return this.pageList.filter(function (item) {
                     item.dateline=new Date(parseInt(item.dateline) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.onepageNum=val;
                this.handleCurrentChange(1)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
                console.log(this.filterList.length,val)
                this.totalpageNum=this.filterList.length;
                this.pageList=this.filterList.slice((val-1)*this.onepageNum,(this.onepageNum*val)-1);
                this.filterDate()
            },
            handleDelete(id,row){
                console.log(id,row)
                var _this=this;
                this.$confirm('666', '确认删除', {
                    callback:function () {
                        _this.pageList.splice(id,1)
                    }
                })

             }
        }
    }
</script>
<style lang="scss" scoped="" type="text/css">
    .demo-input-suffix{
        width:100%;
        margin-bottom:30px;
        .el-input{
            width:300px;
            margin-right:30px;
        }
        .el-col{
            line-height:40px;
        }
        .el-col-3{
            max-width:100px;
            text-align: right;
        }
    }
    .el-button-vertical{
        margin-top:10px;
    }
</style>