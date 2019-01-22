
<!--团队订单-->

<template>
    <div class="team-order">
        <bread-crumb-head
            :locale-router="$t('orderReserve')"
            :before-router-list="beforeRouterList">     <!--新增卡券 : 修改卡券信息-->
        </bread-crumb-head>
        <!--产品信息 -->
        <product-info :product-list="productList">
        </product-info>
        <!--游客信息-->
        <team-tourist-info ref="tourist"
                           v-if="productList && productList.length > 0"
                           :product-list="productList">
        </team-tourist-info>
        <!--导游信息-->
        <tour-guide-info ref="tourGuide"
                         :search-params="otherInfo">
        </tour-guide-info>
        <!--司机信息-->
        <driver-info ref="driver"
                     :search-params="otherInfo">
        </driver-info>
        <!--其它信息-->
        <other-info :info-data="otherInfo">
        </other-info>
        <!--账户信息 -->
        <team-pay-account ref="teamPayAccount"
                          :account-info="accountInfo"
                            @pay-order="payOrder">
        </team-pay-account>
        <!--下单失败提示框-->
        <create-order-fail-modal v-model="failModalShow"
                                 :type="createOrderFailType"
                                 :product-list="failCreatedProductList"
                                 :can-remove-product="canRemoveProduct"
                                 @del-failed-product="delCreatedFailProduct">
        </create-order-fail-modal>
    </div>
</template>

