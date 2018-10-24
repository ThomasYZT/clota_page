<!--
    散客二级订单--游客信息
    作者：杨泽涛
-->
<template>
    <div class="individual-order-base-info">
        <div class="title">游客信息</div>
        <!--下单企业视图-->
        <ul class="order-detail">
            <li class="row">
                <ul class="list">
                    <li class="col">游客姓名：{{visitor.visitorName | contentFilter}}</li>
                    <li class="col">手机号：{{visitor.phoneNumber | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">证件类型：{{cardType | contentFilter}}</li>
                    <li class="col">证件号码：{{cardNum | contentFilter}} </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        props: {
            visitor: {
                type: Object,
                default: {}
            }
        },
        computed: {
            //证件类型
            cardType() {
                if(Object.keys(this.visitor).length > 0 && this.visitor.documentInfo) {
                    console.log(this.visitor)
                    let type = JSON.parse(this.visitor.documentInfo);
                    if(type.length != 0){
                        switch (type[0].type) {
                            case 'identity':
                                return '身份证';
                                break;
                            case 'passport':
                                return '护照';
                                break;
                            case 'driver':
                                return '驾驶证';
                                break;
                            case 'officer':
                                return '军官证';
                                break;
                            case 'police':
                                return '警官证';
                                break;
                            case 'license':
                                return '车牌号';
                                break;
                        }
                    } else {
                        return ''
                    }
                } else {
                    return ''
                }
            },
            //证件号码
            cardNum() {
                if(Object.keys(this.visitor).length > 0 && this.visitor.documentInfo) {
                    let documentInfo = JSON.parse(this.visitor.documentInfo);
                    if(documentInfo.length !== 0){
                        return documentInfo[0].data;
                    }
                }
            }
        },
        components: {},
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .individual-order-base-info{
        border-radius: 2px;
        margin: 10px 0 6px;
        padding: 2px 0 16px 0;
        position: relative;

        .title{
            position: relative;
            padding: 15px 0 0 0;
            @include block_outline($height : 45px);
            font-size: $font_size_16px;
            color: $color_333;

            &::before{
                content : '';
                @include block_outline(absolute,2px);
                @include block_outline(4px,16px);
                background: $color_blue;
                display: inline-block;
                margin-right: 14px;
                vertical-align: middle;
            }
        }

        .order-detail{
            padding-left: 28px;

            .list{
                overflow: auto;

                .col{
                    font-size: $font_size_14px;
                    height: 31px;
                    padding: 6px 0;
                    float: left;
                    width: 310px;
                    color: $color_666;
                    @include overflow_tip();

                    .code{
                        color: $color_yellow;
                    }
                }
            }
        }

        .ivu-btn-108px{
            @include absolute_pos(absolute,20px,24px)
        }

    }
</style>
