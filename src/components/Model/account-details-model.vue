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
						<ul class="item-list">
							<li>
								<common-column>
									<div class="account-detail-content">
										<div class="account-detail-content-top">
											<div class="detail-content-item">
												<div>231321</div>
												<div>321321</div>
											</div>
										</div>
										<div class="account-detail-content-bottom">
											<div class="detail-content-item">
												<div>231321</div>
												<div>321321</div>
											</div>
											<div class="detail-content-item">
												<div>231321</div>
												<div>321321</div>
											</div>
											<div class="detail-content-item">
												<div>231321</div>
												<div>321321</div>
											</div>
										</div>
									</div>
								</common-column>
							</li>
						</ul>
					</van-tab>
					<van-tab title="充值明细">
						<div class="no-content">暂无充值明细</div>
						<common-table :data="dataList" :row="dataRow"></common-table>
					</van-tab>
					<van-tab title="提现明细">
						<div class="no-content">暂无提现明细</div>
					</van-tab>
					<van-tab title="佣金明细">
						<div class="no-content">暂无佣金明细</div>
					</van-tab>
				</van-tabs>
			</div>
		</van-popup>
	</div>
</template>

<script>

import commonColumn from '../views/common-column.vue';

import commonTable from '../views/common-table.vue';

export default {

	name: 'account-details-model',
	components:{
		commonColumn: commonColumn,
		commonTable:commonTable
	},
	
	data() {
		return {
			visible: false,
			active:0,
			dataList:[],
			dataRow:[{
				name:'234'
			},{
				name:'234'
			},{
				name:'234'
			}]
		}
	},
	methods:{
		show(){
			this.visible = true;
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