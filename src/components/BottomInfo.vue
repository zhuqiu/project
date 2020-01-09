<template>
  <div class="content">
    <van-row class="operation-item">
      <van-col span="2" @click="rechargeService">
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
        <van-col span="6" @click="rechargeService">
          <div class="item-detail">
            <van-icon name="manager-o" size="30"/>
            <span>充值客服</span>
          </div>
        </van-col>
        <van-col span="6" @click="copeID">
          <div class="item-detail">
            <div style="height:29px;line-height:29px;font-size: 20px;color:#07c160;">{{ dataInfo.inviteCode }}</div>
            <span>复制我的ID</span>
          </div>
        </van-col>
        <van-col span="6" @click="gameIntroduce">
          <div class="item-detail">
            <van-icon name="other-pay" size="30"/>
            <span>玩法介绍</span>
          </div>
        </van-col>
        <van-col span="6" @click="recordDetail">
          <div class="item-detail">
            <van-icon name="label-o" size="30"/>
            <span>记录明细</span>
          </div>
        </van-col>
        <van-col span="6" @click="commission">
          <div class="item-detail">
            <van-icon name="chart-trending-o" size="30"/>
            <span>推广管理</span>
          </div>
        </van-col>
        <van-col span="6" @click="transfer">
          <div class="item-detail">
            <van-icon name="exchange" size="30"/>
            <span>金币互转</span>
          </div>
        </van-col>
        <!-- <van-col span="6">
          <div class="item-detail">
            <van-icon name="refund-o" size="30"/>
            <span>佣金福利</span>
          </div>
        </van-col> -->
      </van-row>

      <input id="copy_content" type="text" value=""  style="position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;"/>
    </div>

    <send-red-package-model ref="sendRedPackage"></send-red-package-model>

    <robot-deposit-model ref="robotDeposit"></robot-deposit-model>

    <online-service-model ref="onlineService"></online-service-model>

    <game-introduce-model ref="gameIntroduce"></game-introduce-model>

    <account-details-model ref="accountDetail"></account-details-model>

    <commission-info-model ref="commission"></commission-info-model>

    <money-transfer-account-model ref="transfer"></money-transfer-account-model>
  </div>
</template>

<script>

import sendRedPackageModel from './Model/send-red-package-model.vue';

import robotDepositModel from './Model/robot-deposit-model.vue';

import onlineServiceModel from './Model/online-service-model.vue';

import gameIntroduceModel from './Model/game-introduce-model.vue';

import accountDetailsModel from './Model/account-details-model.vue';

import commissionInfoModel from './Model/commission-info-model.vue';

import moneyTransferAccountModel from './Model/money-transfer-account-model.vue';

export default {
  name: 'bottom-info',
   components:{
     sendRedPackageModel,
     robotDepositModel,
     onlineServiceModel,
     gameIntroduceModel,
     accountDetailsModel,
     commissionInfoModel,
     moneyTransferAccountModel
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
    },
    rechargeService(){
      this.$toast('该功能正在努力开发中');
    },
    copeID(){
      //获取点击的值
      var clickContent = this.dataInfo.inviteCode;
      //获取要赋值的input的元素
      var inputElement =  document.getElementById("copy_content");
      //给input框赋值
      inputElement.value = clickContent;
      //选中input框的内容
      inputElement.select();
      // 执行浏览器复制命令
      document.execCommand("Copy");

      this.$toast('复制成功');
    },
    recordDetail(){
      this.$refs.accountDetail.show();
    },
    commission(){
      this.$toast('该功能正在努力开发中');
      //this.$refs.commission.show()
    },
    transfer(){
      this.$refs.transfer.show()
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
