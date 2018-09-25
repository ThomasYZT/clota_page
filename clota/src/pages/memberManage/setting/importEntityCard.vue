<!--批量导入实体卡-->

<template>
    <div class="import-entity-card">
        <bread-crumb-head
            :locale-router="'批量导入'"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div  class="content">
            <div class="import-area">
                <div class="import-label">
                    <div class="img-label">
                        <img  src="../../../assets/images/icon-upload.png" alt="">
                    </div>
                    <span class="font-label">
                        <upload-file @upload-success="getUploadResult">
                        </upload-file>
                    </span>
                </div>
                <div class="download-template">
                    <div class="img-label">
                        <img  src="../../../assets/images/icon-download.png" alt="">
                    </div>
                    <span class="font-label">
                        <a :href="downloadUrl">下载标准模板</a>
                    </span>
                </div>
            </div>
            <div class="tap-switch" v-if="resolveResultShow">
                <Tabs v-model="tapValue" :animated="false" @on-click="tapChange">
                    <TabPane :label="sucResolve"  name="successData">
                    </TabPane>
                    <TabPane :label="failResolve" name="errorData">
                    </TabPane>
                </Tabs>
                <span class="fail-tip">解析失败的数据将不会被导入</span>
            </div>
            <table-com
                v-if="resolveResultShow"
                :key="tapValue"
                :column-data="columns[tapValue]"
                :table-data="tableData[tapValue]"
                :border="true"
                :page-no-d.sync="pageNo"
                :show-pagination="true"
                :page-size-d.sync="pageSize"
                :total-count="totalCount"
                :row-class-name="rowClassName"
                :table-com-min-height="400"
                :auto-height="true"
                @query-data="queryList">
                <el-table-column
                    slot="column2"
                    slot-scope="row"
                    :label="row.title"
                    show-overflow-tooltip
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scoped">
                        {{$t(scoped.row.errorInfo)}}
                    </template>
                </el-table-column>
            </table-com>
        </div>
        <div class="btn-area" v-if="resolveResultShow">
            <Button type="primary"
                    class="ivu-btn-108px"
                    @click="importCard">导入</Button>
            <Button type="ghost"
                    class="ivu-btn-108px"
                    @click="cancel">取消</Button>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import ajaxConfig from '@/config/index.js';
    import apiList from '@/api/apiList.js';
    import uploadFile from './components/uploadFile';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import ajax from '@/api/index.js';
    export default {
        components : {
            breadCrumbHead,
            uploadFile,
            tableCom
        },
        data() {
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: 'basic-setting',
                        router: {
                            name: 'memberSetting'
                        }
                    },
                    {
                        name: '实体卡管理',
                        router: {
                            name: 'entityCard'
                        }
                    }
                ],
                //表头配置
                columns : {
                    successData : [
                        {
                            title: '物理卡号',
                            field: 'physicalNum'
                        },
                        {
                            title: '卡面号',
                            field: 'faceNum'
                        },
                    ],
                    errorData : [
                        {
                            title: '物理卡号',
                            field: 'physicalNum'
                        },
                        {
                            title: '卡面号',
                            field: 'faceNum'
                        },
                        {
                            title: '错误原因',
                            field: 'errorInfo'
                        },
                    ]
                },
                //表格数据
                tableData : {
                    successData : [],
                    errorData : [],
                },
                //当前选择的tap
                tapValue : 'successData',
                //解析成功条数
                sucSize : '',
                //解析失败条偶数
                failSize : '',
                pageNo : 1,
                pageSize : 10,
                totalCount : 0,
                //上传的数据
                uploadData : {
                    successData : [],
                    errorData : [],
                }
            }
        },
        methods: {
            /**
             * 获取上传解析结果
             * @param data
             */
            getUploadResult (data){
                this.tapValue = 'successData';
                this.pageNo = 1;
                this.pageSize = 10;
                this.uploadData['successData'] = data.dataList ? data.dataList : [];
                this.uploadData['errorData'] = data.errorList ? data.errorList : [];
                this.tableData['successData'] = this.uploadData['successData'].slice( (this.pageNo - 1) * this.pageSize , this.pageNo * this.pageSize);
                this.tableData['errorData'] = this.uploadData['errorData'].slice( (this.pageNo - 1) * this.pageSize , this.pageNo * this.pageSize);
                this.sucSize = data.dataSize;
                this.failSize = data.errorSize;
                this.totalCount = this.sucSize;
            },
            /**
             * 取消导入
             */
            cancel () {
                this.$router.push({
                    name : 'entityCard'
                });
            },
            /**
             * 导入解析文件数据
             */
            importCard ( ){
                ajax.post('batchSaveEntityCards',{
                    entityCards : JSON.stringify(this.uploadData['successData'])
                }).then(res => {
                    if(res.success){
                        this.$Message.success('导入成功');
                        this.cancel();
                    }else{
                        this.$Message.error('导入失败');
                    }
                });
            },
            /**
             * 行类填写
             * @param row
             */
            rowClassName (row) {
                if(this.tapValue === "errorData"){
                    return 'error-tr';
                }
            },
            /**
             * tap标签改变
             * @param value tap的值
             */
            tapChange (value) {
                this.pageNo = 1;
                this.pageSize = 10;
                if(value === 'successData'){
                    this.totalCount = this.sucSize;
                    this.tableData['successData'] = this.uploadData['successData'].slice( (this.pageNo - 1) * this.pageSize , this.pageNo * this.pageSize);
                }else{
                    this.totalCount = this.failSize;
                    this.tableData['errorData'] = this.uploadData['errorData'].slice( (this.pageNo - 1) * this.pageSize , this.pageNo * this.pageSize);
                }
            },
            /**
             * 切换导入数的分页
             */
            queryList () {
                if(this.tapValue === 'successData'){
                    this.totalCount = this.sucSize;
                    this.tableData['successData'] = this.uploadData['successData'].slice( (this.pageNo - 1) * this.pageSize , this.pageNo * this.pageSize);
                }else{
                    this.totalCount = this.failSize;
                    this.tableData['errorData'] = this.uploadData['errorData'].slice( (this.pageNo - 1) * this.pageSize , this.pageNo * this.pageSize);
                }
            }
        },
        computed : {
            //下载模板路径
            downloadUrl () {
                return ajaxConfig['HOST'] + apiList['downloadEntityCardTmp'];
            },
            //解析成功label
            sucResolve() {
                return `解析成功 · ${this.sucSize}`;
            },
            //解析失败label
            failResolve () {
                return `解析失败 · ${this.failSize}`;
            },
            //解析结果是否显示
            resolveResultShow () {
                return this.tableData['successData'].length > 0 || this.tableData['errorData'].length > 0;
            }
        }

    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .import-entity-card{
        @include block_outline();

        .content{
            @include block_outline($height : unquote('calc(100% - 106px)'));
            @include padding_place();
            padding: 30px 40px 0 40px;
            overflow: auto;

            .import-area{
                @include block_outline($height : 70px);
                margin-bottom: 70px;

                .import-label,
                .download-template{
                    width: calc((100% - 20px) / 2);
                    height: 70px;
                    float: left;
                    background: $color_fff;
                    border: 1px solid #EEEEEE;
                    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
                    border-radius: 2px;
                    cursor: pointer;

                    .img-label{
                        @include block_outline(64px,100%,false);
                        border-right: 1px solid $color_eee;
                        float: left;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        img{
                            display: block;
                            @include block_outline(22px,30px);
                        }
                    }

                    .font-label{
                        float: left;
                        @include block_outline(unquote('calc(100% - 64px)'),100%,false);
                        line-height: 70px;
                        font-size: $font_size_18px;
                        color: #4A90E2;
                        letter-spacing: 1.29px;
                        padding-left: 23px;
                    }
                }

                .download-template{
                    margin-left: 20px;
                }
            }

            .tap-switch{
                width: 630px;
                position: relative;
                height: 70px;
                text-align: center;
                margin: 0 auto;

                /deep/ .ivu-tabs-nav-scroll{
                    width: 300px;
                    margin: 0 auto;
                }

                /deep/ .ivu-tabs-bar{
                    border-bottom: 0!important;
                }

                /deep/ .ivu-tabs-ink-bar{
                    /*height: 2px;*/
                }

                /deep/ .ivu-tabs-tab:nth-last-of-type(1){
                    color: #EB6751;
                }

                /deep/ .ivu-tabs-nav-prev,
                /deep/ .ivu-tabs-nav-next{
                    display: none;
                }

                .fail-tip{
                    position: absolute;
                    top: 15px;
                    right: -26px;
                    font-size: $font_size_14px;
                    color: #C5C5C5;
                }
            }
        }

        .btn-area{
            height: 56px;
            width: 100%;
            line-height: 56px;
            text-align: center;
            background: #FFFFFF;
            box-shadow: 0 -5px 3px 0 rgba(0,0,0,0.03);

            /deep/ .ivu-btn{
                width: 108px;
                padding: 5px 30px;
            }
            .ivu-btn + .ivu-btn{
                margin-left: 20px;
            }
        }

        /deep/ .error-tr .cell{
            color: $color_err;
        }
    }
</style>
