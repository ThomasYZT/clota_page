<template>
  <Modal
    v-model="visible"
    class="addPartner"
    class-name="vertical-center-modal"
    :mask-closable="false"
    :width="560"
    @on-cancel="hide">
    <!--自定义页头-->
    <div slot="header" class="ivu-modal-header-inner">
      <span>新增合作伙伴</span>
    </div>
    <!--内容区域-->
    <div>
      <p>已选：6人</p>
      <div class="selectionTable">
        <el-table
          :data="tableData"
          :border="true"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="date"
            label="员工姓名">
            <template slot-scope="scope">
              <div class="cellText">张小床</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="员工账号">
            <template slot-scope="scope">
              <div>zhangxiaoc</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="部门">
            <template slot-scope="scope">
              <div>采购部</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="管理景区">
            <template slot-scope="scope">
              <div>长隆欢乐世界</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!--自定义页脚-->
    <div slot="footer">
      <template >
        <i-button  size="small" type="primary">保存</i-button>
        <i-button  class="ivu-btn-cancel" size="small" @click="hide">取消</i-button>
      </template>
    </div>

  </Modal>

</template>

<script type="text/ecmascript-6">
  export default {
    components: {},
    props:[],
    data () {
      return {
        visible: false,
        tableData:[],
      }
    },
    computed: {
    },
    created(){
    },
    watch: {

    },
    methods: {

      /**
       * 显示模态框
       * @param data {data有值表示查看，反之新增}
       */
      show( data ){
        this.visible = true;
      },
      /**
       * 隐藏模态框
       */
      hide(){
        this.visible = false;
      },
      /**
       * 创建自定义指标表单校验
       */
      submit(){
        this.$refs.formValidate.validate((valid) => {
          if ( valid ) {

          }else{
          }
        });
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/base';
  @import '../commonFile/common';
  /deep/.addPartner{
    .ivu-modal-body{
      padding: 42px 90px 40px 66px;
    }
  }
</style>
