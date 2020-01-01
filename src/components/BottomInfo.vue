<template>
  <div class="content">
    <van-row class="operation-item">
      <van-col span="2">
        <div class="help-info">
          <van-icon name="service-o" size="20"/>
        </div>
      </van-col>
      <van-col span="18" @click="sendRedClick">
        <div class="dispute-info">
          <div class="dispute-input">点击 发红包</div>
        </div>
      </van-col>
      <van-col span="2" @click="robotDeposit">
        <div class="setting-info" >
          <van-icon name="setting-o" size="20"/>
        </div>
      </van-col>
      <van-col span="2" @click="showMuchInfo">
        <div class="much-info">
          <van-icon name="add-o" size="20"/>
        </div>
      </van-col>
    </van-row>
    <div class="much-item" v-show="show">
      <van-row>
        <van-col span="6" @click="onlineService">
          <div class="item-detail">
            <van-icon name="phone-o" size="30"/>
            <span>客服在线</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="item-detail">
            <van-icon name="manager-o" size="30"/>
            <span>充值客服</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="item-detail">
            <div style="height:30px;line-height:30px;font-size: 20px;color:#07c160;">{{ dataInfo.id }}</div>
            <span>复制我的ID</span>
          </div>
        </van-col>
        <van-col span="6" @click="gameIntroduce">
          <div class="item-detail">
            <van-icon name="other-pay" size="30"/>
            <span>玩法介绍</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="item-detail">
            <van-icon name="label-o" size="30"/>
            <span>记录明细</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="item-detail">
            <van-icon name="chart-trending-o" size="30"/>
            <span>推广管理</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="item-detail">
            <van-icon name="exchange" size="30"/>
            <span>金币互转</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="item-detail">
            <van-icon name="refund-o" size="30"/>
            <span>佣金福利</span>
          </div>
        </van-col>
      </van-row>
    </div>

    <send-red-package-model ref="sendRedPackage"></send-red-package-model>

    <robot-deposit-model ref="robotDeposit"></robot-deposit-model>

    <online-service-model ref="onlineService"></online-service-model>

    <game-introduce-model ref="gameIntroduce"></game-introduce-model>
  </div>
</template>

<script>

import sendRedPackageModel from './Model/send-red-package-model.vue';

import robotDepositModel from './Model/robot-deposit-model.vue';

import onlineServiceModel from './Model/online-service-model.vue';

import gameIntroduceModel from './Model/game-introduce-model.vue';

export default {
  name: 'bottom-info',
   components:{
     sendRedPackageModel:sendRedPackageModel,
     robotDepositModel:robotDepositModel,
     onlineServiceModel:onlineServiceModel,
     gameIntroduceModel:gameIntroduceModel
  },
  data () {
    return {
      show:false
    }
  },
  methods:{
    showMuchInfo(){
      this.show = !this.show;
    },
    sendRedClick(){
      this.$refs.sendRedPackage.show();
    },
    robotDeposit(){
      this.$refs.robotDeposit.show();
    },
    onlineService(){
      this.$refs.onlineService.show();
    },
    gameIntroduce(){
      this.$refs.gameIntroduce.show();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operation-item{
  height: 40px;
  line-height: 40px;
}
.dispute-info{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
}
.dispute-input{
  width: 96%;
  height: 24px;
  line-height: 24px;
  border-radius: 4px;
  color: #999;
  border: 1px solid #f0f3f6;
}
.help-info i,.setting-info i,.much-info i{
  position: relative;
  top: 5px;
}
.help-info{
  text-align: left;
}
.much-info{
  text-align: right;
}
.much-item{
  border-top: 1px solid #f0f3f6;
}
.much-item .item-detail{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 8px 0;
}
.much-item .item-detail span{
  color: #999;
}
</style>
