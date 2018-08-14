<!--款台信息-->

<template>
    <div class="cashier-detail">
        <div class="com-name">
            <span class="name"
                  v-w-title="formData.cashierName">
                {{formData.cashierName}}
            </span>
            <template v-if="type === 'watch'">
                <span class="edit"
                      @click="edit">{{$t('edit')}}</span>
            </template>
        </div>
        <ul class="company-info">
            <li class="list">
                <div class="info-list1">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">款台名称：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.cashierName"/>
                    </span>
                    <span class="info-val" v-else>
                        {{formData.cashierName}}
                    </span>
                </div>
                <div class="info-list2">
                    <span class="info-key">款台ID：</span>
                    <span class="info-val">23232323232323232323232323232323232323232</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">
                        服务器名称
                        <Tooltip placement="bottom">
                             <div slot="content" class="tips-content">
                               {{$t('serverNameTips')}}
                            </div>
                            <Icon type="information-circled"></Icon>
                        </Tooltip>：
                    </span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.serverName"/>
                    </span>
                    <span class="info-val" v-else>
                        {{formData.serverName}}
                    </span>
                </div>
                <div class="info-list2">
                    <span class="info-key">款台类型：</span>
                    <span class="info-val">23232323232323232323232323232323232323232</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">所属核销设备分组：</span>
                    <span class="info-val" v-if="type === 'edit'">
                          <Select v-model="formDataCopy.verifyCashierTypeGroup">
                            <Option v-for="item in verifyCashierTypeGroupList"
                                    :value="item.value"
                                    :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </span>
                    <span class="info-val" v-else>
                        {{formData.verifyCashierTypeGroup}}
                    </span>
                </div>
                <div class="info-list2">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">所属销售渠道分组：</span>
                    <span class="info-val" v-if="type === 'edit'">
                          <Select v-model="formDataCopy.verifySaleTypeGroup">
                            <Option v-for="item in verifySaleTypeGroupList"
                                    :value="item.value"
                                    :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </span>
                    <span class="info-val" v-else>
                        {{formData.verifySaleTypeGroup}}
                    </span>
                </div>
            </li>
            <li class="btn-area" v-if="type === 'edit'">
                <Button type="primary"
                        class="ivu-btn-90px"
                        @click="saveEdit">{{$t('save')}}</Button>
                <Button type="ghost"
                        class="ivu-btn-90px"
                        @click="cancel">{{$t('cancel')}}</Button>
            </li>
        </ul>
    </div>
</template>

<script>
    import defaultsDeep from 'lodash/defaultsDeep';
    export default {
        data() {
            return {
                //表单数据
                formDataCopy : {},
                //表单数据
                formData : {
                    //款台名称
                    cashierName : '款台名称',
                    //是否启用
                    isStart : false,
                    //服务器名称
                    serverName : '服务器名称',
                    //核销设备分组
                    verifyCashierTypeGroup : '1',
                    //所属销售渠道分组
                    verifySaleTypeGroup : '1',
                },
                type : 'watch',
                //核销设备分组列表
                verifyCashierTypeGroupList : [
                    {
                        label : '1',
                        value : '1'
                    }
                ],
                //所属销售渠道分组
                verifySaleTypeGroupList : [
                    {
                        label : '1',
                        value : '1'
                    }
                ],
            }
        },
        methods: {
            /**
             * 开始编辑
             */
            edit () {
                this.type = 'edit';
                this.formDataCopy = defaultsDeep({} , this.formData);
            },
            /**
             * 取消编辑
             */
            cancel () {
                this.type = 'watch';
            },
            /**
             * 保存编辑的信息
             */
            saveEdit () {
                this.type = 'watch';
                this.formData = defaultsDeep({} , this.formDataCopy);
                this.$Message.success('保存成功');
            },
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';

    .cashier-detail{
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
                @include overflow_tip($width: auto, $height: 100%);
                max-width: calc(100% - 127px);
            }

            .edit {
                @include block_outline(60px);
                display: inline-block;
                vertical-align: middle;
                line-height: 28px;
                font-size: $font_size_14px;
            }

            .edit {
                float: right;
                color: $color_blue;
                text-align: right;
                cursor: pointer;
            }
        }

        .company-info {
            @include block_outline($height: auto);
            padding-bottom: 21px;
            border-bottom: 1px dashed $color_E1E1E1;

            .btn-area{
                @include block_outline($height : 72px);
                text-align: center;
                padding: 20px 0;

                /deep/ .ivu-btn-primary{
                    margin-right: 8px;
                }
            }

            .list {
                display: flex;
                align-items: center;
                @include block_outline($height: auto);
                min-height: 30px;
                padding: 4px 0;
                line-height: 22px;
                overflow: auto;

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
                    align-items: center;

                    &:nth-last-of-type(1) {
                        padding-left: 15px;
                    }

                    .info-key {
                        @include block_outline(auto, 100%);
                        color: $color_333;

                        .ivu-icon-information-circled{
                            font-size: $font_size_15px;
                            margin-left: 5px;
                            color: $color_gray;
                            vertical-align: unset;
                        }

                        .tips-content{
                            white-space: normal;
                        }

                        &.fix-key{
                            width: 130px;
                            text-align: left;
                        }
                    }

                    .info-val {
                        flex: 1;
                        @include overflow_tip(auto, auto);
                        color: $color_666;
                    }
                }
            }
        }
    }
</style>
