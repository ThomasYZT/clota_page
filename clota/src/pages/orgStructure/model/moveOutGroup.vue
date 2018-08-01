<template>
  <Modal
    v-model="visible"
    class="moveOutGroup"
    class-name="vertical-center-modal"
    :mask-closable="false"
    :width="420"
    @on-cancel="hide">
    <!--自定义页头-->
    <div slot="header" class="ivu-modal-header-inner">
      <span>移出分组</span>
    </div>
    <!--内容区域-->
    <div class="content">
      将所选{{moveName}}从本分组移出后，将列入未分组中。
     </div>
    <!--自定义页脚-->
    <div slot="footer">
      <template >
        <i-button   size="small" type="primary">移出</i-button>
        <i-button  class="ivu-btn-cancel" size="small" @click="hide">取消</i-button>
      </template>
    </div>

  </Modal>

</template>

<script type="text/ecmascript-6">
  export default {
    components: {},
    props:['moveName'],
    data () {
      return {
        visible: false,
        readonly: false,
        loading: false,
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
  /deep/.moveOutGroup{
    .ivu-modal-body{
      padding-top: 54px;
      padding-bottom: 61px;
      padding-left: 80px;
      padding-right: 120px;
    }
  }
  .moveOutGroup{
    .content{
      font-size: 14px;
      color: #333333;
    }
  }
</style>
