<!--
内容：积分率信息
作者：
日期：
-->

<template>
    <div class="order-info">
        <h3>{{$t('积分率信息')}}</h3>
        <div class="sub-title">{{$t('按会员级别享受积分、折扣率信息')}}</div>
        <table-com
            :ofsetHeight="170"
            :column-data="byLevelHead"
            :table-data="[]"
            :border="true">

        </table-com>
        <div class="sub-title">{{$t('按店铺享受积分、折扣率信息')}}</div>
        <table-com
            :ofsetHeight="170"
            :column-data="byShopHead"
            :table-data="[]"
            :border="true">

        </table-com>
        <div class="sub-title">{{$t('按产品享受积分、折扣率信息')}}</div>
        <table-com
            :ofsetHeight="170"
            :column-data="byProductHead"
            :table-data="[]"
            :border="true">

        </table-com>
    </div>
</template>
<script type="text/ecmascript-6">
    import {byLevelHead, byShopHead, byProductHead} from '../infoListConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';

  export default {
    components: {tableCom},
    props: {},
    data() {
      return {
          byLevelHead: byLevelHead,
          byShopHead: byShopHead,
          byProductHead: byProductHead,
      }
    },
    computed: {},
    created() {
    },
    mounted() {
    },
    watch: {},
    methods: {}
  };
</script>

<style lang="scss" scoped>
    .order-info-integral {
        margin: 25px 30px;

        > h3 {
            font-family: PingFangSC-Medium;
            margin-bottom: 15px;
            font-size: 20px;
            color: rgba(0, 0, 0, 0.85);
        }
    }
</style>
