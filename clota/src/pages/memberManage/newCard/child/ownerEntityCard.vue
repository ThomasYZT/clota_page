<!--
内容：业主卡 - 实体卡
作者：djc
日期：
-->

<template>
    <div class="entity-card-info">
        <h3>{{$t('entityCardInfo')}}</h3>
        <table-com
            :show-pagination="false"
            :column-data="columnData"
            :table-data="tableData"
            auto-height
            :table-com-min-height="250"
            :border="true">
            <el-table-column
                show-overflow-tooltip
                slot="column0"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <template v-if="scope.row.mainCard">
                     {{scope.row.custName | contentFilter}}{{$t('bracketSetting',{ content : this.$t('mainCard') })}}
                    </template>
                    <template v-else>
                        {{scope.row.custName | contentFilter}}{{$t('bracketSetting',{ content : this.$t('viceCard') })}}
                    </template>
                </template>
            </el-table-column>
            <el-table-column
                show-overflow-tooltip
                slot="column4"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li :class="{ disabled : !cardReadEnabled }" @click="readEntiryCard(scope.$index)">{{$t('readEntityCard')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>
<script type="text/ecmascript-6">
    import { entityCardHead } from './newCardConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import ajax from '@/api/index.js';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            tableCom
        },
        props : {
            idType : Array,
            //副卡信息
            'vice-card-info' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //主卡信息
            'main-card-info' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                // 表头配置
                columnData : entityCardHead,
                // 表格数据
                tableData : [
                    {
                        custName : "",
                        phoneNum : "",
                        birthDay : "",
                        gender : "",
                        certificationType : "",
                        idCardNumber : "",
                        tradePassword : "",
                        mainCard : true,
                        tpNo : '',
                        tpCardNo : '',
                    }
                ],
            };
        },
        watch : {
            //如果副卡信息改变，对应的实体卡信息也要改变
            viceCardInfo : {
                handler (newVal) {
                    if (newVal && newVal.length > 0) {
                        let tmpData = JSON.parse(JSON.stringify(this.tableData));
                        this.tableData = [tmpData[0],...this.viceCardInfo.map((item,i) => {
                            return {
                                ...item,
                                tpNo : tmpData[i] ? tmpData[i]['tpNo'] : '',
                                tpCardNo : tmpData[i] ? tmpData[i]['tpCardNo'] : '',
                            };
                        })];
                    } else {
                        this.tableData = this.tableData.slice(0,1);
                    }
                },
                deep : true
            },
            //主卡信息改变，重主卡实体卡视图
            mainCardInfo : {
                handler (newVal) {
                    if (newVal && Object.keys(newVal).length > 0) {
                        let tmpData = JSON.parse(JSON.stringify(this.tableData));
                        this.$set(this.tableData,0,{
                            custName : newVal.custName,
                            phoneNum : newVal.phoneNum,
                            birthDay : newVal.birthDay,
                            gender : newVal.gender,
                            certificationType : newVal.certificationType,
                            idCardNumber : newVal.idCardNumber,
                            tradePassword : newVal.tradePassword,
                            tpNo : tmpData[0]['tpNo'] ? tmpData[0]['tpNo'] : '',
                            tpCardNo : tmpData[0]['tpCardNo'] ? tmpData[0]['tpCardNo'] : '',
                            mainCard : true
                        });
                    }
                },
                deep : true
            }
        },
        methods : {
            /**
             * 读取实体卡信息
             * @param{Number} index
             */
            readEntiryCard (index) {
                if (!this.cardReadEnabled) return;
                this.$store.dispatch('getCardReadData').then(res => {
                    //校验当前页面是否已经使用了读取的卡
                    for (let i = 0,j = this.tableData.length; i < j; i++) {
                        if (this.tableData[i]['tpNo'] === res) {
                            this.$Message.warning(this.$t('entityCardUsedErr'));
                            return;
                        }
                    }
                    this.findByPhysicalNum(res).then(item => {
                        this.tableData[index]['tpNo'] = item.physicalNum;
                        this.tableData[index]['tpCardNo'] = item.faceNum;
                    }).catch((err) => {
                        if (err && err === 'M026') {
                            this.$Message.warning(this.$t('entityCardUsedErr'));
                        } else {
                            this.$Message.warning(this.$t('noMatchCard'));
                        }
                        this.tableData[index]['tpNo'] = '';
                        this.tableData[index]['tpCardNo'] = '';
                    });
                });
            },
            /**
             * 查看实体卡是否可以使用
             * @param{String} physicalNum
             * @return{Object} promise对象
             */
            findByPhysicalNum (physicalNum) {
                return new Promise((resolve,reject) => {
                    ajax.post('findByPhysicalNum',{
                        physicalNum : physicalNum,
                        entityCardType : 'common'
                    }).then((res) => {
                        if (res.success) {
                            if (res.data && Object.keys(res.data).length > 0) {
                                resolve(res.data);
                            } else {
                                reject();
                            }
                        } else {
                            if (res.code && res.code === 'M026') {
                                reject('M026');
                            } else {
                                reject();
                            }
                        }
                    }).catch(() => {
                        reject();
                    });
                });
            },
            /**
             * 获取已经读取的实体卡信息
             * @return{Array} 已经读取的实体卡信息
             */
            getEntityCardInfo () {
                return this.tableData;
            }
        },
        computed : {
            ...mapGetters({
                cardReadEnabled : 'cardReadEnabled'
            })
        }
    };
</script>

<style lang="scss">
    @import '~@/assets/scss/base';
    .entity-card-info{

        h3 {
            margin-top: 20px;
            margin-bottom: 20px;
            text-align: center;
            font-size: $font_size_16px;
            color: $color_333;
        }
    }
</style>
