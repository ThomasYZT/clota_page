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
        <product-err-hit-modal v-model="errHintShow" :left-product-info="leftProductInfo">
        </product-err-hit-modal>
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

    export default {
        mixins : [lifeCycelMixins],
        components : {
            breadCrumbHead,
            productInfo,
            touristInfo,
            placeOrderInfo,
            otherInfo,
            accountInfo,
            productErrHitModal
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
                leftProductInfo : []
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
                    this.$refs.placeOrder.getPlaceOrderInfo(),
                ]).then(([placeholder,placeOrder]) =>{
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
                        playDate : this.otherInfo.playDate
                    }).then(res => {
                        if(res.success){
                            this.$router.replace({
                                name : 'successSubmit',
                                params : {
                                    type : 'individual'
                                }
                            });
                        }else{

                        }
                    });
                }).catch(err => {
                    if(err && err.type === 'ticketErr'){
                        this.leftProductInfo = err.data;
                        this.errHintShow = true;
                    }
                });
            },
            /**
             * 查询下单企业剩余金额
             */
            queryLeftMoney() {
                ajax.post('findByOrgIdAndPeerId',{
                    orgId : this.otherInfo.saleOrgId,
                    peerOrgId :this.otherInfo.orderOrgId
                }).then(res =>{
                    if(res.success){
                        this.validatMoney = (res.data.accountBalance ? res.data.accountBalance :0) + (res.data.creditBalance ? res.data.creditBalance : 0);
                    }else{
                        this.validatMoney = 0;
                    }
                });
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
