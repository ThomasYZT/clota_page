<template>
  <!-- 新增员工页面 -->
  <div class="partner">
    <div class="orgHeader">
      <Button type="primary" icon="md-add" style="float: left;margin-right: 10px" @click="addPartnerBtn" size="default"><span class="add-icon">+</span>新增员工</Button>
      <div class="search">
        <Input suffix="ios-search" placeholder="请输入任意信息进行查询" />
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        :border="true"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="员工ID">
          <template slot-scope="scope">
            <div class="cellText">309287482</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="登录名">
          <template slot-scope="scope">
            <div>adminclota01</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="姓名">
          <template slot-scope="scope">
            <div>张贝贝</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="企业/景区名称">
          <template slot-scope="scope">
            <div>银科环企有限公司</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="部门名称">
          <template slot-scope="scope">
            <div>销售部门</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="角色权限">
          <template slot-scope="scope">
            <div>长隆欢乐园管理员、深圳…</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="电话">
          <template slot-scope="scope">
            <div>1722727378</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作">
          <template slot-scope="scope">
            <div class="operation">
              <span>修改</span>
              <span @click="deleteEmployeeBtn">删除</span>
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
    <delete-list ref="delListModal"  @deletions="deletions" :deleteName="deleteName" :name="name"></delete-list>
  </div>
</template>



<script>
  import ajax from '@/api/ajaxList';
  //删除列表弹窗
  import deleteList from '../model/deleteList.vue';
  export default {
    components: {
      deleteList,
    },
    data() {
      return {
        //表单数据
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        deleteName:'删除员工',  //删除内容名字
        name:'售票处终端001', //删除弹窗名字
      }
    },
    methods: {
      //新增员工
      addPartnerBtn(){
      },
      //删除员工
      deleteEmployeeBtn(){
        this.$refs.delListModal.show();
      },
      //确认删除
      deletions(){

      },
      // 初始化加载数据
      init(){

      }
    },
    computed: {
    },
    created () {
    },
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/base';
  @import '../commonFile/common';
  .partner{

  }
</style>
