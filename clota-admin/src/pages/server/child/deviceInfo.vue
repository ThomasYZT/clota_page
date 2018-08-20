<!--设备信息-->

<template>
    <div class="device-info">
        <bread-crumb-head
            :locale-router="$t('deviceInfo')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="device-detail">
            <div class="device-name">
                {{$t('serverListMsg',{msg : serverDetail.serverName})}}
            </div>
            <div class="de-li">
                <ul class="detail-list">
                    <li class="arg-list">
                        <span class="key">{{$t('deviceName')}}：</span>
                        <span class="val">{{serverDetail.serverName}}</span>
                    </li>
                    <li class="arg-list">
                        <span class="key">{{$t('system')}}：</span>
                        <span class="val">{{serverDetail.opSystme}}</span>
                    </li>
                    <li class="arg-list">
                        <span class="key">{{$t('systemDesc')}}：</span>
                        <span class="val">{{serverDetail.description}}</span>
                    </li>
                </ul>
                <ul class="detail-list">
                    <li class="arg-list">
                        <span class="key">{{$t('ipAddress')}}：</span>
                        <span class="val">{{serverDetail.ip}}</span>
                    </li>
                    <li class="arg-list">
                        <span class="key">{{$t('systemType')}}：</span>
                        <span class="val">{{$t('bit',{length : serverDetail.systmeBit})}}</span>
                    </li>
                </ul>
                <ul class="detail-list">
                    <li class="arg-list">
                        <span class="key">{{$t('usingService')}}：</span>
                        <span class="val">{{serverDetail.serviceName}}</span>
                    </li>
                    <li class="arg-list">
                        <span class="key">{{$t('listenRate')}}：</span>
                        <span class="val">{{serverDetail.monitoringFrequencc}}{{$t('minute')}}</span>
                    </li>
                </ul>
            </div>
            <div class="system-alarm">
                <div class="name">
                    {{$t('systemAlarm')}}
                    <span class="more" @click="toSystemAlarmDetail">
                        {{$t('forMore')}}
                        <span class="iconfont icon-pull-down"></span>
                    </span>
                </div>
                <ul class="alarm">
                    <li class="detail" v-for="item in warnInfoList">
                        <div class="alarm-name">
                            <span class="iconfont"
                                  :class="{'icon-warn' : item.warningLevel === '2',
                                  'icon-error' : item.warningLevel === '1',
                                  'icon-mind' : item.warningLevel === '3'}"></span>
                            {{item.message}}
                        </div>
                        <div class="time">{{item.ctime}}</div>
                    </li>
                </ul>
            </div>

            <!--设备在不同时间段的情况-->
            <time-along>
            </time-along>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import timeAlong from './deviceInfoChild/timeAlong';
    import ajax from '@/api/index.js';

    export default {
        components: {
            breadCrumbHead,
            timeAlong
        },
        data() {
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('serverList'),
                        router: {
                            name: 'server'
                        }
                    }
                ],
                //服务器id
                serverId : '',
                //服务器ip
                serverIp : '',
                //服务器详情
                serverDetail : {},
                //报警事件列表
                warnInfoList : []
            }
        },
        methods: {
            /**
             * 查看系统报警详情
             */
            toSystemAlarmDetail() {
                this.$router.push({
                    name: 'systemAlarm',
                    params : {
                        ip : this.serverIp
                    }
                });
            },
            /**
             * 获取路由信息
             * @param params
             */
            getParams(params) {
                if(params.id){
                    this.serverId = params.id;
                    this.serverIp = params.ip;
                    this.queryServerwarningData();
                    this.queryMoreWarningData();
                }
            },
            /**
             * 获取服务器详情
             */
            queryServerwarningData () {
                ajax.post('queryServerwarningData',{
                    id : this.serverId
                }).then(res => {
                    if(res.status === 200){
                        this.serverDetail  = res.data;
                    }else{
                        this.serverDetail = {};
                    }
                }).catch(err => {
                    this.serverDetail = {};
                });
            },
            /**
             * 查询系统报警事件
             */
            queryMoreWarningData () {
                ajax.post('queryMoreWarningData',{
                    ip : this.serverIp,
                    pageSize : 10,
                    page : 1,
                }).then(res => {
                    if(res.status === 200){
                        this.warnInfoList = res.data.list ? res.data.list : [];
                    }else{
                        this.warnInfoList = [];
                    }
                }).catch(err => {
                    this.warnInfoList = [];
                });
            }
        },
        beforeRouteEnter(to,from,next){
            next(vm => {
                vm.getParams(to.params);
            });
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .device-info {
        @include block_outline();
        background: $color_f4f6f9;

        .device-detail {
            @include block_outline($height: unquote('calc(100% - 74px)'));
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            padding: 26px 60px;
            overflow: auto;

            .device-name {
                padding: 14px 0;
                @include overflow_tip(100%, 56px);
                font-size: $font_size_20px;
                color: rgba($color_000, 0.85);
            }

            .de-li {
                @include block_outline($height: auto);
                overflow: auto;

                .detail-list {
                    float: left;
                    @include block_outline(33.33%, auto);

                    .arg-list {
                        @include block_outline($height: 30px);
                        padding: 4px;
                        line-height: 22px;
                        font-size: $font_size_14px;
                        display: flex;
                        flex-direction: row;

                        .key {
                            color: $color_333;
                        }

                        .val {
                            flex: 1;
                            @include overflow_tip();
                            color: $color_666;
                        }
                    }
                }
            }

            .system-alarm {
                @include block_outline($height: auto);
                border-top: 1px dashed $color_E1E1E1;
                clear: both;
                margin-top: 21px;
                @include padding_place(38px);

                .name {
                    @include block_outline($height: 70px);
                    padding: 25px 0 20px 0;
                    line-height: 24px;
                    font-size: $font_size_16px;
                    color: $color_333;

                    .more {
                        font-size: $font_size_12px;
                        color: $color_blue;
                        margin-left: 10px;
                        cursor: pointer;
                    }
                }

                .alarm {
                    @include block_outline(580px, auto);

                    .detail {
                        @include block_outline($height: 47px);
                        display: flex;
                        flex-direction: row;
                        line-height: 47px;
                        border-bottom: 1px solid $color_E8E8E;
                        padding: 0 20px 0 15px;
                        font-size: $font_size_14px;

                        &:nth-of-type(1) {
                            border-top: 1px solid $color_E8E8E;
                        }

                        .alarm-name {
                            flex: 1;
                            @include overflow_tip();
                            color: $color_666;

                            .iconfont{
                                margin-right: 10px;
                            }
                        }

                        .time {
                            @include block_outline(160px);
                            color: $color_666;
                        }
                    }
                }
            }

        }

        .icon-pull-down::before{
            display: inline-block;
            color: $color_blue;
            transform: rotate(-90deg) scale(0.8);
        }
    }
</style>
