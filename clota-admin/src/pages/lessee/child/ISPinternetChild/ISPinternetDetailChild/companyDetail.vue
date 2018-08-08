<!--公司详情-->

<template>
    <div class="company-detail">
        <div class="com-name">
          <span class="name"
                v-w-title="'广州长隆旅游集团广州长隆旅游集团广州长隆旅游集团广州长隆旅游集团'">
            广州长隆旅游集团广州长隆旅游集团广州长隆旅游集团广州长隆旅游集团
          </span>
            <span class="started">已启用</span>
            <span class="edit">修改</span>
        </div>
        <ul class="company-info">
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">公司ID：</span>
                    <span class="info-val">232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">公司编码：</span>
                    <span class="info-val">23232323232323232323232323232323232323232</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">线下核销编码：</span>
                    <span class="info-val">23</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">全民分销邀请码：</span>
                    <span class="info-val">23232323232323232323232323232323232323232</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">短信供应商：</span>
                    <span class="info-val">268326828@163.com</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">管理账号：</span>
                    <span class="info-val">23232323232323232323232323232323232323232</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">电子邮箱：</span>
                    <span class="info-val">268326828@163.com</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">受理客服：</span>
                    <span class="info-val">23232323232323232323232323232323232323232</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">所在地：</span>
                    <span class="info-val">268326828@163.com</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">详细地址：</span>
                    <span class="info-val">云南省曲靖市马龙县因下路464号</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">电话：</span>
                    <span class="info-val">268326828@163.com</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">传真：</span>
                    <span class="info-val">23232323232323232323232323232323232323232</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">管理上级：</span>
                    <span class="info-val">268326828@163.com</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">财务上级：</span>
                    <span class="info-val">云南省曲靖市马龙县因下路464号</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">创建时间：</span>
                    <span class="info-val">268326828@163.com</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">创建人：</span>
                    <span class="info-val">云南省曲靖市马龙县因下路464号</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">上次修改时间：</span>
                    <span class="info-val">268326828@163.com</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">上次修改人：</span>
                    <span class="info-val">云南省曲靖市马龙县因下路464号</span>
                </div>
            </li>
        </ul>
        <!--已开通服务-->
        <opened-service>
        </opened-service>
        <!--下属公司-->
        <sub-company>
        </sub-company>
        <!--下属景区-->
        <sub-scene>
        </sub-scene>
        <!--下属部门-->
        <sub-department>
        </sub-department>
        <!--员工-->
        <employee-table>
        </employee-table>
        <!--短信-->
        <note-table>
        </note-table>
    </div>
</template>

<script>
    import tableCom from '../../organization/tableCom';
    import employeeTable from './components/employeeTable';
    import noteTable from './components/noteTable';
    import openedService from './components/openedService';
    import subCompany from './components/subCompany';
    import subScene from './components/subScene';
    import subDepartment from './components/subDepartment';

    export default {
        components: {
            tableCom,
            employeeTable,
            noteTable,
            openedService,
            subCompany,
            subScene,
            subDepartment
        },
        data() {
            return {
                tableData: [{
                    aa: '2016-05-03',
                    realName: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }
                ]
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .company-detail {
        @include block_outline($width: unquote('calc(100% - 400px)'));
        padding: 11px 35px;
        float: right;
        overflow: auto;

        .com-name {
            @include overflow_tip(100%, 56px);
            padding: 14px 0;

            .name {
                line-height: 28px;
                font-size: $font_size_20px;
                color: $color_000_085;
                vertical-align: middle;
                display: inline-block;
                @include overflow_tip($width: unquote('calc(100% - 127px)'), $height: 100%);
            }

            .started,
            .edit {
                @include block_outline(60px);
                display: inline-block;
                vertical-align: middle;
                line-height: 28px;
                font-size: $font_size_14px;
            }

            .started {
                padding-left: 10px;
                color: $color_22BB5F;
            }

            .edit {
                float: right;
                color: $color_blue;
                text-align: right;
            }
        }

        .company-info {
            @include block_outline($height: auto);
            padding-bottom: 21px;
            border-bottom: 1px dashed $color_E1E1E1;

            .list {
                @include block_outline($height: 30px);
                padding: 4px 0;
                line-height: 22px;

                .info-list1 {
                    @include block_outline(40%, auto);
                }

                .info-list2 {
                    @include block_outline(60%, auto);
                }

                .info-list1,
                .info-list2 {
                    display: flex;
                    flex-direction: row;
                    float: left;
                    font-size: $font_size_14px;

                    &:nth-last-of-type(1) {
                        padding-left: 15px;
                    }

                    .info-key {
                        @include block_outline(auto, 100%);
                        color: $color_333;
                    }

                    .info-val {
                        flex: 1;
                        @include overflow_tip(auto, auto);
                        color: $color_666;
                    }
                }
            }
        }

        .open-service {
            @include block_outline($height: 42px);
            padding-bottom: 10px;

            /deep/ .ivu-btn-primary {
                margin-right: 7px;
            }
        }

        .employee-account {
            @include block_outline($height: 30px);
            line-height: 20px;
            padding-bottom: 10px;
            font-size: $font_size_14px;
            color: $color_606266;
        }
    }
</style>
