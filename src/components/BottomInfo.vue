<template>
  <div class="content">
    <van-row class="operation-item">
      <van-col span="2">
        <div class="help-info">
          <van-icon name="service-o" size="20"/>
        </div>
      </van-col>
      <van-col span="18">
        <div class="dispute-info">
          <div class="dispute-input">点击 发红包</div>
        </div>
      </van-col>
      <van-col span="2">
        <div class="setting-info">
          <van-icon name="setting-o" size="20"/>
        </div>
      </van-col>
      <van-col span="2" @click="showMuchInfo">
        <div class="much-info">
          <van-icon name="add-o" size="20"/>
        </div>
      </van-col>
    </van-row>
    <div class="much-item" v-show="show">
      <van-row>
        <van-col span="6">
          <div class="item-detail">
            <van-icon name="phone-o" size="30"/>
            <span>客服在线</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="item-detail">
            <van-icon name="manager-o" size="30"/>
            <span>充值服务</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="item-detail">
            <van-icon name="refund-o" size="30"/>
            <span>金币互转</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="item-detail">
            <van-icon name="other-pay" size="30"/>
            <span>玩法介绍</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="item-detail">
            <van-icon name="label-o" size="30"/>
            <span>记录明细</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="item-detail">
            <van-icon name="chart-trending-o" size="30"/>
            <span>推广管理</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="item-detail">
            <van-icon name="refund-o" size="30"/>
            <span>金币互转</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="item-detail">
            <van-icon name="refund-o" size="30"/>
            <span>金币互转</span>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'bottom-info',
   components:{

  },
  data () {
    return {
      show:false
    }
  },
  methods:{
    showMuchInfo(){
      this.show = !this.show;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operation-item{
  height: 40px;
  line-height: 40px;
}
.dispute-info{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
}
.dispute-input{
  width: 96%;
  height: 24px;
  line-height: 24px;
  border-radius: 4px;
  color: #999;
  border: 1px solid #f0f3f6;
}
.help-info i,.setting-info i,.much-info i{
  position: relative;
  top: 5px;
}
.help-info{
  text-align: left;
}
.much-info{
  text-align: right;
}
.much-item{
  border-top: 1px solid #f0f3f6;
}
.much-item .item-detail{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 8px 0;
}
.much-item .item-detail span{
  color: #999;
}
</style>
