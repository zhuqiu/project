<template>
  <div>
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
                <img src="../../static/img/红包-01.png" alt="">
                <span>1212321312321312</span>
              </li>
              <li>
                <img src="../../static/img/红包-01.png" alt="">
                <span>哈哈</span>
              </li>
            </ul>
          </van-col>
        </van-row>
      </li>
    </ul>
    <van-popup
      v-model="show"
      round
      closeable
      get-container="body"
      class="overlay-style"
    >
      <div class="red-package-layer">
        <div class="red-package-title">
          <div class="red-package-title-top">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576515318255&di=6ebc0200b27d2e9aa9a0e121d446523f&imgtype=0&src=http%3A%2F%2Fimg.bimg.126.net%2Fphoto%2FqySPuZDJE1ssEsHtI16xFg%3D%3D%2F2854437738824178662.jpg" class="img-info" alt="">
            <div>321ewqewq</div>
          </div>
          <div class="red-package-title-bottom">
            <div class="detail-title">抢到1.65 金币</div>
            <div class="selected-title">
              <img src="../../static/img/雷阵雨.png" alt="">
              <span>踩雷了！-16金币</span>
            </div>
          </div>
        </div>
        <div class="red-package-detail">
          <ul class="red-package-item">
            <li>
              <div class="item-left">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576515318255&di=6ebc0200b27d2e9aa9a0e121d446523f&imgtype=0&src=http%3A%2F%2Fimg.bimg.126.net%2Fphoto%2FqySPuZDJE1ssEsHtI16xFg%3D%3D%2F2854437738824178662.jpg" alt="">
                <div>
                  <div class="item-name">eqwewqeq</div>
                  <div class="item-time">2019:91;91</div>
                </div>
              </div>
              <div class="item-right">
                <div class="item-money">1.88金币</div>
                <img src="" alt="">
              </div>
            </li>
            <li>
              <div class="item-left">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576515318255&di=6ebc0200b27d2e9aa9a0e121d446523f&imgtype=0&src=http%3A%2F%2Fimg.bimg.126.net%2Fphoto%2FqySPuZDJE1ssEsHtI16xFg%3D%3D%2F2854437738824178662.jpg" alt="">
                <div>
                  <div class="item-name">eqwewqeq</div>
                  <div class="item-time">2019:91;91</div>
                </div>
              </div>
              <div class="item-right">
                <div class="item-money">1.88金币</div>
                <img src="../../static/img/雷阵雨.png" alt="">
              </div>
            </li>

          </ul>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: 'content-info',
  components:{

  },
  data() {
    return {
      show:true,
      isLoading: false,
      count: 0,
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
  methods:{
    onRefresh(){
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    redPackageClick(){
      this.show = true;
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
.overlay-style{
  width: 80%;
}

.red-package-title{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  box-sizing: border-box;
  height: 120px;
  width: 100%;
  background: #CC3300;
}
.red-package-title .red-package-title-top{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color:#FB9F3A;
  font-size: 14px;
}
.red-package-title .red-package-title-bottom{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.red-package-title .red-package-title-bottom .detail-title{
  font-size: 14px;
  color:#FB9F3A;
}
.red-package-title .red-package-title-bottom .selected-title{
  margin-top: 4px;
  font-size: 10px;
  color: #000000;
}
.red-package-title .red-package-title-bottom .selected-title img{
  width: 12px;
  position: relative;
  top: 2px;
}
.red-package-title .img-info{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
}
.red-package-detail{
  box-sizing: border-box;
  padding: 0 8px;
  height: 240px;
  width: 100%;
  overflow-y:auto;
}
.red-package-item li{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
}
.red-package-item li .item-left{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.red-package-item li .item-left img{
  width: 30px;
  height: 30px;
  border-radius: 4px;
  margin-right: 6px;
}
.red-package-item li .item-left .item-name{
  font-size: 12px;
}
.red-package-item li .item-left .item-time{
  color: #999;
  font-size: 10px;
}
.red-package-item li .item-right {
  position: relative;
}
.red-package-item li .item-right img{
  width: 14px;
  position: absolute;
  right: 100px;
  top: 0;
}
</style>
