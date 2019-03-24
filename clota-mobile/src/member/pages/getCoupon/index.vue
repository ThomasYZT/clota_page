<!--领取优惠券-->

<template>
    <div class="get-coupon">
        <transition name="fade" mode="out-in">
            <!--卡券不存在或已领完-->
            <div class="no-data" v-if="!canGetCoupon">
                <img class="no-data-img" src="../../../assets/images/icon-coupon-no-exist.png" alt="">
                <span class="coupon-desc">{{$t('couponNoExist')}}</span>
            </div>
            <!--领取-->
            <div class="coupon-inner"  v-else-if="stage === 'notGet'">
                <div class="congratuation">{{$t('congratulation')}}</div>
                <div class="get-coupon-label">{{$t('getACoupon')}}</div>
                <div class="coupon-info">
                    <div class="circle circle-left-top"></div>
                    <div class="circle circle-left-bottom"></div>
                    <div class="circle circle-right-bottom"></div>
                    <div class="circle circle-right-top"></div>
                    <!--折扣券-->
                    <template v-if="couponData.couponType === 'discount_coupon'">
                        <div class="title">
                            {{$t('discountNum',{ num : couponData.nominalValue * 10 })}}
                        </div>
                    </template>
                    <!--代金券-->
                    <template v-else-if="couponData.couponType === 'cash_coupon'">
                        <div class="title">
                            {{$t('couponValueType',{ num : couponData.nominalValue })}}
                        </div>
                        <div class="fu-title">{{$t('cashUseItem',{ num : couponData.conditionLowerLimtation })}}</div>
                    </template>
                    <!--兑换券-->
                    <template v-else-if="couponData.couponType === 'exchange_coupon'">
                        <div class="title">{{$t('exchangeCoupon')}}</div>
                    </template>
                </div>
                <x-input class="member-phone"
                         :placeholder="$t('inputPhoneToGet')"
                         v-model.trim="phone">
                </x-input>
                <x-input class="member-code"
                         v-model.trim="code"
                         :placeholder="$t('pleaseInputValidCode')" >
                    <div slot="right-full-height"
                         class="validate"
                         :class="{'time-counting' : isTiming}"
                         @click="getValidCode">
                        {{$t('getValidCode')}}
                        <countdown
                            v-if="isTiming"
                            v-model="time"
                            :start="isTiming"
                            @on-finish="timeFinish">
                        </countdown>
                    </div>
                </x-input>
                <x-button class="get-btn"
                          :class="{ 'disabled' : !(phone && code) }"
                          @click.native="getCoupon">
                    {{$t('getCoupon')}}
                </x-button>
            </div>
            <!--领取完成-->
            <div class="coupon-get-result" v-else-if="stage === 'getted'">
                <img class="get-suc-img" src="../../../assets/images/icon-getted-coupon.png" alt="">
                <div class="get-suc-title">{{$t('getCardSuccess')}}</div>
                <x-button class="look-btn"
                          @click.native="toMycoupon">
                    {{$t('watchMyCoupons')}}
                </x-button>
                <span class="to-my" @click="toHomePage">{{$t('toHomePage')}}&nbsp;&gt;</span>
            </div>
        </transition>
        <!--未注册会员提示-->
        <confirm v-model="confirmShow"
                 v-transfer-dom
                 :title="$t('notice')"
                 :confirm-text="$t('register')"
                 :cancel-text="$t('cancel')"
                 @on-confirm="onConfirm">
            <p style="text-align:center;">{{ $t('registerLeadTip') }}</p>
        </confirm>
        <!--领取错误提示-->
        <confirm v-model="errTipShow"
                 v-transfer-dom
                 :title="$t('notice')"
                 :confirm-text="$t('confirm')"
                 :show-cancel-button="false"
                 @on-confirm="errTipShow = false">
            <p style="text-align:center;">{{ $t(errTipMsg) }}</p>
        </confirm>
        <!--选择要领取卡券的会员卡-->
        <choose-member-type v-model="showMemberListModal"
                             :member-list="memberList"
                             @choose-type="toGetCouponViaMemberType">
        </choose-member-type>
    </div>
