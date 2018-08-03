<!--服务器菜单-->

<template>
  <div class="server-info">
    <div class="tab-list">
        <Button type="primary" @click="addServerModalShow = true">添加服务器</Button>
    </div>
    <table-com
      :table-data="tableData"
      :table-height="tableHeight"
      :column-data="columnData">
      <el-table-column
        label="操作"
        :width="60">
        <template slot-scope="scoped">
          <span class="watch" @click="toDetail">查看</span>
        </template>
      </el-table-column>
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
    <add-server v-model="addServerModalShow">
    </add-server>
  </div>
</template>

<script>
    import tableCom from '../index/child/tableCom';
    import noData from '@/components/noDataTip/noData-tip.vue';
    import loading from '@/components/loading/loading.vue';
    import tableMixins from '../lessee/tableMixins';
    import addServer from  './child/addServer';
    import {columns} from './serverConfig';
    export default {
        mixins : [tableMixins],
        components : {
          tableCom,
          noData,
          loading,
          addServer
        },
        data() {
            return {
              //表头配置
              columnData : columns,
              //新增服务器的模态框是否显示
              addServerModalShow : false
            }
        },
        methods: {
          //查看设备详情
          toDetail () {
            this.$router.push({
              name : 'serverDetail'
            });
          }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
  .server-info{
    position: relative;
    padding: 0 30px 0 30px;
    @include block_outline($height : unquote('calc(100% - 20px)'));
    @include padding_place();

    .tab-list{
      @include block_outline($height : 62px);
      padding: 15px 0;
    }

    .watch{
      color: $color_blue;
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
