<!--设备信息-->

<template>
    <div class="device-info">
        <bread-crumb-head
            :locale-router="$t('deviceInfo')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="device-detail">
            <div class="server-info">
                <div class="modify" @click="modify"> <span class="iconfont icon-edit"></span>{{$t('modify')}}</div>
                <div class="device-name">
                    {{$t('serverListMsg',{msg : serverDetail.serverName})}}
                </div>
                <div class="de-li">
                    <ul class="detail-list">
                        <!-- 设备名称 -->
                        <li class="arg-list">
                            <span class="key">{{$t('deviceName')}}：</span>
                            <span class="val">{{serverDetail.serverName}}</span>
                        </li>
                        <!-- 系统 -->
                        <li class="arg-list">
                            <span class="key">{{$t('system')}}：</span>
                            <span class="val">{{serverDetail.opSystme}}</span>
                        </li>
                        <!-- 系统描述 -->
                        <li class="arg-list">
                            <span class="key">{{$t('systemDesc')}}：</span>
                            <span class="val val-special">{{serverDetail.description}}</span>
                        </li>
                    </ul>
                    <ul class="detail-list">
                        <!-- ip地址 -->
                        <li class="arg-list">
                            <span class="key">{{$t('ipAddress')}}：</span>
                            <span class="val">{{serverDetail.ip}}</span>
                        </li>
                        <!-- 系统类型 -->
                        <li class="arg-list">
                            <span class="key">{{$t('systemType')}}：</span>
                            <span class="val">{{$t('bit',{length : serverDetail.systmeBit})}}</span>
                        </li>
                    </ul>
                    <ul class="detail-list">
                        <!-- 应用服务 -->
                        <li class="arg-list">
                            <span class="key">{{$t('usingService')}}：</span>
                            <span class="val">{{serverDetail.serviceName}}</span>
                        </li>
                        <!-- 监听评率 -->
                        <li class="arg-list">
                            <span class="key">{{$t('listenRate')}}：</span>
                            <span class="val">{{$t('minute',{minute : serverDetail.monitoringFrequencc})}}</span>
                        </li>
                    </ul>
                </div>
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
                    <li class="detail"
                        v-for="(item,i) in warnInfoList"
                        :key="i">
                        <div class="alarm-name" v-w-title="item.message">
                            <span class="iconfont"
                                  :class="{'icon-warn' : item.warningLevel === 2,
                                  'icon-error' : item.warningLevel === 1,
                                  'icon-mind' : item.warningLevel === 3}"></span>
                            {{item.message}}
                        </div>
                        <div class="time">{{item.ctime}}</div>
                    </li>
                </ul>
            </div>

            <!--设备在不同时间段的情况-->
            <time-along :server-ip="serverIp"
                        :server-name="serverDetail.serverName"
                        v-if='serverIp'>
            </time-along>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import timeAlong from './deviceInfoChild/timeAlong';
    import ajax from '@/api/index.js';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            timeAlong
        },
        data () {
            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : this.$t('serverList'),
                        router : {
                            name : 'server'
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
            };
        },
        methods : {
            /**
             * 查看系统报警详情
             */
            toSystemAlarmDetail () {
                this.$router.push({
                    name : 'systemAlarm',
                    params : {
                        ip : this.serverIp
                    }
                });
            },
            /**
             * 获取路由信息
             * @param params
             */
            getParams (params) {
                if (params.id) {
                    this.serverId = params.id;
                    this.serverIp = params.ip;
                    this.queryServerwarningData();
                    this.queryMoreWarningData();
                } else {
                    this.$router.push({
                        name : 'server'
                    });
                }
            },
            /**
             * 获取服务器详情
             */
            queryServerwarningData () {
                ajax.post('queryServerwarningData',{
                    id : this.serverId
                }).then(res => {
                    if (res.status === 200) {
                        this.serverDetail = res.data;
                    } else {
                        this.serverDetail = {};
                    }
                }).catch(() => {
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
                    ctime : new Date().format('yyyy-MM-dd')
                }).then(res => {
                    if (res.status === 200) {
                        this.warnInfoList = res.data.list ? res.data.list : [];
                    } else {
                        this.warnInfoList = [];
                    }
                }).catch(() => {
                    this.warnInfoList = [];
                });
            },
            /**
             * 修改服务器信息
             */
            modify () {
                this.$router.push({
                    name : 'modifyServer',
                    params : {
                        serverDetail : this.serverDetail
                    }
                });
            }
        },
        // beforeRouteEnter (to,from,next) {
        //     next(vm => {
        //         vm.getParams(to.params);
        //     });
        // }
    };
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
            padding: 26px 60px 0 60px;
            overflow: auto;

            .server-info{
                position: relative;

                &:hover .modify{
                    display: block;
                }

                .modify{
                    @include absolute_pos(absolute,$right : 0);
                    display: none;
                    cursor: pointer;
                    color: $color_blue;
                }
            }

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
                        width: 100%;
                        min-height: 30px;
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

                            &.val-special{
                                overflow: auto;
                                white-space: normal;
                                word-break: break-all;
                            }
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

                    .icon-pull-down{
                        vertical-align: middle;
                    }
                }

                .alarm {
                    @include block_outline(100%, auto);

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
                                vertical-align: middle;
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
