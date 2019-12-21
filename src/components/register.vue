<template>
  <div class="container">
    <van-cell-group>
      <van-field
        v-model="phone"
        label="手机号"
        placeholder="请输入手机号"
        error-message=""
        required
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="passwordagain"
        type="password"
        label="确认密码"
        placeholder="请再次输入密码"
        required
      />
      <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        required
      >
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>

    <van-row>
      <van-col span="24">
        <van-button plain type="primary" size="large" class="margin-top" @click="register">注册</van-button>
      </van-col>
    </van-row>

    <van-row>
      <van-col span="24">
        <div>
          已注册，去登录>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>

import test  from'./test'
export default {
  name: 'login',
   components:{
    test
  },
  data () {
    return {
      phone:'',
      password:'',
      passwordagain:'',
      sms:''
    }
  },
  methods:{
    register(){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  padding: 14px;
  background:#f0f3f6;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
}
</style>
