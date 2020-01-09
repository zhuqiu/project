<template>
  <div>
    <van-row>
      <van-col span="12">
        <div class="person-info">
          <div class="info-img" @click="infoPop">
            <img :src="src" alt="">
          </div>
          <div class="con-info">
            <div class="info-name">账号：<span>{{ name }}</span></div>
            <div class="info-amout">金币：{{ amout }} </div>
          </div>
        </div>
      </van-col>
      <van-col span="12">
        <div class="person-operation">
          <div @click="extract">
            <van-icon name="gold-coin-o" size="20"/>
            <span>提现</span>
            </div>
          <div @click="recharge">
            <van-icon name="balance-list-o" size="20"/>
            <span>充值</span>
          </div>
          <div @click="extension">
            <van-icon name="fire-o" size="20"/>
            <span>推广</span>
          </div>
        </div>
      </van-col>
    </van-row>



    <!-- 充值弹框 -->
    <recharge-model ref="recharge"></recharge-model>

    <!-- 推广弹框 -->
    <extension-model ref="extension"></extension-model>
  </div>
</template>

<script>

import rechargeModel from './Model/recharge-model.vue'

import extensionModel from './Model/extension-model.vue'

export default {
  name: 'top-info',
   components:{
     rechargeModel,
     extensionModel
  },
  data () {
    return {
      src: '',
      name: '',
      amout: null
    }
  },
  created(){
    this.name = this.dataInfo.inviteCode;
    this.amout = localStorage.getItem('amout');
    this.src = this.dataInfo.headImg ? this.dataInfo.headImg : '.././static/img/LC_icon_user_group_fill.png';
  },
  methods:{
    recharge(){
      this.$refs.recharge.show();
    },
    extract(){
      this.$router.push({name: 'extractcenter'})
    },
    extension(){
      this.$refs.extension.show();
    },
    change(data){
      this.amout = data.money.toFixed(2);
      localStorage.setItem('amout', this.amout)
    },
    infoPop(){
      this.$emit('infoClick');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-info i{
  position: relative;
  top: 4px;
}
.person-info{
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.person-info .info-img img{
  width: 24px;
  border-radius: 50%;
  position: relative;
  top: 6px;
}
.person-info .con-info{
  display: flex;
  flex-direction: column;
  line-height: 14px;
  margin-left: 6px;
}
.person-info .con-info .info-name{
  font-size: 10px;
}
.person-info .con-info .info-name span{
  color: #1989fa;
  font-weight: 900;
}
.person-info .con-info .info-amout{
  text-align: left;
  font-weight: 600;
}
.person-operation{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
