<template>
    <!--会员数据概览-->
    <div class="member-data-show">

        <div class="data-header">
            <div class="title">会员数据概览</div>
            <div class="filter">
                <DatePicker type="month" placeholder="请选择" v-model="dataCount.time" style="width: 140px"></DatePicker>
            </div>
        </div>

        <div class="data-content">
            <div class="total">
                <span class="img"></span>
                <span class="total-label">会员总数</span>
                <span>{{dataCount.total}}</span>
            </div>

            <div class="detail">
                <div class="detail-item">
                    <div>{{dataCount.todayAdd}}</div>
                    <div class="detail-label">今日新增</div>
                </div>
                <div class="split-line"></div>
                <div class="detail-item">
                    <div>{{dataCount.yestAdd}}</div>
                    <div class="detail-label">昨日新增</div>
                </div>
                <div class="split-line"></div>
                <div class="detail-item">
                    <div>{{dataCount.monthAdd}}</div>
                    <div class="detail-label">本月新增</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props: ['data-count'],
        components: {},
        data () {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-data-show{
        @include block_outline();
        background: $color_fff;
        border: 1px solid $color_DFE2E5;
        border-radius: 4px;

        .data-header{
            height: 50px;
            line-height: 48px;
            padding: 0 20px;
            border-bottom: 2px solid $color_E1E1E1;
            @include clearfix();

            .title{
                display: inline-block;
                color: $color_353B5E;
                font-size: $font_size_18px;
            }

            .filter{
                display: inline-block;
                float: right;
            }
        }

        .data-content{
            padding: 25px 0;

            .total{
                height: 50px;
                line-height: 50px;
                color: $color_353B5E;
                font-size: $font_size_28px;
                text-align: center;
                margin-bottom: 25px;

                .img{
                    width: 50px;
                    height: 50px;
                    background-color: #F7C002;
                    margin-right: 10px;
                    display: inline-block;
                }
                .total-label{
                    margin-right: 20px;
                    font-size: $font_size_18px;
                }
            }

            .detail{

                .detail-item{
                    display: inline-block;
                    width: 31.5%;
                    color: $color_000_085;
                    font-size: $font_size_28px;
                    text-align: center;
                    @include clearfix();

                    .detail-label{
                        color: $color_999;
                        font-size: $font_size_14px;
                    }
                }
                .split-line{
                    position: relative;
                    top: -10px;
                    display: inline-block;
                    width: 2px;
                    height: 40px;
                    background-color: $color_eee;
                }
            }
        }
    }
</style>
