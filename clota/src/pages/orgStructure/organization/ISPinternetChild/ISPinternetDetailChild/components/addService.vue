<!--添加服务模态框-->

<template>
    <Modal
        title="Title"
        v-model="modalShow"
        :mask-closable="false"
        @on-visible-change="visibleChange"
        class="add-service"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title" >{{$t('addService')}}</span>
        </div>
        <div class="service-body">
            <div class="label-info">
                <span class="key">{{$t('superiroCompany')}}：</span>
                <span class="val">
                    {{sceneDetail.parentManager | contentFilter}}
                     <Tooltip placement="top">
                        <div slot="content" class="tips-content">
                            {{$t('addServiceErrorInfo')}}
                        </div>
                         <span class="iconfont icon-note"></span>
                    </Tooltip>
                </span>
            </div>
            <!--<span class="tip">请先为上级公司开通服务后，景区才能添加相应服务。</span>-->
            <div class="label-info" style="margin-bottom: 10px">
                <span class="val">{{$t('superiorOpenedServer')}}：</span>
            </div>
            <table-com
                v-if="tableShow"
                ref="multipleTable"
                :column-data="columns"
                :table-data="tableData"
                :height="250"
                @query-data="queryList"
                @selection-change="handleSelectionChange">
                <el-table-column
                    slot="column0"
                    slot-scope="row"
                    type="selection"
                    fixed="left"
                    :disabled="true"
                    :label="row.title"
                    :width="row.width"
                    :selectable="checkIsValid"
                    :min-width="row.minWidth">
                </el-table-column>
                <el-table-column
                    slot="column4"
                    slot-scope="row"
                    :label="row.title"
                    show-overflow-tooltip
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{scope.row.runStatus === 'normal' ? $t('opened') : scope.row.runStatus === 'invalid' ? $t('paused') : $t('expired')}}
                    </template>
                </el-table-column>
            </table-com>
        </div>
        <div slot="footer">
            <Button class="ivu-btn-90px"
                    @click="cancel">
                {{$t('cancel')}}
            </Button>
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="confirm">
                {{$t('save')}}
            </Button>
        </div>
    </Modal>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { openedServiceHead } from './openedServiceConfig';
    import ajax from '@/api/index.js';
    import { mapGetters } from 'vuex';
    export default {
        props : {
            //景区详情
            'scene-detail' : {
                type : Object,
                default () {
                    return {};
                }
            },
            //已经开通的服务
            'opened-services' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        components : {
            tableCom
        },
        data () {
            return {
                //是否显示模态框
                modalShow : false,
                //确认执行的回调函数
                confirmCallback : null,
                //取消执行的回调函数
                cancelCallback : null,
                //表头配置
                columns : openedServiceHead,
                //服务总条数
                totalCount : 0,
                //当前选择的服务
                selectedService : [],
                pageSize : 10,
                pageNo : 1,
                tableData : []
            };
        },
        methods : {
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange (type) {
                if (type === false) {
                    this.handleSelectionChange([]);
                }
            },
            /**
             * 取消新增
             */
            cancel () {
                this.modalShow = false;
                if (this.cancelCallback) {
                    this.cancelCallback();
                }
            },
            /**
             * 确认开通服务
             */
            confirm () {
                if (this.selectedService.length < 1) {
                    this.$Message.warning(this.$t('selectField', { msg : this.$t('service') }));
                } else {
                    let selectService = [];
                    for (let i = 0,j = this.selectedService.length; i < j; i++) {
                        if (!(this.selectedService[i]['serviceId'] in this.openedServiceObj)) {
                            selectService.push(this.selectedService[i]);
                        }
                    }
                    if (selectService.length > 0) {
                        this.openScenicServices(JSON.parse(JSON.stringify(selectService)));
                    }
                }
            },
            /**
             * 显示 模态框
             * @param confirmCallback
             * @param cancelCallback
             */
            show ({ confirmCallback = null,cancelCallback }) {
                this.modalShow = true;
                if (confirmCallback && typeof confirmCallback == 'function') {
                    this.confirmCallback = confirmCallback;
                }
                if (cancelCallback && typeof cancelCallback == 'function') {
                    this.cancelCallback = cancelCallback;
                }
            },
            /**
             * 选择的服务数据改变
             * @param data
             */
            handleSelectionChange (data) {
                this.selectedService = data;
            },
            /**
             * 查询上级开通的服务
             */
            queryList () {
                ajax.post('getOrgServiceList',{
                    orgId : this.sceneDetail.id,
                    pageNo : 1,
                    pageSize : 9999
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data && res.data.rootServiceList ? res.data.rootServiceList.data : [];
                        this.$nextTick(() => {
                            this.setDefaultChosed(this.tableData);
                        });
                    } else {
                        this.tableData = [];
                    }
                });
            },
            /**
             * 给指定景区开通服务
             * @param selectService
             */
            openScenicServices (selectService) {
                ajax.post('addOrgServiceList',
                    selectService.map(item => {
                        return {
                            orgId : this.sceneDetail.id,
                            startTime : item.startTime,
                            endTime : item.endTime,
                            serviceId : item.serviceId,
                            serviceName : item.serviceName,
                            runStatus : item.runStatus,
                        };
                    }),
                    {
                        headers : {
                            'Content-Type' : 'application/json;charset-UTF-8'
                        }
                    }
                ).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('openedService') }));
                        this.$emit('fresh-service');
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('openedService') }));
                    }
                }).finally(() => {
                    this.modalShow = false;
                });
            },
            /**
             * 设置默认选中的框
             * @param tableData
             */
            setDefaultChosed (tableData) {
                for (let i = 0,j = this.openedServices.length; i < j; i++) {
                    for (let a = 0,b = tableData.length; a < b; a++) {
                        if (tableData[a].serviceId === this.openedServices[i].serviceId) {
                            this.$refs.multipleTable.toggleRowSelection(tableData[a]);
                        }
                    }
                }
            },
            /**
             * 服务是否可以选择
             * @param row
             * @param index
             */
            checkIsValid (row,index) {
                for (let i = 0,j = this.openedServices.length; i < j; i++) {
                    if (row.serviceId === this.openedServices[i].serviceId) {
                        return false;
                    }
                }
                return true;
            }
        },
        computed : {
            //表格是否显示
            tableShow () {
                return this.sceneDetail && !!this.sceneDetail.id && this.modalShow;
            },
            ...mapGetters({
                manageOrgs : 'manageOrgs'
            }),
            //已经开通的服务对象类型
            openedServiceObj () {
                let returnObj = {};
                if (this.openedServices && this.openedServices.length > 0) {
                    for (let i = 0,j = this.openedServices.length; i < j; i++) {
                        returnObj[this.openedServices[i]['serviceId']] = this.openedServices[i];
                    }
                }
                return returnObj;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-service {
        & /deep/ .ivu-modal {
            width: 650px !important;
            height: 480px;
        }

        .target-class {
            height: 23px;
            line-height: 23px;

            .title {
                font-size: 14px;
                color: #354052;
                letter-spacing: 1px;
                text-align: left;
                display: inline-block;
                width: 100%;
                @include overflow_tip(100%);
            }
        }

        & /deep/ .ivu-modal-header {
            padding: 12px 30px;
        }

        & /deep/ .ivu-modal-close {
            top: 7px;
        }

        & /deep/ .ivu-modal-body {
            padding: 0;
            position: relative;
            @include block_outline($height: 364px);
        }

        /deep/ .ivu-modal-footer {
            text-align: center;
        }

        .service-body {
            font-size: $font_size_14px;
            color: $color_333;
            text-align: left;
            padding: 15px 20px;
            $key_width : 150px;

            .label-info{
                @include block_outline(100%,30px);
                line-height: 30px;
                margin-top: 5px;

                .key{
                    float: left;
                    display: inline-block;
                    @include block_outline(auto,30px);
                    text-align: right;
                    padding-right: 10px;
                    font-size: $font_size_14px;
                    color: $color_333;
                }

                .val{
                    float: left;
                    display: inline-block;
                    @include overflow_tip(unquote('calc(100% - #{$key_width})'),100%);
                    font-size: $font_size_14px;
                    color: $color_666;
                }

            }
        }
    }
</style>
