<!--会员二维码-->

<template>
    <div class="member-code">
        <div class="code-area">
            <!--一维码-->
            <div class="one-code">
                <barcode
                    ref="barcode"
                    tag="img"
                    :value="payCode ? payCode : '0000000000000000000'"
                    :options="{ displayValue: true }"
                    @click.native="pre1CodeImage">
                </barcode>
            </div>
            <!--二维码-->
            <div class="two-code">
                <qrcode
                    ref="qrCode"
                    v-if="payCode"
                    :value="payCode"
                    type="img"
                    @click.native="showPreImage">
                </qrcode>
                <img class="pre-qr-code"
                     src="../../../assets/images/icon-pre-qrcode.jpg"
                     v-else
                     alt="">
            </div>
        </div>
        <!--账户选择-->
        <div class="account-chose">
            <div class="code-label">
                <div class="account-name">
                    <span class="iconfont icon-checked"></span>
                    {{chosedAccount['accountName']}}
                </div>
                <div class="label">{{$t('payAccountTip')}}</div>
            </div>
            <div class="label-right" @click="showAccountChose">
                <span class="iconfont icon-arrow"></span>
            </div>
        </div>
        <popup v-model="visible"
               v-transfer-dom
               @on-show="popupShow">
            <popup-header
                :left-text="$t('cancel')"
                :right-text="$t('complete')"
                :title="$t('Please select your card')"
                :show-bottom-border="false"
                @on-click-left="visible = false"
                @on-click-right="choseAccount">
                <div slot="title">
                    <div class="popup-title">{{$t('payAccountTipPlease')}}</div>
                    <div class="popup-label">{{$t('priorityPayAccountTip')}}</div>
                </div>
            </popup-header>
            <group gutter="0">
                <radio :options="accountList" v-model="accountPreChosed">
                    <template slot-scope="props" slot="each-item">
                        {{accountList[props.index]['accountName']}}：{{accountList[props.index]['accountBalance'] | moneyFilter}}
                        {{accountList[props.index]['accountDefineId'] === '1' ? $t('yuan') : $t(accountList[props.index]['unit'])}}
                    </template>
                </radio>
            </group>
        </popup>
        <!--预览图片-->
        <div v-transfer-dom
             class="img-preview"
             :class="{'img-pre-rotate' : preRotate}">
            <previewer
                :options="options"
                :list="prevList"
                ref="previewer">
            </previewer>
        </div>
    </div>
</template>

