<template>
	<div>
		<van-popup
		  v-model="visible"
		  closeable
		  get-container="body"
		  class="common-model-class"
		>
			<div class="common-model-title">充值</div>
			<div class="common-model-content">
				<div>
          <van-divider :style="{ margin:0 }">支付方式</van-divider>
					<van-checkbox v-model="checked">微信支付</van-checkbox>
				</div>
        <div style="margin-top:20px;">
          <van-divider :style="{ margin:0 }">充值金额</van-divider>
          <ul class="item-list">
            <li
              v-for="(item,index) in dataList"
              :key="index"
              @click="payClick(item,index)"
              :class="{ active: index === curindex }"
            >
              充值 {{item.number}} 元
            </li>
          </ul>
        </div>
			</div>
		</van-popup>
	</div>
</template>

<script>

import Api from '../../../static/js/service-api';

import { splitParam }  from'../../../static/js/utils'

export default {
	name: 'account-details-model',
	data() {
		return {
			visible: false,
      checked:true,
      curindex: null,
      dataList:[{
        number: 30
        },{
        number: 50
        },{
        number: 100
        },{
        number: 300
        },{
        number: 500
        },{
        number: 1000
        },{
        number: 2000
        },{
        number: 3000
        }]
		}
	},
	methods:{
		show(){
			this.visible = true;
    },
    payClick(item,index){
      this.curindex = index;
      let obj = {
        money: item.number,
        token: this.dataInfo.token
      }
      this.$axios.post(Api.serviceApi.getPayUrl + splitParam(obj) ).then((res) => {
			  if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{
          window.location.href = res.data.data;
        }
			})
    }
	}

}
</script>

<style scoped>
.van-checkbox{
  justify-content: center;
  margin-top: 10px;
}
.common-model-content .item-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.common-model-content .item-list li{
  width: 48%;
  height: 22px;
  line-height: 22px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #f0f3f6;
  margin-top: 10px;
  border-radius: 4px;
  color: #999;
  font-size: 12px;
}
.common-model-content .item-list li.active{
  border: 1px solid #1989fa;
  color: #1989fa;
}
</style>
