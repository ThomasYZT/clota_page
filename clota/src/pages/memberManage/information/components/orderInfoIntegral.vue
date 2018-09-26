<!--
内容：积分率信息
作者：
日期：
-->

<template>
    <div class="order-info">
        <h3>{{$t('积分率信息')}}</h3>
        <div class="sub-title">{{$t('按会员级别享受积分、折扣率信息')}}</div>
        <div style="width: 515px;">
            <table-com
                :ofsetHeight="170"
                :column-data="byLevelHead"
                :table-data="infoData.memberList ? [infoData.memberList] : []"
                :table-com-min-height="300"
                :border="true">
                <el-table-column
                    slot="column0"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        1 {{$t('integral')}} = {{scope.row.scoreRate}} {{$t('yuan')}}
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column1"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span v-if="lang == 'zh-CN'">{{scope.row.discountRate}}{{$t('discount')}}</span>
                        <span v-if="lang != 'zh-CN'">{{(1-scope.row.discountRate)*100}}{{$t('discount')}}</span>
                    </template>
                </el-table-column>
            </table-com>
        </div>

        <div class="sub-title">{{$t('按店铺享受积分、折扣率信息')}}</div>
        <div style="width: 665px;">
            <table-com
                :ofsetHeight="170"
                :column-data="byShopHead"
                :table-data="infoData.storeList"
                :table-com-min-height="300"
                :border="true">
                <el-table-column
                    slot="column1"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        1 {{$t('integral')}} = {{scope.row.deptScoreRate}} {{$t('yuan')}}
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column2"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span v-if="lang == 'zh-CN'">{{scope.row.deptDiscountRate}}{{$t('discount')}}</span>
                        <span v-if="lang != 'zh-CN'">{{(1-scope.row.deptDiscountRate)*100}}{{$t('discount')}}</span>
                    </template>
                </el-table-column>
            </table-com>
        </div>

        <div class="sub-title">{{$t('按产品享受积分、折扣率信息')}}</div>
        <table-com
            :ofsetHeight="170"
            :column-data="byProductHead"
            :table-data="typeList"
            :table-com-min-height="300"
            :border="true">
            <el-table-column
                slot="column2"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    1 {{$t('integral')}} = {{scope.row.prodScoreRate}} {{$t('yuan')}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column3"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span v-if="lang == 'zh-CN'">{{scope.row.prodDiscountRate}}{{$t('discount')}}</span>
                    <span v-if="lang != 'zh-CN'">{{(1-scope.row.prodDiscountRate)*100}}{{$t('discount')}}</span>
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>
<script type="text/ecmascript-6">
    import {byLevelHead, byShopHead, byProductHead} from '../infoListConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {mapGetters} from 'vuex';

  export default {
    components: {tableCom},
    props: {
        infoData: {
            type: Object,
            default: {}
        }
    },
    data() {
      return {
          byLevelHead: byLevelHead,
          byShopHead: byShopHead,
          byProductHead: byProductHead,
      }
    },
    computed: {
        ...mapGetters({
            lang : 'lang'
        }),
        typeList() {
            if (this.infoData.typeList) {
                let typeEntries = Object.entries(this.infoData.typeList);
                for (let i=0; i<typeEntries.length; i++) {
                    typeEntries[i] = Object.assign({orgName: typeEntries[i][0]}, typeEntries[i][1][0]);
                }
                return typeEntries;
            } else {
                return [];
            }
        }
    },
    created() {
    },
    mounted() {
    },
    watch: {},
    methods: {}
  };
</script>

<style lang="scss" scoped>
    .order-info {
        margin: 25px 30px;

        > h3 {
            font-family: PingFangSC-Medium;
            margin-bottom: 15px;
            font-size: 20px;
            color: rgba(0, 0, 0, 0.85);
        }

        .sub-title {
            margin: 20px 0 10px 0;
            color: #333;
        }
    }
</style>
