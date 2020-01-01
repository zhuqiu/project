<template>
	<div>
		<van-popup
		  v-model="visible"
		  closeable
		  get-container="body"
		  class="common-model-class"
		>
			<div class="common-model-title">发红包</div>
			<div class="common-model-content">
				<div>
          <van-row>
            <van-col span="8">
              <span class="title">红包大小：</span>
            </van-col>
            <van-col span="10">
              <van-stepper v-model="formData.money" :min="10" integer :step="10"/>
            </van-col>
            <van-col span="4">
              <span class="title">金币</span>
            </van-col>
          </van-row>
        </div>
        <div class="margin-top">
          <van-row>
            <van-col span="8">
              <span class="title">红包雷号：</span>
            </van-col>
            <van-col span="10">
              <van-stepper v-model="formData.leishu" :min="0" integer />
            </van-col>
          </van-row>
        </div>
        <div class="margin-top">
          <van-row type="flex" justify="center">
            <van-col span="8">
              <van-button type="primary" size="small" @click="send">立即发送</van-button>
            </van-col>
          </van-row>
        </div>
        <div class="margin-top tip">
          <van-row>
            <van-col span="24">
              <div class="van-hairline--top"></div>
            </van-col>
            <van-col span="24">
              <p>1.发红包有人‘中雷’可获得红包总额1.7倍每人</p>
              <p>2.抢红包若’踩雷‘需按红包总额赔偿1.7倍</p>
            </van-col>
          </van-row>
        </div>
			</div>
		</van-popup>
	</div>
</template>

<script>

import Api from '../../../static/js/service-api';

import { splitParam }  from'../../../static/js/utils'

export default {
	name: 'send-red-package-model',
	data() {
		return {
      visible: false,
      formData:{
        money:10,
        leishu:0
      }
		}
	},
	methods:{
		show(){
			this.visible = true;
    },
    send(){
      if(this.formData.leishu > this.formData.money){
        this.$toast('红包雷号不能大于红包大小');
        return false;
      }
      this.formData.token = this.dataInfo.token;
      this.$axios.post(Api.serviceApi.sendRedPackage + splitParam(this.formData) ).then((res) => {
			  if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{
          this.visible = false;
        }
			})
    }
	}

}
</script>

<style>
.common-model-content .title{
  position: relative;
  top: 4px;
}
.common-model-content .tip p{
  color: #999;
  font-size: 10px;
}
</style>
