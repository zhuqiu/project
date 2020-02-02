<template>
  <div>
    <div class="notice">
      <van-notice-bar
        :text="noticeText"
        color="#1989fa"
      />
    </div>
    <ul class="list-item">
      <li v-for="(item,index) in listInfo" :key="index" class="item-info" :class="item.status ? 'item-left' : 'item-right'">
        <van-row>

          <!-- 为自己的红包展示区 -->
          <van-col :span="item.status ? '4' : '20'" :class="{right:!item.status}">
            <div v-if="!item.status"  class="item-con" @click="redPackageClick(item)">
              <div class="con-top" :class="{'has-empty': item.hasStatus || item.redStatus === 2 || item.redStatus === 3 || item.robbedBao === item.baoAmount}">
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
                <span v-if="item.redStatus === 1">恭喜发财，大吉大利</span>
                <span v-if="item.redStatus != 1 && item.redStatus != 3">已抢完</span>
                <span v-if="item.redStatus === 3">已过期</span>
              </div>
            </div>
            <img v-if=" item.status" :src="item.sendHeadImg?item.sendHeadImg: '.././static/img/LC_icon_user_group_fill.png'" class="item-img">
          </van-col>

          <!-- 别人发的红包展示区 -->
          <van-col :span="item.status ? '20' : '4'" :class="{left: item.status}">
            <div v-if="item.status"  class="item-con" @click="redPackageClick(item)">
              <div class="con-top" :class="{'has-empty': item.hasStatus || item.redStatus === 2 || item.redStatus === 3 || item.robbedBao === item.baoAmount }">
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
                <span v-if="item.redStatus === 1">恭喜发财，大吉大利</span>
                <span v-if="item.redStatus != 1 && item.redStatus != 3">已抢完</span>
                <span v-if="item.redStatus === 3">已过期</span>
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

import Api from '../../static/js/service-api';

import { splitParam }  from'../../static/js/utils'

