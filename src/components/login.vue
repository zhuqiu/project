<template>
  <div class="container">
    <van-row>
      <van-col span="24">
        <van-cell-group>
          <van-field
            v-model="phone"
            @touchstart.stop="show = true"
            clickable
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
        </van-cell-group>
      </van-col>
    </van-row>

    <van-row>
      <van-col span="24">
        <van-button type="primary" size="large" class="margin-top">登录</van-button>
        <van-button plain type="primary" size="large" class="margin-top" @click="goToRegister">注册</van-button>
      </van-col>
    </van-row>

    <van-number-keyboard
      :show="show"
      v-model="phone"
      extra-key="."
      close-button-text="完成"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    />

    <!-- <div style="width:300px;">
      <test></test>
    </div> -->
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
      show:false,
      val:{
        name:'zf',
        id:1
      }
    }
  },
  methods:{
    goToRegister(){
      this.$router.push({name:'register'});
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
