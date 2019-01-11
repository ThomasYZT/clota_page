<template>
    <!--会员详情-->
    <div class="member-info-detail">

        <div class="breadcrumb-box">
            <bread-crumb-head
                :before-router-list="[{name: 'memberInfo', router: {name  : 'memberInfo'}}]"
                locale-router="memberDetail">
            </bread-crumb-head>
        </div>

        <div class="info-detail">

            <div class="content-wrap">

                <div class="content-info">
                    <div class="title">{{$t("memberSelfInfo")}}
                        <span v-if="canModifyMemberInfo" class="edit" @click="modifyInfo">
                            <i class="iconfont icon-edit"></i>
                            {{$t("modify")}}</span>
                    </div>
                    <div class="basic-wrap">
                        <div class="person-left">
                            <template v-if="memberBaseDetail.portrait">
                                <img :src="memberBaseDetail.portrait" alt=""/>
                            </template>
                            <template v-else>
                                <img src="@/assets/images/square-avatar.svg" alt=""/>
                            </template>
                        </div>
                        <div class="person-right">
                            <div>
                                <span class="name">{{memberBaseDetail.custName || '-'}}</span>
                                <span>{{ getEnumFieldShow('genderEnum', memberBaseDetail.gender) }}</span>
                                <span>{{ memberBaseDetail.age ? memberBaseDetail.age+($store.state.lang === 'en' ? '' : $t('years')) : '-' }}</span>
                            </div>
                            <div class="form-show">
                                <span class="form-item-wrap"><label>{{$t("phoneNum")}}：</label>{{memberBaseDetail.phoneNum || '-'}}</span>
                                <span class="form-item-wrap"><label>{{$t("birthday")}}：</label>
                                    {{memberBaseDetail.birthDay | timeFormat('yyyy-MM-dd')}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-wrap">
                        <!--会员3期暂时去掉-->
                        <!--<div class="form-item-wrap"><label>{{$t("weixin")}}：</label><span v-w-title="memberBaseDetail.wechatAcct">{{memberBaseDetail.wechatAcct || '-'}}</span></div>-->
                        <!--<div class="form-item-wrap"><label>{{$t("zfb")}}：</label><span v-w-title="memberBaseDetail.alipayAcct">{{memberBaseDetail.alipayAcct || '-'}}</span></div>-->
                        <!--<div class="form-item-wrap"><label>E-mail：</label><span v-w-title="memberBaseDetail.emailAddr">{{memberBaseDetail.emailAddr || '-'}}</span></div>-->
                        <!--<div class="form-item-wrap"><label>{{$t("countryCode")}}：</label><span v-w-title="memberBaseDetail.stateCode">{{memberBaseDetail.stateCode || '-'}}</span></div>-->
                        <!--<div class="form-item-wrap"><label>{{$t("cityCode")}}：</label><span v-w-title="memberBaseDetail.cityCode">{{memberBaseDetail.cityCode || '-'}}</span></div>-->
                        <!--<div class="form-item-wrap"><label>{{$t("QQ")}}：</label><span v-w-title="memberBaseDetail.qq">{{memberBaseDetail.qq || '-'}}</span></div>-->
                        <div class="form-item-wrap"><label>{{$t("credentialsType")}}：</label><span v-w-title="memberBaseDetail.certificationTypeName">{{memberBaseDetail.certificationTypeName || '-'}}</span></div>
                        <div class="form-item-wrap"><label>{{$t("identificationNum")}}：</label><span v-w-title="memberBaseDetail.idCardNumber">{{memberBaseDetail.idCardNumber || '-'}}</span></div>
                        <!--<div class="form-item-wrap"><label>{{$t("personalInterests")}}：</label><span v-w-title="memberBaseDetail.hobby">{{memberBaseDetail.hobby || '-'}}</span></div>-->
                        <!--<div class="form-item-wrap"><label>{{$t("homeAddress")}}：</label><span v-w-title="memberBaseDetail.homeAddr">{{memberBaseDetail.homeAddr || '-'}}</span></div>-->
                    </div>
                </div>
                <div class="content-info">
                    <div class="title">
                        <span>{{$t("selectCardAttribution")}} </span>
                        <!--会员3期暂时去掉-->
                        <!--<span class="edit" @click="modifyInfo"><i class="iconfont icon-edit"></i>{{$t("modify")}}</span>-->
                    </div>
                    <!--会员卡切换-->
                    <ButtonGroup class="card-list">
                        <Button v-for="(item,index) in memberCardList"
                                :key="index"
                                :type="choosedCard.id === item.id ? 'primary' : 'ghost'"
                                @click="choseCard(item)">
                            {{item.levelDesc}}{{(item.isMotherCard === 'false' && item.cardTypeId === '1') ? $t('bracketSetting',{ content : $t('viceCard') }) : ''}}
                        </Button>
                    </ButtonGroup>
                    <template v-if="choosedCard && Object.keys(choosedCard).length > 0">
                        <!--会员卡基础信息-->
                        <member-card-base-info :memberDetail="choosedCard"
                                               @fresh-data="choseCard(choosedCard)"
                                               @fresh-card-info="listCardsByMemberId">
                        </member-card-base-info>
                    </template>
                </div>
                <div class="no-data-wrap" v-if="memberCardList.length < 1">
                    <!--无数据组件-->
                    <no-data >
                    </no-data>
                </div>
                <template v-if="choosedCard && Object.keys(choosedCard).length > 0">
                    <template v-if="showMemberRecharge">
                        <div class="info-title">
                            {{$t('storeValueAccountInfo')}}
                            <span class="add-account"
                                  v-if="isMutipleAccount"
                                  @click="addAccount">+ {{$t("newAccount")}}</span>
                        </div>
                        <!--储值账户信息-->
                        <store-account-info v-for="item in charTableData"
                                            :key="item.id"
                                            :charge-info="item">
                            <div class="operate-right">
                                <span @click="viewDeal(item)">{{$t("transactionDetail")}}</span>
                                <template v-if="item.accountDefineId !== '4'">
                                    <span class="split-line"></span>
                                    <span  @click="showAddSaveModal(item)">{{$t("newStorageValue")}}</span>
                                </template>
                                <!--会员3期暂时去掉-->
                                <!--<span class="split-line"></span>-->
                                <!--<span @click="showRangeModal(item)">{{$t("applicationScope")}}</span>-->
                                <template v-if="item.exchangeToCash === 'true'">
                                    <span class="split-line"></span>
                                    <span @click="showCashModal(item)">{{$t("cash")}}</span>
                                </template>
                            </div>
                        </store-account-info>
                    </template>
                    <!--积分账户信息-->
                    <template v-if="choosedCard.cardTypeId !== '1' && showMemberPoint">
                        <div class="info-title">{{$t('integerAccountName')}}</div>
                        <integral-account-info :account-info="scoreData">
                            <div class="operate-right">
                                <span @click="viewIntegration(scoreData)">{{$t("integralDetail")}}</span>
                            </div>
                        </integral-account-info>
                    </template>

                    <!--会员3期暂时去掉-->
                    <!--<div class="content-info">-->
                    <!--<div class="title">{{$t("couponInfo")}}</div>&lt;!&ndash;优惠券信息&ndash;&gt;-->
                    <!--<more-card type="view"-->
                    <!--:status="status"-->
                    <!--:table-data="couponData"-->
                    <!--@view-more="showCouponModal"-->
                    <!--@change-status="changeStatus">-->
                    <!--</more-card>-->
                    <!--</div>-->
                    <!--我的订单-->
                    <div class="content-info">
                        <div class="title">{{$t("myOrder")}}</div>
                        <div class="operate"><span class="pointer"  @click="viewCardDetail('myOrder')">{{$t('checkOrderInfo')}}</span></div>
                    </div>
                    <!--卡包信息-->
                    <!--会员3期暂时去掉-->
                    <!--<div class="content-info">-->
                        <!--<div class="title">{{$t("cardPkgInfo")}}</div>-->
                        <!--<div class="operate"><span class="pointer"  @click="viewCardDetail('infoCard')">{{`${ $t("check") }${ $t("cardPkgInfo") }`}}</span></div>-->
                    <!--</div>-->
                    <!--享受积分、折扣率信息-->
                    <div class="content-info">
                        <div class="title">{{$t("privalige.member-right")}}</div>
                        <div class="operate">
                            <span class="pointer" @click="viewCardRateDetail">{{`${ $t("check") }${ $t("privalige.member-right") }`}}</span>
                        </div>
                    </div>

                    <!--会员3期暂时去掉-->
                    <!--<div class="content-info card-temp"-->
                         <!--v-if=" (childOrMotherCard.isMotherCard === 'true' && childCard.length > 0)-->
                     <!--|| (childOrMotherCard.isMotherCard === 'false' && motherCard.length > 0)">-->
                        <!--<div class="title">{{$t("childMotherCardInfo")}}</div>-->
                        <!--<div class="card-wrap" v-if="childOrMotherCard.isMotherCard === 'true' && childCard.length > 0">-->
                            <!--<table-com-->
                                <!--:auto-height="true"-->
                                <!--:table-com-min-height="300"-->
                                <!--:ofsetHeight="170"-->
                                <!--:column-data="childTableColumn"-->
                                <!--:table-data="childCard"-->
                                <!--:span-method="objectSpanMethod"-->
                                <!--:border="true">-->
                                <!--<el-table-column-->
                                    <!--slot="column0"-->
                                    <!--:label="row.title"-->
                                    <!--:prop="row.field"-->
                                    <!--:key="row.index"-->
                                    <!--:width="row.width"-->
                                    <!--:min-width="row.minWidth"-->
                                    <!--slot-scope="row">-->
                                    <!--<template slot-scope="scoped">{{$t("motherCard")}}</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column-->
                                    <!--slot="column1"-->
                                    <!--:label="row.title"-->
                                    <!--:prop="row.field"-->
                                    <!--:key="row.index"-->
                                    <!--:width="row.width"-->
                                    <!--:min-width="row.minWidth"-->
                                    <!--show-overflow-tooltip-->
                                    <!--slot-scope="row">-->
                                    <!--<template slot-scope="scoped">-->
                                        <!--<span>{{  scoped.row.custName ? scoped.row.custName+','+scoped.row.cardCode : '-' }}</span>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                            <!--</table-com>-->
                        <!--</div>-->
                        <!--&lt;!&ndash;会员3期暂时去掉&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="card-wrap" v-if="childOrMotherCard.isMotherCard === 'false' && motherCard.length > 0">&ndash;&gt;-->
                            <!--&lt;!&ndash;<table-com&ndash;&gt;-->
                                <!--&lt;!&ndash;:auto-height="true"&ndash;&gt;-->
                                <!--&lt;!&ndash;:table-com-min-height="300"&ndash;&gt;-->
                                <!--&lt;!&ndash;:ofsetHeight="170"&ndash;&gt;-->
                                <!--&lt;!&ndash;:column-data="motherTableColumn"&ndash;&gt;-->
                                <!--&lt;!&ndash;:table-data="motherCard"&ndash;&gt;-->
                                <!--&lt;!&ndash;:border="true">&ndash;&gt;-->
                                <!--&lt;!&ndash;<el-table-column&ndash;&gt;-->
                                    <!--&lt;!&ndash;slot="column0"&ndash;&gt;-->
                                    <!--&lt;!&ndash;:label="row.title"&ndash;&gt;-->
                                    <!--&lt;!&ndash;:prop="row.field"&ndash;&gt;-->
                                    <!--&lt;!&ndash;:key="row.index"&ndash;&gt;-->
                                    <!--&lt;!&ndash;:width="row.width"&ndash;&gt;-->
                                    <!--&lt;!&ndash;:min-width="row.minWidth"&ndash;&gt;-->
                                    <!--&lt;!&ndash;slot-scope="row">&ndash;&gt;-->
                                    <!--&lt;!&ndash;<template slot-scope="scoped">{{$t("childCard")}}</template>&ndash;&gt;-->
                                <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
                                <!--&lt;!&ndash;<el-table-column&ndash;&gt;-->
                                    <!--&lt;!&ndash;slot="column1"&ndash;&gt;-->
                                    <!--&lt;!&ndash;:label="row.title"&ndash;&gt;-->
                                    <!--&lt;!&ndash;:prop="row.field"&ndash;&gt;-->
                                    <!--&lt;!&ndash;:key="row.index"&ndash;&gt;-->
                                    <!--&lt;!&ndash;:width="row.width"&ndash;&gt;-->
                                    <!--&lt;!&ndash;:min-width="row.minWidth"&ndash;&gt;-->
                                    <!--&lt;!&ndash;show-overflow-tooltip&ndash;&gt;-->
                                    <!--&lt;!&ndash;slot-scope="row">&ndash;&gt;-->
                                    <!--&lt;!&ndash;<template slot-scope="scoped">&ndash;&gt;-->
                                        <!--&lt;!&ndash;<span>{{ scoped.row.custName ? scoped.row.custName+','+scoped.row.cardCode : '-' }}</span>&ndash;&gt;-->
                                    <!--&lt;!&ndash;</template>&ndash;&gt;-->
                                <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
                            <!--&lt;!&ndash;</table-com>&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--</div>-->
                    <!--安全设置-->
                    <div class="content-info">
                        <div class="title">{{$t("securitySettings")}}</div>
                        <div class="switch-wrap">
                            <i-switch :value="choosedCard.status === 'active' ? false : true"
                                      @on-change="changeCardStatus">
                            </i-switch>
                            <span class="text">{{$t("freezeMemberCard")}}</span>
                        </div>
                    </div>
                    <!--修改储值、积分数值-->
                    <div class="content-info" v-if="setting.allowAdjustRechargeAccount === 'true' || setting.allowAdjustScoreAccount === 'true'">
                        <div class="title" v-if="showMemberRecharge && showMemberPoint">{{$t("modifyStorageAndIntegral")}}</div>
                        <div class="title" v-else-if="showMemberRecharge">{{$t("changStoredValue")}}</div>
                        <div class="title" v-else-if="showMemberPoint">{{$t("changScoreValue")}}</div>
                        <div class="operate">
                            <div><span @click="showAssetModal" v-if="setting.allowAdjustRechargeAccount === 'true' && showMemberRecharge">{{$t("modifyStorageBalance")}}</span></div>
                            <div v-if="choosedCard.cardTypeId !== '1' && setting.allowAdjustScoreAccount === 'true' && showMemberPoint">
                                <span @click="showScoreModal">{{$t("modifyIntegralBalance")}}</span>
                            </div>
                        </div>

                    </div>
                    <!--业主卡副卡/主卡信息 -->
                    <owner-card-vice-card
                        v-if="choosedCard.cardTypeId === '1'"
                        :card-info="choosedCard"
                        @fresh-data="choseCard(choosedCard)">
                    </owner-card-vice-card>
                </template>

            </div>

        </div>

        <!--新增账户modal-->
        <add-account-modal ref="addAccount"
                           :store="defineAccount"
                           :detail="choosedCard"
                           @add-success="listCardAccountInfo(choosedCard)">
        </add-account-modal>

        <!--新增储值modal-->
        <add-fund-modal ref="addFund"
                        :card-info="choosedCard"
                        :payment-list="paymentData"
                        :detail="choosedCard"
                        @add-success="listCardAccountInfo(choosedCard)">
        </add-fund-modal>

        <!--兑现modal-->
        <to-cash-modal ref="toCash"
                       :memberBaseDetail="memberBaseDetail"
                       :detail="choosedCard"
                       :store="allFundsAccount"
                       @add-success="listCardAccountInfo(choosedCard)">
        </to-cash-modal>

        <!--会员3期暂时去掉-->
        <!--应用范围modal-->
        <!--<use-range-modal ref="useRange"-->
                         <!--:store="allStore">-->
        <!--</use-range-modal>-->

        <!--优惠券信息--查看更多modal-->
        <view-more-coupon-modal :status="status"
                                :table-data="couponData"
                                ref="viewMoreCoupon">
        </view-more-coupon-modal>

        <!--会员储值账户余额修改modal-->
        <modify-balance-modal ref="modifyBalance"
                              :card-info="choosedCard"
                              :detail="memberBaseDetail"
                              @add-success="listCardAccountInfo(choosedCard)">
        </modify-balance-modal>

        <!--会员积分账户修改modal-->
        <modify-score-modal ref="modifyScore"
                            :account="scoreData"
                            :card-info="choosedCard"
                            :detail="memberBaseDetail"
                            @add-success="listCardAccountInfo(choosedCard)">
        </modify-score-modal>

        <!--密码确认框-->
        <edit-modal ref="editModal">
            <Form ref="formData" :model="formData">
                <!--请输入登录密码-->
                <FormItem prop="password" :label="$t('inputField', { field : $t('loginPassword') })" :rules="[  {
                            required : true,
                            message : $t('inputField',{ field : $t('password') }),
                            trigger : 'blur'
                        }]">
                    <Input v-model.trim="formData.password" type="password" style="width: 280px"/>
                </FormItem>
            </Form>
        </edit-modal>

    </div>
