<!--优惠券模态框-->

<template>
    <Modal
        :title="$t('coupon')"
        v-model="modalShow"
        :mask-closable="false"
        :width="600"
        @on-visible-change="visibleChange"
        class="coupon-modal"
        class-name="vertical-center-modal">
        <Form ref="formValidate"
              :model="formData"
              :label-width="170">
            <FormItem :label="$t('卡券名称')" prop="name" required>
                <Input v-model.trim="formData.name"
                       disabled
                       style="width: 280px;"/>
            </FormItem>
            <FormItem :label="$t('卡券类别')" prop="couponType" required>
                <Select v-model.trim="formData.couponType"
                        style="width: 280px;"
                        disabled
                        transfer
                        :placeholder="$t('selectField', {msg: ''})">
                    <Option v-for="(item,index) in couponTypeList"
                            :key="index"
                            :value="item.value">
                        {{$t(item.label)}}
                    </Option>
                </Select>
            </FormItem>
            <FormItem :label="$t('有效期')" prop="validateDay" required>
                <Input v-model.trim="formData.validateDay"
                       disabled
                       style="width: 280px;"/>
                <span class="valid-day">{{$t('day')}}</span>
                <Tooltip placement="top" transfer>
                    <div slot="content" class="tips-content">
                        {{$t('从发放至游客开始计算有效期。')}}
                    </div>
                    <span class="iconfont icon-note"></span>
                </Tooltip>
            </FormItem>
            <Form-item :label="$t('selectProduct')" prop="conditionProductId" required>
                <Select v-model.trim="formData.conditionProductId"
                        style="width: 280px;"
                        disabled
                        :placeholder="$t('selectField', {msg: ''})">
                    <Option :value="item.id"
                            v-for="item in productList"
                            :key="item.id" >
                        {{item.productName}}
                    </Option>
                </Select>
            </Form-item>
            <!--可用渠道-->
            <Form-item :label="$t('availableChannels')" prop="conditionChannelId" required>
                <Select v-model.trim="formData.conditionChannelId"
                        :multiple="true"
                        transfer
                        disabled
                        style="width: 280px;"
                        :clearable="true"
                        :placeholder="$t('selectField', {msg: ''})">
                    <Option v-for="(item,index) in channelSetList"
                            :key="index"
                            :value="item.id">
                        {{item.orgChannelName}}
                    </Option>
                </Select>
            </Form-item>
            <Form-item label="可用店铺" prop="conditionOrgId" required>
                <Select v-model.trim="formData.conditionOrgId"
                        :multiple="true"
                        disabled
                        style="width: 280px;"
                        transfer
                        :placeholder="$t('selectField', {msg: ''})">
                    <Option v-for="(item,index) in orgList"
                            :key="index"
                            :value="item.id">
                        {{item.orgName}}
                    </Option>
                </Select>
            </Form-item>
        </Form>
        <div slot="footer">
            <Button class="ivu-btn-90px"
                    @click="cancel">
                {{$t('close')}}
            </Button>
        </div>
    </Modal>
</template>

<script>
    import { couponTypeList } from '@/assets/js/constVariable.js';
    import ajax from '@/api/index.js';
    import { mapGetters } from 'vuex';

    export default {
        data () {
            return {
                //模态框是否显示
                modalShow : false,
                //表单数据
                formData : {
                    name : 'aa',
                    couponType : '',
                    //有效期
                    validateDay : '',
                    //选择的商品
                    conditionProductId : '',
                    //可用渠道
                    conditionChannelId : [],
                    //可用店铺
                    conditionOrgId : []
                },
                //卡券类别列表
                couponTypeList : couponTypeList,
                //产品列表
                productList : [],
                //渠道列表
                channelSetList : [],
                //可用店铺列表
                orgList : [],
            };
        },
        methods : {
            /**
             * 模态框显示或隐藏
             * @param{Boolean} type 模态框状态
             */
            visibleChange (type) {
                if (type) {
                    this.queryChannelSet();
                    this.queryListAmountRange();
                }
            },
            /**
             * 取消新增
             */
            cancel () {
                this.modalShow = false;
            },
            /**
             * 查询渠道
             */
            queryChannelSet () {
                ajax.post('querySelfOwnedChannel', {
                    status : 'valid',
                    pageNo : 1,
                    pageSize : 999
                }).then(res => {
                    if (res.success) {
                        this.channelSetList = res.data ? res.data.data : [];
                    } else {
                        this.channelSetList = [];
                    }
                }).catch(() => {
                    this.channelSetList = [];
                });
            },
            /**
             * 查询所有店铺信息
             */
            queryListAmountRange () {
                ajax.post('getSubNode',{
                    orgType : 'scenic',
                    includeMe : this.manageOrgs.nodeType === 'scenic'
                }).then(res => {
                    if (res.success) {
                        this.orgList = res.data ? res.data : [];
                    } else {
                        this.orgList = [];
                    }
                }).catch(() => {
                    this.orgList = [];
                });
            },
            // /**
            //  * 查询商品信息
            //  * @param orgId
            //  */
            // queryProduct (orgId) {
            //     ajax.post('queryProduct',{
            //         orgId : orgId
            //     }).then(res => {
            //         if (res.success) {
            //             this.productList = res.data.data ? res.data.data : [];
            //         } else {
            //             this.productList = [];
            //         }
            //     }).catch(err => {
            //         this.productList = [];
            //     });
            // },
            /**
             * 显示优惠券详情模态框
             * @param{Object} couponData 优惠券详情
             */
            show (couponData) {
                this.modalShow = true;
            }
        },
        computed : {
            ...mapGetters({
                lang : 'lang',
                manageOrgs : 'manageOrgs'
            })
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .coupon-modal{

        .valid-day{
            position: absolute;
            left: 290px;
        }

        /deep/ .ivu-tooltip{
            position: absolute;
            left: 310px;
            top: -2px;
            color: #939393;
        }
    }
</style>
