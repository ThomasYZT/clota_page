<!--游客信息 -->

<template>
    <div class="tourist-info">
        <div class="title">
            <!--游客信息-->
            {{$t('touristInfo')}}
            <Button type="primary"
                    :disabled="!canAddTouristInfo"
                    @click="addTourist">{{$t('addVisitor')}}</Button><!--添加游客-->
        </div>
        <div class="person-info-list" v-for="(item,index) in touristInfo" :key="item.phone">
            <div class="name">
                {{item.name}}  /  {{item.phone}}
                <ul class="right-menu">
                    <li class="modify" @click="modifyTouristInfo(index)">{{$t('modify')}}</li>
                    <li class="del" @click="delTouristInfo(index)">{{$t('del')}}</li>
                </ul>
            </div>
            <div class="card-info">
                <ul class="per-info" v-if="item.idTableData && item.idTableData.length > 0">
                    <li class="list" v-for="list in item.idTableData" :key="list.type">
                        <span class="key">{{$t(list.type)}}：</span>
                        <span class="value">{{list.data}}</span>
                    </li>
                </ul>
                <div class="hr" v-else></div>
                <table-com
                    :column-data="columnData"
                    :table-data="item.productInfo"
                    :auto-height="true"
                    :table-com-min-height="250">
                    <el-table-column
                        slot="column2"
                        show-overflow-tooltip
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{$t(scope.row['idType']) | contentFilter}}
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </div>
        <!--无数据状态-->
        <div class="no-data-wrap" v-if="touristInfo.length < 1">
            <no-data>
            </no-data>
        </div>
        <!--添加游客模态框-->
        <add-tourist v-model="addTouristShow"
                     :default-info="modifyIngTouristInfo"
                     :added-tourist-info="touristInfo"
                     :product-list="productListFilter"
                     @modify-tourist="confirmModifyTouristInfo"
                     @add-tourist="getTouristInfo">
        </add-tourist>

        <!--删除员工确认模态框-->
        <confirm-modal ref="confirmModal">
            <div class="confirm-label">
                <i class="iconfont icon-warn" style="color : #F7981C;font-size: 17px;"></i>
                {{$t('确认删除游客信息？')}}
            </div>
        </confirm-modal>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import addTourist from './addTourist';
    import noData from '@/components/noDataTip/noData-tip.vue';
    import confirmModal from '@/components/delModal/index.vue';

    export default {
        props : {
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
            addTourist,
            noData,
            confirmModal
        },
        data () {
            return {
                //表头配置
                columnData : [
                    {
                        title : 'productName',
                        minwidth : 130,
                        field : 'productName'
                    },
                    {
                        title : 'quantity',
                        width : 130,
                        field : 'takeNum'
                    },
                    {
                        title : 'ticketGetterCredentials', // 取票证件
                        width : 130,
                        field : 'idType'
                    },
                ],
                //添加游客模态框是否显示
                addTouristShow : false,
                //产品取票信息
                // productListFilter : [],
                //游客信息
                touristInfo : [],
                //当前修改的游客信息
                modifyIngTouristInfo : {}
            };
        },
        methods : {
            /**
             * 添加游客
             */
            addTourist () {
                this.modifyIngTouristInfo = {};
                this.addTouristShow = true;
            },
            /**
             * 获取新增游客信息
             * @param data
             */
            getTouristInfo (data) {
                this.touristInfo.push(data);
                this.$emit('reset-tourist-info',JSON.parse(JSON.stringify(this.touristInfo)));
            },
            /**
             * 删除游客信息
             * @param index
             */
            delTouristInfo (index) {
                this.$refs.confirmModal.show({
                    title : this.$t('notice'),
                    confirmCallback : () => {
                        this.touristInfo.splice(index,1);
                        this.$emit('reset-tourist-info',JSON.parse(JSON.stringify(this.touristInfo)));
                        this.$Message.success(this.$t('deletedField', { field : this.$t('touristInfo') })); // 游客信息已删除
                    }
                });
            },
            /**
             * 判断所选择的产品是否都分配完毕
             */
            ticketIsAllocated () {
                return new Promise((resolve,reject) => {
                    let leftTicket = [];
                    for (let i = 0,j = this.productListFilter.length; i < j; i++) {
                        if (this.productListFilter[i]['leftNum'] > 0) {
                            leftTicket.push(this.productListFilter[i]);
                        }
                    }
                    if (leftTicket.length > 0) {
                        reject({
                            type : 'ticketErr',
                            data : leftTicket
                        });
                    } else {
                        resolve();
                    }
                });
            },
            /**
             * 修改游客信息
             * @param index
             */
            modifyTouristInfo (index) {
                this.modifyIngTouristInfo = JSON.parse(JSON.stringify(Object.assign({
                    index : index,
                    ...this.touristInfo[index]
                })));
                this.addTouristShow = true;
            },
            /**
             * 获取修改后的游客信息
             * @param data
             */
            confirmModifyTouristInfo (data) {
                this.$set(this.touristInfo,data.index,data.data);
                this.$emit('reset-tourist-info',JSON.parse(JSON.stringify(this.touristInfo)));
            },
            /**
             * 删除不能下单的产品
             * @param data
             */
            deleteProduct (data) {
                for (let i = 0,j = this.touristInfo.length; i < j; i++) {
                    let productInfo = this.touristInfo[i]['productInfo'];
                    for (let a = productInfo.length - 1,b = 0; a >= b; a--) {
                        if (data.includes(productInfo[a]['productId'])) {
                            this.touristInfo[i]['productInfo'].splice(a,1);
                        }
                    }
                }
                this.$emit('reset-tourist-info',JSON.parse(JSON.stringify(this.touristInfo)));
            },
            /**
             * 判断每位游客是否都添加了产品信息
             */
            touristHasTicket () {
                return new Promise((resolve,reject) => {
                    let result = [];
                    for (let i = 0,j = this.touristInfo.length; i < j; i++) {
                        let productInfo = this.touristInfo[i]['productInfo'];
                        if (productInfo.length < 1) {
                            result.push(this.touristInfo[i]);
                        }
                    }
                    if (result.length > 0) {
                        reject({
                            type : 'touristInfoErr',
                            data : result
                        });
                    } else {
                        resolve();
                    }
                });
            },
            /**
             * 获取需要校验的游客的产品信息
             */
            getChcekProducts () {
                let result = [];
                for (let i = 0,j = this.touristInfo.length; i < j; i++) {
                    let productInfo = this.touristInfo[i]['productInfo'];
                    let idTableData = this.touristInfo[i]['idTableData'];
                    //证件信息转对象
                    let idsObj = {};
                    for (let i = 0,j = idTableData.length; i < j; i++) {
                        idsObj[idTableData[i]['type']] = idTableData[i];
                    }
                    for (let a = productInfo.length - 1,b = 0; a >= b; a--) {
                        result.push({
                            productId : productInfo[a].productId,
                            documentType : productInfo[a].idType,
                            documentId : idsObj[productInfo[a].idType] ? idsObj[productInfo[a].idType]['data'] : '',
                            mobile : this.touristInfo[i].phone,
                            count : productInfo[a].takeNum,
                            productName : productInfo[a].productName,
                            visitorName : this.touristInfo[i].name
                        });
                    }
                }
                return result;
            }
        },
        computed : {
            //是否可以添加游客
            canAddTouristInfo () {
                for (let i = 0,j = this.productListFilter.length; i < j; i++) {
                    if (this.productListFilter[i]['leftNum'] > 0) {
                        return true;
                    }
                }
                return false;
            },
            //对产品信息进行过滤，获取产品剩余值
            productListFilter () {
                return this.productList.map(item => {
                    return {
                        ...item,
                        takeNum : 0,
                        leftNum : this.productChosedInfo[item.productId] ? item.num - this.productChosedInfo[item.productId] : item.num
                    };
                });
            },
            //游客已经选择的产品信息
            productChosedInfo () {
                let result = {};
                for (let i = 0,j = this.touristInfo.length; i < j; i++) {
                    if (this.touristInfo[i]['productInfo'] && this.touristInfo[i]['productInfo'].length > 0) {
                        let productInfo = this.touristInfo[i]['productInfo'];
                        for (let a = 0,b = productInfo.length; a < b; a++) {
                            if (productInfo[a]['productId'] in result) {
                                result[productInfo[a]['productId']] += productInfo[a]['takeNum'];
                            } else {
                                result[productInfo[a]['productId']] = productInfo[a]['takeNum'];
                            }
                        }
                    }
                }
                return result;
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .tourist-info{
        padding: 0 30px;

        .no-data-wrap{
            position: relative;
            height: 250px;
        }

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

                .hr{
                    height: 24px;
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
