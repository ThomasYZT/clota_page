<!--已开通服务-->

<template>
    <div class="opened-service">
        <table-com
            :table-data="tableData"
            :column-data="openedServiceHead"
            :title="$t('openedService')"
            :show-page="true"
            :is-pack-up="isPackUp"
            :show-table-bar="false"
            :total="totalCount"
            @selection-change="handleSelectionChange"
            @get-new-data="getOpenedService">
            <el-table-column
                slot="column0"
                type="selection"
                width="55">
            </el-table-column>
            <div class="service-operation" slot="table-title">
                <template v-if="type === 'company'">
                    <Button type="primary"
                            :disabled="!canRecoverService"
                            @click="recoverService(selectedService)">恢复</Button>
                    <Button type="primary"
                            :disabled="!canPauseService"
                            @click="paushService(selectedService)">暂停</Button>
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
                            @click="addService">添加服务</Button>
                </template>
            </div>
            <el-table-column
                slot="column5"
                :label="$t('operate')"
                :width="type === 'company' ? 145 : 90">
                <template slot-scope="scoped">
                    <template v-if="type === 'company'">
                        <ul class="operate-info">
                            <li class="custome"
                                @click="delayService([scoped.row])"
                                v-if="scoped.row.status === 'open'">延期</li>
                            <li class="custome"
                                @click="paushService([scoped.row])"
                                v-if="scoped.row.status === 'open'">暂停</li>
                            <li class="custome"
                                @click="openService(scoped.row)"
                                v-if="scoped.row.status === 'close'">开通服务</li>
                            <li class="custome"
                                @click="recoverService([scoped.row])"
                                v-if="scoped.row.status === 'pause'">恢复</li>
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
        <open-service-modal
            v-model="openServiceModalShow"
            @fresh-data="getOpenedService">
        </open-service-modal>
        <!--服务延期模态框-->
        <service-delay-modal
            v-model="serviceDelayModalShow"
            :service-list="operateServiceList">
        </service-delay-modal>
        <!--删除服务模态框-->
        <del-modal ref="delModal">
            <span class="red-bale">删除服务后，本景区在该服务板块下的所有数据也将被同步删除，</span>
            <span>请及时保存。</span>
        </del-modal>
        <!--添加服务模态框-->
        <add-service ref="addService">
        </add-service>
    </div>
</template>

<script>
    import {openedServiceHead} from './openedServiceConfig';
    import tableCom from '../../../organization/tableCom';
    import openServiceModal from './openServiceModal';
    import serviceDelayModal from './serviceDelayModal.vue';
    import delModal from '@/components/delModal/index.vue';
    import addService from './addService';
    export default {
        props : {
            //是否展开默认值
            'is-pack-up': {
                type: Boolean,
                default: false
            },
            //当前查看已开通服务的结构类型，可以为景区和公司，默认为公司
            type : {
                type : String,
                default: 'company'
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
                tableData : [
                    {
                        examName : 'examName',
                        status : 'open'
                    },
                    {
                        examName : 'examName',
                        status : 'close'
                    },
                    {
                        examName : 'examName',
                        status : 'pause'
                    }
                ],
                //员工总数
                totalCount : 100,
                //是否显示开通服务的模态框
                openServiceModalShow : false,
                //是否显示延期服务模态框
                serviceDelayModalShow : false,
                //当前操作的服务里列表
                operateServiceList : []
            }
        },
        methods: {
            /**
             * 获取已开通的服务
             * @param data
             */
            getOpenedService ({pageSize,pageNo} = {pageSize : this.pageSize,pageNo : this.pageNo}) {

            },
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
             * @param data
             */
            paushService (data) {
                console.log(data);
                this.$Message.success('暂停成功');
            },
            /**
             * 恢复服务
             * @param data
             */
            recoverService (data) {
                console.log(data);
                this.$Message.success('恢复成功');
            },
            /**
             * 开通服务
             */
            openService () {
                this.$Message.success('开通成功');
            },
            /**
             * 新增服务
             */
            addService () {
                this.openServiceModalShow = true;
            },
            /**
             * 删除服务
             * @param data
             */
            delService (data) {
                this.$refs.delModal.show({
                    title : `删除服务`,
                    confirmCallback : () => {
                        // this.confirmDelete(data);
                    }
                });
            },
            /**
             * 添加服务
             */
            addService () {
                this.$refs.addService.show({
                    confirmCallback (data) {
                        console.log(data)
                    }
                });
            }
        },
        computed : {
            //可以开通服务
            canRecoverService () {
                return this.selectedService.length > 0 && this.selectedService.every(item => item.status === 'pause');
            },
            //可以暂停服务
            canPauseService () {
                return this.selectedService.length > 0 && this.selectedService.every(item => item.status === 'open');
            },
            //可以延期服务
            canDelayService () {
                return this.selectedService.length > 0 && this.selectedService.every(item => item.status === 'open');
            },
            //是否可以批量删除服务
            canDelService () {
                return this.selectedService.length > 0;
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
