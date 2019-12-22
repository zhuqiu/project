<template>
  <div class="container">
    <div class="top-info">
      <top-info></top-info>
    </div>
    <div class="content-info">
      <content-info></content-info>
    </div>
    <div class="bottom-info footer">
      <bottom-info></bottom-info>
    </div>
  </div>
</template>

<script>

import topInfo  from'./TopInfo.vue'

import contentInfo from "./ContentInfo.vue";

import bottomInfo  from'./BottomInfo.vue'

export default {
  name: 'index',
  components:{
    topInfo,
    contentInfo,
    bottomInfo
  },
  data() {
    return {
    }
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .top-info,.content-info,.bottom-info{
    padding: 0 14px;
  }
  .top-info{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    line-height: 43px;
    z-index: 1;
    border-bottom: 1px solid #999999;
  }
  .content-info{
    position: absolute;
    top:41px;
    left: 0;
    right: 0;
    bottom: 41px;
    z-index: 1;
    overflow-y: auto;
  }
  .bottom-info{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    /* box-shadow: 0 8px 12px #ebedf0; */
    background: #fff;
  }


</style>
