<!--已开通服务-->

<template>
    <div class="opened-service">
        <!--<table-com-->
            <!--:table-data="tableData"-->
            <!--:column-data="openedServiceHead"-->
            <!--:title="$t('openedService')"-->
            <!--:show-page="true"-->
            <!--:is-pack-up="isPackUp"-->
            <!--:show-table-bar="false"-->
            <!--:total="totalCount"-->
            <!--@selection-change="handleSelectionChange"-->
            <!--@get-new-data="getOpenedService">-->
            <!--<el-table-column-->
                <!--slot="column0"-->
                <!--type="selection"-->
                <!--width="55">-->
            <!--</el-table-column>-->
            <!--<div class="service-operation" slot="table-title">-->
                <!--<template v-if="type === 'company'">-->
                    <!--<Button type="primary"-->
                            <!--:disabled="!canRecoverService"-->
                            <!--@click="recoverService(selectedService)">恢复</Button>-->
                    <!--<Button type="primary"-->
                            <!--:disabled="!canPauseService"-->
                            <!--@click="paushService(selectedService)">暂停</Button>-->
                    <!--<Button type="primary"-->
                            <!--:disabled="!canDelayService"-->
                            <!--@click="delayService(selectedService)">延期</Button>-->
                    <!--<Button type="primary" @click="addService">开通服务</Button>-->
                <!--</template>-->
                <!--<template v-else-if="type === 'scene'">-->
                    <!--<Button type="primary"-->
                            <!--:disabled="!canDelService"-->
                            <!--@click="delService(selectedService)">删除服务</Button>-->
                    <!--<Button type="primary"-->
                            <!--@click="addService">添加服务</Button>-->
                <!--</template>-->
            <!--</div>-->
            <!--<el-table-column-->
                <!--slot="column5"-->
                <!--:label="$t('operate')"-->
                <!--:width="type === 'company' ? 145 : 90">-->
                <!--<template slot-scope="scoped">-->
                    <!--<template v-if="type === 'company'">-->
                        <!--<ul class="operate-info">-->
                            <!--<li class="custome"-->
                                <!--@click="delayService([scoped.row])"-->
                                <!--v-if="scoped.row.status === 'open'">延期</li>-->
                            <!--<li class="custome"-->
                                <!--@click="paushService([scoped.row])"-->
                                <!--v-if="scoped.row.status === 'open'">暂停</li>-->
                            <!--<li class="custome"-->
                                <!--@click="openService(scoped.row)"-->
                                <!--v-if="scoped.row.status === 'close'">开通服务</li>-->
                            <!--<li class="custome"-->
                                <!--@click="recoverService([scoped.row])"-->
                                <!--v-if="scoped.row.status === 'pause'">恢复</li>-->
                        <!--</ul>-->
                    <!--</template>-->
                    <!--<template v-if="type === 'scene'">-->
                        <!--<ul class="operate-info">-->
                            <!--<li class="custome"-->
                                <!--@click="delService([scoped.row])">删除</li>-->
                        <!--</ul>-->
                    <!--</template>-->
                <!--</template>-->
            <!--</el-table-column>-->
        <!--</table-com>-->

        <div class="pick-up-title" >
            <span class="label">{{$t('openedService')}}</span>
            <span class="back-up"
                  @click="isPackUp = !isPackUp">
                    {{$t(isPackUp ? 'backUp' : 'upLoad')}}
                <span class="iconfont icon-pull-down" :class="{'icon-reverse' : isPackUp}"></span>
            </span>
        </div>
        <transition name="fade">
            <div class="table-wrap" v-if="isPackUp">
                <div class="service-operation" slot="table-title">
                    <template v-if="type === 'company'">
                        <Button type="primary"
                                :disabled="!canRecoverService"
                                @click="recoverService(selectedService.map(item => item.serviceId))">恢复</Button>
                        <Button type="primary"
                                :disabled="!canPauseService"
                                @click="paushService(selectedService.map(item => item.serviceId))">暂停</Button>
                        <Button type="primary"
                                :disabled="!canDelayService"
                                @click="delayService(selectedService)">延期</Button>
                        <Button type="primary" @click="addService">开通服务</Button>
                    </template>
                    <template v-else-if="type === 'scene'">
                        <Button type="primary"
                                :disabled="!canDelService"
                                @click="delService(selectedService)">删除服务</Button>
                        <Button type="primary"
                                @click="orgAddService(selectedService)">添加服务</Button>
                    </template>
                </div>
                <table-com
                    v-if="tableShow"
                    :column-data="openedServiceHead"
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
                        slot="columncheck"
                        slot-scope="row"
                        :label="row.title"
                        fixed="left"
                        show-overflow-tooltip
                        type="selection"
                        :width="row.width"
                        :min-width="row.minWidth">
                    </el-table-column>
                    <el-table-column
                        slot="columnrunStatus"
                        slot-scope="row"
                        :label="row.title"
                        show-overflow-tooltip
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scoped">
                            {{scoped.row.runStatus === 'normal' ? $t('opened') : scoped.row.runStatus === 'invalid' ? $t('paused') : $t('expired')}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="columnoperate"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        show-overflow-tooltip
                        fixed="right"
                        :min-width="row.minWidth">
                        <template slot-scope="scoped">
                            <template v-if="type === 'company'">
                                <ul class="operate-info">
                                    <li class="custome"
                                        @click="delayService([scoped.row])"
                                        v-if="scoped.row.runStatus === 'normal'">延期</li>
                                    <li class="custome"
                                        @click="paushService([scoped.row.serviceId])"
                                        v-if="scoped.row.runStatus === 'normal'">暂停</li>
                                    <li class="custome"
                                        @click="openService(scoped.row.serviceId)"
                                        v-if="scoped.row.runStatus === 'expire'">开通服务</li>
                                    <li class="custome"
                                        @click="recoverService([scoped.row.serviceId])"
                                        v-if="scoped.row.runStatus === 'invalid'">恢复</li>
                                </ul>
                            </template>
                            <template v-if="type === 'scene'">
                                <ul class="operate-info">
                                    <li class="custome"
                                        @click="delService([scoped.row])">删除</li>
                                </ul>
                            </template>
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </transition>
        <!--开通服务模态框-->
        <open-service-modal
            :opened-service-id="openedServiceId"
            :org-id="searchParams.id"
            :opened-services="tableData"
            v-model="openServiceModalShow"
            @fresh-data="queryList">
        </open-service-modal>
        <!--服务延期模态框-->
        <service-delay-modal
            v-model="serviceDelayModalShow"
            :org-id="searchParams.id"
            :service-list="operateServiceList"
            @fresh-data="queryList">
        </service-delay-modal>
        <!--删除服务模态框-->
        <del-modal ref="delModal">
            <span class="red-bale">删除服务后，本景区在该服务板块下的所有数据也将被同步删除，</span>
            <span>请及时保存。</span>
        </del-modal>
        <!--添加服务模态框-->
        <add-service
            ref="addService"
            :scene-detail="sceneDetail"
            @fresh-service="queryList">
        </add-service>
    </div>
</template>

<script>
    import {openedServiceHead} from './openedServiceConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import openServiceModal from './openServiceModal';
    import serviceDelayModal from './serviceDelayModal.vue';
    import delModal from '@/components/delModal/index.vue';
    import addService from './addService';
    import ajax from '@/api/index.js';
    export default {
        props : {
            //当前查看已开通服务的结构类型，可以为景区和公司，默认为公司
            type : {
                type : String,
                default: 'company'
            },
            //表格查询参数
            'search-params' : {
                typee : Object,
                default () {
                    return {}
                }
            },
            //景区详情
            'scene-detail' : {
                typee : Object,
                default () {
                    return {}
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
            openServiceModal,
            serviceDelayModal,
            delModal,
            addService
        },
        data() {
            return {
                //选择的服务
                selectedService : [],
                //已开通服务表头配置
                openedServiceHead : openedServiceHead,
                //表格数据
                tableData : [],
                //员工总数
                totalCount : 100,
                //是否显示开通服务的模态框
                openServiceModalShow : false,
                //是否显示延期服务模态框
                serviceDelayModalShow : false,
                //当前操作的服务里列表
                operateServiceList : [],
                //是否收起
                isPackUp : true,
                pageNo : 1,
                pageSize : 10,
                //需要开通的服务id
                openedServiceId : ''
            }
        },
        methods: {
            /**
             * 选择的服务数据改变
             * @param data
             */
            handleSelectionChange (data) {
                this.selectedService = data;
            },
            /**
             * 延期服务
             * @param data
             */
            delayService (data) {
                this.operateServiceList = data;
                this.serviceDelayModalShow = true;
            },
            /**
             * 暂停服务
             * @param serviceIds 服务id
             */
            paushService (serviceIds) {
                ajax.post('updateServicesStatus',{
                    orgId : this.searchParams.id,
                    serviceIds : serviceIds,
                    runStatus : 'invalid'
                }).then(res => {
                    if(res.status === 200){
                        this.$Message.success('暂停成功');
                        this.queryList();
                    }else{
                        this.$Message.error('暂停失败');
                    }
                });
            },
            /**
             * 恢复服务
             * @param serviceIds 服务id
             */
            recoverService (serviceIds) {
                ajax.post('updateServicesStatus',{
                    orgId : this.searchParams.id,
                    serviceIds : serviceIds,
                    runStatus : 'normal'
                }).then(res => {
                    if(res.status === 200){
                        this.$Message.success('恢复成功');
                        this.queryList();
                    }else{
                        this.$Message.error('恢复失败');
                    }
                });
            },
            /**
             * 开通服务
             * @param serviceId
             */
            openService (serviceId) {
                this.openedServiceId = serviceId;
                setTimeout(() => {
                    this.openServiceModalShow = true;
                },0);
            },
            /**
             * 新增服务
             */
            addService () {
                this.openServiceModalShow = true;
                this.openedServiceId = '';
            },
            /**
             * 删除服务
             * @param data
             */
            delService (data) {
                this.$refs.delModal.show({
                    title : `删除服务`,
                    confirmCallback : () => {
                        this.comfirmDeletService(data.map(item => item.serviceId));
                    }
                });
            },
            /**
             * 添加服务
             */
            orgAddService () {
                this.$refs.addService.show({
                    confirmCallback (data) {
                        console.log(data)
                    }
                });
            },
            /**
             * 查询已开通的服务
             */
            queryList () {
                ajax.post('getOrgServices',{
                    id : this.searchParams.id,
                    page : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                    if(res.status === 200){
                        this.tableData = res.data ? res.data.list : [];
                        this.totalCount = Number(res.data.totalRecord);
                    }else{
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
                ajax.post('deleteServices',{
                    orgId : this.searchParams.id,
                    serviceIds : serviceIds
                }).then(res => {
                    if(res.status === 200){
                        this.$Message.success('删除成功');
                        this.queryList();
                    }else{
                        this.$Message.error('删除失败');
                    }
                });
            }
        },
        computed : {
            //可以恢复服务
            canRecoverService () {
                return this.selectedService.length > 0 && this.selectedService.every(item => item.runStatus === 'invalid');
            },
            //可以暂停服务
            canPauseService () {
                return this.selectedService.length > 0 && this.selectedService.every(item => item.runStatus === 'normal');
            },
            //可以延期服务
            canDelayService () {
                return this.selectedService.length > 0 && this.selectedService.every(item => item.runStatus === 'normal');
            },
            //是否可以批量删除服务
            canDelService () {
                return this.selectedService.length > 0;
            },
            //表格是否显示
            tableShow () {
                return this.searchParams && this.searchParams.id;
            }
        },
        watch : {
            //默认展开的初始值
            isDefaultPackUp : {
                handler (newVal){
                    if(newVal === true){
                        this.isPackUp = true;
                    }else{
                        this.isPackUp = false;
                    }
                },
                immediate : true
            }
        }
    }
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
                margin-top: 2px;
                vertical-align: middle;
                cursor: pointer;

                .icon-pull-down{
                    display: inline-block;
                    transition: all 0.5s;

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

        .operate-info{
            @include table_operate();

            .custome{
                color: $color_blue;
            }
        }

        @at-root .red-bale{
            padding: 0 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width : 100%;
            color:#ed3f14;
        }
    }
</style>
