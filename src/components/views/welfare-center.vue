<template>
	<div>
    <div class="welfare-center">
      <van-nav-bar
        title="推广明细"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="welfare-content">
        <van-cell title="佣金金额" :value="rewardTotal"/>
        <van-divider :style="{ color: 'red'}">下级概念</van-divider>
        <ul class="item-list">
          <li v-for="(item, index) in teamList" :key="index">
            <common-column>
              <div class="account-detail-content">
                <div class="account-detail-content-top">
                  <div class="detail-content-item">
                    <div>{{item.title}}</div>
                    <div>{{item.number}}</div>
                  </div>
                </div>
                <div class="account-detail-content-bottom">
                  <div class="detail-content-item">
                    <div>{{item.agentTitle}}</div>
                    <div>{{item.agentNumber}} %</div>
                  </div>
                </div>
              </div>
            </common-column>
          </li>
        </ul>
        <van-divider :style="{ color: 'red'}">佣金明细</van-divider>
        <div class="no-content" v-if="welfareList.length === 0">暂无佣金明细</div>
        <ul class="item-list">
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
        <div style="margin:10px;" v-if="welfareList.length >= 10">
          <van-button type="primary" :loading="loading" size="mini" @click="loadMore">加载更多</van-button>
        </div>
      </div>
    </div>
	</div>
</template>

<script>

import commonColumn from '../views/common-column.vue';

import { splitParam }  from'../../../static/js/utils';

import Api from '../../../static/js/service-api';

export default {
  name: 'welfare-center',
  components:{
		commonColumn: commonColumn
	},
	data() {
		return {
      teamList: [],
      welfareList: [],
      rewardTotal: '',
      page: 1,
      pageSize: 10,
      loading: false
		}
  },
  mounted(){
    this.getRewardList();
    let dataInfo = this.dataInfo;
    this.rewardTotal = dataInfo.rewardTotal;
    this.teamList = [
      {
        title: '一级人数',
        number: dataInfo.level1count,
        agentTitle: '一级代理佣金百分比',
        agentNumber: dataInfo.level1
      },
      {
        title: '二级人数',
        number: dataInfo.level2count,
        agentTitle: '二级代理佣金百分比',
        agentNumber: dataInfo.level2
      },
      {
        title: '三级人数',
        number: dataInfo.level3count,
        agentTitle: '三级代理佣金百分比',
        agentNumber: dataInfo.level3
      },
      {
        title: '四级人数',
        number: dataInfo.level4count,
        agentTitle: '四级代理佣金百分比',
        agentNumber: dataInfo.level4
      },
      {
        title: '五级人数',
        number: dataInfo.level5count,
        agentTitle: '五级代理佣金百分比',
        agentNumber: dataInfo.level5
      },
      {
        title: '六级人数',
        number: dataInfo.level6count,
        agentTitle: '六级代理佣金百分比',
        agentNumber: dataInfo.level6
      },
      {
        title: '七级人数',
        number: dataInfo.level7count,
        agentTitle: '七级代理佣金百分比',
        agentNumber: dataInfo.level7
      }
    ]
  },
	methods:{
    onClickLeft(){
      this.$router.push({name: 'Index'})
    },
    getRewardList(){
			let obj = {
        page: this.page,
        pageSize: this.pageSize,
				token: this.dataInfo ? this.dataInfo.token : null
			} 
			this.$axios.post(Api.serviceApi.getRewordList + splitParam(obj) ).then((res) =>{
				if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{
					this.welfareList = res.data.data;
        }
        this.loading = false;
			})
    },
    loadMore(){
      this.pageSize += 10;
      this.loading = true;
      this.getRewardList();
    }
	}

}
</script>

<style scoped>
  .welfare-content{
    padding: 0 10px;
  }
  .item-list li{
    margin-bottom: 10px;
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
  .van-cell__title{
    text-align: left;
  }
	.no-content{
		color: #999999;
		text-align: center;
		font-weight: 400;
		font-size: 10px;
		margin-bottom: 20px;
	}
</style>