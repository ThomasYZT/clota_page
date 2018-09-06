<template>
    <!--会员详情-->
    <div class="member-info-detail">

        <div class="breadcrumb-box">
            <bread-crumb-head
                :before-router-list="[{name: 'memberInfo', router: 'info'}]"
                :locale-router="'memberDetail'">
            </bread-crumb-head>
        </div>

        <div class="info-detail">

            <div class="content-wrap">

                <div class="content-info">
                    <div class="title">{{$t("memberSelfInfo")}}<span class="edit" @click="modifyInfo"><i class="iconfont icon-edit"></i>{{$t("modify")}}</span></div>
                    <div class="basic-wrap">
                        <div class="person-left">
                            <template v-if="detail.portrait">
                                <img :src="detail.portrait" alt=""/>
                            </template>
                            <template v-else>
                                <img src="@/assets/images/square-avatar.svg" alt=""/>
                            </template>
                        </div>
                        <div class="person-right">
                            <div>
                                <span class="name">{{detail.custName || '-'}}</span>
                                <span>{{ getEnumFieldShow('genderEnum', detail.gender) }}</span>
                                <span>{{ detail.age ? detail.age+($store.state.lang=='en' ? '' : $t('years')) : '-' }}</span>
                            </div>
                            <div class="form-show">
                                <span class="form-item-wrap"><label>{{$t("phoneNum")}}：</label>{{detail.phoneNum || '-'}}</span>
                                <span class="form-item-wrap"><label>{{$t("birthday")}}：</label>
                                    {{detail.birthDay | timeFormat('yyyy-MM-dd')}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-wrap">
                        <div class="form-item-wrap"><label>{{$t("weixin")}}：</label><span v-w-title="detail.wechatAcct">{{detail.wechatAcct || '-'}}</span></div>
                        <div class="form-item-wrap"><label>{{$t("zfb")}}：</label><span v-w-title="detail.alipayAcct">{{detail.alipayAcct || '-'}}</span></div>
                        <div class="form-item-wrap"><label>E-mail：</label><span v-w-title="detail.emailAddr">{{detail.emailAddr || '-'}}</span></div>
                        <div class="form-item-wrap"><label>{{$t("countryCode")}}：</label><span v-w-title="detail.stateCode">{{detail.stateCode || '-'}}</span></div>
                        <div class="form-item-wrap"><label>{{$t("cityCode")}}：</label><span v-w-title="detail.cityCode">{{detail.cityCode || '-'}}</span></div>
                        <div class="form-item-wrap"><label>{{$t("QQ")}}：</label><span v-w-title="detail.qq">{{detail.qq || '-'}}</span></div>
                        <div class="form-item-wrap"><label>{{$t("credentialsType")}}：</label><span v-w-title="detail.certificationTypeName">{{detail.certificationTypeName || '-'}}</span></div>
                        <div class="form-item-wrap"><label>{{$t("identificationNum")}}：</label><span v-w-title="detail.idCardNumber">{{detail.idCardNumber || '-'}}</span></div>
                        <div class="form-item-wrap"><label>{{$t("personalInterests")}}：</label><span v-w-title="detail.hobby">{{detail.hobby || '-'}}</span></div>
                        <div class="form-item-wrap"><label>{{$t("homeAddress")}}：</label><span v-w-title="detail.homeAddr">{{detail.homeAddr || '-'}}</span></div>
                    </div>
                </div>

                <div class="content-info">
                    <div class="title">
                        <span>{{$t("selectCardAttribution")}} </span>
                        <span class="edit" @click="modifyInfo"><i class="iconfont icon-edit"></i>{{$t("modify")}}</span>
                    </div>
                    <div class="form-wrap">
                        <div class="form-item-wrap"><label>{{$t("memberNum")}}：</label><span v-w-title="detail.cardCode">
                            {{detail.cardCode || '-'}}</span></div>
                        <div class="form-item-wrap"><label>{{$t("cardIssuer")}}：</label><span v-w-title="detail.orgName">
                            {{detail.orgName || '-'}}</span></div>
                        <div class="form-item-wrap"><label>{{$t("signChannel")}}：</label><span v-w-title="detail.channelName">
                            {{detail.channelName || '-'}}</span></div>
                        <div class="form-item-wrap"><label>{{$t("memberType")}}：</label><span v-w-title="getEnumFieldShow('vipStatusEnum', detail.memberType)">
                            {{getEnumFieldShow('vipStatusEnum', detail.memberType)}}</span></div>
                        <div class="form-item-wrap"><label>{{$t("levelSetting")}}：</label><span v-w-title="detail.levelDesc">
                            {{detail.levelDesc || '-'}}</span></div>
                        <div class="form-item-wrap"><label>{{$t("password")}}：</label><span>
                            {{detail.passwd || '********'}}</span></div>
                        <div class="form-item-wrap"><label>{{$t("thirdCardFaceNum")}}：</label><span v-w-title="detail.tpCardNo">
                            {{detail.tpCardNo || '-'}}</span></div>
                        <div class="form-item-wrap"><label>{{$t("thirdCardNum")}}：</label><span v-w-title="detail.tpNo">
                            {{detail.tpNo || '-'}}</span></div>
                         <div class="form-item-wrap"><label>{{$t("growth")}}：</label><span v-w-title="growthAccount.accountBalance">
                        {{growthAccount.accountBalance !== null ? growthAccount.accountBalance : '-'}}</span></div>
                    </div>
                </div>

                <div class="content-info" v-for="(item, index) in accountData">
                    <div class="title">
                        {{item.accountDefineId === '1' ? $t("DefaultPrePaidAcc") : item.accountName }}
                        <span>{{$t("information")}}</span>
                        <span v-if="item.accountType === 'charging' && childOrMotherCard.isMotherCard === 'true'"
                              class="add"
                              @click="addAccount">+ {{$t("newAccount")}}</span>
                    </div>
                    <div class="content">
                        <div class="header-wrap" v-if="item.accountType === 'charging'">
                            {{item.accountDefineId === '1' ? $t("DefaultPrePaidAcc") : item.accountName }}
                            <span>{{$t("information")}}</span>
                        </div>
                        <div class="header-wrap" v-if="item.accountType === 'score'">{{$t("integral")}}</div>
                        <div class="body-wrap">
                            <div class="coast">
                                <span>
                                    <template v-if="item.accountType === 'charging'">
                                        <span>{{$t("principal")}}：</span>
                                        <span class="num">{{item.corpusBalance.toCurrency()}}</span>
                                        <span>{{item.unit || ''}}</span>
                                    </template>
                                    <template v-if="item.accountType === 'score'">
                                        <span>{{$t("pointBalance")}}：</span>
                                        <span class="num">{{item.accountBalance}}</span>
                                    </template>
                                </span>
                                <span v-if="item.accountType === 'charging'">
                                    {{$t("giftSum")}}：
                                    <span class="num">{{item.donateBalance.toCurrency()}}</span>
                                    <span v-if="item.accountType === 'charging'">{{item.unit || ''}}</span>
                                </span>
                            </div>
                            <div class="operate-right">
                                <template v-if="item.accountType === 'charging'">
                                    <span @click="viewDeal(item)">{{$t("transactionDetail")}}</span>
                                    <span class="split-line"></span>
                                    <span @click="showAddSaveModal(item)">{{$t("newStorageValue")}}</span>
                                    <span class="split-line"></span>
                                    <span @click="showRangeModal(item)">{{$t("applicationScope")}}</span>
                                    <template v-if="item.exchangeToCash === 'true'">
                                        <span class="split-line"></span>
                                        <span @click="showCashModal(item)">{{$t("cash")}}</span>
                                    </template>
                                </template>
                                <template v-if="item.accountType === 'score'">
                                    <span @click="viewIntegration(item)">{{$t("integralDetail")}}</span>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content-info">
                    <div class="title">{{$t("couponInfo")}}</div><!--优惠券信息-->
                    <more-card type="view"
                               :status="status"
                               :table-data="couponData"
                               @view-more="showCouponModal"
                               @change-status="changeStatus">
                    </more-card>
                </div>

                <!--<div class="content-info">-->
                    <!--<div class="title">{{$t("cardPkgInfo")}}</div>-->
                    <!--<div class="operate"><span class="pointer"  @click="viewCardDetail">{{`${ $t("check") }${ $t("cardPkgInfo") }`}}</span></div>-->
                <!--</div>-->

                <div class="content-info">
                    <div class="title">{{$t("enjoyIntegraAndDiscount")}}</div>
                    <div class="operate"><span class="pointer" @click="viewCardRateDetail">{{`${ $t("check") }${ $t("enjoyIntegraAndDiscount") }`}}</span></div>
                </div>

                <div class="content-info card-temp"
                     v-if=" (childOrMotherCard.isMotherCard === 'true' && childCard.length > 0)
                     || (childOrMotherCard.isMotherCard === 'false' && motherCard.length > 0)">
                    <div class="title">{{$t("childMotherCardInfo")}}</div>
                    <div class="card-wrap" v-if="childOrMotherCard.isMotherCard === 'true' && childCard.length > 0">
                        <table-com
                            :auto-height="true"
                            :table-com-min-height="300"
                            :ofsetHeight="170"
                            :column-data="childTableColumn"
                            :table-data="childCard"
                            :span-method="objectSpanMethod"
                            :border="true">
                            <el-table-column
                                slot="column0"
                                :label="row.title"
                                :prop="row.field"
                                :key="row.index"
                                :width="row.width"
                                :min-width="row.minWidth"
                                slot-scope="row">
                                <template slot-scope="scoped">{{$t("motherCard")}}</template>
                            </el-table-column>
                            <el-table-column
                                slot="column1"
                                :label="row.title"
                                :prop="row.field"
                                :key="row.index"
                                :width="row.width"
                                :min-width="row.minWidth"
                                show-overflow-tooltip
                                slot-scope="row">
                                <template slot-scope="scoped">
                                    <span>{{  scoped.row.custName ? scoped.row.custName+','+scoped.row.cardCode : '-' }}</span>
                                </template>
                            </el-table-column>
                        </table-com>
                    </div>
                    <div class="card-wrap" v-if="childOrMotherCard.isMotherCard === 'false' && motherCard.length > 0">
                        <table-com
                            :auto-height="true"
                            :table-com-min-height="300"
                            :ofsetHeight="170"
                            :column-data="motherTableColumn"
                            :table-data="motherCard"
                            :border="true">
                            <el-table-column
                                slot="column0"
                                :label="row.title"
                                :prop="row.field"
                                :key="row.index"
                                :width="row.width"
                                :min-width="row.minWidth"
                                slot-scope="row">
                                <template slot-scope="scoped">{{$t("childCard")}}</template>
                            </el-table-column>
                            <el-table-column
                                slot="column1"
                                :label="row.title"
                                :prop="row.field"
                                :key="row.index"
                                :width="row.width"
                                :min-width="row.minWidth"
                                show-overflow-tooltip
                                slot-scope="row">
                                <template slot-scope="scoped">
                                    <span>{{ scoped.row.custName ? scoped.row.custName+','+scoped.row.cardCode : '-' }}</span>
                                </template>
                            </el-table-column>
                        </table-com>
                    </div>
                </div>

                <div class="content-info">
                    <div class="title">{{$t("securitySettings")}}</div>
                    <div class="switch-wrap">
                        <i-switch :value="detail.cardStatus ==='active' ? true : false"
                                  @on-change="changeCardStatus"></i-switch>
                        <span class="text">{{$t("freezeMemberCard")}}</span>
                    </div>
                </div>

                <div class="content-info" v-if="setting.allowAdjustAccount && setting.allowAdjustAccount == 'true'">
                    <div class="title">{{$t("modifyStorageAndIntegral")}}</div>
                    <div class="operate">
                        <div><span @click="showAssetModal">{{$t("modifyStorageBalance")}}</span></div>
                        <div><span @click="showScoreModal">{{$t("modifyIntegralBalance")}}</span></div>
                    </div>

                </div>

            </div>

        </div>

        <!--新增账户modal-->
        <add-account-modal ref="addAccount"
                           :store="defineAccount"
                           :detail="detail"
                           @add-success="listCardAccountInfo(detail)">
        </add-account-modal>

        <!--新增储值modal-->
        <add-fund-modal ref="addFund"
                        :payment-list="paymentData"
                        :detail="detail"
                        @add-success="listCardAccountInfo(detail)">
        </add-fund-modal>

        <!--兑现modal-->
        <to-cash-modal ref="toCash"
                       :detail="detail"
                       :store="allFundsAccount"
                       @add-success="listCardAccountInfo(detail)"></to-cash-modal>

        <!--应用范围modal-->
        <use-range-modal ref="useRange"
                         :store="allStore"></use-range-modal>

        <!--优惠券信息--查看更多modal-->
        <view-more-coupon-modal :status="status"
                                :table-data="couponData"
                                ref="viewMoreCoupon">
        </view-more-coupon-modal>

        <!--会员储值账户余额修改modal-->
        <modify-balance-modal ref="modifyBalance"
                              :reason="reasonData"
                              :detail="detail"
                              @add-success="listCardAccountInfo(detail)">
        </modify-balance-modal>

        <!--会员积分账户修改modal-->
        <modify-score-modal ref="modifyScore"
                            :account="scoreData"
                            :reason="reasonData"
                            :detail="detail"
                            @add-success="listCardAccountInfo(detail)">
        </modify-score-modal>

    </div>
</template>

<script>

    import ajax from '@/api/index';
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import addAccountModal from '../components/addAccountModal.vue';
    import addFundModal  from '../../components/addFundModal.vue';
    import toCashModal  from '../components/taCashModal.vue';
    import modifyBalanceModal  from '../components/modifyBalanceModal.vue';
    import modifyScoreModal  from '../components/modifyScoreModal.vue';
    import useRangeModal  from '../components/useRangeModal.vue';
    import viewMoreCouponModal  from '../components/viewMoreCouponModal.vue';
    import moreCard  from '../components/moreCard.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import defaultsDeep from 'lodash/defaultsDeep';
    import { vipStatusEnum, genderEnum } from '@/assets/js/constVariable';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead,
            addAccountModal,
            addFundModal,
            toCashModal,
            modifyBalanceModal,
            modifyScoreModal,
            useRangeModal,
            viewMoreCouponModal,
            moreCard,
            tableCom,
        },
        data () {
            return {
                //会员获取会员信息和会员卡信息
                detail: {},
                //成长值账户信息
                growthAccount: {},
                //枚举数据
                enumData: {
                    //性别
                    genderEnum: genderEnum,
                    //会员类型
                    vipStatusEnum: vipStatusEnum,
                },
                //账户信息列表（本金/积分）
                accountData: [],
                //收款方式数据
                paymentData: [],
                //自定义账户--用于新增账户
                defineAccount: [],
                //优惠券状态 未使用-noUse 未过期-noOverdue 已使用-used  已过期-overdue
                status: 'noUse',
                //优惠券信息列表,包括分页信息
                couponData: [],
                //子母卡信息
                childOrMotherCard: {},
                //子母卡表格数据
                motherCard: [],
                motherTableColumn: [
                    {
                        title: 'currentMemberCardInfo',
                        minWidth: 250,
                        field: ''
                    },
                    {
                        title: 'motherCardInfo',
                        minWidth: 270,
                        field: ''
                    },
                ],
                childCard: [],
                childTableColumn: [
                    {
                        title: 'currentMemberCardInfo',
                        minWidth: 250,
                        field: ''
                    },
                    {
                        title: 'childCardInfo',
                        minWidth: 270,
                        field: ''
                    },
                ],
                //修改原因
                reasonData: [],
                //储值账户信息--用于修改储值余额修改
                charTableData: [],
                //积分账户信息--用于修改积分余额修改
                scoreData: {},
                //应用范围列表
                allStore: [],
                //所有储值账户
                allFundsAccount: [],
                //初始化设置
                setting: {},
            }
        },
        created() {
            //查询自定义账户--用于新增账户
            this.queryDefineAccountType();
            //查询收款方式--用于新增储值
            this.queryPaymentType();
            //查询修改原因--用于会员储值账户余额修改
            this.listAdjustReason();
            //获取储值账户-(本金/赠送金额)应用范围
            this.getSubNode();
            //查询储值账户
            this.queryMemberAccountDefine();
            //查询会员初始化设置
            this.findBasicSet();
        },
        methods: {

            //查询自定义账户
            queryDefineAccountType () {
                ajax.post('queryDefineAccountType', {}).then(res => {
                    if(res.success){
                        this.defineAccount = res.data || [];
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'queryDefineAccountType '+ this.$t('failure') +'！');
                    }
                });
            },

            //查询收款方式
            queryPaymentType () {
                ajax.post('queryPaymentType',{
                    isDeleted: 'false',
                    pageNo: 1,
                    pageSize: 99999,
                }).then(res => {
                    if(res.success){
                        this.paymentData = res.data || [];
                    }
                })
            },

            //查询修改原因
            listAdjustReason () {
                ajax.post('listAdjustReason',{}).then(res => {
                    if(res.success){
                        this.reasonData = res.data || [];
                    }
                })
            },

            //获取储值账户-(本金/赠送金额)应用范围
            getSubNode () {
                ajax.post('getSubNode', {
                    orgType: 'scenic',
                    includeMe: 'true',
                }).then(res => {
                    if( res.success ) {
                        this.allStore = res.data || [];
                    }
                })
            },

            //查询储值账户
            queryMemberAccountDefine () {
                ajax.post('queryMemberAccountDefine',{
                    accountType: 'charging',
                    pageNo: 1,
                    pageSize: 99999,
                }).then(res => {
                    if(res.success){
                        this.allFundsAccount = res.data.data || [];
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'queryMemberAccountDefine '+ this.$t('queryFailure') +'！');
                    }
                })
            },

            //查询会员初始化设置
            findBasicSet () {
                ajax.post('findBasicSet', {}).then(res => {
                    if( res.success){
                        if(res.data){
                            this.setting = res.data || {};
                        } else {
                            this.setting = {};
                        }
                    }
                })
            },

            /**
             * 获取枚举数据展示字段
             * @param name String 枚举字段名
             * @param val String 值
             */
            getEnumFieldShow ( name, val ) {
                var obj = this.enumData[name].find((item) => val === item.name);
                return obj ? this.$t(obj.desc) : '-'
            },

            //显示新增账号弹窗
            addAccount () {
                this.$refs.addAccount.show();
            },
            //根据会员卡获取账户信息
            listCardAccountInfo ( params ) {
                ajax.post('listCardAccountInfo', {
                    cardId: params.cardId,
                    memberId: params.id,
                }).then(res => {
                    if(res.success){
                        this.accountData = res.data || [];
                        this.charTableData = [];
                        this.scoreData = [];
                        //区分账户类型数据
                        res.data.forEach( item => {
                            if(item.accountType === 'charging'){
                                this.charTableData.push(item);
                            }
                            if(item.accountType === 'score'){
                                this.scoreData = item;
                            }
                        });
                        //查询成长值
                        this.getGrowthBalance(params);
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'listCardAccountInfo '+ this.$t('failure') +'！');
                    }
                });
            },
            //点击账号信息，显示该账号信息的应用范围（店铺）
            showRangeModal ( data ) {
                this.$refs.useRange.show( data );
            },

            //获取更多优惠券
            listCouponsByStatus ( params ) {
                ajax.post('listCouponsByStatus', {
                    cardId: params.cardId,
                    memberId: params.id,
                    status: this.status,
                    pageNo: 1,
                    pageSize: 10,
                }).then(res => {
                    if(res.success){
                        this.couponData = res.data || [];
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message ||'listCouponsByStatus '+ this.$t('failure') +'！');
                    }
                });
            },
            //切换优惠券状态查询
            changeStatus ( val ) {
                if(val){
                    this.status = val;
                    this.listCouponsByStatus( this.detail );
                }
            },
            //点击查看更多显示卡劵所有列表弹窗
            showCouponModal () {
                if(this.$refs.viewMoreCoupon){
                    this.$refs.viewMoreCoupon.show();
                }
            },

            //点击新增储值，显示新增储值弹窗
            showAddSaveModal ( data ) {
                this.$refs.addFund.show(data);
            },

            //监听开关组件改变
            changeCardStatus ( bool ){
                if (bool) {
                    this.detail.cardStatus = 'active';
                } else {
                    this.detail.cardStatus = 'frozen';
                }
                this.manualUpdateCardStatus();
            },
            //更新会员卡信息
            manualUpdateCardStatus () {
                ajax.post('manualUpdateCardStatus', {
                    id: this.detail.cardId,
                    status: this.detail.cardStatus,
                }).then(res => {
                    if(res.success){
                        this.$Message.success(this.$t('successTip', {tip: $t('updateMemberInfo')}) + '！');      // 更新会员卡信息成功
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'manualUpdateCardStatus '+ this.$t('failure') +'！');
                    }
                });
            },

            //获取子母卡
            queryChildOrMotherCard ( data ) {
                ajax.post('queryChildOrMotherCard', {
                    cardId: data.cardId,
                }).then(res => {
                    if(res.success){
                        this.childOrMotherCard = res.data || {};
                        //区分子母卡
                        if(res.data.isMotherCard === 'true'){
                            this.childCard = res.data.childCard && res.data.childCard.length > 0 ? res.data.childCard: [];
                        } else {
                            this.motherCard = res.data.motherCard && res.data.motherCard.length > 0 ? res.data.motherCard: [];
                        }
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'queryChildOrMotherCard '+ this.$t('failure') +'！');
                    }
                });
            },
            // 子母卡列合并
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) {
                    if (rowIndex % 2 === 0) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            },

            //兑现
            showCashModal ( data ) {
                this.$refs.toCash.show( data );
            },

            // 修改该会员储值账户余额
            showAssetModal () {
                let _storeList = defaultsDeep([], this.charTableData);
                this.$refs.modifyBalance.show( _storeList );

            },
            //修改该会员积分账户余额
            showScoreModal () {
                this.$refs.modifyScore.show();
            },

            //修改会员信息
            modifyInfo () {
                this.$router.push({ name: 'addMember', query: { type: 'modify' },params : this.detail});
            },

            //储值账户--查看明细
            viewDeal (dealData) {
                this.$router.push({ name: 'infoFund', params: {fundDetail: dealData} });
            },

            //积分账户--查看明细
            viewIntegration  (integraData) {
                this.$router.push({ name: 'infoInteg', params: {integraDetail: integraData} });
            },

            //查看卡包信息
            viewCardDetail () {
                this.$router.push({ name: 'infoCard' });
            },

            //查看享受积分、折扣率信息
            viewCardRateDetail () {
                this.$router.push({ name: 'infoRate' , params: { detail: this.detail} });
            },

            //根据会员id获取会员信息和会员卡信息
            showMemberDetail ( params ) {
                ajax.post('showMemberDetail', {
                    memberId: params.id,
                }).then(res => {
                    if(res.success){
                        this.detail = res.data || {};
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'showMemberDetail '+ this.$t('failure') +'！');
                    }
                });
            },

            //查询成长值
            getGrowthBalance ( params ) {
                ajax.post('getGrowthBalance', {
                    cardId: params.cardId,
                }).then(res => {
                    if(res.success){
                        this.growthAccount = res.data || {};
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'getGrowthBalance '+ this.$t('failure') +'！');
                    }
                });
            },

            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params && Object.keys(params).length > 0){
                    /*for(let item in params){
                        this[item] = params[item];
                    }*/
                    //根据会员卡获取账户信息
                    this.listCardAccountInfo(params.detail);
                    //获取更多优惠券
                    this.listCouponsByStatus(params.detail);
                    //字母卡列合并
                    this.queryChildOrMotherCard(params.detail);
                    //根据会员获取会员信息和会员卡信息
                    this.showMemberDetail(params.detail);
                    //查询成长值
                    this.getGrowthBalance(params.detail);
                }else{
                    this.$router.push({
                        name : 'memberInfo'
                    });
                }
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-info-detail{
        @include block_outline();
        position: relative;
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;

        .breadcrumb-box{
            height: 50px;
            line-height: 50px;
            padding: 0 30px;
            background: $color_F4F6F8;
        }

        .info-detail{

            .content-wrap{
                padding: 25px 50px;

                .content-info{
                    margin-bottom: 30px;

                    .title{
                        font-size: $font_size_16px;
                        color: $color-333;
                        line-height: 24px;
                        @include clearfix();

                        .add{
                            margin-left: 10px;
                            font-size: $font_size_14px;
                            color: $color-blue;
                            cursor: pointer;
                        }

                        .edit{
                            display: none;
                            height: 24px;
                            line-height: 24px;
                            font-size: $font_size_14px;
                            float: right;
                            color: $color-blue;
                            cursor: pointer;
                            .iconfont{
                                margin-right: 5px;
                            }
                        }
                    }

                    &:hover{
                        .edit{
                            display: block;
                        }
                    }

                    .tabs-wrap{
                        margin-top: 15px;
                        margin-bottom: 10px;
                        @include clearfix();

                        .more{
                            font-size: $font_size_14px;
                            float: right;
                            color: $color-blue;
                            cursor: pointer;
                        }
                    }

                    .basic-wrap{
                        width: 100%;
                        height: 70px;
                        margin-top: 15px;
                        @include clearfix();

                        .person-left{
                            float: left;
                            width: 70px;
                            display: inline-block;
                            img{
                                width: 100%;
                                background: #F2F2F2;
                                border-radius: 2px;
                            }
                        }

                        .person-right{
                            float: left;
                            width: calc(100% - 72px);
                            height: 70px;
                            padding: 10px 0 10px 30px;
                            display: inline-block;
                            >div{
                                color: $color_666;
                                span{
                                    font-size: $font_size_16px;
                                    margin-right: 10px;
                                    &.name{
                                        font-size: $font_size_18px;
                                        color: $color_333;
                                        margin-right: 20px;
                                    }
                                }

                                &.form-show{
                                    font-size: $font_size_14px;
                                    margin-top: 5px;
                                    span{
                                        font-size: $font_size_14px;
                                        margin-right: 40px;
                                    }
                                    label{
                                        font-size: $font_size_14px;
                                        color: $color_333;
                                    }
                                }

                            }

                        }
                    }

                    .form-wrap{
                        width: 100%;
                        margin-top: 15px;
                        @include clearfix();

                        .form-item-wrap{
                            width: 30%;
                            float: left;
                            margin-right: 10px;
                            height: 30px;
                            line-height: 30px;
                            font-size: $font_size_14px;
                            color: $color-666;
                            display: flex;
                            >label{
                                color: $color-333;
                            }
                            >span{
                                flex: 1;
                                display: inline-block;
                                vertical-align: middle;
                                @include overflow_tip();
                            }
                        }
                    }

                    &.card-temp{
                        height: 185px;
                        margin-bottom: 0;

                        .card-wrap{
                            margin-top: 15px;
                            display: inline-block;
                        }
                    }

                    .operate{
                        margin-top: 10px;
                        font-size: $font_size_14px;
                        color: $color-blue;
                        span{
                            cursor: pointer;
                        }
                    }

                    .switch-wrap{
                        margin-top: 15px;
                        .text{
                            margin-left: 10px;
                            font-size: $font_size_14px;
                            color: $color-333;
                        }
                    }

                    .content{
                        border: 1px solid $color_E9E9E9;
                        border-radius: 4px 4px 0 0;
                        font-size: $font_size_14px;
                        margin-top: 15px;

                        .header-wrap{
                            background: $color_F5F7FA_050;
                            border-bottom: 1px solid $color_E9E9E9;
                            border-radius: 3px 3px 0 0;
                            height: 40px;
                            line-height: 38px;
                            padding: 0 20px;
                            color: $color_000_085;
                        }

                        .body-wrap{
                            padding: 0 40px 0 60px;
                            height: 60px;
                            line-height: 60px;
                            @include clearfix();

                            .coast{
                                display: inline-block;
                                >span{
                                    margin-right: 30px;
                                }
                            }

                            .num{
                                font-size: $font_size_18px;
                                color: $color-666;
                            }

                            .operate-right{
                                float: right;
                                color: $color-blue;
                                >span{
                                    cursor: pointer;
                                }
                                .split-line{
                                    display: inline-block;
                                    width: 1px;
                                    height: 14px;
                                    background-color: $color-E1E1E1;
                                    margin: 0 10px;
                                    vertical-align: middle;
                                }
                            }

                        }
                    }

                }

            }

            .btn-wrap{
                height: 56px;
                width: 100%;
                line-height: 56px;
                text-align: center;
                background: #FFFFFF;
                box-shadow: 0 -5px 3px 0 rgba(0,0,0,0.03);
            }

        }

        .pointer{
            cursor: pointer;
        }

    }
</style>
