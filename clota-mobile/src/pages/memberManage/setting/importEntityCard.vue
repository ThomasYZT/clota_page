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
                <Tabs v-model="tapValue" :animated="false">
                    <TabPane :label="sucResolve"  name="successData">
                    </TabPane>
                    <TabPane :label="failResolve" name="errorData">
                    </TabPane>
                </Tabs>
                <span class="fail-tip">解析失败的数据将不会被导入</span>
            </div>
            <table-com
                v-if="resolveResultShow"
                :column-data="columns[tapValue]"
                :table-data="tableData[tapValue]"
                :border="true"
                :row-class-name="rowClassName"
                :table-com-min-height="400"
                :auto-height="true">
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
                            field: 'error'
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
                failSize : ''
            }
        },
        methods: {
            /**
             * 获取上传解析结果
             * @param data
             */
            getUploadResult (data){
                this.tableData['successData'] = data.dataList ? data.dataList : [];
                this.tableData['errorData'] = data.errorList ? data.errorList : [];
                this.sucSize = data.dataSize;
                this.failSize = data.errorSize;
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
                    entityCards : JSON.stringify(this.tableData['successData'])
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
                    right: 0;
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
