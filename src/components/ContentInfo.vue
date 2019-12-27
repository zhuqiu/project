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
          <van-col :span="item.status ? '4' : '20'" :class="{right:!item.status}">
            <div v-if="!item.status"  class="item-con" @click="redPackageClick">
              <div class="con-top" :class="{'has-empty': !item.status}">
                  <van-row>
                    <van-col span="6">
                      <img class="red-package" src="../../static/img/red-package.png" alt="">
                    </van-col>
                    <van-col span="16">
                      <div class="con-title">
                        20.00金币/雷3
                      </div>
                      <div class="con-title" style="margin-top:4px;">以抢：0/7</div>
                    </van-col>
                  </van-row>
              </div>
              <div class="con-bottom">
                <span>恭喜发财，大吉大利</span>
              </div>
            </div>
            <img v-if="item.status" :src="item.img" class="item-img">
          </van-col>
          <van-col :span="item.status ? '20' : '4'" :class="{left: item.status}">
            <div v-if="item.status"  class="item-con" @click="redPackageClick">
              <div class="con-top">
                  <van-row>
                    <van-col span="6">
                      <img class="red-package" src="../../static/img/red-package.png" alt="">
                    </van-col>
                    <van-col span="16">
                      <div class="con-title">
                        20.00金币/雷3
                      </div>
                      <div class="con-title" style="margin-top:4px;">以抢：0/7</div>
                    </van-col>
                  </van-row>
              </div>
              <div class="con-bottom">
                <span>恭喜发财，大吉大利</span>
              </div>
            </div>
            <img v-if="!item.status" :src="item.img" class="item-img">
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24">
            <ul class="msg-item">
              <li>
                <img src="../../static/img/img01.png" alt="">
                <span>1212321312321312</span>
              </li>
              <li>
                <img src="../../static/img/img01.png" alt="">
                <span>哈哈</span>
              </li>
            </ul>
          </van-col>
        </van-row>
      </li>
    </ul>
    <!--红包详情弹框-->
    <red-package-model ref="redPackage" ></red-package-model>

    <!--账户详情弹框-->
    <account-details-model ref="accountDetails"></account-details-model>

  </div>
</template>
<script>

import redPackageModel from './Model/red-package-model.vue';

import accountDetailsModel from './Model/account-details-model.vue'



export default {
  name: 'content-info',
  components:{
	redPackageModel: redPackageModel,
  accountDetailsModel: accountDetailsModel
  },
  data() {
    return {
      show:true,
      isLoading: false,
      count: 0,
      noticeText: '佣金满100可找客服领取28彩金，右上角推广可获高额佣金，充值或提现异常请联系客服。',
      listData: [{
        status:true,
        name: '1',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576515318255&di=6ebc0200b27d2e9aa9a0e121d446523f&imgtype=0&src=http%3A%2F%2Fimg.bimg.126.net%2Fphoto%2FqySPuZDJE1ssEsHtI16xFg%3D%3D%2F2854437738824178662.jpg'
      },{
        status:false,
        name: '2',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576515318255&di=6ebc0200b27d2e9aa9a0e121d446523f&imgtype=0&src=http%3A%2F%2Fimg.bimg.126.net%2Fphoto%2FqySPuZDJE1ssEsHtI16xFg%3D%3D%2F2854437738824178662.jpg'
      },{
        status:true,
        name: '3',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576515318255&di=6ebc0200b27d2e9aa9a0e121d446523f&imgtype=0&src=http%3A%2F%2Fimg.bimg.126.net%2Fphoto%2FqySPuZDJE1ssEsHtI16xFg%3D%3D%2F2854437738824178662.jpg'
      },{
        status:true,
        name: '3',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576515318255&di=6ebc0200b27d2e9aa9a0e121d446523f&imgtype=0&src=http%3A%2F%2Fimg.bimg.126.net%2Fphoto%2FqySPuZDJE1ssEsHtI16xFg%3D%3D%2F2854437738824178662.jpg'
      },{
        status:true,
        name: '3',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576515318255&di=6ebc0200b27d2e9aa9a0e121d446523f&imgtype=0&src=http%3A%2F%2Fimg.bimg.126.net%2Fphoto%2FqySPuZDJE1ssEsHtI16xFg%3D%3D%2F2854437738824178662.jpg'
      },{
        status:true,
        name: '3',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576515318255&di=6ebc0200b27d2e9aa9a0e121d446523f&imgtype=0&src=http%3A%2F%2Fimg.bimg.126.net%2Fphoto%2FqySPuZDJE1ssEsHtI16xFg%3D%3D%2F2854437738824178662.jpg'
      },{
        status:true,
        name: '3',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576515318255&di=6ebc0200b27d2e9aa9a0e121d446523f&imgtype=0&src=http%3A%2F%2Fimg.bimg.126.net%2Fphoto%2FqySPuZDJE1ssEsHtI16xFg%3D%3D%2F2854437738824178662.jpg'
      },{
        status:true,
        name: '3',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576515318255&di=6ebc0200b27d2e9aa9a0e121d446523f&imgtype=0&src=http%3A%2F%2Fimg.bimg.126.net%2Fphoto%2FqySPuZDJE1ssEsHtI16xFg%3D%3D%2F2854437738824178662.jpg'
      }]
    }
  },
  mounted() {
    this.$refs.accountDetails.show();
  },
  methods:{
    redPackageClick(){
      this.$refs.redPackage.show();
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
