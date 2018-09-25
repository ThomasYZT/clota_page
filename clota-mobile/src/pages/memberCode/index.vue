<!--会员二维码-->

<template>
    <div class="member-code">
        <div class="code-area">
            <!--一维码-->
            <div class="one-code">

            </div>
            <!--二维码-->
            <div class="two-code">
                <qrcode
                    :value="chosedAccount['accountName']"
                    type="canvas">
                </qrcode>
            </div>
        </div>
        <!--账户选择-->
        <div class="account-chose">
            <div class="code-label">
                <div class="account-name">
                    <span class="iconfont icon-checked"></span>
                    {{chosedAccount['accountName']}}
                </div>
                <div class="label">优先使用默认账户支付</div>
            </div>
            <div class="label-right" @click="showAccountChose">
                <span class="iconfont icon-arrow"></span>
            </div>
        </div>
        <popup v-model="visible"
               v-transfer-dom
               @on-show="popupShow">
            <popup-header
                :left-text="$t('取消')"
                :right-text="$t('完成')"
                :title="$t('Please select your card')"
                :show-bottom-border="false"
                @on-click-left="visible = false"
                @on-click-right="choseAccount">
                <div slot="title">
                    <div class="popup-title">请选择优先支付方式</div>
                    <div class="popup-label">优先使用所选账户付款，如付款失败将尝试使用其<br>他账户进行支付完成付款</div>
                </div>
            </popup-header>
            <group gutter="0">
                <radio :options="menuList" v-model="accountPreChosed">
                    <template slot-scope="props" slot="each-item">
                        {{menuList[props.index]['accountName']}}：{{menuList[props.index]['money'] | moneyFilter}}
                    </template>
                </radio>
            </group>
        </popup>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //是否显示账户选择列表
                visible : false,
                //账户列表
                menuList : [
                    {
                        value : '1',
                        accountName : '默认账户',
                        money : '4323.92',
                        key : '1',
                    },
                    {
                        value : '2',
                        accountName : '海友酒店账户',
                        money : '4323.92',
                        key :  '2',
                    }
                ],
                //选择账户
                accountChosed : '1',
                //上拉预选择账户
                accountPreChosed : ''
            }
        },
        methods: {
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
            },
            /**
             * 账户列表弹出
             */
            popupShow () {
                this.accountPreChosed = this.accountChosed;
            }
        },
        computed : {
            //选择的账户信息
            chosedAccount (){
                for(let i = 0,j = this.menuList.length;i < j;i++){
                    if(this.menuList[i].key === this.accountChosed){
                        return this.menuList[i];
                    }
                }
                return {};
            }
        }
    }
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
                background: red;
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

        .popup-label{
            @include block_outline($height : 32px);
            line-height: 14px;
            color: $color_999;
            font-size: $font_size_10px;
        }

        /deep/ .vux-popup-header-left,
        /deep/ .vux-popup-header-right{
            color: $color_blue;
        }

        /deep/ .vux-popup-header{
            @include block_outline($height : 72px);
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
</style>