<script>
    import lifeCycelMixins from '@/mixins/lifeCycleMixins.js';
    import productInfo from './child/productInfo';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import ajax from '@/api/index.js';
    import otherInfo from './child/otherInfo';
    import teamPayAccount from './child/teamPayAccount';
    import teamTouristInfo from './child/teamTouristInfo';
    import tourGuideInfo from './child/tourGuideInfo';
    import driverInfo from './child/driverInfo';
    import createOrderFailModal from './child/createOrderFailModal';
    import { mapGetters } from 'vuex';

    export default {
        mixins : [lifeCycelMixins],
        components : {
            productInfo,
            breadCrumbHead,
            otherInfo,
            teamPayAccount,
            teamTouristInfo,
            tourGuideInfo,
            driverInfo,
            createOrderFailModal
        },
        data () {
            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'orderFilling', // 订单填写
                        router : {
                            name : 'createOrder'
                        }
                    }
                ],
                //产品列表
                productList : [],
                //下单其它信息
                otherInfo : {
                    saleOrgName : '',
                    orderOrgName : '',
                    saleOrgId : '',
                    orderOrgId : '',
                    scenicOrgId : '',
                    playDate : '',
                },
                //下单可用额度
                validatMoney : 0,
                //下单失败模态框是否显示
                failModalShow : false,
                //不可下单的产品列表
                failCreatedProductList : [],
                //下单失败原因
                createOrderFailType : ''
            };
        },
        methods : {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params && params.productList) {
                    this.productList = params.productList;
                    this.otherInfo = {
                        saleOrgName : params.saleOrgName,
                        orderOrgName : params.orderOrgName,
                        saleOrgId : params.saleOrgId,
                        orderOrgId : params.orderOrgId,
                        scenicOrgId : params.scenicOrgId,
                        playDate : params.playDate,
                    };
                    this.queryLeftMoney();
                } else {
                    this.$router.push({
                        name : 'createOrder'
                    });
                }
            },
            /**
             * 查询下单企业剩余金额
             */
            queryLeftMoney () {
                ajax.post('findByOrgIdAndPeerId',{
                    orgId : this.otherInfo.orderOrgId,
                    peerOrgId : this.otherInfo.saleOrgId
                }).then(res =>{
                    if (res.success) {
                        this.validatMoney = (res.data.accountBalance ? res.data.accountBalance : 0) + (res.data.creditBalance ? res.data.creditBalance : 0);
                    } else {
                        this.validatMoney = 0;
                    }
                });
            },
            /**
             * 确认付款
             * @param payType 付款方式
             */
            payOrder ({ payType }) {
                Promise.all([
                    this.$refs.tourist.getTouristInfo(),
                    this.$refs.tourGuide.getTourGuideInfo(),
                    this.$refs.driver.getDriverInfo(),
                ]).then(([tourist,tourGuide,driver]) => {
                    this.createOrder(payType,[
                        ...tourist,
                        ...tourGuide,
                        ...driver,
                    ]);
                }).catch(err => {
                    if (err === 'touristErr') {
                        this.$Message.warning(this.$t('saveVisitorInfoFirst')); // 请先保存游客信息
                    } else if (err === 'tourguideErr') {
                        this.$Message.warning(this.$t('saveGuiderInfoFirst')); // 请先保存导游信息
                    } else if (err === 'driverErr') {
                        this.$Message.warning(this.$t('saveDriverInfoFirst')); // 请先保存司机信息
                    } else if (err === 'tourguideNumErr') {
                        this.$Message.warning(this.$t('addOneGuiderAtLeast')); // 最少添加一名导游信息
                    }
                });
            },
            /**
             * 下单
             * @param payType
             * @param visitorModels
             */
            createOrder (payType,visitorModels) {
                ajax.post('addTeamOrder',{
                    //产品信息
                    productInfos : JSON.stringify(this.productList.map(item => {
                        return {
                            productId : item.productId,
                            productName : item.productName,
                            policyId : item.policyId,
                            allocationId : item.allocationId,
                            quantity : item.num,
                            price : item.settlePrice,
                            actPrice : item.settlePrice,
                            originVisitDate : this.otherInfo.playDate,
                        };
                    })),
                    //游客，司机，导游信息
                    visitorModels : JSON.stringify(visitorModels),
                    //订单渠道
                    orderChannel : this.orderChannel,
                    //下单企业
                    channelId : this.otherInfo.orderOrgId,
                    //订单金额
                    orderAmount : Number(this.accountInfo.totalPrice).toFixed(2),
                    //发售机构id
                    orgSaleId : this.otherInfo.saleOrgId,
                    //所属景区
                    scenicId : this.otherInfo.scenicOrgId,
                    //付款方式
                    paymentType : payType
                }).then(res => {
                    if (res.success) {
                        this.$router.replace({
                            name : 'successSubmit',
                            params : {
                                type : 'team',
                                orderId : res.data
                            }
                        });
                    } else {
                        if (res.code === 'OD002') {
                            this.getFailedProductInfo(res.data ? res.data : []);
                            this.failModalShow = true;
                            this.createOrderFailType = 'balanceNotEnough';
                        } else if (res.code === 'OD003') {
                            this.getFailedProductInfo(res.data ? res.data : []);
                            this.failModalShow = true;
                            this.createOrderFailType = 'inventoryNotEnough';
                        } else {
                            this.$Message.error(this.$t('orderFailure')); // 下单失败
                        }
                    }
                });
            },
            /**
             * 获取下单失败的产品列表
             * @param data 下单失败的产品id
             */
            getFailedProductInfo (data) {
                this.failCreatedProductList = [];
                for (let i = 0,j = this.productList.length; i < j; i++) {
                    if (data.includes(this.productList[i]['productId'])) {
                        this.failCreatedProductList.push(this.productList[i]);
                    }
                }
            },
            /**
             * 删除下单失败的产品,然后继续下单
             * @param data 需要删除的产品信息
             */
            delCreatedFailProduct (data) {
                for (let i = this.productList.length,j = 0; i >= j; i--) {
                    if (data.includes(this.productList[i]['productId'])) {
                        this.productList.splice(i,1);
                    }
                }
                let payType = this.$refs.teamPayAccount.getPayType();
                this.payOrder({
                    payType
                });
            }
        },
        computed : {
            //账户可用余额，订单总金额
            accountInfo () {
                return {
                    validatMoney : this.validatMoney,
                    totalPrice : this.productList.reduce((price,item) => price += item.settlePrice * item.num,0)
                };
            },
            ...mapGetters({
                manageOrgs : 'manageOrgs'
            }),
            //订单渠道
            orderChannel () {
                if (this.manageOrgs && Object.keys(this.manageOrgs).length > 0) {
                    if (this.manageOrgs.nodeType === "scenic") {
                        return 'scenic';
                    } else if (this.manageOrgs.nodeType === "partner") {
                        return 'tour';
                    } else {
                        return '';
                    }
                } else {
                    return '';
                }
            },
            //账户可用余额，订单总金额
            accountInfo () {
                return {
                    validatMoney : this.validatMoney,
                    totalPrice : this.productList.reduce((price,item) => price += item.settlePrice * item.num,0)
                };
            },
            //是否可以移除产品
            canRemoveProduct () {
                return this.failCreatedProductList.length !== this.productList.length;
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .team-order{
        @include block_outline();
        background: $color_fff;
        overflow: auto;
        @include padding_place();
        border-radius : 4px;
    }
</style>
