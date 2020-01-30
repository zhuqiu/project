<template>
	<div>
		<van-popup
		  v-model="visible"
		  closeable
		  get-container="body"
		  class="common-model-class"
		>
			<div class="common-model-title">机器人托管设置</div>
			<div class="common-model-content">
        <div>
          <van-divider :style="{ margin:0 }">自动抢包</van-divider>
					<div>
            <van-row class="margin-top">
              <van-col span="8">
                <span class="title">时间频率：</span>
              </van-col>
              <van-col span="10">
                <van-stepper v-model="autoForm.qiangIntervalSeconds" :min="1" :step="5" integer/>
              </van-col>
              <van-col span="4">
                <span class="title">秒</span>
              </van-col>
            </van-row>
            <van-row class="margin-top">
              <van-col span="24" style="text-align:center">
                <van-switch v-model="autoForm.autoQiang" active-color="#07c160" inactive-color="#ee0a24" @change="onGetChange"/>
              </van-col>
            </van-row>
          </div>
				</div>

        <div class="margin-top">
          <van-divider :style="{ margin:0 }">自动发包</van-divider>
					<div>
            <van-row class="margin-top">
              <van-col span="8">
                <span class="title">红包大小：</span>
              </van-col>
              <van-col span="10">
                <van-stepper v-model="autoForm.redMoney" :min="10" integer :step="10"/>
              </van-col>
              <van-col span="4">
                <span class="title">金币</span>
              </van-col>
            </van-row>
            <van-row class="margin-top">
              <van-col span="8">
                <span class="title">红包雷号：</span>
              </van-col>
              <van-col span="10">
                <van-stepper v-model="autoForm.redLeishu" :min="0" :max="9" integer />
              </van-col>
            </van-row>
            <van-row class="margin-top">
              <van-col span="8">
                <span class="title">时间频率：</span>
              </van-col>
              <van-col span="10">
                <van-stepper v-model="autoForm.fabaoIntervalSeconds" :min="1" :step="5" integer/>
              </van-col>
              <van-col span="4">
                <span class="title">秒</span>
              </van-col>
            </van-row>
            <van-row class="margin-top">
              <van-col span="24" style="text-align:center">
                <van-switch v-model="autoForm.autofabao" active-color="#07c160" inactive-color="#ee0a24" @change="onPutChange"/>
              </van-col>
            </van-row>
          </div>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>

import { splitParam }  from'../../../static/js/utils';

import Api from '../../../static/js/service-api';

export default {
	name: 'robot-deposit-model',
	data() {
		return {
      visible: false,
      autoForm: {
        qiangIntervalSeconds: 30,
        autoQiang: false,
        autofabao: false,
        fabaoIntervalSeconds: 30,
        redLeishu: 0,
        redMoney: 10,
      }
		}
  },
  mounted() {
    if(JSON.parse(localStorage.getItem('autoForm'))){
      this.autoForm = JSON.parse(localStorage.getItem('autoForm'))
    }else{
      this.autoForm.qiangIntervalSeconds = this.dataInfo.qiangIntervalSeconds;
      this.autoForm.autoQiang = this.dataInfo.autoQiang === 1 ? true : false;
      this.autoForm.autofabao = this.dataInfo.autofabao === 1 ? true : false;
      this.autoForm.fabaoIntervalSeconds = this.dataInfo.fabaoIntervalSeconds;
      this.autoForm.redLeishu = this.dataInfo.redLeishu;
      this.autoForm.redMoney = this.dataInfo.redMoney;
    }

  },
	methods:{
		show(){
			this.visible = true;
    },
    onGetChange(){
      let obj = {
        autoQiang: this.autoForm.autoQiang ? 1 : 0,
        qiangIntervalSeconds: this.autoForm.qiangIntervalSeconds,
        token: this.dataInfo.token
      }
      let toast = this.$toast.loading({
        message: this.autoForm.autoQiang ?  '开启中...' : '关闭中...',
        duration: 0, // 持续展示 toast
        forbidClick: true,
        loadingType: 'spinner'
      });
      this.$axios.post(Api.serviceApi.getRedMoney + splitParam(obj)).then((res) => {
        if(res.data.code !== '0'){
          this.$toast(res.data.msg);
          this.autoForm.autoQiang = false;
        }else{
          if(this.autoForm.autoQiang){
            this.$toast('自动抢红包开启成功');
          }else{
            this.$toast('自动抢红包关闭成功');
          }
          localStorage.setItem('autoForm',JSON.stringify(this.autoForm))
        }
      },(err) => {
        this.$toast('网络繁忙，请重试');
        this.autoForm.autoQiang = false;
      })
    },
    onPutChange(){
      let obj = {
        autofabao: this.autoForm.autofabao ? 1 : 0,
        fabaoIntervalSeconds: this.autoForm.fabaoIntervalSeconds,
        redLeishu: this.autoForm.redLeishu,
        redMoney: this.autoForm.redMoney,
        token: this.dataInfo.token
      }
      let toast = this.$toast.loading({
        message: this.autoForm.autofabao ?  '开启中...' : '关闭中...',
        duration: 0, // 持续展示 toast
        forbidClick: true,
        loadingType: 'spinner'
      });
      this.$axios.post(Api.serviceApi.putRedMoney + splitParam(obj)).then((res) => {
        if(res.data.code !== '0'){
          this.$toast(res.data.msg);
          this.autoForm.autofabao = false;
        }else{
          if(this.autoForm.autofabao){
            this.$toast('自动发红包开启成功');
          }else{
            this.$toast('自动发红包关闭成功');
          }
          localStorage.setItem('autoForm',JSON.stringify(this.autoForm))
        }
      },(err) => {
        this.$toast('网络繁忙，请重试');
        this.autoForm.autofabao = false;
      })
    }

	}

}
</script>

<style>

</style>
