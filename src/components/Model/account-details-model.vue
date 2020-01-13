<template>
	<div>
		<van-popup
		  v-model="visible"
		  closeable
		  get-container="body"
		  class="common-model-class"
		>
			<div class="common-model-title">账户明细</div>
			<div class="common-model-content">
				<van-tabs v-model="active" :swipe-threshold="3" color="#1989fa">
					<van-tab title="游戏明细">
            <div class="no-content" v-if="gameList.length === 0">暂无充值明细</div>
						<ul class="item-list" v-else>
							<li v-for="(item, index) in gameList" :key="index">
								<common-column>
									<div class="account-detail-content">
										<div class="account-detail-content-top">
											<div class="detail-content-item">
												<div>标题</div>
												<div>{{ item.title }}</div>
											</div>
										</div>
										<div class="account-detail-content-bottom">
											<div class="detail-content-item">
												<div>时间</div>
												<div>{{ item.gameTime }}</div>
											</div>
											<div class="detail-content-item">
												<div>收益</div>
												<div>{{ item.desc }}</div>
											</div>

										</div>
									</div>
								</common-column>
							</li>
						</ul>
					</van-tab>
					<van-tab title="充值明细">
						<div class="no-content" v-if="rechargeList.length === 0">暂无充值明细</div>
						<ul class="item-list" v-else>
							<li v-for="(item, index) in rechargeList" :key="index">
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
										</div>
									</div>
								</common-column>
							</li>
						</ul>
					</van-tab>
					<van-tab title="提现明细">
						<div class="no-content" v-if="extractList.length === 0">暂无提现明细</div>
            <ul class="item-list" v-else>
							<li v-for="(item, index) in extractList" :key="index">
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
					</van-tab>
					<van-tab title="佣金明细">
						<div class="no-content" v-if="welfareList.length === 0">暂无佣金明细</div>
            <ul class="item-list" v-else>
							<li v-for="(item, index) in welfareList" :key="index">
								<common-column>
									<div class="account-detail-content">
										<div class="account-detail-content-top">
											<div class="detail-content-item">
												<div>佣金金额</div>
												<div>{{ item.money }}</div>
											</div>
										</div>
										<div class="account-detail-content-bottom">
                      <div class="detail-content-item">
												<div>佣金说明</div>
												<div>{{ item.remark }}</div>
											</div>
											<div class="detail-content-item">
												<div>获得时间</div>
												<div>{{ item.time }}</div>
											</div>
										</div>
									</div>
								</common-column>
							</li>
						</ul>
					</van-tab>
				</van-tabs>
			</div>
		</van-popup>
	</div>
</template>

<script>

import commonColumn from '../views/common-column.vue';

import { splitParam }  from'../../../static/js/utils';

import Api from '../../../static/js/service-api';

export default {

	name: 'account-details-model',
	components:{
		commonColumn: commonColumn
	},

	data() {
		return {
			visible: false,
      active:0,
      gameList: [],
      rechargeList: [],
      extractList: [],
      welfareList: []
		}
  },
  mounted(){
    this.getList('getGameList','gameList');
    this.getList('getRechargeList','rechargeList');
    this.getList('getCashList','extractList');
    this.getList('getRewordList','welfareList');
  },
	methods:{
		show(){
			this.visible = true;
    },
    getList(url,arr){
      let obj = {
        token: this.dataInfo.token
      }
      this.$axios.post(Api.serviceApi[url] + splitParam(obj)).then((res) => {
			  if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{
          this[arr] = res.data.data;
        }
			},(err) => {
        this.$toast('网络繁忙，请重试');
      })
    }
	}

}
</script>

<style scoped>
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