export default {
  name: 'content-info',
  components:{
    redPackageModel,
    accountDetailsModel,
    mqtt
  },
  data() {
    return {
      show:true,
      isLoading: false,
      count: 0,
      noticeText: '',
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
  created() {
    this.noticeText = this.dataInfo.ads;
    this.clientParams.hostname =  this.dataInfo.mqttIp;
    this.clientParams.port = this.dataInfo.mqttPort; 
    this.clientParams.topic = this.dataInfo.room.roomTopic; 
    this.clientParams.tousepic = this.dataInfo.mqttUserTopic;
    this.clientParams.userName = this.dataInfo.mqttUsername;
    this.clientParams.password = this.dataInfo.mqttPassword;
    this.getsyncUserInfo();
    if(localStorage.getItem('list')){
      this.listData = JSON.parse(localStorage.getItem('list')).concat([])
    }
    this.$nextTick(() => {
      // console.log(this.$refs.mqtt.topic);
      this.$refs.mqtt.buildConnect(this.clientParams) // 建立mqtt通信
    })
    
    this.gotoBottom();
    //定时任务
    // setInterval(() => {
    //   this.$nextTick(() => {
    //     this.$refs.mqtt.buildConnect(this.clientParams) // 建立mqtt通信
    //   })
    // }, 5000);
  },
  beforeDestroy () {
    this.$refs.mqtt.disconnect() // 关闭页面断开mqtt连接
  },
  computed:{
    listInfo(){
      return this.listData.filter((l) => {
        return l.roomNo === this.dataInfo.room.roomNo;
      });
    }
  },
  methods:{
    redPackageClick(item){
      this.$refs.redPackage.show(item);
    },
    gotoBottom(){
      //内容滚动到最底部
      this.$nextTick(() =>{
        let ele = document.querySelector('.content-info');
        if(ele.scrollHeight > ele.clientHeight) {
          //设置滚动条到最底部
          setTimeout(() =>{
            ele.scrollTop = ele.scrollHeight;
          },200)
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
          document.title = res.data.data.room.groupName;
        }
			})
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

          if(!list){
            if(data.data.sendUid === this.dataInfo.uid){
              //判断红包是否为自己
              data.data.status = false;
            }else{
              data.data.status = true;
              this.getMessageAudio();
            }
            data.data.hasList = []; //已抢红包用户提示
            data.data.hasStatus = false; //该红包是否已抢过
            data.data.hasNum = 0; //当前已抢红包人数
            data.data.recordList = []; //当前已抢红包用户记录数
            data.data.hasRedTitle = ''; //已抢到的红包提示
            data.data.hasSelectTip = '';
            if(this.listData.length >= 20){
              this.listData = this.listData.slice(-20,this.listData.length);
            }

            this.listData.push(data.data);

            this.gotoBottom();

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
              if(!l.hasList.includes(data.data.msg)){
                l.hasList.push(data.data.msg)
              }
            }
          })
          this.gotoBottom();
          break;
        case 3:
          //赔付--中雷
          this.listData.forEach((l) => {
            if(l.redNum === data.data.redNum){
              l.hasList.push(data.data.msg)
            }
          });
          this.gotoBottom();
          localStorage.setItem('list',JSON.stringify(this.listData));
          break;
        case 4:
          //抢红包人数变动
          this.listData.forEach((l) => {
            if(l.redNum === data.data.redNum){
              if(l.robbedBao <= data.data.persions){
                l.robbedBao = data.data.persions;
              }
            }
          });
          localStorage.setItem('list',JSON.stringify(this.listData));
          break;
        //红包状态 1. 可抢； 2.已被抢完； 3.已过期
        case 5:
          this.listData.forEach((l) => {
            if(l.redNum === data.data.redNum){
              l.redStatus = data.data.redStatus;
            }
          });
          localStorage.setItem('list',JSON.stringify(this.listData));
          break;
        //用户金额变化
        case 6:
          if(data.data.uid === this.dataInfo.uid){
            let obj = {};
            obj.money = data.data.money;
            localStorage.setItem('amout',data.data.money)
            this.$emit('contentDataChange',obj);
          }
          break;
        //用户收入佣金
        case 7:
          if(data.data.uid === this.dataInfo.uid){
            this.listData.forEach((l) => {
              if(l.redNum === data.data.redNum){
                l.hasList.push(data.data.msg)
              }
            });
          }
          this.gotoBottom();
          break;
        case 8:
          this.$refs.mqtt.buildConnect(this.clientParams) // 建立mqtt通信
          break;
      }
    },
    onRedOpen(data,status){
      //事件触发表明该红包已抢过
      this.listData.forEach((l) => {
        if(l.redNum === data.id){
          
          if(l.sendUid != this.dataInfo.uid){
            l.hasStatus = true;
          }
          if(status){
            l.redStatus = 3;
            return false;
          }
          l.hasNum = data.length;
          l.recordList = data.list;
          l.hasRedTitle = data.title;
          l.hasSelectTip = data.tip;
          l.robbedBao = data.robbedBao;
        }
      })
    },
    getMessageAudio(){
      const src = '../../../static/img/9478.wav';
      // 初始化Aduio
      var audio = new Audio();
      var playPromise;
      audio.src = src;
      playPromise = audio.play();
      if (playPromise) {
        playPromise.then(() => {
            // 音频加载成功
            // 音频的播放需要耗时
            setTimeout(() => {
                // 后续操作
                // console.log("done.");
            }, audio.duration * 1000); // audio.duration 为音频的时长单位为秒
        }).catch((e) => {
            // 音频加载失败
        });
      }
    }
  }
}
</script>

<style scoped>
.list-item{
  padding-bottom: 10px;
  height: 100%;
  width: 100%;
  /* 解决ios中偶现无法滚动的情况 */
  -webkit-overflow-scrolling: touch;
  min-height:101%;
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
  top: 30px;
  right: 0;
  left: 0;
  z-index: 10;
}
.notice .van-notice-bar{
  background: none;
  font-size: 12px;
}
</style>
