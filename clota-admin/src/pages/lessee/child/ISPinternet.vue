<!--服务提供商-->

<template>
  <div class="isp-internet">
    <div class="create-lessee">
      <Button type="primary">
        <span @click="addModalShow = true">新建租户</span>
      </Button>
      <div class="search">
        <Input type="text" style="width: 200px" :placeholder="$t('lessPlaceholder')"/>
        <Button type="primary">查找</Button>
      </div>
    </div>
    <table-com
      :table-data="tableData"
      :table-height="tableHeight"
      :column-data="columnData"
      :row-click="false">
    </table-com>
    <div class="page-area" v-if="tableData.length > 0">
      <el-pagination
        :current-page="pageNo"
        :page-sizes="pageSizeConfig"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40">
      </el-pagination>
    </div>
    <no-data class="no-data"
             v-if="tableData.length < 1">
    </no-data>
    <loading :visible="isLoading">
    </loading>
    <!--新增租户-->
    <add-less v-model="addModalShow">
    </add-less>
  </div>
</template>

<script>
    import {columns} from './ISPinternetConfig';
    import tableCom from '../../index/child/tableCom';
    import noData from '@/components/noDataTip/noData-tip.vue';
    import loading from '@/components/loading/loading.vue';
    import tableMixins from '../tableMixins';
    import addLess from './ISPinternetChild/addLess';
    export default {
        mixins : [tableMixins],
        components : {
          tableCom,
          noData,
          loading,
          addLess
        },
        data() {
            return {
              //表头数据
              columnData : columns,
              //新增用户模态框是否显示
              addModalShow : false
            }
        },
        methods: {
        },
        computed : {
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
  .isp-internet{
    position: relative;
    @include block_outline();

    .create-lessee{
      @include block_outline($height : 62px);
      padding: 15px 0;

      .search{
        @include block_outline(262px);
        float: right;
        overflow: hidden;
      }
    }

    /deep/ .el-table td,
    /deep/ .el-table th{
      padding: 11px 0!important;
    }

    /deep/ .el-table::before{
      display: none;
    }

    .page-area{
      @include block_outline($height : 57px);
      text-align: right;

      /deep/ .el-pagination{
        display: inline-block;
        padding-top: 15px;
      }
    }

    .no-data{
      @include no_data();
    }
  }
</style>
