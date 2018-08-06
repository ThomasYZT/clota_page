<!--服务提供商详情-->

<template>
  <div class="isp-internet-detail">
    <bread-crumb-head
      :locale-router="$t('lesseeDetail')"
      :before-router-list="beforeRouterList">
    </bread-crumb-head>
    <div class="less-company-detail">
      <div class="structure">
        <structure-tree :tree-data="structureData">
        </structure-tree>
      </div>
      <company-detail>
      </company-detail>
    </div>
  </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import organization from '../organization/organization';
    import structureTree from '../organization/structureHead';
    import companyDetail from './ISPinternetDetailChild/companyDetail';
    export default {
        components : {
          breadCrumbHead,
          organization,
          structureTree,
          companyDetail
        },
        data() {
            return {
              //上级路由列表
              beforeRouterList : [
                {
                  name : this.$t('ISPinternet'),
                  router : {
                    name : 'ISPinternet'
                  }
                }
              ],
              //组织结构数据
              structureData : [
                {
                  title: '长隆旅游集团长隆旅游集团长隆旅游集团长隆旅游集团长隆旅游集团',
                  expand: true,
                  children: [
                    {
                      title: '长隆旅游集团',
                      expand: true,
                      children: [
                        {
                          title: '长隆旅游集团'
                        },
                        {
                          title: '长隆旅游集团'
                        }
                      ]
                    },
                    {
                      title: '长隆旅游集团',
                      expand: true,
                      children: [
                        {
                          title: '长隆旅游集团'
                        },
                        {
                          title: '长隆旅游集团'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
  .isp-internet-detail{
    @include block_outline();

    .less-company-detail {
      @include block_outline($height : unquote('calc(100% - 74px)'));
      margin-top: 20px;
      background: $color_fff;
      @include padding_place();
      overflow: auto;
      .structure {
        float: left;
        @include block_outline(400px);
        border-right: 1px solid $color_E1E1E1;
      }
    }
  }
</style>
