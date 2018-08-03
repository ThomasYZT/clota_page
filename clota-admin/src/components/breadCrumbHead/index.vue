<!--面包屑导航条-->

<template>
  <div class="bread-crumb-head">
    <Breadcrumb>
      <BreadcrumbItem to="/">Home</BreadcrumbItem>
      <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
  .bread-crumb-head{
    @include block_outline($height : 54px);
    padding: 16px 32px;
    background: $color_fff;
  }
</style>
