<!--填写订单-->

<template>
    <div class="create-order">
        <div class="order-title">
            <div class="order-info">
                <div class="order-name">{{'珠海长隆主题乐园珠海长隆主题乐园珠海长隆主题乐园珠海长隆主题乐园'}}</div>
                <div class="notice">{{$t('购票须知')}}</div>
            </div>
            <ul class="label-input">
                <li class="label-list">不可退</li>
                <li class="label-list">不可改</li>
            </ul>
        </div>
        <div class="content">
            <group class="group-wrap">
                <cell
                    :title="$t('游玩日期')"
                    class="padding-right"
                    :value="formData.date">
                </cell>
                <cell :title="$t('购买数量')">
                    <inline-x-number style="display:block;" :min="0" ></inline-x-number>
                </cell>
            </group>
            <group class="group-wrap">
                <!-- 游客姓名 -->
                <x-input
                    :title="$t('游客姓名')"
                    text-align="right"
                    :show-clear="false"
                    v-model.trim="formData.date"
                    placeholder-align="right">
                </x-input>
                <!-- 手机号 -->
                <x-input
                    :title="$t('手机号')"
                    text-align="right"
                    :show-clear="false"
                    v-model.trim="formData.date"
                    placeholder-align="right">
                </x-input>
            </group>
        </div>
        <div class="btn-wrap">
            <div class="total-amount">
                {{$t('colonSetting',{ key : $t('总额') })}}<span class="money">{{12 | moneyFilter(2,'￥') | contentFilter}}</span>
            </div>
            <div class="create-btn">{{$t('下单')}}</div>
        </div>
    </div>
</template>

<script>
	export default {
		data () {
			return {
			    formData : {
			        date : ''
                }
            };
		},
		methods : {}
	};
</SCRIPT>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .create-order{
        @include block_outline();
        overflow: hidden;
        background: #f2f3f4;

        .order-title{
            @include block_outline($height : 68px);
            padding: 8px 14px;
            background: $color_fff;

            .order-info{
                @include block_outline($height : 27px);
                padding: 3.5px 0;
                display: flex;
                flex-direction: row;
                line-height: 20px;

                .order-name{
                    flex: 1;
                    @include overflow_tip();
                    padding-right: 10px;
                }

                .notice{
                    font-size: $font_size_12px;
                    color: #0073EB;
                }
            }

            .label-input{
                @include block_outline($height : 25px);
                padding: 2.5px 0;

                .label-list{
                    font-size: $font_size_11px;
                    display: inline-block;
                    border: 1px solid #EB6751;
                    padding: 1px 5px;
                    margin: 0;
                    line-height: 15px;
                    border-radius: 4px;
                    color: #EB6751;
                }
            }
        }

        .content{
            @include block_outline($height : unquote('calc(100% - 112px)'));
            overflow: auto;

            .group-wrap{
                margin-top: 8px;
            }
        }

        .btn-wrap{
            @include absolute_pos(fixed,$bottom : 0);
            @include block_outline($height : 44px);
            border-top: 0.5px solid #E1E1E1;
            background: $color_fff;
            display: flex;
            flex-direction: row;
            padding-left: 14px;
            line-height: 44px;

            .total-amount{
                flex: 1;
                font-size: $font_size_12px;
                color: #303030;

                .money{
                    color: #F17E40;
                }
            }

            .create-btn{
                padding: 0 37px;
                font-size: $font_size_16px;
                text-align: center;
                background: #F17E40;
                color: $color_fff;
            }
        }

        /deep/ .weui-cell{
            height: 50px;
        }
    }
</style>
