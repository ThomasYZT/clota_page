<template>
  <div class="verificateGroup">
    <div class="orgHeader">
      <Button type="primary" icon="md-add" style="float: left;margin-right: 10px" @click="addGroup" size="default">新增分组</Button>
      <Button style="float: left" type="ghost" size="default" @click="modifyVerificateBtn">批量操作</Button>
      <div class="search">
        <Input suffix="ios-search" placeholder="全部分组" />
      </div>
    </div>
    <div>
      <el-table
        :data="tableData3"
        :border="true"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="date"
          label="编码">
          <template slot-scope="scope">
            <div class="cellText"><span class="code">309287482</span></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="核销款台名称">
          <template slot-scope="scope">
            <div>星火旅行社1</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="款台类型">
          <template slot-scope="scope">
            <div>A级销售渠道</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="服务器名称">
          <template slot-scope="scope">
            <div>A级销售渠道</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作">
          <template slot-scope="scope">
            <div class="operation">
              <span class="move" @click="moveInGroupBtn">移动到</span>
              <span class="moveGroup" @click="moveGroup">移出分组</span>
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
    <edit-dropdown></edit-dropdown>
    <!-- 编辑核销 -->
    <modify-verificate  ref="modifyVerificateModal" @upDataList='init' ></modify-verificate>
    <move-out-group ref="moveOutGroupModal" @upDataList='init' :moveName="moveName"></move-out-group>
    <!-- 新增分组 -->
    <kw-popover ref="addPopover" :el="popoverEl" placement="bottom" align="left" :offset="offset">
      <div class="add-group-popover">
        <div class="popover-content">
          <p>新增分组名称</p>
          <Input  placeholder="请输入" />
        </div>
        <div class="popover-footer">
          <Button type="primary" size="small" >保存</Button>
          <Button type="ghost" size="small" >取消</Button>
        </div>
      </div>
    </kw-popover>
    <!-- 移动分组 -->
    <kw-popover ref="movePopover" :el="popoverEl" placement="right" align="top">
      <div class="add-group-popover">
        <div class="popover-content">
          <p>将所选销售渠道移至分组</p>
          <Select >
            <Option value="132">123</Option>
          </Select>
        </div>
        <div class="popover-footer">
          <Button type="primary" size="small" >保存</Button>
          <Button type="ghost" size="small" >取消</Button>
        </div>
      </div>
    </kw-popover>
  </div>
</template>



<script>
  import ajax from '@/api/ajaxList'
  import editDropdown from '../../../components/editDropdown/editDropdown.vue';
  //弹窗
  import modifyVerificate from  '../model/modifyVerificate.vue';
  import moveOutGroup from '../model/moveOutGroup.vue';
  import kwPopover from '../../../components/popover/popover.vue';
  export default {
    components: {
      editDropdown,
      modifyVerificate,
      moveOutGroup,
      kwPopover
    },
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        listFilters: {
          stateFilter: [{name: '全部', state: 'all'}, {name: '已签到', state: 'ok'}, {name: '未签到', state: 'leak'}],
          alertFilter: [{name: '不限', alert: 'all'}, {name: '异常', alert: 'alert'}, {
            name: '正常',
            alert: 'normal'
          }],
        },
        enableValue:true,
        moveName:'核销设备',
        popoverEl:'',
        offset:{
          top:8,
        }
      }
    },
    methods: {
      modifyVerificateBtn(){
        this.$refs.modifyVerificateModal.show();
      },
      addGroup(event){
        this.popoverEl = event.currentTarget;
        this.$refs.addPopover.show();
      },
      moveInGroupBtn(event){
        this.popoverEl = event.currentTarget;
        this.$refs.movePopover.show();
      },
      moveGroup(){
        this.$refs.moveOutGroupModal.show();
      },
      init(){

      },
    },
    computed: {
    },
    created () {
    },
  }
</script>

<style lang="scss">
  @import '~@/assets/scss/base';
  .verificateGroup{

  }
</style>
