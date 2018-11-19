<!--
    报表选择组件
    作者：杨泽涛
-->
<template>
    <div class="report-selector">
        <div class="select-wrapper">
            <span class="label">{{$t('report')}}</span>
            <Select v-model="dataReport"
                    @on-change="reportChange"
                    style="width:280px">
                <Option v-for="item in reportList"
                        show-name
                        :value="item.value"
                        :key="item.value">{{ item.name }}</Option>
            </Select>

            <!-- 会员类型下拉列表 -->
            <template v-if="filterable">
                <span class="label">{{$t('member-level')}}</span>
                <Select v-model="cType"
                        :placeholder="$t('selectField', { msg : $t('member-level') })"
                        @on-change="cardTypeChange"
                        style="width:160px">
                    <Option v-for="item in cardTypeList" :value="item.value" :key="item.value">{{ $t(item.label) }}</Option>
                </Select>
            </template>
        </div>
        <div class="button-wrapper" v-if="$route.name !== 'mutipleChannelReport' && $route.name !=='scoreReport'" >
            <ButtonGroup>
                <Button @click="selectChange('tendency')" type="default" class="tab-btn" :class="{selected : selectButton === 'tendency'}">{{$t('tendencyChart')}}</Button>
                <Button @click="selectChange('datasheet')" type="default" class="tab-btn" :class="{selected : selectButton === 'datasheet'}">{{$t('datasheet')}}</Button>
            </ButtonGroup>
        </div>
    </div>
</template>

<script>
    import ajax from '../../../../api/index';
    export default {
        props : {
            //是否显示过滤器
            filterable : {
                type : Boolean,
                default () {
                    return false;
                }
            },
            cardType : {
                type : String,
                default () {
                    return '';
                }
            }
        },
        components : {},
        data () {
            return {
                dataReport : this.$route.name,
                reportList : [
                    {
                        name : this.$t('cardSaleReport'),
                        value : 'cardSaleReport',
                    },
                    {
                        name : this.$t('consumeReport'),
                        value : 'consumeReport',
                    },
                    {
                        name : this.$t('storeValueReport'),
                        value : 'storeValueReport',
                    },
                    {
                        name : this.$t('mutipleChannelReport'),
                        value : 'mutipleChannelReport',
                    },
                    {
                        name : this.$t('scoreReport'),
                        value : 'scoreReport',
                    }
                ],
                selectButton : 'tendency',
                //会员类别下拉列表
                cardTypeList : [
                    {
                        value : 'all',
                        label : 'memberTypeAll'
                    }
                ],
                //卡类型
                cType : 'all'
            };
        },
        methods : {
            /**
             * 数据报表类型改变
             * @param {string} data
             */
            reportChange (data) {
                this.$emit('reportChange', data);
            },
            /**
             *  图标类型切换
             *  @param {string} type
             */
            selectChange (type) {
                this.selectButton = type;
                this.$emit('typeChange', type);
            },
            /**
             * 获取会员卡类型下拉列表数据
             */
            getMemberTypeList () {
                ajax.post('queryCardTypeList').then(res => {
                    if (res.success && res.data.length > 0) {
                        this.cardTypeList = this.cardTypeList.concat(res.data.map(item => {
                            return {
                                value : item.id,
                                label : item.typeName
                            };
                        }));
                    } else {
                        this.cardTypeList = [
                            {
                                value : 'all',
                                label : 'memberTypeAll'
                            }
                        ];
                    }
                });
            },
            /**
             * 卡类型改变
             */
            cardTypeChange () {
                this.$emit('update:cardType', this.cType);
            },
        },
        created () {
            if (this.$route && this.$route.params && this.$route.params.selectButton) {
                this.selectButton = this.$route.params.selectButton;
            }
            this.getMemberTypeList();
        },
        watch : {
            $route (newVal) {
                this.dataReport = newVal.name;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .report-selector {
        position: relative;
        display: flex;
        width: 100%;
        height: 59px;
        padding: 14px 20px;
        line-height: 31px;
        border-bottom: 1px solid #E1E1E1;

        .label {
            margin-right: 10px;
        }

        .select-wrapper {
            flex: 1 0;
            flex-basis: 50%;

            text-align: left;
        }

        .button-wrapper {
            flex: 1 0;
            flex-basis: 50%;

            text-align: right;

            /deep/ .selected {
                border: 1px solid #2F70DF !important;
                z-index: 10;
            }

            /deep/ .tab-btn {
                width: 130px;
                background-color: #fff;
                outline: none;
            }
        }
    }
</style>
