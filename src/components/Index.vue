<template>
  <div class="container">
    <div class="top-info">
      <top-info ref="topinfo" @infoClick="onInfoClick"></top-info>
    </div>
    <div class="content-info">
      <content-info ref="contentinfo" @contentDataChange="onContentDataChange"></content-info>
    </div>
    <div class="bottom-info footer">
      <bottom-info ref="bottominfo"></bottom-info>
    </div>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
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
      show: false,
      actions: [{
        name: '更换头像'
      }
      // ,{
      //   name: '退出登录'
      // }
      ]
    }
  },
  mounted(){
    this.$nextTick(() => {
      let that = this;
      let ele = document.querySelector('.content-info');
      ele.addEventListener('touchstart',function(){
        if(that.$refs.bottominfo.show){
          that.$refs.bottominfo.show = false
        }
      })
    })
  },
  methods:{
    onContentDataChange(data){
      this.$refs.topinfo.change(data);
    },
    onInfoClick(){
      this.show = true;
    },
    onSelect(item){
      if(item.name === '退出登录'){
        this.$router.push({name:'login'});
        this.$toast('退出成功');
        localStorage.removeItem('data');
      }else if(item.name === '更换头像'){
        this.$toast('该功能正在努力开发中');
      }
    }
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
    border-bottom: 1px solid #eeeeee;
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
  .van-action-sheet__name{
    font-size: 14px;
  }

</style>
