<template>
  <div>
    <van-row>
      <van-col span="12">
        <div class="person-info">
          <div class="info-img">
            <img :src="src" alt="">
          </div>
          <div class="con-info">
            <div class="info-name">账号：<span>{{ name }}</span></div>
            <div class="info-amout">金币：{{ amout }} </div>
          </div>
        </div>
      </van-col>
      <van-col span="12">
        <div class="person-operation">
          <div>
            <van-icon name="gold-coin-o" size="20"/>
            <span>提现</span>
            </div>
          <div @click="recharge">
            <van-icon name="balance-list-o" size="20"/>
            <span>充值</span>
          </div>
          <div>
            <van-icon name="fire-o" size="20"/>
            <span>推广</span>
          </div>
        </div>
      </van-col>
    </van-row>

    <!-- 充值弹框 -->
    <recharge-model ref="recharge"></recharge-model>

  </div>
</template>

<script>

import rechargeModel from './Model/recharge-model.vue'

export default {
  name: 'top-info',
   components:{
     rechargeModel:rechargeModel
  },
  data () {
    return {
      src:'',
      name:'',
      amout: null
    }
  },
  created(){
    this.name = this.dataInfo.loginName;
    this.amout = this.dataInfo.money;
    this.src = this.dataInfo.headImg ? data.headImg : '.././static/img/LC_icon_user_group_fill.png';
  },
  methods:{
    recharge(){
      this.$refs.recharge.show();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-info i{
  position: relative;
  top: 4px;
}
.person-info{
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.person-info .info-img img{
  width: 24px;
  border-radius: 50%;
  position: relative;
  top: 6px;
}
.person-info .con-info{
  display: flex;
  flex-direction: column;
  line-height: 14px;
  margin-left: 6px;
}
.person-info .con-info .info-name{
  font-size: 10px;
}
.person-info .con-info .info-name span{
  color: #07c160;
}
.person-info .con-info .info-amout{
  text-align: left;
  font-weight: 600;
}
.person-operation{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
