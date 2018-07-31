<template>
  <div class="cooperativePartner">
      <div class="header">
        <Button type="primary" icon="md-add">新增合作伙伴</Button>
        <Button>批量操作</Button>
        <Input suffix="ios-search" placeholder="Enter text" style="width: auto" />
      </div>
  </div>
</template>



<script>
  import ajax from '@/api/ajaxList'
  export default {
    components: {
    },
    data () {
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
  .cooperativePartner{

  }
</style>
