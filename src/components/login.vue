<template>
  <div class="container">
    <van-row>
      <van-col span="24">
        <van-cell-group>
          <!--<van-field
            v-model="phone"
            @touchstart.stop="show = true"
            clickable
            label="手机号"
            placeholder="请输入手机号"
            error-message=""
            required
          />-->
          <van-field
            v-model="formData.loginName"
            label="用户名"
            placeholder="请输入手机号"
            :error-message="errorData.errorName"
            required
          />
          <van-field
            v-model="formData.loginPassword"
            type="password"
            label="密码"
            placeholder="请输入密码"
            :error-message="errorData.errorPassword"
            required
          />
        </van-cell-group>
      </van-col>
    </van-row>

    <van-row>
      <van-col span="24">
        <van-button type="primary" size="large" class="margin-top" @click="login">登录</van-button>
        <van-button plain type="primary" size="large" class="margin-top" @click="goToRegister">注册</van-button>
      </van-col>
    </van-row>

    <!--<van-number-keyboard
      :show="show"
      v-model="phone"
      extra-key="."
      close-button-text="完成"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    />-->

  </div>
</template>

<script>

import Api from '../../static/js/service-api';

import { splitParam }  from'../../static/js/utils'

export default {
  name: 'login',
   components:{

  },
  data () {
    return {
    	formData:{
    		loginName:'',
    		loginPassword:''
    	},
    	errorData:{
    		errorName: '',
    		errorPassword: ''
    	}
    }
  },
  mounted(){
//	console.log(Api)
  },
  methods:{
    goToRegister(){
      this.$router.push({name:'register'});
    },
    login(){
    	if(this.formData.loginName === ''){
    		this.errorData.errorName = '请输入登录名';
    		return;
    	}
    	this.errorData.errorName = '';
    	if(this.formData.loginPassword === ''){
    		this.errorData.errorPassword = '请输入密码';
    		return;
    	}
    	this.errorData.errorPassword = '';
    	this.$axios.post(Api.serviceApi.login + splitParam(this.formData) ).then((res) => {
			  if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{
          localStorage.setItem('data',JSON.stringify(res.data.data))
          this.$toast('登录成功');
          setTimeout(() =>{
            this.$router.push({name:'Index'});
          },1000)
        }
			})
    },
    onInput(){

    },
    onDelete(){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