<script>
    import ajax from '@/member/api/index.js';
    import { mapGetters } from 'vuex';
    export default {
        data () {
            return {
                //是否显示账户选择列表
                visible : false,
                //账户列表
                accountList : [],
                //选择账户
                accountChosed : '0',
                //上拉预选择账户
                accountPreChosed : '0',
                //预览图片列表
                prevList : [],
                //预览图片是否旋转
                preRotate : false,
                options : {
                    getThumbBoundsFn : index => {
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                        let thumbnail = null;
                        let rect = null;
                        if (index === 0) {
                            thumbnail = this.$refs.barcode.$el;
                        } else if (index === 1) {
                            thumbnail = this.$refs.qrCode.$el;
                        }
                        rect = thumbnail.getBoundingClientRect();
                        return { x : rect.left, y : rect.top + pageYScroll, w : rect.width };
                    }
                },
                //支付码
                payCode : '',
                //计时器
                timer : null,
            };
        },
        methods : {
            /**
             * 显示账户选择列表
             */
            showAccountChose () {
                this.visible = true;
            },
            /**
             * 确认选择账户
             */
            choseAccount () {
                this.accountChosed = this.accountPreChosed;
                this.visible = false;
                this.getPayRandomCode();
                this.updateCodeInterval();
            },
            /**
             * 账户列表弹出
             */
            popupShow () {
                this.accountPreChosed = this.accountChosed;
            },
            /**
             * 获取会员信息
             */
            getAccountInfo () {
                ajax.post('listCardAccountInfo',{
                    cardId : this.cardInfo.id,
                    memberId : this.userInfo.memberId
                }).then(res => {
                    if (res.success) {
                        this.accountList = res.data ? res.data.filter(item => {
                            if (this.isMutipleAccount) {
                                if (this.cardIsSaling) {//多账户、售卖型
                                    return true;
                                } else {//多账户非售卖型
                                    return item.accountDefineId !== '4';
                                }
                            } else {
                                if (this.cardIsSaling) {//单账户、售卖型
                                    return true;
                                } else {//单账户非售卖型
                                    return item.accountDefineId !== '4';
                                }
                            }
                        }).map((item,index) => {
                            return {
                                ...item,
                                value : String(index),
                                key : String(index),
                            };
                        }) : [];
                        this.getPayRandomCode();
                        this.updateCodeInterval();
                    } else {
                        this.accountList = [];
                    }
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                this.getAccountInfo();
            },
            /**
             * 显示预览二维码
             */
            showPreImage () {
                //todo 实时更新预览未解决
                //暂时去掉
                return;
                this.prevList = [
                    {
                        src : this.$refs.qrCode.imgData,
                        w : 240,
                        h : 240
                    }
                ];
                this.$nextTick(() =>{
                    this.$refs.previewer.show(0);
                });
            },
            /**
             * 显示预览一维码
             */
            pre1CodeImage () {
                //todo 实时更新预览未解决
                //暂时去掉
                return;
                this.preRotate = true;
                this.prevList = [
                    {
                        src : this.$refs.barcode.$el.src,
                        w : 600,
                        h : 240
                    }
                ];
                this.$nextTick(() =>{
                    this.$refs.previewer.show(0);
                });
            },
            /**
             * 定时更新付款二维码
             */
            updateCodeInterval () {
                if (this.timer) {
                    clearInterval(this.timer);
                }
                //每隔1分钟刷新一次二维码
                this.timer = setInterval(() => {
                    this.getPayRandomCode();
                }, 60000);
            },
            /**
             * 获取账户随机支付码
             */
            getPayRandomCode () {
                let chosedAccount = this.accountList[Number(this.accountChosed)] ? this.accountList[Number(this.accountChosed)] : '';
                if (!chosedAccount) {
                    this.$vux.toast.text(this.$t('pleaseSelect', { field : this.$t('account') }));
                    return;
                }
                ajax.post('getPayRandomCode', {
                    //卡id
                    cardId : this.cardInfo.id,
                    //账户类型id
                    accountTypeId : chosedAccount.accountDefineId,
                }, null, false).then(res => {
                    if (res.success) {
                        this.payCode = res.data ? res.data.payCode : '';
                    } else {
                        this.payCode = '0000000000000000000';
                    }
                });
            }
        },
        computed : {
            //选择的账户信息
            chosedAccount () {
                for (let i = 0,j = this.accountList.length; i < j; i++) {
                    if (this.accountList[i].key === this.accountChosed) {
                        return this.accountList[i];
                    }
                }
                return {};
            },
            ...mapGetters({
                userInfo : 'userInfo',
                cardInfo : 'cardInfo',
                memberConfigInfo : 'memberConfigInfo',
            }),
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
        },
        beforeRouteEnter (to,from,next) {
            next(vm => {
                vm.getParams(to.params);
            });
        },
        beforeRouteLeave (to,from,next) {
            clearInterval(this.timer);
            next();
        },
        watch : {
            // 'payCode' (newVal) {
            //     if (newVal) {
            //         this.$nextTick(() => {
            //             this.$set(this.prevList[0],'src',this.$refs.barcode.$el.src);
            //             this.$refs.previewer.goTo(0);
            //             // this.prevList = [
            //             //     {
            //             //         src : this.$refs.barcode.$el.src,
            //             //         w : 600,
            //             //         h : 240
            //             //     }
            //             // ];
            //         });
            //     }
            // }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .member-code{
        @include block_outline();
        background: $color_0073EB;
        padding-top: 26px;

        .code-area{
            @include block_outline(unquote('calc(100% - 38px)'),335px);
            max-width: 600px;
            background: $color_fff;
            margin: 0 auto;
            border-radius: 2.5px;
            padding: 27px 17px;

            .one-code{
                @include block_outline($height : 100px);

                img{
                    @include block_outline();
                }
            }

            .two-code{
                @include block_outline(150px,150px);
                margin: 24px auto 0;

                /deep/ div{
                    @include block_outline();

                    canvas{
                        width: 150px!important;
                        height: 150px!important;
                    }
                }

                /deep/ img{
                    display: block;
                    width: 150px!important;
                    height: 150px!important;
                }

                .pre-qr-code{
                    @include block_outline(150px,150px,false);
                }
            }
        }

        .account-chose{
            @include block_outline(unquote('calc(100% - 38px)'),64px);
            margin : 22px auto 0;
            background: rgba($color_fff,0.05);
            border-radius: 2px;
            padding: 9px 0 9px 20px;

            .code-label{
                float: left;
                @include block_outline(unquote('calc(100% - 56px)'));

                .account-name{
                    @include block_outline($height : 25px);
                    @include overflow_tip();
                    padding: 2px 0;
                    line-height: 25px;
                    font-size: 15px;
                    color: $color_fff;

                    .icon-checked{
                        font-size: $font_size_13px;
                        vertical-align: top;
                        margin-right: 5px;
                    }
                }

                .label{
                    @include block_outline($height : 22px);
                    padding: 2px 0;
                    line-height: 18px;
                    font-size: 12px;
                    color: rgba($color_fff,0.50);
                }
            }

            .label-right{
                float: left;
                @include block_outline(56px);
                text-align: center;
                vertical-align: middle;
                line-height: 46px;
                color: rgba($color_fff,0.70);
            }
        }

        /deep/ .vux-cell-box:not(:first-child):before{
            display: none;
        }

        .popup-title{
            height: 40px;
            font-size: 16px;
            colort:$color_000;
        }

        /deep/ .vux-popup-header-left,
        /deep/ .vux-popup-header-right{
            color: $color_blue;
        }

        /deep/ .weui-cell{
            font-size: $font_size_16px;
            height: 50px;
            color: #353B48;;
            &:before{
                left: 0!important;
            }

        }
    }

    .popup-label{
        @include block_outline($height : auto);
        line-height: 14px;
        color: $color_999;
        font-size: $font_size_10px;
        padding-bottom: 5px;
    }
    .vux-popup-header{
        height: auto;
    }
</style>

<style>
    .img-preview .pswp__bg{
        background: rgba(0,0,0,0.7)!important;
    }

    .img-preview .pswp__img{
        padding: 20px;
        background: #ffffff;
    }
    .img-pre-rotate .pswp__img{
        transform: rotate(90deg);
        padding: 10px;
    }
</style>
