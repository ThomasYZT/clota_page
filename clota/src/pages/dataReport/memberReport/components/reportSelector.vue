<!--
    报表选择组件
    作者：杨泽涛
-->
<template>
    <div class="report-selector">
        <div class="select-wrapper">
            <span class="label">{{$t('report')}}</span>
            <!-- 数据报表类型 -->
            <Select v-model="dataReport"
                    @on-change="reportChange"
                    style="width:280px;margin-right: 10px;">
                <Option v-for="item in reportList"
                        show-name
                        :value="item.value"
                        :key="item.value">{{ $t(item.name) }}</Option>
            </Select>

            <!-- 会员类型下拉列表 -->
            <template v-if="filterable">
                <span class="label">{{$t('member-level')}}</span>
                <Select v-model="cType"
                        :placeholder="$t('selectField', { msg : $t('member-level') })"
                        @on-change="cardTypeChange"
                        style="width:160px">
                    <Option v-for="item in cardTypeList"
                            v-if="(item.value !== '1' && $route.name === 'scoreReport') || $route.name === 'mutipleChannelReport'"
                            :value="item.value"
                            :key="item.value">
                        {{ item.label === 'memberTypeAll' ? $t('memberTypeAll') : item.label }}
                    </Option>
                </Select>
            </template>
        </div>
        <div class="button-wrapper" v-if="$route.name !== 'mutipleChannelReport' && $route.name !=='scoreReport'" >
            <ButtonGroup>
                <Button @click="selectChange('tendency')"
                        type="default"
                        class="tab-btn"
                        :class="{selected : selectButton === 'tendency'}">{{$t('tendencyChart')}}</Button>
                <Button @click="selectChange('datasheet')"
                        type="default"
                        class="tab-btn"
                        :class="{selected : selectButton === 'datasheet'}">{{$t('datasheet')}}</Button>
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
                default : ''
            },
            selectButton : {
                type : String,
                default : 'tendency'
            }
        },
        components : {},
        data () {
            return {
                dataReport : this.$route.name,
                reportList : [
                    {
                        name : 'cardSaleReport',
                        value : 'cardSaleReport',
                    },
                    {
                        name : 'consumeReport',
                        value : 'consumeReport',
                    },
                    {
                        name : 'storeValueReport',
                        value : 'storeValueReport',
                    },
                    {
                        name : 'mutipleChannelReport',
                        value : 'mutipleChannelReport',
                    },
                    {
                        name : 'scoreReport',
                        value : 'scoreReport',
                    }
                ],
                //会员类别下拉列表
                cardTypeList : [
                    {
                        value : 'all',
                        label : 'memberTypeAll'
                    }
                ],
                //卡类型
                cType : 'all',
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
             *  图表类型切换
             *  @param {string} type
             */
            selectChange (type) {
                this.$emit('update:selectButton', type);
            },
            /**
             * 获取会员卡类型下拉列表数据
             */
            getMemberTypeList () {
                ajax.post('queryCardTypeList').then(res => {
                    if (res.success && res.data && res.data.length > 0) {
                        this.cardTypeList = this.cardTypeList.concat(res.data.map(item => {
                            return {
                                value : item.id,
                                label : item.typeName
                            };
                        }));
                        this.cType = 'all';

                        if (this.$route.name === 'scoreReport') {
                            this.$emit('update:cardType', this.cardTypeList.filter((item) => {
                                return item.value !== '1' && item.value !== 'all';
                            }).map((item) => {
                                return item.value;
                            }).join(','));
                        } else {
                            this.$emit('update:cardType', this.cType);
                        }
                    } else {
                        this.cardTypeList = [
                            {
                                value : 'all',
                                label : 'memberTypeAll'
                            }
                        ];
                        this.cType = 'all';
                    }
                });
            },
            /**
             * 卡类型改变
             */
            cardTypeChange () {
                if (this.$route.name === 'scoreReport') {
                    if (this.cType === 'all') {
                        this.$emit('update:cardType', this.cardTypeList.filter((item) => {
                            return item.value !== '1' && item.value !== 'all';
                        }).map((item) => {
                            return item.value;
                        }).join(','));
                    } else {
                        this.$emit('update:cardType', this.cType);
                    }
                } else {
                    this.$emit('update:cardType', this.cType);
                }
            },
            /**
             * 组件数据重置
             */
            reset () {
                this.cardTypeList = [
                    {
                        value : 'all',
                        label : 'memberTypeAll'
                    }
                ];
            }
        },
        watch : {
            $route : {
                handler (newVal) {
                    this.dataReport = newVal.name;
                    this.reset();
                    if (this.$route && this.$route.params && this.$route.params.selectButton) {
                        this.selectButton = this.$route.params.selectButton;
                    }
                    if (this.$route && this.$route.name && (this.$route.name === 'mutipleChannelReport' || this.$route.name === 'scoreReport')) {
                        this.$emit('update:cardType', '');
                        this.getMemberTypeList();
                    }
                },
                immediate : true
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
                color: #2F70DF;
            }

            /deep/ .tab-btn {
                width: 130px;
                background-color: #fff;
                outline: none;
            }
        }
    }
</style>
