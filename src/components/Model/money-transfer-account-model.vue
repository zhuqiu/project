<template>
	<div>
		<van-popup
		  v-model="visible"
		  closeable
		  get-container="body"
		  class="common-model-class"
		>
			<div class="common-model-title">金币互转</div>
			<div class="common-model-content">
        <!-- <van-steps :active="active">
          <van-step>转账金币</van-step>
          <van-step>收款账户</van-step>
        </van-steps> -->

        <div>
          <van-cell-group>
            <van-field v-model="value" type="number" placeholder="请输入转账金额" />
          </van-cell-group>
          <p class="tip margin-top">
            当前金币 <span style="color:#07c160">{{ amout }} </span>
          </p>
        </div>

        <div>
          <van-cell-group>
            <van-field v-model="inviteCode" type="number" placeholder="请输入收款ID" />
          </van-cell-group>
          <p class="tip">
            收款方 <span style="color:#07c160">ID</span> 号
          </p>
        </div>

        <div style="text-align:center">
          <!-- <van-button type="primary" size="small" v-if="active === 0" @click="nextStep">下一步</van-button>
          <van-button type="default" size="small" v-if="active === 1" @click="prevStep">上一步</van-button> -->
          <van-button type="primary" size="small" @click="submit">转账</van-button>
        </div>
			</div>
		</van-popup>
	</div>
</template>

<script>

import { splitParam }  from'../../../static/js/utils';

import Api from '../../../static/js/service-api';

export default {
	name: 'money-transfer-account-model',
	data() {
		return {
      visible: false,
      active:0,
      amout: '',
      value: '',
      inviteCode: ''
		}
  },
  created(){
    
  },
	methods:{
		show(){
      this.visible = true;
      this.init()
    },
    init(){
      this.amout = localStorage.getItem('amout');
    },
    nextStep(){
      if(this.value === ''){
        this.$toast('请输入转账金额');
        return
      }
      this.active = 1;
    },
    prevStep(){
      this.active = 0;
    },
    submit(){
      if(this.value === ''){
        this.$toast('请输入转账金额');
        return
      }
      if(this.inviteCode === ''){
        this.$toast('请输入收款人ID');
        return
      }
      if(this.inviteCode === String(this.dataInfo.inviteCode)){
        this.$toast('收款人ID不能与当前用户ID一致');
        return
      }

      let obj = {
        inviteCode: this.inviteCode,
        money: this.value,
        token: this.dataInfo.token
      }
      this.$axios.post(Api.serviceApi.trasfer + splitParam(obj)).then((res) => {
			  if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{
          this.$toast('转账成功');
          this.value = '';
          this.visible = false;
        }
			},(err) => {
        this.$toast('网络繁忙，请重试');
      })
    }

	}

}
</script>

<style scoped>
.tip{
  padding-left: 16px;
  color: #999;
  font-weight: 400;
  font-size: 12px;
}
</style>
