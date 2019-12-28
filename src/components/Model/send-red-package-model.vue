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
              红包大小：
            </van-col>
            <van-col span="10">
              <van-stepper v-model="formData.money" :min="5" integer />
            </van-col>
            <van-col span="4">
              金币
            </van-col>
          </van-row>
        </div>
        <div style="margin-top:10px;">
          <van-row>
            <van-col span="8">
              红包雷号：
            </van-col>
            <van-col span="10">
              <van-stepper v-model="formData.leishu" integer />
            </van-col>
          </van-row>
        </div>
        <div style="margin-top:10px;">
          <van-row type="flex" justify="center">
            <van-col span="8">
              <van-button type="primary" size="small" @click="send">立即发送</van-button>
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
        money:5,
        leishu:0
      }
		}
	},
	methods:{
		show(){
			this.visible = true;
    },
    send(){
      this.formData.token = this.dataInfo.token;
      this.$axios.post(Api.serviceApi.sendRedPackage + splitParam(this.formData) ).then((res) => {
			  if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{

        }
			})
    }
	}

}
</script>

<style>

</style>
