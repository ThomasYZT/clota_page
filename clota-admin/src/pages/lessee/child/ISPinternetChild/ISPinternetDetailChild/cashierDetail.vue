<!--款台信息-->

<template>
    <div class="cashier-detail">
        <Form ref="formValidate"
              :model="formDataCopy"
              :class="{'form-edit' : type === 'edit','form-watch' : type === 'watch'}"
              label-position="right"
              inline>
            <div class="com-name">
                <span class="name"
                      v-w-title="formData.tableName">
                    {{cashierDetail.tableName | contentFilter}}
                </span>
            </div>
            <i-row>
                <i-col span="12">
                    <FormItem label="款台名称：" :label-width="150">
                        <span class="info-val" v-w-title="cashierDetail.tableName">{{cashierDetail.tableName | contentFilter}}</span>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem label="款台ID：" :label-width="150">
                        <span class="info-val" v-w-title="cashierDetail.id">{{cashierDetail.id | contentFilter}}</span>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <FormItem label="服务器名称：" :label-width="150">
                        <span class="info-val" v-w-title="cashierDetail.serverName">{{cashierDetail.serverName | contentFilter}}</span>
                        <Tooltip placement="bottom" transfer>
                            <div slot="content" class="tips-content">
                                {{$t('serverNameTips')}}
                            </div>
                            <Icon type="information-circled"></Icon>
                        </Tooltip>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem label="款台类型：" :label-width="150">
                        <span class="info-val" v-w-title="$t('tableType.' + cashierDetail.tableType)">{{$t('tableType.' + cashierDetail.tableType) | contentFilter}}</span>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12" v-if="checkGroupShow">
                    <FormItem label="所属核销设备分组：" :label-width="150" >
                        <span class="info-val" v-w-title="cashierDetail.checkGroupName">{{cashierDetail.checkGroupName ? cashierDetail.checkGroupName : $t('noGroup') | contentFilter}}</span>
                    </FormItem>
                </i-col>
                <i-col span="12" v-if="saleGroupShow">
                    <FormItem label="所属销售渠道分组：" :label-width="150" >
                        <span class="info-val" v-w-title="cashierDetail.saleGroupName">{{cashierDetail.saleGroupName ? cashierDetail.saleGroupName : $t('noGroup') | contentFilter}}</span>
                    </FormItem>
                </i-col>
            </i-row>
        </Form>
    </div>
</template>

<script>
    import defaultsDeep from 'lodash/defaultsDeep';
    import ajax from '@/api/index.js';
    export default {
        props : {
            //节点信息
            'activeNode' : {
                type : Object,
                default () {
                    return {};
                }
            },
        },
        data () {
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
                //款台详情
                cashierDetail : {}
            };
        },
        methods : {
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
            /**
             * 获取款台详情
             */
            getCashierDetail () {
                ajax.post('getTableData',{
                    id : this.activeNode.id,
                }).then(res => {
                    if (res.status === 200) {
                        this.cashierDetail = res.data ? res.data : {};
                    } else {
                        this.cashierDetail = {};
                    }
                });
            },
        },
        watch : {
            //节点更换，重新请求节点数据
            activeNode : {
                handler (newVal,oldVal) {
                    this.getCashierDetail();
                },
                deep : true,
                immediate : true
            }
        },
        computed : {
            //是否显示核销设备分组
            checkGroupShow () {
                return this.cashierDetail && (this.cashierDetail.tableType === 'check' || this.cashierDetail.tableType === 'combine');
            },
            //是否显示销售设备分组
            saleGroupShow () {
                return this.cashierDetail && (this.cashierDetail.tableType === 'sale' || this.cashierDetail.tableType === 'combine');
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';

    .cashier-detail{
        @include block_outline($width: unquote('calc(100% - 400px)'));
        padding: 11px 35px;
        float: right;
        overflow: auto;

        .ivu-tooltip-inner{
            white-space: normal;
        }

        .com-name {
            @include overflow_tip(100%, 56px);
            padding: 14px 0;

            .iconfont{
                vertical-align: middle;
            }

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

        .form-watch{
            /deep/ .ivu-form-item{
                margin-bottom: 0;
            }
            /deep/ .ivu-form-item-required .ivu-form-item-label:before{
                display: none;
            }
        }

        .form-edit{
            /deep/ .ivu-form-item{
                width: calc(100% - 25px);
                margin-bottom: 14px;
            }

            /deep/ .ivu-form-item-error-tip{
                font-size: $font_size_12px;
                padding-top: 2px;
            }
        }

        /deep/ .ivu-form-item-label{
            font-size: $font_size_14px;
            color: $color_333;
        }

        /deep/ .ivu-form-item-content{
            font-size: 14px;
            color: #333333;
        }

        .ivu-icon-information-circled{
            font-size: $font_size_15px;
            margin-left: 5px;
            color: $color_gray;
            vertical-align: unset;
        }
    }
</style>
