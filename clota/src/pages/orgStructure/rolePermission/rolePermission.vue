<template>
  <!-- 角色权限 -->
  <div class="partner">
    <div class="orgHeader">
      <Select style="width: 180px;float: left;margin-right:10px">
        <Option value="132">全部公司景区</Option>
      </Select>
      <Select style="width: 180px;float: left;margin-right:10px">
        <Option value="132">全部业态</Option>
      </Select>
      <Select style="width: 180px;float: left;margin-right:10px">
        <Option value="132">全部角色名称</Option>
      </Select>
      <Button type="primary"  style="float: left;margin-right: 10px"  size="default" @click="search">查 询</Button>
      <Button type="ghost" style="float: left" size="default" @click="reset">重 置</Button>
    </div>
    <div>
      <el-table
        :data="tableData"
        :border="true"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="公司/景区名称">
          <template slot-scope="scope">
            <div class="cellText">水世界管理有限公司</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="业态类型">
          <template slot-scope="scope">
            <div>票务</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="合作伙伴名称">
          <template slot-scope="scope">
            <div>A级销售渠道</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="角色名称">
          <template slot-scope="scope">
            <div>产品操作员</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作">
          <template slot-scope="scope">
            <div class="operation">
              <span class="span-blue" @click="listDetail">查看详情(风景)</span>
              <span  @click="listDetail2">查看详情(公司)</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>



<script>
  import ajax from '@/api/ajaxList'
  //弹窗
  export default {
    components: {
    },
    data() {
      return {
        // 表单数据
        tableData: [{
          date: '2016-05-03',
        }],
      }
    },
    methods: {
      //查看详情
      listDetail(){
        this.$router.replace({'name':'roleDetail',query:{'detailType':'scenery'}})
      },
      listDetail2(){
        this.$router.replace({'name':'roleDetail',query:{'detailType':'company'}})
      },
      //重置
      reset(){

      },
      //查询
      search(){

      },
      init(){

      }
    },
    computed: {
    },
    created () {
    },
  }
</script>

<style lang="scss">
  @import '~@/assets/scss/base';
  @import '../commonFile/common';
  .partner{

  }
</style>
