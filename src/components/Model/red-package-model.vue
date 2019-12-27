<template>
	<div>
		<van-popup
		  v-model="visible"
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
		          <img src="../../../static/img/img02.png" alt="">
		          <span>踩雷了！-16金币</span>
		        </div>
		      </div>
		    </div>
        <div class="red-package-open" @click="showDetail" v-if="showOpen">
          <img src="../../../static/img/img03.png" alt="">
        </div>
		    <div class="red-package-detail" v-if="!showOpen">
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
		            <img src="../../../static/img/img02.png" alt="">
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
	name: 'red-package-model',
  data() {
  	return {
      visible: false,
      showOpen: true
  	}
  },
  methods:{
  	show() {
  		this.visible = true;
    },
    showDetail(){
      this.showOpen = false;
    }
  }
}
</script>

<style scoped>
.overlay-style{
  width: 80%;
}
.overlay-style .van-popup__close-icon {
  color: #ffffff;
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
  background:rgb(203,93,73);
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

.red-package-open img{
  width: 100%;
  display: block ;
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