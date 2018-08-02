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
      <span>新增自营渠道</span>
    </div>
    <!--内容区域-->
    <Form ref="formValidate" :model="addPartner" :rules="ruleValidate" label-position="right" >
      <Form-item label="自营渠道名称" prop="name">
        <Input v-model="addPartner.name" placeholder="Enter something..." />
      </Form-item>

      <Form-item label="自营渠道类型">
        <RadioGroup v-model="addPartner.name">
          <Radio label="ok"><span>线上</span></Radio>
          <Radio label="no"><span>线下</span></Radio>
        </RadioGroup>
      </Form-item>

      <Form-item label="URL" >
        <Input v-model="addPartner.name" placeholder="Enter something..." />
      </Form-item>

    </Form>
    <!--自定义页脚-->
    <div slot="footer">
      <template >
        <i-button  size="small" type="primary">确认</i-button>
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
        visible: false, //显示模态框变量
        // 表单变量
        addPartner: {
          name: '',
        },
        ruleValidate: {
          name: [
            {required: true, message: '请输入小组名称', trigger: 'blur'},
          ],
        },
        //下拉菜单
        cityList: [
          {
            value: 'New York',
            label: 'New York'
          },
        ],
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
  /deep/.addPartner{
    .ivu-modal-body{
      padding: 42px 90px 40px 66px;
    }
  }
</style>
