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
		        <img :src="data.sendHeadImg ? data.sendHeadImg : '../.././static/img/LC_icon_user_group_fill.png'" class="img-info" alt="">
		        <div>{{ data.redOpenName }}</div>
		      </div>
		      <div class="red-package-title-bottom">
		        <div class="detail-title">
              <span v-if="!title">{{ data.redName }}</span>
              <span v-if="title">{{ title }}</span>
            </div>
		        <div class="selected-title" v-if="false">
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
		        <li v-for="(item,index) in list" :key="index">
		          <div class="item-left">
		            <img :src="item.headImg ? item.headImg : '../.././static/img/LC_icon_user_group_fill.png'" alt="">
		            <div>
		              <div class="item-name">{{ item.nickname ? item.nickname : 'xxx' }}</div>
		              <div class="item-time">{{ item.operTime }}</div>
		            </div>
		          </div>
		          <div class="item-right">
		            <div class="item-money">{{ item.money }} 金币</div>
		            <img src="" alt="">
		          </div>
		        </li>

		      </ul>
		    </div>
		  </div>
		</van-popup>
	</div>
</template>

<script>

import Api from '../../../static/js/service-api';

import { splitParam }  from'../../../static/js/utils'

export default {
	name: 'red-package-model',
  data() {
  	return {
      visible: false,
      showOpen: true,
      data:'',
      list: [],
      title: null
    }
  },
  methods:{
  	show(data) {
      this.data = data;
      this.title = null;
      this.visible = true;
      this.showOpen = true;
      if(data.hasStatus){
        this.showOpen = false;
        this.list = data.recordList;
        this.title = data.hasRedTitle;
        this.handleGetRedPackage(data.hasNum)
      }
    },
    showDetail(){
      this.handleGetRedPackage(0)
    },
    handleGetRedPackage(num){
      let obj = {
        redNum: this.data.redNum,
        redStatus: this.data.redStatus,
        curPersions: this.data.robbedBao,
        recordCount: num,
        token: this.dataInfo.token
      };

      this.$axios.post(Api.serviceApi.getRedPackage + splitParam(obj) ).then((res) => {
			  if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{
          this.showOpen = false;
          // debugger
          if(res.data.data.title){
            this.title = res.data.data.title;
            this.list = res.data.data.recordList;
            let obj = {
              id: this.data.redNum,
              length: this.list.length,
              list: res.data.data.recordList,
              title: res.data.data.title
            }
            this.$emit('redOpen', obj);
          }
        }
			})
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
  background: #ffffff;
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
