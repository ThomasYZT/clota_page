<!--各个时间段设备使用情况-->

<template>
    <div class="serve-depart">
        <div class="day-tap">
            <ButtonGroup>
                <Button :class="{'ivu-active-tap' : activeTap === 'today','ivu-default-tap' : activeTap !== 'today'}"
                        @click="choseDay('today')">{{$t('today')}}
                </Button>
                <Button
                    :class="{'ivu-active-tap' : activeTap === 'yesterday','ivu-default-tap' : activeTap !== 'yesterday'}"
                    @click="choseDay('yesterday')">{{$t('yesterday')}}
                </Button>
                <Button
                    :class="{'ivu-active-tap' : activeTap === 'passedSevenDays','ivu-default-tap' : activeTap !== 'passedSevenDays'}"
                    @click="choseDay('passedSevenDays')">{{$t('passedSevenDays')}}
                </Button>
                <Button
                    :class="{'ivu-active-tap' : activeTap === 'passedThirtyDays','ivu-default-tap' : activeTap !== 'passedThirtyDays'}"
                    @click="choseDay('passedThirtyDays')">{{$t('passedThirtyDays')}}
                </Button>
            </ButtonGroup>
        </div>
        <div class="device-detail">
            <div class="chart-circle">
                <annlar :rate="10"></annlar>
                <div class="chart-name">磁盘空间</div>
                <div class="detail">查看</div>
            </div>
            <div class="chart-circle">
                <div class="title-analysis">
                    <span class="log-name">10</span>
                </div>
                <div class="chart-name">磁盘空间</div>
                <div class="detail">查看</div>
            </div>
        </div>
    </div>
</template>

<script>
    import annlar from './annular';

    export default {
        components: {
            annlar
        },
        data() {
            return {
                //当前激活的tap
                activeTap: 'today'
            }
        },
        methods: {
            /**
             * 选择tap
             * @param dayType
             */
            choseDay(dayType) {
                this.activeTap = dayType;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .serve-depart {
        @include block_outline($height: auto);
        background: $color_fff;
        border: 1px solid $color_DFE2E5;
        border-radius: 4px;

        .day-tap {
            @include block_outline($height: 60px);
            border-bottom: 1px solid $color_E8E8E;
            padding: 15px 16px 0 16px;
        }

        .device-detail {
            @include block_outline($height: 278px);

            .chart-circle {
                float: left;
                @include block_outline(50%);

                .chart-name {
                    clear: both;
                    font-size: $font_size_16px;
                    color: $color_353B5E;
                    text-align: center;
                    padding-top: 10px;
                }

                .detail {
                    font-size: $font_size_12px;
                    color: $color_0082D5;
                    text-align: center;
                    margin-top: 5px;
                }

                .title-analysis {
                    position: relative;
                    font-size: $font_size_64px;
                    @include block_outline($height: 195px);

                    .log-name {
                        @include center_center();
                        color: $color_353B5E;
                    }
                }
            }
        }
    }
</style>