</template>

<script>

    import ajax from '@/api/index';
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import storeAccountInfo from '../../newCard/components/storeAccountInfo';
    import integralAccountInfo from '../../newCard/components/integralAccountInfo.vue';
    import addAccountModal from '../components/addAccountModal.vue';
    import addFundModal from '../../components/addFundModal.vue';
    import toCashModal from '../components/taCashModal.vue';
    import modifyBalanceModal from '../components/modifyBalanceModal.vue';
    import modifyScoreModal from '../components/modifyScoreModal.vue';
    // 会员3期暂时去掉
    // import useRangeModal from '../components/useRangeModal.vue';
    import viewMoreCouponModal from '../components/viewMoreCouponModal.vue';
    import moreCard from '../components/moreCard.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import defaultsDeep from 'lodash/defaultsDeep';
    import { vipStatusEnum, genderEnum } from '@/assets/js/constVariable';
    import memberCardBaseInfo from '../components/memberCardBaseInfo';
    import noData from '@/components/noDataTip/noData-tip.vue';
    import ownerCardViceCard from '../components/ownerCardViceCard';
    import editModal from '@/components/editModal/index.vue';
    import MD5 from 'crypto-js/md5';
    import { mapGetters } from 'vuex';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            addAccountModal,
            addFundModal,
            toCashModal,
            modifyBalanceModal,
            modifyScoreModal,
            // 会员3期暂时去掉
            // useRangeModal,
            viewMoreCouponModal,
            moreCard,
            tableCom,
            memberCardBaseInfo,
            storeAccountInfo,
            integralAccountInfo,
            noData,
            ownerCardViceCard,
            editModal
        },
        data () {
            return {
                //会员获取会员信息和会员卡信息
                detail : {},
                //成长值账户信息
                growthAccount : {},
                //枚举数据
                enumData : {
                    //性别
                    genderEnum : genderEnum,
                    //会员类型
                    vipStatusEnum : vipStatusEnum,
                },
                //账户信息列表（本金/积分）
                accountData : [],
                //收款方式数据
                paymentData : [],
                //自定义账户--用于新增账户
                defineAccount : [],
                //优惠券状态 未使用-noUse 未过期-noOverdue 已使用-used  已过期-overdue
                status : 'noUse',
                //优惠券信息列表,包括分页信息
                couponData : [],
                //子母卡信息
                // 会员3期暂时去掉
                // childOrMotherCard : {},
                // 会员3期暂时去掉
                //子母卡表格数据
                // motherCard : [],
                // 会员3期暂时去掉
                // motherTableColumn : [
                //     {
                //         title : 'currentMemberCardInfo',
                //         minWidth : 250,
                //         field : ''
                //     },
                //     {
                //         title : 'motherCardInfo',
                //         minWidth : 270,
                //         field : ''
                //     },
                // ],
                childCard : [],
                childTableColumn : [
                    {
                        title : 'currentMemberCardInfo',
                        minWidth : 250,
                        field : ''
                    },
                    {
                        title : 'childCardInfo',
                        minWidth : 270,
                        field : ''
                    },
                ],
                //储值账户信息--用于修改储值余额修改
                charTableData : [],
                //积分账户信息--用于修改积分余额修改
                scoreData : {},
                //应用范围列表
                allStore : [],
                //所有储值账户
                allFundsAccount : [],
                //初始化设置
                setting : {},
                //会员基础详情
                memberBaseDetail : {},
                //会员卡列表
                memberCardList : [],
                //选择的会员卡信息
                choosedCard : {},
                //会员信息
                memberInfo : {},
                //表单数据
                formData : {
                    password : ''
                }
            };
        },
        created () {
            //查询收款方式--用于新增储值
            this.queryPaymentType();
            //获取储值账户-(本金/赠送金额)应用范围
            this.getSubNode();
            //查询储值账户
            // 会员3期暂时去掉
            // this.queryMemberAccountDefine();
            //查询会员初始化设置
            this.findBasicSet();
        },
        computed : {
            ...mapGetters([
                'permissionInfo',
                'memberConfigInfo'
            ]),
            //是否可以修改会员信息
            canModifyMemberInfo () {
                return this.permissionInfo && this.permissionInfo['modifyMembersInfo'] === 'allow';
            },
            //是否是售卖型会员卡
            cardIsSaling () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'sale' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
            //是否是多账户类型
            isMutipleAccount () {
                return this.memberConfigInfo && this.memberConfigInfo['accountPattern'] && this.memberConfigInfo['accountPattern'] === 'multiple';
            },
            //是否可以显示会员积分信息
            showMemberPoint () {
                return this.memberConfigInfo && this.memberConfigInfo['memberPoint'] && this.memberConfigInfo['memberPoint'] === 'true';
            },
            //是否可以显示会员储值账户信息
            showMemberRecharge () {
                return this.memberConfigInfo && this.memberConfigInfo['memberRecharge'] && this.memberConfigInfo['memberRecharge'] === 'true';
            },
        },
        methods : {

            //查询自定义账户
            queryDefineAccountType () {
                ajax.post('queryDefineAccountType', {
                    cardId : this.choosedCard.id
                }).then(res => {
                    if (res.success) {
                        this.defineAccount = res.data || [];
                    } else {
                        this.$Message.warning(res.message || 'queryDefineAccountType ' + this.$t('failure') + '！');
                    }
                });
            },

            //查询收款方式
            queryPaymentType () {
                ajax.post('queryPaymentType',{
                    isDeleted : 'false',
                    pageNo : 1,
                    pageSize : 99999,
                }).then(res => {
                    if (res.success) {
                        this.paymentData = res.data || [];
                    }
                });
            },

            //获取储值账户-(本金/赠送金额)应用范围
            getSubNode () {
                ajax.post('getSubNode', {
                    orgType : 'scenic',
                    includeMe : 'true',
                }).then(res => {
                    if ( res.success ) {
                        this.allStore = res.data || [];
                    }
                });
            },

            //查询储值账户
            queryMemberAccountDefine () {
                ajax.post('queryMemberAccountDefine',{
                    accountType : 'charging',
                    pageNo : 1,
                    pageSize : 99999,
                }).then(res => {
                    if (res.success) {
                        this.allFundsAccount = res.data.data || [];
                    } else {
                        this.$Message.warning(res.message || 'queryMemberAccountDefine ' + this.$t('queryFailure') + '！');
                    }
                });
            },

            //查询会员初始化设置
            findBasicSet () {
                ajax.post('findBasicSet', {}).then(res => {
                    if ( res.success) {
                        if (res.data) {
                            this.setting = res.data || {};
                        } else {
                            this.setting = {};
                        }
                    }
                });
            },

            /**
             * 获取枚举数据展示字段
             * @param name String 枚举字段名
             * @param val String 值
             */
            getEnumFieldShow ( name, val ) {
                let obj = this.enumData[name].find((item) => val === item.name);
                return obj ? this.$t(obj.desc) : '-';
            },

            //显示新增账号弹窗
            addAccount () {
                this.$refs.addAccount.show();
            },
            //根据会员卡获取账户信息
            listCardAccountInfo ( params ) {
                if (!params.id) return;
                ajax.post('listCardAccountInfo', {
                    cardId : params.id,
                    memberId : this.memberInfo.id
                }).then(res => {
                    if (res.success) {
                        this.accountData = res.data || [];
                        this.charTableData = [];
                        this.scoreData = {};
                        //区分账户类型数据
                        this.accountData.forEach( item => {
                            if (item.accountType === 'charging') {
                                //如果是多账户只展示默认账户信息，如果不是展示所有账户信息
                                if (this.isMutipleAccount) {
                                    //开卡账户只在售卖型会员卡类型下才可以显示
                                    if (item.accountDefineId === '4') {
                                        if (this.cardIsSaling) {
                                            this.charTableData.push(item);
                                        }
                                    } else {
                                        this.charTableData.push(item);
                                    }
                                } else {
                                    //开卡账户只在售卖型会员卡类型下才可以显示
                                    if (item.accountDefineId === '4') {
                                        if (this.cardIsSaling) {
                                            this.charTableData.push(item);
                                        }
                                    } else if (item.accountDefineId === '1') {
                                        this.charTableData.push(item);
                                    }
                                }
                            }
                            if (item.accountType === 'score') {
                                this.scoreData = item;
                            }
                        });
                        // 会员3期暂时去掉
                        //查询成长值
                        // this.getGrowthBalance(params);
                        this.queryDefineAccountType();
                    } else {
                        this.accountData = [];
                        this.charTableData = [];
                        this.scoreData = {};
                    }
                });
            },
            //点击账号信息，显示该账号信息的应用范围（店铺）
            // showRangeModal ( data ) {
            //     this.$refs.useRange.show( data );
            // },

            //获取更多优惠券
            listCouponsByStatus ( params ) {
                ajax.post('listCouponsByStatus', {
                    cardId : params.cardId,
                    memberId : params.id,
                    status : this.status,
                    pageNo : 1,
                    pageSize : 10,
                }).then(res => {
                    if (res.success) {
                        this.couponData = res.data || [];
                    } else {
                        this.$Message.warning(res.message || 'listCouponsByStatus ' + this.$t('failure') + '！');
                    }
                });
            },
            // 会员3期暂时去掉
            // //切换优惠券状态查询
            // changeStatus ( val ) {
            //     if (val) {
            //         this.status = val;
            //         this.listCouponsByStatus( this.memberBaseDetail );
            //     }
            // },
            //点击查看更多显示卡劵所有列表弹窗
            showCouponModal () {
                if (this.$refs.viewMoreCoupon) {
                    this.$refs.viewMoreCoupon.show();
                }
            },

            //点击新增储值，显示新增储值弹窗
            showAddSaveModal ( data ) {
                this.$refs.addFund.show(data);
            },

            //监听开关组件改变
            changeCardStatus ( bool ) {
                if (bool) {
                    this.manualUpdateCardStatus('frozen');
                } else {
                    this.manualUpdateCardStatus('active');
                }
            },
            //更新会员卡信息
            manualUpdateCardStatus ( status ) {
                ajax.post('manualUpdateCardStatus', {
                    id : this.choosedCard.id,
                    status : status,
                }).then(res => {
                    if (res.success) {
                        this.choseCard(this.choosedCard);
                        this.$Message.success(this.$t('successTip', { tip : this.$t('updateMemberInfo') })); // 更新会员卡信息成功
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('updateMemberInfo') })); // 更新会员卡信息失败
                    }
                });
            },

            // 会员3期暂时去掉
            //获取子母卡
            // queryChildOrMotherCard ( data ) {
            //     ajax.post('queryChildOrMotherCard', {
            //         cardId : data.cardId,
            //     }).then(res => {
            //         if (res.success) {
            //             this.childOrMotherCard = res.data || {};
            //             //区分子母卡
            //             if (res.data.isMotherCard === 'true') {
            //                 this.childCard = res.data.childCard && res.data.childCard.length > 0 ? res.data.childCard : [];
            //             } else {
            //                 this.motherCard = res.data.motherCard && res.data.motherCard.length > 0 ? res.data.motherCard : [];
            //             }
            //         } else {
            //             this.$Message.warning(res.message || 'queryChildOrMotherCard ' + this.$t('failure') + '！');
            //         }
            //     });
            // },
            // 子母卡列合并
            objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) {
                    if (rowIndex % 2 === 0) {
                        return {
                            rowspan : 2,
                            colspan : 1
                        };
                    } else {
                        return {
                            rowspan : 0,
                            colspan : 0
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
                this.validatePassword().then(() => {
                    let _storeList = defaultsDeep([], this.charTableData);
                    this.$refs.modifyBalance.show( _storeList );
                });
            },
            //修改该会员积分账户余额
            showScoreModal () {
                this.validatePassword().then(() => {
                    this.$refs.modifyScore.show();
                });
            },

            //修改会员信息
            modifyInfo () {
                if (!this.canModifyMemberInfo) return;
                this.$router.push({
                    name : 'addMember',
                    query : {
                        type : 'modify'
                    },
                    params : this.memberBaseDetail
                });
            },

            //储值账户--查看明细
            viewDeal (dealData) {
                this.$router.push({
                    name : 'infoFund',
                    params : {
                        fundDetail : dealData
                    }
                });
            },

            //积分账户--查看明细
            viewIntegration  (integraData) {
                this.$router.push({
                    name : 'infoInteg',
                    params : {
                        integraDetail : integraData
                    }
                });
            },

            //查看卡包信息、我的订单
            viewCardDetail (routerName) {
                this.$router.push({
                    name : routerName,
                    params : {
                        cardPkg : this.choosedCard
                    }
                });
            },

            //查看享受积分、折扣率信息
            viewCardRateDetail () {
                this.$router.push({
                    name : 'infoRate' ,
                    params : {
                        detail : this.choosedCard
                    }
                });
            },

            //根据会员id获取会员信息和会员卡信息
            showMemberDetail ( ) {
                ajax.post('showMemberDetail', {
                    memberId : this.memberInfo.id,
                }).then(res => {
                    if (res.success) {
                        this.memberBaseDetail = res.data || {};
                    } else {
                        this.memberBaseDetail = {};
                    }
                });
            },

            //查询成长值
            getGrowthBalance ( params ) {
                ajax.post('getGrowthBalance', {
                    cardId : params.cardId,
                }).then(res => {
                    if (res.success) {
                        this.growthAccount = res.data || {};
                    } else {
                        this.$Message.warning(res.message || 'getGrowthBalance ' + this.$t('failure') + '！');
                    }
                });
            },

            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    this.memberInfo = params.detail;
                    //根据会员卡获取账户信息
                    // 会员3期暂时去掉
                    // this.listCardAccountInfo(params.detail);
                    //获取更多优惠券
                    this.listCouponsByStatus(params.detail);
                    // 会员3期暂时去掉
                    //字母卡列合并
                    // this.queryChildOrMotherCard(params.detail);
                    //根据会员获取会员信息和会员卡信息
                    this.showMemberDetail();
                    //查询成长值
                    // 会员3期暂时去掉
                    // this.getGrowthBalance(params.detail);
                    //查询会员卡信息
                    this.listCardsByMemberId();
                    //查询自定义账户--用于新增账户
                    // this.queryDefineAccountType();
                } else {
                    this.$router.push({
                        name : 'memberInfo'
                    });
                }
            },
            /**
             * 查询会员卡信息
             */
            listCardsByMemberId () {
                ajax.post('listCardsByMemberId',{
                    memberId : this.memberInfo.id
                }).then(res => {
                    if (res.success) {
                        this.memberCardList = res.data ? res.data : [];
                        //默认给选择的会员第一个会员卡信息
                        if (this.memberCardList.length > 0) {
                            this.choosedCard = {
                                ...this.memberCardList[0],
                                custName : this.memberBaseDetail.custName
                            };
                        }
                        //如果从列表进入，需要指定查看会员下的哪个会员卡
                        for (let i = 0,j = this.memberCardList.length; i < j; i++) {
                            if (this.memberCardList[i]['id'] === this.memberInfo.cardId) {
                                this.choosedCard = {
                                    ...this.memberCardList[i],
                                    custName : this.memberBaseDetail.custName
                                };
                            }
                        }
                        //查询会员卡下的账户信息
                        this.listCardAccountInfo(this.choosedCard);
                    } else {
                        this.memberCardList = [];
                    }
                });
            },

            /**
             * 选择会员卡
             * @param{Object} item 会员卡信息
             */
            choseCard (item) {
                this.choosedCard = Object.assign({
                    ...item,
                },{
                    custName : this.memberBaseDetail.custName
                });
                //查询会员卡下的账户信息
                this.listCardAccountInfo(this.choosedCard);
                this.queryDefineAccountType();
            },
            /**
             * 校验登录密码
             * @return {Promise<any>}
             */
            validatePassword () {
                return new Promise((resolve,reject) => {
                    this.$refs.editModal.show({
                        title : this.$t('inputField', { field : this.$t('loginPassword')}),
                        confirmCallback : () => {
                            this.$refs.formData.validate(valid => {
                                if (valid) {
                                    ajax.post('secondLogin',{
                                        password : MD5(this.formData.password).toString()
                                    }).then(res => {
                                        if (res.success) {
                                            if (res.data) {
                                                resolve();
                                            } else {
                                                this.$Message.error(this.$t('sthErr', { field : this.$t('loginPassword') }));
                                            }
                                        }
                                        reject();
                                    }).catch(() => {
                                        reject();
                                    }).finally(() => {
                                        this.$refs.editModal.hide();
                                    });
                                    this.$refs.formData.resetFields();
                                } else {
                                    reject();
                                }
                            });
                        },
                        cancelCallback : () => {
                            this.$refs.formData.resetFields();
                        }
                    });
                });
            }

        }
    };
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
            background: $color_F4F6F8;
        }

        .info-detail{

            .content-wrap{
                padding: 25px 50px;

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

                .content-info{
                    margin-bottom: 30px;

                    .card-list{
                        margin-top: 10px;
                    }

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

        .info-title{
            text-align: left;
            font-size: $font_size_16px;
            color: $color_000;
            padding: 0 0 20px 0;

            .add-account{
                color: $color_blue;
                vertical-align: baseline;
                padding-left: 10px;
                display: inline-block;
                cursor: pointer;
            }
        }
        .no-data-wrap{
            @include block_outline(100%,200px);
            position: relative;
        }
    }
</style>
