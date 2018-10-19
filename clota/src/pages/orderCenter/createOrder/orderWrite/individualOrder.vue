<!--订单填写-->

<template>
    <div class="order-write">
        <bread-crumb-head
            :locale-router="'订单预定'"
            :before-router-list="beforeRouterList">     <!--新增卡券 : 修改卡券信息-->
        </bread-crumb-head>
        <!--产品信息 -->
        <product-info :product-list="productList">
        </product-info>
        <!--游客信息-->
        <tourist-info :product-list="productList"
                      ref="tourist"
                      @reset-tourist-info="getTouristInfo">
        </tourist-info>
        <!--下单人信息-->
        <place-orderInfo ref="placeOrder"
                         :pay-person-list="payPersonList">
        </place-orderInfo>
        <!--其它信息-->
        <other-info :info-data="otherInfo">
        </other-info>
        <!--账户信息 -->
        <account-info :account-info="accountInfo"
                      @pay-order="payOrder">
        </account-info>
        <!--产品没有分配完提示框-->
        <product-err-hit-modal v-model="errHintShow"
                               :left-product-info="leftProductInfo">
        </product-err-hit-modal>

        <!--下单失败提示框-->
        <create-order-fail-modal v-model="failModalShow"
                                 :type="createOrderFailType"
                                 :product-list="failCreatedProductList"
                                 :can-remove-product="canRemoveProduct"
                                 @del-failed-product="delCreatedFailProduct">
        </create-order-fail-modal>
        <!--游客缺少产品信息报错模态框-->
        <tourist-err-modal v-model="touristWithoutProductModalShow"
                           :tourist-without-product="touristWithourProductList">
        </tourist-err-modal>

        <!--添加游客报错提示框-->
        <add-tourist-err-modal v-model="addTouristModalShow"
                               :tourist-err-list="touristErrList">
        </add-tourist-err-modal>
    </div>
</template>