</template>

<script>
    import chooseMemberType from './components/chooseMemberType';
    import ajax from '@/member/api/index.js';
    import { validator } from 'klwk-ui';
    import { mapGetters,mapMutations,mapActions } from 'vuex';

    export default {
        components : {
            chooseMemberType
        },
        data () {
            return {
                //手机号
                phone : '',
                //验证码
                code : '',
                //当前阶段
                stage : 'notGet',
                //提示框是否显示
                confirmShow : false,
                //显示所有的会员卡现在模态框
                showMemberListModal : false,
                //会员卡列表
                memberList : [],
                //是否显示错误信息提示模态框
                errTipShow : false,
                //错误信息
                errTipMsg : '',
                //是否正在计时
                isTiming : false,
                //计时时间
                time : 60,
                //是否有注册权限
                hasRegister : false,
                //注册提示框是否显示
                registerModalShow : false,
                //卡券id
                couponId : '',
                //批次号
                batchId : '',
                //优惠券信息
                couponData : {},
                //卡券信息是否存在
                couponExist : true
            };
        },
        methods : {
            ...mapMutations([
                'updateUserInfo',
                'updateCardInfoList',
                'updateCardInfo',
            ]),
            ...mapActions([
                'getCardListInfo'
            ]),
            /**
             * 获取验证码
             */
            getValidCode () {
                if (!this.isTiming) {
                    this.phoneValidate(this.phone).then(() => {
                        ajax.post('getCode', {
                            phoneNum : this.phone,
                            type : 'member_login',
                            companyCode : this.companyCode
                        }).then((res) => {
                            if (res.success) {
                                this.code = '';
                                this.isTiming = true;
                                this.$vux.toast.show({
                                    text : this.$t('operateSuc',{ msg : this.$t('send') }),
                                    type : 'success'
                                });
                            } else if (res.message && res.message === 'M049') {//手机没注册
                                if (this.hasRegister) {//有成长型会员卡就可以去注册
                                    this.registerModalShow = true;
                                } else {
                                    this.$vux.toast.show({
                                        text : this.$t('mobileNotExist'),
                                        type : 'cancel',
                                    });
                                }
                            } else if (res.message && (res.message === 'M050' || res.message === 'M051')) {
                                this.$vux.toast.show({
                                    text : this.$t(res.message),
                                    type : 'cancel',
                                });
                            } else if (res.code === 'A006') {
                                this.$vux.toast.show({
                                    text : this.$t('errorMsg.A006'),
                                    type : 'cancel',
                                });
                            } else {
                                this.$vux.toast.show({
                                    text : this.$t('operateFail',{ msg : this.$t('send') }),
                                    type : 'cancel'
                                });
                            }
                        });
                    });
                }
            },
            /**
             * 领取优惠券
             */
            getCoupon () {
                // this.stage = 'getted';
                this.login();
            },
            /**
             * 确认注册
             */
            onConfirm () {

            },
            /**
             * 选择的会员
             * @param{String} cardId 会员id
             */
            toGetCouponViaMemberType (cardId) {
                let cardInfo = this.memberList.find(item => item.id = cardId);
                //更新会员卡数据
                this.updateCardInfo(cardInfo);
                this.$store.dispatch('getMemberConfigInfo').then(() => {
                    this.reseiveCoupon(cardId);
                });
            },
            /**
             * 计时完成
             */
            timeFinish () {
                this.isTiming = false;
                this.time = 60;
            },
            /**
             * 校验手机号码是否正确
             * @param{String} value 手机号码
             */
            phoneValidate (value) {
                return new Promise((resolve,reject) => {
                    if (value && validator.isMobile(value)) {
                        resolve();
                    } else {
                        this.$vux.toast.text(this.$t('errFormat',{ field : this.$t('mobile') }));
                        reject();
                    }
                });
            },
            /**
             * 校验是否有成长型会员卡
             */
            checkCardLevelOfGrowth () {
                ajax.post('checkCardLevelOfGrowth', {
                    companyCode : this.companyCode,
                }).then((res) => {
                    if (res.success) {
                        this.hasRegister = !!res.data;
                    } else {
                        this.hasRegister = false;
                    }
                });
            },
            /**
             * 获取路由参数
             * @param{Object} queryParams 路由参数
             */
            getParams (queryParams) {
                if (queryParams && queryParams.companyCode && queryParams.couponId && queryParams.batchId) {
                    this.$store.commit('updateCompanyCode',queryParams.companyCode);
                    this.couponId = queryParams.couponId;
                    this.batchId = queryParams.batchId;
                    this.findCouponById();
                    this.checkCardLevelOfGrowth();
                }
            },
            login () {
                ajax.post('login', {
                    phoneNum : this.phone,
                    code : this.code,
                    companyCode : this.companyCode,
                    openId : ''
                }).then((res) => {
                    if (res.success) {
                        this.dataToLogin(res);
                    } else if (res.code === '300') {
                        this.$vux.toast.text(this.$t('operateFail',{ msg : this.$t('login') }));
                    } else {
                        this.$vux.toast.text(this.$t(res.code));
                    }
                });
            },
            /**
             * 处理登录数据
             * @param{Object} res 返回的用户信息
             */
            dataToLogin (res) {
                //存储token信息
                localStorage.setItem('token', res.data.token);
                //存储本地、vuex用户信息
                this.updateUserInfo(res.data);
                //获取用卡列表信息
                this.getCardList();
            },
            /**
             * 获取会员卡列表
             */
            getCardList () {
                //获取会员卡列表
                this.getCardListInfo().then(([memberCardList]) => {
                    this.memberList = memberCardList.map((item) => {
                        return {
                            ...item,
                            value : item.orgName + '-' + item.levelDesc,
                            key : item.id
                        };
                    });
                    this.showMemberListModal = true;
                }).catch(err => {
                    if (err === 'serviceError') {
                        this.$vux.toast.text(this.$t('companyHasNotMemberService'));
                    } else {
                        this.$vux.toast.text(this.$t('userHasNoCard'));
                    }
                });
            },
            /**
             * 领取优惠券
             * @param{String}cardId 会员卡id
             */
            reseiveCoupon (cardId) {
                ajax.post('reseiveCoupon',{
                    couponId : this.couponId,
                    memberId : this.userInfo.memberId,
                    cardId : cardId,
                    batchId : this.batchId
                }).then(res => {
                    if (res.success) {
                        this.stage = 'getted';
                    } else if (res.code === 'M062' || res.code === 'M063' || res.code === 'M064' || res.code === 'M065') {
                        this.errTipMsg = this.$t(res.code);
                        this.errTipShow = true;
                    } else if (res.code !== '300') {
                        this.$vux.toast.text(this.$t(res.code));
                    } else {
                        this.$vux.toast.show({
                            text : this.$t('getCardFail'),
                            type : 'cancel'
                        });
                    }
                    this.couponWord = '';
                });
            },
            /**
             * 查询卡券信息
             */
            findCouponById () {
                this.couponExist = true;
                ajax.post('findCouponById',{
                    couponId : this.couponId
                }).then(res => {
                    if (res.success && res.data) {
                        this.couponData = res.data;
                    } else {
                        this.couponExist = false;
                    }
                });
            },
            /**
             * 跳转到会员主页
             */
            toHomePage () {
                this.$router.replace({
                    name : 'home'
                });
            },
            /**
             * 跳转到我的卡券页面
             */
            toMycoupon () {
                this.$router.replace({
                    name : 'home',
                    params : {
                        routerName : 'myCoupon'
                    }
                });
            }
        },
        computed : {
            ...mapGetters({
                lang : 'lang',
                userInfo : 'userInfo',
                companyCode : 'companyCode'
            }),
            //可以领取到卡券
            canGetCoupon () {
                return this.couponId && this.companyCode && this.batchId && this.couponExist;
            }
        },
        beforeRouteEnter (to,from,next) {
            next(vm => {
                vm.getParams(to.query);
            });
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .get-coupon {
        @include block_outline();
        opacity: 0.8;
        background-image: linear-gradient(0deg, #FFA52A 0%, #F06E25 49%, #FFE26A 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 550px;

        .coupon-get-result {
            padding: 80px 35px 25px!important;
            text-align: center;

            .get-suc-img{
                width: 100%;
            }

            .get-suc-title{
                height: 35px;
                line-height: 35px;
                margin-top: 22px;
                text-align: center;
                font-size: 25px;
                color: #000000;
            }

            .look-btn{
                margin-top: 74px;
            }

            .to-my {
                display: inline-block;
                font-size: $font_size_12px;
                color: #EF6D48;
                letter-spacing: -0.86px;
                margin-top: 17px;
            }
        }

        .no-data{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            .no-data-img{
                width: 200px;
            }

            .coupon-desc{
                font-size: $font_size_15px;
                color: $color_999;
                margin-top: 20px;
            }
        }

        .coupon-inner,
        .no-data,
        .coupon-get-result{
            width: calc(100% - 35px);
            min-height: 500px;
            background: $color_fff;
            box-shadow: 0 5px 50px 0 rgba(247,102,72,0.50);
            border-radius: 10px;
            padding: 25px 35px;

            .congratuation{
                @include block_outline($height : 42px);
                line-height: 42px;
                color: #4D4D4D;
                font-size: 30px;
                text-align: center;
                margin-bottom: 5px;
            }

            .get-coupon-label{
                font-size: $font_size_15px;
                color: $color_999;
                text-align: center;
                margin-bottom: 25px;
            }

            .coupon-info{
                position: relative;
                @include block_outline($height : 126px);
                background-image: linear-gradient(-180deg, #EF6C47 0%, #EC9052 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                margin-bottom: 30px;

                .circle{
                    width: 30px;
                    height: 30px;
                    background: $color_fff;
                    border-radius: 50%;
                }

                .circle-left-top{
                    @include absolute_pos(absolute,$left : -15px,$top : -15px);
                }
                .circle-left-bottom {
                    @include absolute_pos(absolute,$left : -15px,$bottom : -15px);
                }
                .circle-right-bottom {
                    @include absolute_pos(absolute,$right : -15px,$bottom : -15px);
                }
                .circle-right-top {
                    @include absolute_pos(absolute,$right : -15px,$top : -15px);
                }

                .title {
                    color: $color_fff;
                    font-size: $font_size_24px;
                }

                .fu-title {
                    color: $color_fff;
                    font-size: $font_size_15px;
                    margin-top: 5px;
                }
            }
        }

        .member-phone,
        .member-code{
            background: #FFF7ED;
            border-radius: 4px;
            height: 47.5px;

            &:before{
                display: none;
            }
        }

        .member-code{
            margin-top: 10px;

            .validate{
                height: 47.5px;
                line-height: 47.5px;
                font-size: $font_size_12px;
                color: #EF6D48;
                padding: 0 10px;

                &.time-counting{
                    color: #C5C5C5;
                }
            }
        }

        .get-btn,
        .look-btn{
            @include block_outline($height : 50px);
            font-size: $font_size_20px;
            color: $color_fff;
            margin-top: 40px;
            background-image: linear-gradient(-180deg, #F88D56 0%, #E56746 100%);
            box-shadow: 0 5px 10px 0 rgba(246,93,72,0.50);
            border-radius: 8px;
            transition: all 0.3s;

            &.disabled{
                background: #E1E1E1;
                box-shadow: 0 0 0 0 rgba(246,93,72,0.50);
                transition: all 0.3s;
            }

            &:after{
                display: none;
            }
        }
    }
</style>
