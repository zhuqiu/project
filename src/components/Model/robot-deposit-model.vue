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
                <van-stepper v-model="time" :min="10" integer/>
              </van-col>
              <van-col span="4">
                <span class="title">秒</span>
              </van-col>
            </van-row>
            <van-row class="margin-top">
              <van-col span="24" style="text-align:center">
                <van-button type="primary" size="small">开启</van-button>
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
                <van-stepper v-model="time" :min="10" integer :step="10"/>
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
                <van-stepper v-model="time" :min="0" integer />
              </van-col>
            </van-row>
            <van-row class="margin-top">
              <van-col span="8">
                <span class="title">时间频率：</span>
              </van-col>
              <van-col span="10">
                <van-stepper v-model="time" :min="10" integer/>
              </van-col>
              <van-col span="4">
                <span class="title">秒</span>
              </van-col>
            </van-row>
            <van-row class="margin-top">
              <van-col span="24" style="text-align:center">
                <van-button type="primary" size="small">开启</van-button>
              </van-col>
            </van-row>
          </div>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
export default {
	name: 'robot-deposit-model',
	data() {
		return {
      visible: false,
      time: ''
		}
	},
	methods:{
		show(){
			this.visible = true;
		}
	}

}
</script>

<style>

</style>
