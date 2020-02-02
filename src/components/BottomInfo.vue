<template>
  <div class="content">
    <van-row class="operation-item">
      <van-col span="2" @click="onlineService">
        <div class="help-info">
          <van-icon name="phone-o" size="20"/>
        </div>
      </van-col>
      <van-col span="20" @click="sendRedClick">
        <div class="dispute-info">
          <div class="dispute-input">点击 发红包</div>
        </div>
      </van-col>
      <!-- <van-col span="2" @click="robotDeposit">
        <div class="setting-info" >
          <van-icon name="setting-o" size="20"/>
        </div>
      </van-col> -->
      <van-col span="2" @click="showMuchInfo">
        <div class="much-info">
          <van-icon name="add-o" size="20"/>
        </div>
      </van-col>
    </van-row>
    <div class="much-item" v-show="show">
      <van-row>
        <van-col span="6">
          <div class="item-detail">
            <div style="height:29px;line-height:29px;font-size: 20px;color:#1989fa;">{{ dataInfo.room.roomNo }}</div>
            <span>房间号</span>
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
        <!-- <van-col span="6" @click="robotDeposit">
          <div class="item-detail">
            <van-icon name="manager-o" size="30"/>
            <span>机器人设置</span>
          </div>
        </van-col> -->
        <!-- <van-col span="6" v-if="true" @click="findGroup">
          <div class="item-detail">
            <van-icon name="chat-o" size="30"/>
            <span>查找房间</span>
          </div>
        </van-col> -->
        <van-col span="6" @click="findGroup">
          <div class="item-detail">
            <van-icon name="chat-o" size="30"/>
            <span>查找房间</span>
          </div>
        </van-col>
        <van-col span="6" @click="creatGroup" v-if="!dataInfo.myRoom">
          <div class="item-detail">
            <van-icon name="brush-o" size="30"/>
            <span>创建房间</span>
          </div>
        </van-col>
        <van-col span="6" @click="groupSetting" v-if="dataInfo.myRoom && dataInfo.myRoom.roomNo === dataInfo.room.roomNo">
          <div class="item-detail">
            <van-icon name="setting-o" size="30"/>
            <span>房间设置</span>
          </div>
        </van-col>
        <van-col span="6" @click="enterRoom" v-if="dataInfo.myRoom && dataInfo.myRoom.roomNo != dataInfo.room.roomNo">
          <div class="item-detail">
            <van-icon name="aim" size="30"/>
            <span>进入我的房间</span>
          </div>
        </van-col>
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

    <group-model ref="group"></group-model>

    <group-setting-model ref="groupSetting" @change="settingChange"></group-setting-model>

    <group-list-model ref="groupList" @change="onchange"></group-list-model>
    
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

import groupModel from './Model/group-model.vue';

import groupSettingModel from './Model/group-setting-model.vue';

import groupListModel from './Model/group-list-model.vue';

import Api from '../../static/js/service-api';

import { splitParam }  from'../../static/js/utils';

export default {
  name: 'bottom-info',
   components:{
     sendRedPackageModel,
     robotDepositModel,
     onlineServiceModel,
     gameIntroduceModel,
     accountDetailsModel,
     commissionInfoModel,
     moneyTransferAccountModel,
     groupModel,
     groupSettingModel,
     groupListModel
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
      this.$router.push({name: 'welfarecenter'})
    },
    transfer(){
      this.$refs.transfer.show()
    },
    findGroup(){
      this.$refs.groupList.show();
    },
    groupSetting(){
      // this.$router.push({name: 'groupcenter'})
      this.$refs.groupSetting.show(this.dataInfo.myRoom,false);
    },
    creatGroup(){
      this.$refs.groupSetting.show();
    },
    enterRoom(){
      const data = JSON.parse(localStorage.getItem('data'));
      let obj = {
        roomNo: data.myRoom.roomNo,
        token: this.dataInfo.token
      }
      this.$axios.post(Api.serviceApi.changeRoom + splitParam(obj) ).then((res) =>{
        if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{
          this.getsyncUserInfo();
        }
      })
    },
    getsyncUserInfo(){
      let obj = {
        token: this.dataInfo.token
      }
      this.$axios.post(Api.serviceApi.getsyncUserInfo + splitParam(obj) ).then((res) => {
			  if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{
          localStorage.setItem('data',JSON.stringify(res.data.data)) 
          this.dataInfo = res.data.data;
          // this.$toast('已进入我的房间');
          window.location.reload();
        }
			})
    },
    onchange(obj){
      this.$refs.groupSetting.show(obj,true);
    },
    async settingChange(){
      await this.getsyncUserInfo();
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
