<template>
	<div>
		<van-popup
		  v-model="visible"
		  closeable
		  get-container="body"
		  class="common-model-class"
		>
			<div class="common-model-title">房间列表</div>
			<div class="common-model-content">
				<!-- <van-divider :style="{ color: 'red'}">群列表</van-divider> -->
        <ul class="item-list">
          <li v-for="(item, index) in groupList" :key="index">
            <common-column>
              <div class="account-detail-content">
                <div class="account-detail-content-top">
                  <div class="detail-content-item">
                    <div>{{item.groupName}}</div>
                    <div>{{item.roomNo}}</div>
                  </div>
                </div>
              </div>
            </common-column>
          </li>
        </ul>
			</div>
		</van-popup>
	</div>
</template>

<script>

import commonColumn from '../views/common-column.vue';

export default {
  name: 'extension-model',
  components:{
		commonColumn: commonColumn
	},
	data() {
		return {
      visible: false,
      groupList: []

		}
  },
  created(){
    let dataInfo = this.dataInfo;
    if(Object.prototype.toString.call(dataInfo.room) === '[object Object]'){
      this.groupList.push(dataInfo.room);
    }else if(Array.isArray(dataInfo.room)){
      this.groupList = dataInfo.room;
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