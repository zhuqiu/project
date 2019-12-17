<template>
  <div class="container">
    <div class="top-info van-hairline--bottom">

    </div>
    <div class="content-info">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <ul class="list-item">
          <li v-for="(item,index) in listData" :key="index" class="item-info" :class="item.status ? 'item-left' : 'item-right'">
            <van-row>
              <van-col :span="item.status ? '4' : '20'">
                <div v-if="!item.status"  class="item-con">
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
                <img v-if="item.status" :src="item.img" class="item-img">
              </van-col>
              <van-col :span="item.status ? '20' : '4'">
                <div v-if="item.status"  class="item-con">
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
          </li>
        </ul>
      </van-pull-refresh>
    </div>
    <div class="bottom-info"></div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    background: #f0f3f6;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
  .top-info,.content-info,.bottom-info{
    padding: 0 14px;
  }
  .top-info{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    line-height: 40px;
    z-index: 1;
    /* background: red; */
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
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    line-height: 40px;
    z-index: 1;
    /* background: red; */
  }
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
  .item-img{
    width: 35px;
    height: 35px;
    border-radius: 4px;
  }
  .item-con{
    width: 180px;
  }
  .con-top{
    padding: 8px;
    background: #FB9F3A;
    border-top-left-radius:4px;
    border-top-right-radius:4px;
    position: relative;
  }
  .con-top:after{
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
</style>
