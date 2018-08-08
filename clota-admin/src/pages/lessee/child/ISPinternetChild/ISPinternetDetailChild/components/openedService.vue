<!--已开通服务-->

<template>
    <div class="opened-service">
        <table-com
            :table-data="tableData"
            :column-data="openedServiceHead"
            :title="$t('openedService')"
            :show-page="true"
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
                <Button type="primary"
                        :disabled="!canRecoverService"
                        @click="recoverService(selectedService)">恢复</Button>
                <Button type="primary"
                        :disabled="!canPauseService"
                        @click="paushService([scoped.row])">暂停</Button>
                <Button type="primary"
                        :disabled="!canDelayService"
                        @click="delayService(selectedService)">延期</Button>
                <Button type="primary" @click="addService">开通服务</Button>
            </div>
            <el-table-column
                slot="column4"
                :label="$t('operate')"
                width="145">
                <template slot-scope="scoped">
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
    </div>
</template>

<script>
    import {openedServiceHead} from './openedServiceConfig';
    import tableCom from '../../../organization/tableCom';
    import openServiceModal from './openServiceModal';
    import serviceDelayModal from './serviceDelayModal.vue';
    export default {
        components : {
            tableCom,
            openServiceModal,
            serviceDelayModal
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
    }
</style>
