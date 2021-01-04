<template>
  <div class="wrapper">
    <h2 class="paddingbt"><slot name="header"></slot></h2>
    <slot name="component"></slot>
  </div>
</template>

<script>
export default {
  name: 'MainView'
};
</script>

<style scoped>
.wrapper {
  margin: 100px auto;
}
.paddingbt {
  padding-bottom: 30px;
}
</style>