<script>
    import lifeCycelMixins from '@/mixins/lifeCycleMixins.js'
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import productInfo from './child/productInfo';
    import touristInfo from './child/individualTouristInfo.';
    import placeOrderInfo from './child/placeOrderInfo';
    import otherInfo from './child/otherInfo';
    import accountInfo from './child/individualAccountInfo';
    import ajax from '@/api/index.js';
    import {mapGetters} from 'vuex';
    import productErrHitModal from './child/productErrHintModal';
    import createOrderFailModal from './child/createOrderFailModal';
    import touristErrModal from './child/touristErrModal';
    import addTouristErrModal from './child/addTouristErrModal';

    export default {
        mixins : [lifeCycelMixins],
        components : {
            breadCrumbHead,
            productInfo,
            touristInfo,
            placeOrderInfo,
            otherInfo,
            accountInfo,
            productErrHitModal,
            createOrderFailModal,
            touristErrModal,
            addTouristErrModal
        },
        data() {
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: '订单填写',
                        router: {
                            name: 'createOrder'
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
                //游客列表
                touristList : [],
                //错误提示框是否显示
                errHintShow : false,
                //剩余产品信息
                leftProductInfo : [],
                //下单失败模态框是否显示
                failModalShow : false,
                //不可下单的产品列表
                failCreatedProductList : [],
                //游客缺少产品报错模态框是否显示
                touristWithoutProductModalShow : false,
                //缺少产品的游客信息
                touristWithourProductList : [],
                //下单失败类型
                createOrderFailType : '',
                //游客下单不符合销售政策模态框是否显示
                addTouristModalShow :false,
                //下单失败游客信息
                touristErrList : []
            }
        },
        methods: {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params && params.productList){
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
                }else{
                    this.$router.push({
                        name : 'createOrder'
                    });
                }
            },
            /**
             * 获取游客信息
             * @param data
             */
            getTouristInfo (data) {
                this.touristList = data;
            },
            /**
             * 付款
             */
            payOrder () {
                let OrderVisitorProductVos = this.OrderVisitorProductVos;
                Promise.all([
                    this.$refs.tourist.ticketIsAllocated(),
                    this.$refs.tourist.touristHasTicket(),
                    this.$refs.placeOrder.getPlaceOrderInfo(),
                ]).then(([placeholder,hasTicket,placeOrder]) =>{
                    let productSaleVo = this.$refs.tourist.getChcekProducts();
                    OrderVisitorProductVos.push(placeOrder);
                    ajax.post('addIndividualOrder',{
                        //产品信息
                        productInfos : JSON.stringify(this.productList.map(item => {
                            return {
                                productId : item.productId,
                                policyId : item.policyId,
                                allocationId : item.allocationId,
                                quantity : item.num,
                                price : item.settlePrice,
                                actPrice : item.settlePrice,
                            }
                        })),
                        //下单企业
                        channelId : this.otherInfo.orderOrgId,
                        //订单金额
                        orderAmount : this.accountInfo.totalPrice,
                        //发售机构id
                        orgSaleId : this.otherInfo.saleOrgId,
                        //订单渠道
                        orderChannel : this.orderChannel,
                        //所属景区
                        scenicId : this.otherInfo.scenicOrgId,
                        //游客信息以及下单人信息
                        OrderVisitorProductVos :JSON.stringify(OrderVisitorProductVos),
                        //下单日期
                        playDate : this.otherInfo.playDate,
                        //校验产品信息
                        saleRuleVos : JSON.stringify(productSaleVo)
                    }).then(res => {
                        if(res.success){
                            this.$router.replace({
                                name : 'successSubmit',
                                params : {
                                    type : 'individual'
                                }
                            });
                        }else{
                            if(res.code === 'OD002'){//上级分销商余额不足
                                this.getFailedProductInfo(res.data ? res.data :[]);
                                this.failModalShow = true;
                                this.createOrderFailType = 'balanceNotEnough';
                            }else if(res.code === 'OD003'){//产品库存不足
                                this.getFailedProductInfo(res.data ? res.data :[]);
                                this.failModalShow = true;
                                this.createOrderFailType = 'inventoryNotEnough';
                            }else if(res.code === 'OD006'){//不符合下单规则
                                this.addTouristModalShow = true;
                                this.touristErrList = res.data ? res.data : [];
                            }else{
                                this.$Message.error('下单失败');
                            }
                        }
                    });
                }).catch(err => {
                    if(err && err.type === 'ticketErr'){//产品下单失败错误
                        this.leftProductInfo = err.data;
                        this.errHintShow = true;
                    }else if(err && err.type === 'touristInfoErr'){//游客添加产品信息错误
                        this.touristWithoutProductModalShow = true;
                        this.touristWithourProductList = err.data;
                    }
                });
            },
            /**
             * 查询下单企业剩余金额
             */
            queryLeftMoney() {
                ajax.post('findByOrgIdAndPeerId',{
                    orgId : this.otherInfo.orderOrgId,
                    peerOrgId :this.otherInfo.saleOrgId
                }).then(res =>{
                    if(res.success){
                        this.validatMoney = (res.data.accountBalance ? res.data.accountBalance :0) + (res.data.creditBalance ? res.data.creditBalance : 0);
                    }else{
                        this.validatMoney = 0;
                    }
                });
            },
            /**
             * 删除下单失败的产品,然后继续下单
             * @param data 需要删除的产品信息
             */
            delCreatedFailProduct (data) {
                for(let i = this.productList.length - 1,j = 0;i >= j;i--){
                    if(data.includes(this.productList[i]['productId'])){
                        this.productList.splice(i,1);
                    }
                }
                //删除不能下单的产品
                this.$refs.tourist.deleteProduct(data);
            },
            /**
             * 获取下单失败的产品列表
             * @param data 下单失败的产品id
             */
            getFailedProductInfo (data) {
                this.failCreatedProductList = [];
                for(let i = 0,j = this.productList.length;i < j;i++){
                    if(data.includes(this.productList[i]['productId'])){
                        this.failCreatedProductList.push(this.productList[i]);
                    }
                }
            },
        },
        computed : {
            //账户可用余额，订单总金额
            accountInfo () {
                return {
                    validatMoney : this.validatMoney,
                    totalPrice : this.productList.reduce((price,item) => price += item.settlePrice * item.num,0)
                }
            },
            ...mapGetters({
                manageOrgs : 'manageOrgs'
            }),
            //订单渠道
            orderChannel () {
                if(this.manageOrgs && Object.keys(this.manageOrgs).length > 0){
                    if(this.manageOrgs.nodeType === "scenic"){
                        return 'scenic';
                    }else if(this.manageOrgs.nodeType === "partner"){
                        return 'tour';
                    }else{
                        return '';
                    }
                }else{
                    return '';
                }
            },
            //游客以及下单人信息
            OrderVisitorProductVos () {
                return this.touristList.map(item => {
                    return {
                        phoneNumber : item.phone,
                        visitorType : 'visitor',
                        visitorName : item.name,
                        documentInfo : JSON.stringify(item.idTableData.map(docInfo =>{
                            return {
                                data : docInfo.data,
                                type : docInfo.type,
                            }
                        })),
                        productModels : item.productInfo.map(product => {
                            return {
                                documentId : item.idTableData.reduce((key,documentlist) => {
                                    if(product.idType === documentlist['type']){
                                        return documentlist['data'];
                                    }else {
                                        return '';
                                    }
                                },''),
                                documentType : product.idType,
                                originVisitDate : product.playDate,
                                productId : product.productId,
                                productName : product.productName,
                                quantity : product.takeNum,
                            }
                        })
                    }
                });
            },
            //下单人列表
            payPersonList () {
                return this.touristList.map(item => {
                    return {
                        label : item.name,
                        value : item.phone,
                        phone : item.phone,
                        idTableData : item.idTableData
                    }
                });
            },
            //是否可以移除产品
            canRemoveProduct () {
                return this.failCreatedProductList.length !== this.productList.length;
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-write{
        @include block_outline();
        background: $color_fff;
        overflow: auto;
        @include padding_place();
        border-radius : 4px;
    }
</style>
