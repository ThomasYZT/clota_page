<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <div class="play-rule">
        <Form label-position="top">
            <!--游玩规则-->
            <title-temp title="playRule"></title-temp>
            <div class="form-content">
                <div class="ivu-form-item-wrap single">
                    <Form-item :label="$t('playPark')"><!--可游玩园区-->
                        <span class="blue"
                              v-if="productPlayRuleVo.length < parkListCount"
                              @click="addPark" >+ {{$t('addPark')}}</span>
                        <table-com
                            :table-com-min-height="260"
                            :column-data="columnData"
                            :auto-height="true"
                            :table-data="productPlayRuleVo"
                            :row-class-name="rowClassName"
                            :border="false">
                            <el-table-column
                                slot="column0"
                                slot-scope="row"
                                :label="row.title"
                                :width="row.width"
                                :min-width="row.minWidth"
                                show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <!--<span class="red" v-if="!scope.row.check">!</span>-->
                                    <span>{{ scope.row.parkName | contentFilter }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                slot="column1"
                                slot-scope="row"
                                :label="row.title"
                                :width="row.width"
                                :min-width="row.minWidth"
                                show-overflow-tooltip>
                                <template slot-scope="scope">
                                    {{$t(scope.row.saleType) | contentFilter}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                slot="column2"
                                slot-scope="row"
                                :label="row.title"
                                :width="row.width"
                                :min-width="row.minWidth"
                                show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span v-if="scope.row.saleType === 'one_ticket'">-</span>
                                    <span v-else>{{scope.row.itemCheckTimes}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                slot="column3"
                                slot-scope="row"
                                :label="row.title"
                                :width="row.width"
                                :min-width="row.minWidth">
                                <template slot-scope="scope">
                                    <ul class="operate-list">
                                        <li class="normal" @click="modify(scope.row, scope.$index)">{{$t('modify')}}</li><!--修改-->
                                        <li class="red-label" @click="del(scope.row, scope.$index)">{{$t('delete')}}</li><!--删除-->
                                    </ul>
                                </template>
                            </el-table-column>
                        </table-com>
                    </Form-item>
                </div>
            </div>
        </Form>

        <!--新增/编辑园区-->
        <edit-park-modal ref="editPark" :park-list="parkList" :data="formData"></edit-park-modal>
    </div>
</template>

<script>

    import tableCom from '@/components/tableCom/tableCom.vue';
    import titleTemp from '../../../components/titleTemp';
    import { parkColumn } from './parkConfig';
    import editParkModal from '../components/editParkModal';
    import forEach from 'lodash/forEach';
    export default {
        props : {
            //新建票类所有表单数据
            formData : {
                type : Object,
                default () {
                    return {};
                }
            },
            //权限下园区总数
            parkListCount : {
                type : Number,
                default : 0,
            },
            //可游玩园区列表数据
            parkList : {
                type : Array,
                default () {
                    return [];
                }
            },
        },
        components : {
            tableCom,
            titleTemp,
            editParkModal
        },
        data () {
            return {
                //游玩规则-产品园区列表数据
                productPlayRuleVo : [],
                //可游玩园区表头
                columnData : parkColumn,
            };
        },
        methods : {
            //新增可游玩园区
            addPark () {
                this.$refs.editPark.show({
                    title : this.$t('add') + this.$t('one_ticket'),
                    parkList : Array.from(this.parkList),
                    type : 'add',
                    list : this.productPlayRuleVo,
                    confirmCallback : ( data ) => {
                        this.productPlayRuleVo.push(data);
                        //this.dealParkList(data.parkId);
                    }
                });
            },
            //修改可游玩园区
            modify ( data, index ) {
                this.$refs.editPark.show({
                    index : index,
                    data : data,
                    parkList : Array.from(this.parkList),
                    list : this.productPlayRuleVo,
                    title : this.$t('modify') + (data.saleType === 'one_ticket' ? this.$t('oneTicketPark') : this.$t('moreTicketPark')),
                    type : 'modify',
                    confirmCallback : ( data, index ) => {
                        this.$set(this.productPlayRuleVo, index, data);
                    }
                });
            },
            //删除可游玩园区
            del ( data, index ) {
                this.productPlayRuleVo.splice(index,1);

            },
            /**
             * 动态给行添加类名 行数据有误时添加的背景颜色 - 暂不使用
             * @param row
             */
            rowClassName (row) {
                if (!row.row.check) {
                    return '';
                    /* return 'error-tr';*/
                }
            },
            /**
             * 基本信息表单校验
             */
            formValidate () {
                return new Promise((resolve, reject) => {
                    //校验可游玩园区数量
                    if (this.productPlayRuleVo.length > 0) {
                        //校验产品有效性设置与游玩规则数据
                        forEach(this.productPlayRuleVo, item => {
                            if (this.formData.productEffSet === 'since_the_play' && (item.effDay == '' || item.effDay == 0)) {
                                this.$Message.warning(this.$t('inputField', { feild : this.$t('AvailableNumberOfDays') }));
                                reject('AvailableNumberOfDays')
                                return false;
                            }
                        });
                        resolve(this.productPlayRuleVo);
                    } else {
                        reject('playParkNull');
                    }
                })
            },
            /**
             * 编辑时初始化表单数据
             */
            initData (data) {
                this.productPlayRuleVo = data;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .play-rule {
        .blue{
            color: $color_blue;
            cursor: pointer;
        }

        .red{
            color: $color_red;
        }

        /deep/ .ivu-form{
            padding: 10px 0 20px;
            text-align: center;
        }
        .form-content{
            width: 1000px;
            margin: 0 auto;

            .ivu-input-icon{
                z-index: 2;
            }

            /deep/ .ivu-form-item-label{
                padding-left: 0;
            }

            .ivu-form-item-wrap{
                position: relative;
                display: inline-block;
                min-width: 340px;
                width: 49%;
                text-align: left;
                vertical-align: middle;

                .ivu-form-item{
                    width: 340px;
                    margin: 0 auto 18px;
                    text-align: left;

                    /deep/ .ivu-date-picker {
                        display: block;
                    }

                    /deep/ .ivu-select-selected-value,
                    /deep/ .ivu-input{
                        font-size: $font_size_14px;
                    }

                    /deep/ .ivu-select-item{
                        font-size: $font_size_14px !important;
                    }

                    /deep/ .ivu-input-wrapper{
                        &.short-input{
                            width: 123px;
                            display: inline-block;
                            margin-right: 10px;
                        }
                    }

                    /deep/ .ivu-checkbox-wrapper{
                        margin-right: 24px;
                        &:last-child{
                            margin-right: 0;
                        }
                    }

                    /deep/ .ivu-checkbox{
                        margin-right: 5px;
                    }

                    .label{
                        margin-right: 10px;
                    }

                    /deep/ .ivu-form-item-content {
                        line-height: 22px;
                    }
                }
            }

            .single {
                width: calc(49% + 340px);
                /deep/ .ivu-form-item{
                    width: 100%;
                }
            }

            .icon-note {
                color: $color_gray;
            }
        }
    }
</style>
