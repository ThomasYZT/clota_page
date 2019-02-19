<!--
    配额调配器
    作者：杨泽涛
-->
<template>
    <div class="quota-controller">
        <div class="board-wrapper">
            <div class="title">
                <span>{{$t('调出配额')}}</span>
            </div>
            <div class="board">
                <span class="label-title">{{$t('指定日期')}}</span>
                <DatePicker v-model="time1"
                            format="yyyy-MM-dd"
                            type="daterange"
                            :clearable="false"
                            :editable="false"
                            transfer
                            :placeholder="$t('selectField', { msg : $t('date') })"
                            placement="bottom-end"
                            style="width: 280px;margin-right: 10px;">
                </DatePicker>
                <span class="label-title equal-width">{{$t('调出至共享配额')}}</span>
                <Input v-model="value1" placeholder="Enter something..." style="width: 280px;margin-right: 10px;"></Input>
                <Button class="ivu-btn-108px" type="primary" @click="tuneOut">{{$t('确认调出')}}</Button>
            </div>
        </div>
        <div class="board-wrapper">
            <div class="title">
                <span>{{$t('调入配额')}}</span>
            </div>
            <div class="board">
                <span class="label-title">{{$t('指定日期')}}</span>
                <DatePicker v-model="time2"
                            format="yyyy-MM-dd"
                            type="daterange"
                            :clearable="false"
                            :editable="false"
                            transfer
                            :placeholder="$t('selectField', { msg : $t('date') })"
                            placement="bottom-end"
                            style="width: 280px;margin-right: 10px;">
                </DatePicker>
                <span class="label-title equal-width">{{$t('从共享配额调入本渠道')}}</span>
                <Input v-model="value2" placeholder="Enter something..." style="width: 280px;margin-right: 10px;"></Input>
                <Button class="ivu-btn-108px" type="primary" @click="tuneIn">{{$t('确认调入')}}</Button>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        components : {},
        data () {
            return {
                time1 : [],
                time2 : [],
                value1 : '',
                value2 : '',
            };
        },
        methods : {
            /**
             *  调出
             */
            tuneOut () {

            },
            /**
             * 调入
             */
            tuneIn () {

            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .quota-controller {
        .board-wrapper {
            margin-bottom: 10px;
            .title {
                margin-bottom: 10px;
                line-height: 21px;
                span {
                    font-size: 16px;
                    color: #333333;
                    letter-spacing: 1.14px;
                }
            }
            .board {
                .label-title {
                    margin-right: 10px;
                    font-size: 14px;
                    color: #585858;

                    &.equal-width {

                    }
                }
            }
        }
    }
</style>
