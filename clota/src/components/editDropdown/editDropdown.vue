<template>
  <div class="editDropdown">
    <div class="header">
      <span>全部分组</span>
      <span class="icon"></span>
    </div>
    <ul>
      <li>
        <div class="editInput">
          <div class="input">
            <Input v-model="value" size="small"/>
          </div>
          <span class="cancel">取消</span>
          <span class="save">保存</span>
        </div>
        <div class="edutText"><span>B级销售渠道</span></div>
        <div class="edutTextHover">
          <span class="text">B级销售渠道</span>
          <span class="delete"></span>
          <span class="edit"></span>
        </div>
      </li>
    </ul>
  </div>
</template>



<script>
  import ajax from '@/api/ajaxList'
  export default {
    components: {
    },
    data() {
      return {
      }
    },
    methods: {
    },
    computed: {
    },
    created () {
    },
  }
</script>

<style lang="scss"  scoped>
  @import '~@/assets/scss/base';
  .editDropdown{
    .header{
      background: #FFFFFF;
      border: 1px solid #E0E0E0;
      border-radius: 4px;
      width: 280px;
      height: 32px;
      line-height: 30px;
      font-size: 14px;
      color: #333333;
      padding: 0 13.5px;
      clear: both;
      overflow: hidden;
    }
    ul{
      li{
        width: 280px;
        .editInput{
          clear: both;
          overflow: hidden;
          .input{
            width: 191px;
            float: left;
            margin-top: 4px;
            margin-left: 10px;
          }
          .save{
            font-size: 12px;
            color: #2F70DF;
            float: right;
            line-height: 32px;
            margin-right: 5px;
          }
          .cancel{
            font-size: 12px;
            color: #999999;
            float: right;
            line-height: 32px;
            margin-right: 10px;
          }
        }
        .edutText{
          font-size: 14px;
          color: #333333;
          padding: 0 19px;
          line-height: 32px;
        }
        .edutTextHover{
          clear: both;
          overflow: hidden;
          line-height: 32px;
          padding: 0 19px;
          background: #EFF1F3;
          .text{
            font-size: 14px;
            color: #333333;
            width: 191px;
            float: left;
          }
          .delete{

          }
          .edit{

          }
        }
      }
    }
  }
</style>
