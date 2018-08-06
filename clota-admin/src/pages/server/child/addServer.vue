<!--新增服务器-->

<template>
  <div class="add-server">
    <bread-crumb-head
      :locale-router="$t('addServer')"
      :before-router-list="beforeRouterList">
    </bread-crumb-head>
    <div class="add-server-info">
      <Form ref="formValidate"
            :model="formData"
            label-position="right"
            :rules="ruleValidate"
            :label-width="100">
        <Row>
          <Col span="11">
            <FormItem :label="$t('serverName')" prop="serverName">
              <Input v-model="formData.serverName"  style="width: 280px"/>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem :label="$t('ipAddress')" prop="IPname">
              <Input v-model="formData.IPname" style="width: 280px"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
            <FormItem :label="$t('usingService')">
              <Input v-model="formData.usingService" style="width: 280px"/>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem :label="$t('system')">
              <Select v-model="formData.system" style="width:280px">
                <Option v-for="item in systemList"
                        :value="item.value"
                        :key="item.value">
                  {{ item.label }}
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
            <FormItem :label="$t('systemType')">
              <Select v-model="formData.systemType" style="width:280px">
                <Option v-for="item in systemTypeList"
                        :value="item.value"
                        :key="item.value">
                  {{ $t(item.label,{bit : item.value}) }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem :label="$t('listenRate')">
              <Select v-model="formData.listenRate" style="width:280px">
                <Option v-for="item in listenRateEnum"
                        :value="item.value"
                        :key="item.value">
                  {{item.value + $t(item.label)}}
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
            <FormItem :label="$t('changePass')">
              <Input v-model="formData.password" style="width: 280px"/>
            </FormItem>
          </Col>
        </Row>
        <FormItem :label="$t('systemDesc')">
          <Input v-model="formData.systemDesc" type="textarea" style="width: 704px"/>
        </FormItem>
      </Form>
      <div class="footer">
        <Button type="primary" @click="save" class="ivu-btn-min" :loading="addLoading">{{$t('addNew')}}</Button>
        <Button @click="cancel" class="ivu-btn-min">{{$t('cancel')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
  import {validator} from 'klwk-ui';
  import {listenRateEnum,systemTypeList} from '@/assets/js/constVariable.js';
  export default {
    components : {
      breadCrumbHead
    },
    data() {
      return {
        //上级路由列表
        beforeRouterList : [
          {
            name : this.$t('serverList'),
            router : {
              name : 'server'
            }
          }
        ],
        //表单数据
        formData : {
          //服务器名称
          serverName : '',
          //ip地址
          IPname : '',
          //应用服务
          usingService : '',
          //系统
          system : '',
          //系统类型
          superior : '',
          //监控频率
          listenRate : '',
          //系统描述
          systemDesc : '',
          //密码
          password  : ''
        },
        //表单校验规则
        ruleValidate : {
          serverName : [
            {required : true,message : this.$t('validateError.pleaseInput',{msg : this.$t('serverName')}),trigger : 'blur'},
          ],
          IPname : [
            {required : true,message : this.$t('validateError.pleaseInput',{msg : this.$t('ipAddress')}),trigger : 'blur'},
          ],
        },
        //系统列表
        systemList : [
          {
            value: 'New York',
            label: 'New York'
          },
        ],
        //系统类型列表
        systemTypeList : systemTypeList,
        //监控频率
        listenRateEnum : listenRateEnum,
        //是否正在添加中
        addLoading : false
      }
    },
    methods: {
      /**
       * 保存新增租户数据
       */
      save () {
        this.addLoading = true;
        this.$refs.formValidate.validate(valid => {
          console.log(valid)
          this.addLoading = false;
        });
      },
      /**
       * 取消新增
       */
      cancel () {
        this.$router.push({
          name : 'ISPinternet'
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/base';
  .add-server{
    @include block_outline();

    .add-server-info{
      @include block_outline($height : unquote('calc(100% - 74px)'));
      margin-top: 20px;
      background: $color_fff;
      @include padding_place();
      padding: 26px 60px;
      overflow: auto;

      /deep/ .ivu-form{
        @include block_outline(924px,auto);
        margin: 0 auto;

        textarea.ivu-input{
          height: 100px;
        }
      }
    }

    .footer{
      text-align: center;
      margin-top: 40px;

      /deep/ .ivu-btn-primary{
        margin-right: 18px;
      }
    }
  }
</style>
