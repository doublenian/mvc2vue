<template>
  <div class="test1-wrapper">
    <div class="test-class">test-page11</div>
    <el-button type="primary">主要按钮22</el-button>
    <my-table></my-table>
  </div>
</template>

<script>
import MyTable from "./my-table";
export default {
  components: {
    MyTable,
  },
  mounted() {},
};
</script>

<style lang="less">
.test1-wrapper {
  padding: 100px;
  .test-class {
    color: black;
  }
}
</style>