<!--
    激活会员卡
    作者：杨泽涛
-->
<template>
    <div class="member-activate">
        <!-- 实体卡卡面号 -->
        <x-input class="c-input"
                 :title="$t('memberCardCode')"
                 keyboard="number"
                 text-align="right"
                 :placeholder="$t('pleaseInput',{field : $t('memberCardCode') })"
                 v-model.trim="activateInfo.faceNum"
                 label-width="150px">
        </x-input>
        <!-- 涂层密码 -->
        <x-input class="c-input"
                 :title="$t('coatingpPassword')"
                 keyboard="number"
                 text-align="right"
                 :placeholder="$t('pleaseInput',{field : $t('coatingpPassword') })"
                 v-model.trim="activateInfo.password"
                 label-width="150px">
        </x-input>

        <!-- 下一步按钮 -->
        <x-button class="button"
                  @click.native="validate()">{{$t('nextStep')}}</x-button>
    </div>
</template>

<script>
    import { validator } from 'klwk-ui';
    import ajax from '../../api/index';
    import lifeCycleMixins from '../../mixins/lifeCycleMixins';

    export default {
        mixins : [lifeCycleMixins],
        components : {},
        data () {
            return {
                activateInfo : {
                    //实体卡卡面号
                    faceNum : '',
                    //涂层密码
                    password : ''
                },
                //微信openid
                openId : '',
            };
        },
        methods : {
            /**
             * 校验输入信息
             */
            validate () {
                //实体卡卡面号不能为空
                if (!validator.isEmpty(this.activateInfo.faceNum)) {
                    //涂层密码不能为空
                    if (!validator.isEmpty(this.activateInfo.password)) {
                        //查询实体卡
                        this.queryEntityCard();
                    } else {
                        this.$vux.toast.text(this.$t('pleaseInput', { field : this.$t('coatingpPassword') }));
                    }
                } else {
                    this.$vux.toast.text(this.$t('pleaseInput', { field : this.$t('memberCardCode') }));
                }
            },
            /**
             * 查询实体卡信息
             */
            queryEntityCard () {
                ajax.post('queryEntityCardByFaceNumAndPassword', this.activateInfo).then(res => {
                    if (res.success) {
                        this.cardInfo = res.data ? res.data : {};
                        this.$router.push({
                            name : 'activateInfo',
                            params : {
                                cardInfo : this.cardInfo,
                                openId : this.openId
                            }
                        });
                    } else {
                        if (res.code === 'M024' || res.code === 'M025' || res.code === 'M026' || res.code === 'M027' || res.code === 'M015') {
                            this.$vux.toast.text(this.$t(res.code));
                        } else {
                            this.$vux.toast.text(this.$t('getCardInfoFailure'));
                        }
                    }
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params && params.openId) {
                    this.openId = params.openId;
                } else {
                    // this.$router.push({
                    //     name : 'login'
                    // });
                }
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    $img_base_url : '../../assets/images/';

    .member-activate {
        padding: 10px;
        color: #4A4A4A;
        background: get_url('icon-bg.png');
        background-size: 100% 100%;
        height: 100%;

        /deep/ .vux-x-input-right-full{
            height: 50px;
        }

        /deep/ .weui-cell__primary{
            padding-right: 10px;
        }

        /deep/ .weui-label{
            font-size: $font_size_15px;
        }

        /deep/ .weui-input{
            font-size: $font_size_15px;
        }
    }
</style>
