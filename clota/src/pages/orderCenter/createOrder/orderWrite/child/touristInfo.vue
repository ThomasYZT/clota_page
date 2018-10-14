<!--游客信息 -->

<template>
    <div class="tourist-info">
        <div class="title">
            游客信息
            <Button type="primary" @click="addTourist">添加游客</Button>
        </div>
        <div class="person-info-list">
            <div class="name">
                张三  /  189262626226
                <ul class="right-menu">
                    <li class="modify">{{$t('modify')}}</li>
                    <li class="del">{{$t('del')}}</li>
                </ul>
            </div>
            <div class="card-info">
                <ul class="per-info">
                    <li class="list">
                        <span class="key">身份证：</span>
                        <span class="value">11021510212021626</span>
                    </li>
                    <li class="list">
                        <span class="key">身份证：</span>
                        <span class="value">11021510212021626</span>
                    </li>
                </ul>
                <table-com
                    :column-data="columnData"
                    :table-data="tableData"
                    :auto-height="true"
                    :table-com-min-height="250">
                </table-com>
            </div>
        </div>
        <div class="person-info-list">
            <div class="name">
                张三  /  189262626226
                <ul class="right-menu">
                    <li class="modify">{{$t('modify')}}</li>
                    <li class="del">{{$t('del')}}</li>
                </ul>
            </div>
            <div class="card-info">
                <ul class="per-info">
                    <li class="list">
                        <span class="key">身份证：</span>
                        <span class="value">11021510212021626</span>
                    </li>
                    <li class="list">
                        <span class="key">身份证：</span>
                        <span class="value">11021510212021626</span>
                    </li>
                    <li class="list right">
                        <span class="modify">{{$t('modify')}}</span>
                        <span class="del">{{$t('del')}}</span>
                    </li>
                </ul>
                <table-com
                    :column-data="columnData"
                    :table-data="tableData"
                    :auto-height="true"
                    :table-com-min-height="250">
                </table-com>
            </div>
        </div>
        <!--添加游客模态框-->
        <add-tourist v-model="addTouristShow"
                     :product-list="productListFilter"
                     @add-tourist="getTouristInfo">
        </add-tourist>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import addTourist from './addTourist';
    export default {
        props :{
            //选择的产品列表
            'product-list' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        components : {
            tableCom,
            addTourist
        },
        data() {
            return {
                //表头配置
                columnData : [
                    {
                        title: '产品名称',
                        minwidth: 130,
                        field: 'productName'
                    },
                    {
                        title: '数量',
                        minwidth: 130,
                        field: 'num'
                    },
                    {
                        title: '取票证件',
                        minwidth: 130,
                        field: 'scenicOrgName'
                    },
                ],
                //表格数据
                tableData :[
                    {
                        productName : 'test',
                        num : '10'
                    }
                ],
                //添加游客模态框是否显示
                addTouristShow : false,
                //产品取票信息
                productListFilter : []
            }
        },
        methods: {
            /**
             * 添加游客
             */
            addTourist () {
                this.addTouristShow = true;
                this.productListFilter = this.productList.map(item => {
                    return {
                        ...item,
                        takeNum : 0
                    }
                });
            },
            /**
             * 获取新增游客信息
             * @param data
             */
            getTouristInfo (data) {
                console.log(data)
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .tourist-info{
        padding: 0 30px;

        .title{
            position: relative;
            padding: 16px 0;
            @include block_outline($height : 60px);
            font-size: $font_size_16px;
            color: $color_333;
            line-height: 30px;

            &::before{
                content : '';
                @include block_outline(absolute,2px);
                @include block_outline(4px,16px);
                background: $color_blue;
                display: inline-block;
                margin-right: 10px;
                vertical-align: middle;
            }

            .ivu-btn{
                float: right;
            }
        }

        .person-info-list{
            border: 1px solid #E9E9E9;
            border-radius: 4px 4px 0 0;
            margin-bottom: 16px;

            .name{
                @include block_outline($height : 44px);
                line-height : 44px;
                padding: 0 24px;
                font-size: $font_size_16px;
                color: rgba(0,0,0,0.85);
                font-weight: bold;
                border-bottom: 1px solid $color_eee;

                .right-menu{
                    float: right;

                    .modify,
                    .del{
                        float: right;
                        font-size: $font_size_14px;
                        margin-left: 15px;
                        cursor: pointer;
                        font-weight: normal;
                    }

                    .modify{
                        color: $color_blue;
                    }

                    .del{
                        color: $color_err;
                    }
                }
            }

            .card-info{
                padding: 0 24px 24px 24px;

                .per-info{
                    @include block_outline($height : 53px);

                    .list{
                        float: left;
                        font-size: $font_size_14px;
                        margin-right: 100px;
                        line-height: 53px;

                        .key{
                            color: $color_999;
                        }

                        .value{
                            color: $color_333;
                        }
                    }
                }

                /deep/ .el-table{
                    border-top: 1px solid #ebeef5;
                }

                /deep/ .el-table th, /deep/ .el-table td{
                    padding: 8px 0;
                }
            }
        }
    }
</style>
