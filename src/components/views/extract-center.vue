<template>
	<div>
    <div class="extract-center">
      <van-nav-bar
        title="提现中心"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <!-- <van-tabs v-model="active" color="#1989fa" style="padding:0 10px">
        <van-tab title="提现">
          <van-row class="margin-top">
            <van-col span="8" class="label">
              <span>可用余额</span>
            </van-col>
            <van-col span="16" class="content">
              <div class="money">{{$route.params.num}}</div>
              <span class="tip">提现自动扣除3%手续费</span>
            </van-col>
          </van-row>
          <van-row class="margin-top">
            <van-col span="8" class="label" style="position:relative;top:14px;">
              <span class="required">提现金额</span>
              </van-col>
            <van-col span="16">
              <van-cell-group>
                <van-field v-model="value" type="number" placeholder="请输入金额" />
              </van-cell-group>
            </van-col>
          </van-row>
          <van-row class="margin-top">
            <van-col span="8" class="label">
              <span class="required">收款二维码</span>
            </van-col>
            <van-col span="16" class="content">
              <van-uploader :after-read="afterRead" v-model="fileList" :max-count="1"/>
            </van-col>
          </van-row>
          <van-row class="margin-top">
            <van-col span="8">

            </van-col>
            <van-col span="16" class="content">
              <van-button type="primary" size="small" @click="submit">立即提交</van-button>
            </van-col>
          </van-row>
        </van-tab>
        <van-tab title="提现记录">
          <div class="no-content" v-if="dataList.length === 0">暂无充值明细</div>
					<common-table :data="dataList" :row="dataRow" class="margin-top" v-else></common-table>
        </van-tab>
      </van-tabs> -->
      <div style="padding:0 10px 10px 10px;">
        <van-divider>提现</van-divider>
        <van-row class="margin-top">
          <van-col span="8" class="label">
            <span>可用余额</span>
          </van-col>
          <van-col span="16" class="content">
            <div class="money">{{ amout }}</div>
            <span class="tip">提现自动扣除3%手续费</span>
          </van-col>
        </van-row>
        <van-row class="margin-top">
          <van-col span="8" class="label" style="position:relative;top:14px;">
            <span class="required">提现金额</span>
            </van-col>
          <van-col span="16">
            <van-cell-group>
              <van-field v-model="value" type="number" placeholder="请输入金额" />
            </van-cell-group>
          </van-col>
        </van-row>
        <van-row class="margin-top">
          <van-col span="8" class="label">
            <span class="required">收款二维码</span>
          </van-col>
          <van-col span="16" class="content">
            <van-uploader :after-read="afterRead" v-model="fileList" :max-count="1"/>
          </van-col>
        </van-row>
        <van-row class="margin-top">
          <van-col span="8">

          </van-col>
          <van-col span="16" class="content">
            <van-button type="primary" size="small" @click="submit">立即提交</van-button>
          </van-col>
        </van-row>

        <van-divider>提现明细</van-divider>
        <div class="no-content" v-if="dataList.length === 0">暂无提现明细</div>
        <ul class="item-list" v-else>
          <li v-for="(item, index) in dataList" :key="index">
            <common-column>
              <div class="account-detail-content">
                <div class="account-detail-content-top">
                  <div class="detail-content-item">
                    <div>充值金额</div>
                    <div>{{ item.money }}</div>
                  </div>
                </div>
                <div class="account-detail-content-bottom">
                  <div class="detail-content-item">
                    <div>订单号</div>
                    <div>{{ item.orderNo }}</div>
                  </div>
                  <div class="detail-content-item">
                    <div>时间</div>
                    <div>{{ item.time }}</div>
                  </div>
                  <div class="detail-content-item">
                    <div>状态</div>
                    <div>{{ item.status }}</div>
                  </div>
                </div>
              </div>
            </common-column>
          </li>
        </ul>
      </div>
    </div>
	</div>
</template>

<script>

import commonColumn from '../views/common-column.vue';

import { splitParam }  from'../../../static/js/utils';

import Api from '../../../static/js/service-api';

export default {
  name: 'extract-center',
  components:{
		commonColumn
	},
	data() {
		return {
      active:0,
      amout:0,
      value: null,
      fileList: [],
      file: undefined,
      dataList:[],
			dataRow:[{
        name:'提现金额',
        slot: 'money'
			},{
        name:'订单编号',
        slot: 'orderNo'
			},{
        name:'提现时间',
        slot: 'time'
			},{
        name:'提现状态',
        slot: 'status'
			}]
		}
  },
  mounted(){
    this.getCashList();
    this.amout = localStorage.getItem('amout');
  },
	methods:{
    onClickLeft(){
      this.$router.push({name: 'Index'})
    },
    afterRead(file){
      this.file = file.file;
    },
    getCashList(){
      let obj = {
        token: this.dataInfo.token
      }
      this.$axios.post(Api.serviceApi.getCashList + splitParam(obj)).then((res) => {
			  if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{
          this.dataList = res.data.data;
        }
			},(err) => {
        this.$toast('网络繁忙，请重试');
      })
    },
    submit(){
      if(!this.value){
        this.$toast('请输入提现的金额');
        return;
      }
      if(Number(this.value) > Number(this.amout)){
        this.$toast('可用余额不足');
        return;
      }
      if(this.fileList.length === 0){
        this.$toast('请上传收款二维码');
        return;
      }

      let obj = {
        money: this.value,
        token: this.dataInfo.token
      }

      let formData = new FormData();

      formData.append("file", this.file);
      console.log(formData)

      let toast = this.$toast.loading({
        message: '加载中...',
        duration: 0, // 持续展示 toast
        forbidClick: true,
        loadingType: 'spinner'
      });

      this.$axios.post(Api.serviceApi.getCash + splitParam(obj),formData).then((res) => {
			  if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{
          toast.clear();
          this.getCashList();
          this.amout -= this.value;
          this.$toast('提交成功,待工作人员审核');
        }
			},(err) => {
        toast.clear();
        this.$toast('网络繁忙，请重试');
      })
    }
	}

}
</script>

<style scoped>

.label{
  font-size: 14px;
  color: #000000;

}
.label span{
  position: relative;
}
.label .required:after{
  content: '*';
  color: red;
  position: absolute;
  left: -6px;
  top: 0;
}
.content{
  text-align: left;
}
.content .money{
  font-size: 14px;
  color: red;
}
.content .tip{
  color: red;
}

.item-list{
	width: 100%;
}
.item-list li{
	width: 100%;
	margin-bottom: 10px;
	font-size: 12px;
	font-weight: 400;
}

.account-detail-content{
  background: #ffffff;
  padding: 0 4px;
}
.account-detail-content-top,.account-detail-content-bottom{
  padding-bottom: 6px;
}
.account-detail-content-top{
  border-bottom: 1px solid #f0f3f6;
}
.detail-content-item{
  padding: 6px 6px 0 6px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.no-content{
  color: #999999;
  text-align: center;
  font-weight: 400;
  font-size: 10px;
  margin-top: 30px;
}
</style>
