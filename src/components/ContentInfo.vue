<template>
  <div>
    <div class="notice">
      <van-notice-bar
        :text="noticeText"
      />
    </div>
    <ul class="list-item">
      <li v-for="(item,index) in listData" :key="index" class="item-info" :class="item.status ? 'item-left' : 'item-right'">
        <van-row>

          <!-- 为自己的红包展示区 -->
          <van-col :span="item.status ? '4' : '20'" :class="{right:!item.status}">
            <div v-if="!item.status"  class="item-con" @click="redPackageClick(item)">
              <div class="con-top" :class="{'has-empty': item.hasStatus || item.robbedBao === item.baoAmount }">
                  <van-row>
                    <van-col span="6">
                      <img class="red-package" src="../../static/img/red-package.png" alt="">
                    </van-col>
                    <van-col span="16">
                      <div class="con-title">
                        {{ item.redName }}
                      </div>
                      <div class="con-title" style="margin-top:4px;">已抢：{{ item.robbedBao }} / {{ item.baoAmount }}</div>
                    </van-col>
                  </van-row>
              </div>
              <div class="con-bottom">
                <span v-if ="item.robbedBao != item.baoAmount">恭喜发财，大吉大利</span>
                <span v-else>已抢完</span>
              </div>
            </div>
            <img v-if=" item.status" :src="item.sendHeadImg?item.sendHeadImg: '.././static/img/LC_icon_user_group_fill.png'" class="item-img">
          </van-col>

          <!-- 别人发的红包展示区 -->
          <van-col :span="item.status ? '20' : '4'" :class="{left: item.status}">
            <div v-if="item.status"  class="item-con" @click="redPackageClick(item)">
              <div class="con-top" :class="{'has-empty': item.hasStatus || item.robbedBao === item.baoAmount }">
                  <van-row>
                    <van-col span="6">
                      <img class="red-package" src="../../static/img/red-package.png" alt="">
                    </van-col>
                    <van-col span="16">
                      <div class="con-title">
                        {{ item.redName }}
                      </div>
                      <div class="con-title" style="margin-top:4px;">已抢：{{ item.robbedBao }} / {{ item.baoAmount }}</div>
                    </van-col>
                  </van-row>
              </div>
              <div class="con-bottom">
                <span v-if ="item.robbedBao != item.baoAmount">恭喜发财，大吉大利</span>
                <span v-else>已抢完</span>
              </div>
            </div>
            <img v-if="!item.status" :src="item.sendHeadImg?item.sendHeadImg: '.././static/img/LC_icon_user_group_fill.png'" class="item-img">
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24">
            <ul class="msg-item">
              <li v-for="(msg, msgdex) in item.hasList" :key="msgdex">
                <img src="../../static/img/img01.png" alt="">
                <span>{{ msg }}</span>
              </li>
            </ul>
          </van-col>
        </van-row>
      </li>
    </ul>
    <!--红包详情弹框-->
    <red-package-model ref="redPackage" @redOpen="onRedOpen"></red-package-model>

    <!--账户详情弹框-->
    <account-details-model ref="accountDetails"></account-details-model>

    <!-- mqtt通信组件 -->
    <mqtt ref="mqtt" :topic="clientParams.topic" :tousepic="clientParams.tousepic" @messageArrived="onMessageArrived"></mqtt>
  </div>
</template>
<script>

import redPackageModel from './Model/red-package-model.vue';

import accountDetailsModel from './Model/account-details-model.vue'

import mqtt from './views/mqtt'



