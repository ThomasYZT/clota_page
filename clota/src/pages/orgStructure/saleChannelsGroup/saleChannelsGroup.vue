<template>
  <div class="saleChannelsGroup">
    <div class="orgHeader">
      <Button type="primary" icon="md-add" style="float: left;margin-right: 10px" @click="addGroup" size="default">新增分组</Button>
      <Button type="ghost"  style="float: left" size="default">批量操作</Button>
      <div class="search">
        <Input suffix="ios-search" placeholder="全部分组"/>
      </div>
    </div>
    <div class="selectionTable">
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
          label="渠道编码">
          <template slot-scope="scope">
            <div class="cellText"><span class="code">309287482</span></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="渠道名称">
          <template slot-scope="scope">
            <div>星火旅行社1</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="销售渠道类型">
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
              <span class="span-blue" @click="moveOutGroupBtn">移出分组</span>
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
      <Button @click="deleteGroupBtn">删除分组</Button>
    </div>
    <edit-dropdown></edit-dropdown>
    <!-- 移动分组弹窗 -->
    <move-out-group ref="moveOutGroupModal" @upDataList='init' :moveName="moveName"></move-out-group>
    <!-- 删除分组弹窗 -->
    <delete-group ref="deleteGroupModal" @upDataList='init' :pattnerName="pattnerName"></delete-group>
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
    <kw-popover ref="movePopover" :el="popoverEl" placement="left" align="top">
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
  import moveOutGroup from '../model/moveOutGroup.vue';
  import deleteGroup from  '../model/deleteGroup.vue';
  import kwPopover from '../../../components/popover/popover.vue';
  export default {
    components: {
      editDropdown,
      moveOutGroup,
      deleteGroup,
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
        moveName:'销售渠道',
        pattnerName:'A级销售渠道',
        popoverEl:'',
        offset:{
          top:8,
        }
      }
    },
    methods: {
      addGroup(event){
        this.popoverEl = event.currentTarget;
        this.$refs.addPopover.show();
      },
      moveInGroupBtn(event){
        this.popoverEl = event.currentTarget;
        this.$refs.movePopover.show();
      },
      moveOutGroupBtn(){
        this.$refs.moveOutGroupModal.show();
      },
      deleteGroupBtn(){
        this.$refs.deleteGroupModal.show();
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
  .add-group-popover{
    padding: 17px 20px;
    .popover-content{
      width: 240px;
      p{
        font-size: $font_size_12px;
        color: #666666;
        line-height: 16px;
        margin-bottom: 10px;
      }
    }
    .popover-footer{
      margin-top: 30px;
      text-align: right;
      button:first-child{
        margin-right: 10px;
      }
    }
  }
  .saleChannelsGroup{

  }
</style>
