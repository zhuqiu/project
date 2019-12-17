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
        <van-button plain type="primary" size="large" class="margin-top">注册</van-button>
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


  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      phone:'',
      password:'',
      show:false
    }
  },
  created:{
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
