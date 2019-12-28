<template>
  <div class="container">
    <van-cell-group>
      <van-field
        v-model="formData.loginName"
        type="number"
        label="手机号"
        placeholder="请输入手机号"
        :error-message="errorData.errorName"
        required
      />
      <van-field
        v-model="formData.loginPassword"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :error-message="errorData.errorLoginPassword"
        required
      />
      <van-field
        v-model="formData.passwordagain"
        type="password"
        label="确认密码"
        placeholder="请再次输入密码"
        :error-message="errorData.errorPasswordagain"
        required
      />
      <van-field
        v-model="formData.phoneCode"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        :error-message="errorData.errPhoneCode"
        required
      >
        <van-button slot="button" size="small" type="primary" :disabled ="disabled" @click="sendPhoneCode">{{ sendText }}</van-button>
      </van-field>
    </van-cell-group>

    <van-row>
      <van-col span="24">
        <van-button plain type="primary" size="large" class="margin-top" @click="register">注册</van-button>
      </van-col>
    </van-row>

    <van-row>
      <van-col span="24">
        <div class="login" @click="goToLogin">已注册，去登录></div>
      </van-col>
    </van-row>
  </div>
</template>

<script>

import { phone, splitParam }  from'../../static/js/utils';

import Api from '../../static/js/service-api';

export default {
  name: 'register',
   components:{

  },
  data () {
    return {
      formData: {
      	loginName: '',
      	loginPassword: '',
      	passwordagain: '',
      	phoneCode: ''
      },
      errorData: {
      	errorName: '',
      	errorLoginPassword: '',
      	errorPasswordagain: '',
      	errPhoneCode: ''
      },
      sendText: '获取验证码',
      disabled: false
    }
  },
  methods:{
    register(){
			this.errorData.errorName = '';
			if(this.formData.loginName === ''){
				this.errorData.errorName = '请输入手机号';
				return
			}
			if(phone(this.formData.loginName)){
				this.errorData.errorName = '请输入正确的手机号';
				return
			}
			this.errorData.errorName = '';
			if(this.formData.loginPassword === ''){
				this.errorData.errorLoginPassword = '请输入密码';
				return
			}
			this.errorData.errorLoginPassword = '';
			if(this.formData.passwordagain === ''){
				this.errorData.errorPasswordagain = '请再次输入密码';
				return
			}
			if(this.formData.loginPassword !== this.formData.passwordagain){
				this.errorData.errorPasswordagain = '两次输入密码不一致';
				return
			}
			this.errorData.errorPasswordagain = '';
			if(this.formData.phoneCode === ''){
				this.errorData.errPhoneCode = '请输入验证码';
				return
			}
      this.errorData.errPhoneCode = '';

      this.$axios.post(Api.serviceApi.register + splitParam(this.formData) ).then((res) => {
			  if(res.data.code === '0'){
          this.$toast('注册成功');
          localStorage.setItem('data',JSON.stringify(res.data.data))
          setTimeout(() =>{
            this.$router.push({name:'Index'});
          },1000)
        }else{
          this.$toast(res.data.msg);
        }
			})
    },
    sendPhoneCode(){
      if(this.formData.loginName === ''){
				this.$toast('请输入手机号');
				return
			}
			if(phone(this.formData.loginName)){
				this.$toast('请输入正确的手机号');
				return
      }
      this.disabled = true;
      this.$axios.post(Api.serviceApi.getPhoneCode + '?phone=' + this.formData.loginName ).then((res) => {
			  if(res.data.code === '0'){
          let num = 60;
          let timer = setInterval( () => {
            if(num <= 0){
              clearInterval(timer);
              this.sendText = '获取验证码';
              this.disabled = false;
            }else{
              num--;
              this.sendText = num + ' s';
            }
          },1000)
        }else{
          this.$toast(res.data.msg);
        }
			},(err) =>{
        this.$toast('网络繁忙，请重试');
        this.disabled = false;
      })

    },
    goToLogin(){
	  	this.$router.push({name:'login'});
	  }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
	text-align: right;
	margin-top: 10px;
	color: #999999;
}
</style>
