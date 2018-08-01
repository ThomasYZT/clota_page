<template>
  <Modal
    v-model="visible"
    class="deleteSelfSupport"
    class-name="vertical-center-modal"
    :mask-closable="false"
    :width="420"
    @on-cancel="hide">
    <!--自定义页头-->
    <div slot="header" class="ivu-modal-header-inner">
      <span>删除渠道</span>
    </div>
    <!--内容区域-->
    <div class="content">
      <div class="text">
        <span>您正在删除渠道：</span>
        <span class="name">{{selfSupportName}}</span>
      </div>
      <div class="text">
        <span class="tips">本操作不可撤销，</span>
        <span>是否确认删除？</span>
      </div>
    </div>
    <!--自定义页脚-->
    <div slot="footer">
      <template >
        <i-button  class="ivu-btn-error" size="small" type="primary">确认</i-button>
        <i-button  class="ivu-btn-cancel" size="small" @click="hide">取消</i-button>
      </template>
    </div>

  </Modal>

</template>

<script type="text/ecmascript-6">
  export default {
    components: {},
    props:['selfSupportName'],
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
  /deep/.deleteSelfSupport{
    .ivu-modal-body{
      padding-top: 54px;
      padding-bottom: 62px;
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  .deleteSelfSupport{
    .content{
      text-align: center;
      .text{
        font-size: $font_size_12px;
        color: #333333;
        line-height: 24px;
        .name{
          color: $color_yellow;
        }
        .tips{
          color: $color_red;
        }
      }
    }
  }
</style>