export default {
  name: 'content-info',
  components:{
    redPackageModel: redPackageModel,
    accountDetailsModel: accountDetailsModel,
    mqtt:mqtt
  },
  data() {
    return {
      show:true,
      isLoading: false,
      count: 0,
      noticeText: '佣金满100可找客服领取28彩金，右上角推广可获高额佣金，充值或提现异常请联系客服。',
      listData: [],
      clientParams: {
        hostname: '',
        port: undefined,
        topic: '',
        clientId:new Date().getTime()+"",
        userName: '',
        password: ''
      }
    }
  },
  mounted() {

    this.clientParams.hostname =  this.dataInfo.mqttIp; //'47.106.88.215';
    this.clientParams.port = this.dataInfo.mqttPort; //9000;
    this.clientParams.topic = this.dataInfo.mqttTopic; //'user2/3';
    this.clientParams.tousepic = this.dataInfo.mqttUserTopic;
    this.clientParams.userName = this.dataInfo.mqttUsername;
    this.clientParams.password = this.dataInfo.mqttPassword;

    if(localStorage.getItem('list')){
      this.listData = JSON.parse(localStorage.getItem('list')).concat([]);
    }

    this.$refs.mqtt.buildConnect(this.clientParams) // 建立mqtt通信
  },
  beforeDestroy () {
    this.$refs.mqtt.disconnect() // 关闭页面断开mqtt连接
  },
  methods:{
    redPackageClick(item){
      console.log(item);

      this.$refs.redPackage.show(item);
    },
    // 接收mqtt消息
    onMessageArrived (msg) {
      let data = JSON.parse(msg);
      //红包列表数据
      switch(data.type){
        //发红包消息推送
        case 1:
          //判断数组中是否还有该元素
          let list = this.listData.find((r) => {
            return r.redNum === data.data.redNum;
          })
          // debugger
          if(!list){
            if(data.data.sendUid === this.dataInfo.uid){
              data.data.status = false;
            }else{
              data.data.status = true;
            }
            data.data.hasList = []; //已抢红包用户提示
            data.data.hasStatus = false; //该红包是否已抢过
            data.data.hasNum = 0; //当前已抢红包人数
            data.data.recordList = []; //当前已抢红包用户记录数
            data.data.hasRedTitle = ''; //已抢到的红包提示
            this.listData.push(data.data);
            localStorage.setItem('list',JSON.stringify(this.listData));
          }
          break;
        //抢红包消息推送
        case 2:
          this.listData.forEach((l) => {
            if(l.redNum === data.data.redNum){
              if(!l.hasList){
                l.hasList = [];
              }
              if(l.hasList.length === 0){
                l.hasList.push(data.data.msg);
              }else{
                if(!l.hasList.includes(data.data.msg)){
                  l.hasList.push(data.data.msg)
                }
              }
              //l.hasList =Array.from(new Set(l.hasList.push(data.data.msg)));
            }
          })
          break;
        case 3:
          break;
        case 4:
          //抢红包人数变动
          this.listData.forEach((l) => {
            if(l.redNum === data.data.redNum){
              l.robbedBao = data.data.persions;
            }
          });
          localStorage.setItem('list',JSON.stringify(this.listData));
          break;

        case 5:

          break;
        //用户金额变化
        case 6:
          if(data.data.uid === this.dataInfo.uid){
            let obj = {};
            obj.money = data.data.money;
            this.$emit('contentDataChange',obj);
          }
          break;

      }


    },
    onRedOpen(data){
      //事件触发表明该红包已抢过
      this.listData.forEach((l) => {
        if(l.redNum === data.id){
          l.hasStatus = true;
          l.hasNum = data.length;
          l.recordList = data.list;
          l.hasRedTitle = data.title;
        }
      })
    }
  }
}
</script>

<style scoped>
.list-item{
  height: 100%;
  width: 100%;
}
.item-info{
  margin-top: 14px;
}
.item-left{
  text-align: left;
}
.item-right{
  text-align: right;
}
.right{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.item-img{
  width: 35px;
  height: 35px;
  background: #ffffff;
  border-radius: 4px;
}
.item-con{
  width: 180px;
  text-align: left;
}
.con-top{
  padding: 8px;
  background: #FB9F3A;
  border-top-left-radius:4px;
  border-top-right-radius:4px;
  position: relative;

}
.con-top.has-empty:before{
  content: '';
  position: absolute;
  background: white;
  opacity: .5;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.left .con-top:after{
  content: '';
  position: absolute;
  top: 4px;
  left:-6px;
  z-index: 1;
  width:0;
  height:0;
  border-top:10px solid transparent;
  border-bottom:10px solid transparent;
  border-right:10px solid #FB9F3A;
}
.right .con-top:after{
  content: '';
  position: absolute;
  top: 4px;
  right:-6px;
  z-index: 1;
  width:0;
  height:0;
  border-top:10px solid transparent;
  border-bottom:10px solid transparent;
  border-left:10px solid #FB9F3A;
}
.left .con-top.has-empty:after{
  border-right:10px solid #F7D0A7;
}
.right .con-top.has-empty:after{
  border-left:10px solid #F7D0A7;


}
.red-package{
  width: 35px;
  height: 35px;
}
.con-title{
  color: #ffffff;

}
.con-bottom{
  height: 20px;
  line-height: 20px;
  padding: 0 8px;
  background: #ffffff;
  border-bottom-left-radius:4px;
  border-bottom-right-radius:4px;
  color: #999;
}
.msg-item{
  margin-top: 4px;
}
.msg-item li{
  text-align: center;
}
.msg-item li img{
  width: 14px;
  position: relative;
  top: 3px;
}
.notice{
  position: fixed;
  top: 28px;
  right: 0;
  left: 0;
  z-index: 10;
}
.notice .van-notice-bar{
  background: none;
  font-size: 12px;
}
</style>
