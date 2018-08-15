<!--操作日志-->

<template>
    <div class="operate-log">
        <div class="info-title">
            <span class="label">{{$t('操作日志')}}</span>
            <span class="back-up"
                @click="isPackUpLoad = !isPackUpLoad">
                {{$t(isPackUpLoad ? 'backUp' : 'upLoad')}}
                <span class="iconfont icon-pull-down" :class="{'icon-reverse' : isPackUpLoad}"></span>
            </span>
        </div>
        <transition name="fade">
            <Timeline v-if="isPackUpLoad">
                <TimelineItem :color="item.color"
                              v-for="(item,i) in operateLog"
                              :key="i">
                    <span class="log">{{item.label}}</span>
                    <span class="time">{{item.time}}</span>
                </TimelineItem>
            </Timeline>
        </transition>
    </div>
</template>

<script>
    export default {
        props : {

        },
        data() {
            return {
                //操作日志
                operateLog : [
                    {
                        label : '退票审核通过',
                        time : '2015-09-07 08：45',
                        color : 'blue'
                    },
                    {
                        label : '游客发起退票申请',
                        time : '2015-09-07 08：45',
                        color : 'blue'
                    },
                    {
                        label : '核销状态同步至OTA失败',
                        time : '2015-09-07 08：45',
                        color : 'red'
                    },
                    {
                        label : '退票审核通过',
                        time : '2015-09-07 08：45',
                        color : 'red'
                    }
                ],
                //是否展开
                isPackUpLoad : true
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .operate-log{

        .info-title{
            @include block_outline($height : 79px);
            padding-top: 24px;
            padding-bottom: 30px;
            line-height: 25px;
            font-size: $font_size_16px;
            color: $color_333;

            .label {
                display: inline-block;
                font-size: $font_size_16px;
                color: $color_333;
                line-height: 24px;
                vertical-align: middle;
            }

            .back-up {
                font-size: $font_size_14px;
                color: $color_blue;
                display: inline-block;
                margin-left: 10px;
                vertical-align: middle;
                cursor: pointer;
            }
        }

        /*/deep/ .ivu-timeline-item-tail{*/
            /*left : 151px;*/
            /*top : 3px;*/
        /*}*/

        /deep/ .ivu-timeline-item{
            padding-left: 145px;
        }

        .time{
            @include absolute_pos(absolute ,$left : -145px);
        }

        .log,
        .time{
            font-size: $font_size_14px;
            color: $color_606266;
        }

        /deep/ .ivu-timeline-item-head{
            margin-top: 3px;
        }

        /deep/ .ivu-timeline-item-head-red + .ivu-timeline-item-content .log,
        /deep/ .ivu-timeline-item-head-red + .ivu-timeline-item-content .time{
            color: $color_err
        }

        .back-up {
            font-size: $font_size_14px;
            color: $color_blue;
            display: inline-block;
            margin-left: 10px;
            vertical-align: middle;
            cursor: pointer;

            .icon-pull-down{
                display: inline-block;
                transition: all 0.5s;

                &::before{
                    color: $color_blue;
                    font-size: 12px;
                }

                &.icon-reverse{
                    transform: rotate(180deg);
                    transition: all 0.5s;
                }

            }
        }
    }
</style>
