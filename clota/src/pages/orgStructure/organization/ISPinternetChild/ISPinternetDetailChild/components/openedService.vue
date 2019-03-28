<!--已开通服务-->

<template>
    <div class="opened-service">
        <div class="pick-up-title" >
            <span class="label">{{$t('haveOpenedServices')}}</span>
            <span class="back-up"
                  @click="isPackUp = !isPackUp">
                    {{$t(isPackUp ? 'backUp' : 'upLoad')}}
                <span class="iconfont icon-arrow-down" :class="{'icon-reverse' : isPackUp}"></span>
            </span>
        </div>
        <transition name="fade">
            <div class="table-wrap" v-if="isPackUp">
                <div class="service-operation" v-if="type === 'scene' && canModifyService">
                    <Button type="error"
                            :disabled="!canDelService"
                            @click="delService(selectedService)">{{$t('delService')}}</Button>
                    <Button type="primary"
                            icon="android-add"
                            @click="orgAddService(selectedService)">{{$t('addService')}}</Button>
                </div>
                <table-com
                    v-if="tableShow && type === 'scene'"
                    :column-data="openedServiceHead"
                    default-page-layout="total, prev, pager, next"
                    :table-data="tableData"
                    :border="true"
                    :page-no-d.sync="pageNo"
                    :show-pagination="true"
                    :page-size-d.sync="pageSize"
                    :total-count="totalCount"
                    :auto-height="true"
                    :table-com-min-height="280"
                    @query-data="queryList"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        v-if="canModifyService"
                        :key="type"
                        slot="column0"
                        slot-scope="row"
                        :label="row.title"
                        fixed="left"
                        type="selection"
                        :width="65"
                        :min-width="row.minWidth">
                    </el-table-column>
                    <el-table-column
                        slot="column4"
                        slot-scope="row"
                        :label="row.title"
                        show-overflow-tooltip
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scoped">
                            {{scoped.row.runStatus === 'normal' ? $t('opened') : scoped.row.runStatus === 'invalid' ? $t('paused') : $t('expired')}}
                        </template>
                    </el-table-column>
                </table-com>

                <table-com
                    v-if="tableShow && type === 'company'"
                    :column-data="openedServiceHead"
                    :table-data="tableData"
                    :border="true"
                    :page-no-d.sync="pageNo"
                    default-page-layout="total, prev, pager, next"
                    :show-pagination="true"
                    :page-size-d.sync="pageSize"
                    :total-count="totalCount"
                    :auto-height="true"
                    :table-com-min-height="280"
                    @query-data="queryList"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        :key="type"
                        slot="column0"
                        slot-scope="row"
                        :label="row.title"
                        show-overflow-tooltip
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scoped">
                            {{(pageNo - 1) * pageSize + scoped.$index + 1}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column4"
                        slot-scope="row"
                        :label="row.title"
                        show-overflow-tooltip
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scoped">
                            {{scoped.row.runStatus === 'normal' ? $t('opened') : scoped.row.runStatus === 'invalid' ? $t('paused') : $t('expired')}}
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </transition>
        <!--删除服务模态框-->
        <del-modal ref="delModal">
            <div :class="$style.delTips">
                <Icon :class="$style.icon" type="help-circled"></Icon>
                <span :class="$style.redBale">{{$t('delServiceNotice')}}</span>
                <span>{{$t('saveInTime')}}</span>
            </div>
        </del-modal>
        <!--添加服务模态框-->
        <add-service
            ref="addService"
            :opened-services="tableData"
            :scene-detail="sceneDetail"
            @fresh-service="queryList">
        </add-service>
    </div>
</template>

<script>
    import { openedServiceHead } from './openedServiceConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import delModal from '@/components/delModal/index.vue';
    import addService from './addService';
    import ajax from '@/api/index.js';
    import { mapGetters } from 'vuex';
    export default {
        props : {
            //当前查看已开通服务的结构类型，可以为景区和公司，默认为公司
            type : {
                type : String,
                default : 'company'
            },
            //表格查询参数
            'search-params' : {
                typee : Object,
                default () {
                    return {};
                }
            },
            //景区详情
            'scene-detail' : {
                typee : Object,
                default () {
                    return {};
                }
            },
            //是否默认展开
            'isDefaultPackUp' : {
                type : Boolean,
                default : false
            }
        },
        components : {
            tableCom,
            delModal,
            addService
        },
        data () {
            return {
                //选择的服务
                selectedService : [],
                //已开通服务表头配置
                openedServiceHead : openedServiceHead,
                //表格数据
                tableData : [],
                //员工总数
                totalCount : 100,
                //是否收起
                isPackUp : true,
                pageNo : 1,
                pageSize : 10,
            };
        },
        methods : {
            /**
             * 选择的服务数据改变
             * @param data
             */
            handleSelectionChange (data) {
                this.selectedService = data;
            },
            /**
             * 删除服务
             * @param data
             */
            delService (data) {
                this.$refs.delModal.show({
                    title : this.$t('delService'),
                    confirmCallback : () => {
                        this.comfirmDeletService(data.map(item => item.id));
                    }
                });
            },
            /**
             * 添加服务
             */
            orgAddService () {
                this.$refs.addService.show({
                    confirmCallback (data) {
                        console.log(data);
                    }
                });
            },
            /**
             * 查询已开通的服务
             */
            queryList () {
                ajax.post('getOrgServiceList',{
                    orgId : this.searchParams.id,
                    pageNo : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.serviceList ? res.data.serviceList.data : [] : [];
                        this.totalCount = Number(res.data.serviceList.totalRow);
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 确认删除服务
             * @param serviceIds 需要删除的服务id
             */
            comfirmDeletService (serviceIds) {
                ajax.post('deleteOrgServiceList',
                    serviceIds.map(item => {
                        return {
                            id : item
                        };
                    }),
                    {
                        headers : {
                            'Content-Type' : 'application/json;charset-UTF-8'
                        }
                    }
                ).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('del') }));
                        this.queryList();
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('del') }));
                    }
                });
            }
        },
        computed : {
            //是否可以批量删除服务
            canDelService () {
                return this.selectedService.length > 0;
            },
            //表格是否显示
            tableShow () {
                return this.searchParams && this.searchParams.id;
            },
            ...mapGetters({
                manageOrgs : 'manageOrgs'
            }),
            //是否可以添加和删除服务,当前登录的节点不能操作自己的服务
            canModifyService () {
                return this.manageOrgs.id !== this.sceneDetail.id;
            }
        },
        watch : {
            //默认展开的初始值
            isDefaultPackUp : {
                handler (newVal) {
                    if (newVal === true) {
                        this.isPackUp = true;
                    } else {
                        this.isPackUp = false;
                    }
                },
                immediate : true
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .opened-service{
        @include block_outline($height : auto);

        .service-operation {
            @include block_outline($height: 40px);
            line-height: 20px;
            padding-bottom: 10px;
            font-size: $font_size_14px;
            color: $color_606266;

            .ivu-btn{
                float: right;
                margin-left: 10px;
            }
        }

        .pick-up-title{
            @include block_outline($height: 59px);
            padding: 25px 0 10px 0;

            .label {
                display: inline-block;
                font-size: $font_size_16px;
                color: $color_333;
                line-height: 24px;
                vertical-align: middle;
            }

            .back-up {
                font-size: $font_size_14px;
                color: $color_blue;
                display: inline-block;
                margin-left: 10px;
                vertical-align: middle;
                cursor: pointer;

                .icon-arrow-down{
                    display: inline-block;
                    transition: all 0.5s;
                    color: #9e9e9e;

                    &::before{
                        color: $color_blue;
                        font-size: 12px;
                    }

                    &.icon-reverse{
                        transform: rotate(180deg);
                        transition: all 0.5s;
                    }

                }
            }
        }


    }
</style>
<style module lang="scss">
    .delTips{
        position: absolute;
        padding: 0 76px 0 106px;
        color: #333333;
        font-size: 14px;
    }

    .icon{
        position: absolute;
        left: 88px;
        top : 2px;
        font-size: 15px;
        color: #EB6751;
    }

    .redBale {
        color: #ED3F14;
    }
</style>
