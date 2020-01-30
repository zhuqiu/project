<template>
	<div>
		<van-popup
		  v-model="visible"
		  closeable
		  get-container="body"
		  class="common-model-class"
		>
			<div class="common-model-title">按活跃度排名（前10）</div>
			<div class="common-model-content">
        <van-search
          v-model="searchNo"
          placeholder="请输入房间号"
          @search="onSearch"
          @clear="onClear"
        />
        <div class="no-content" v-if="groupList.length === 0">无内容</div>
				<ul class="item-list">
          <li v-for="(item, index) in groupList" :key="index" @click="changeGroup(item.roomNo)" class="margin-bottom">
            <common-column>
              <div class="account-detail-content">
                <div class="account-detail-content-top">
                  <div class="detail-content-item">
                    <div style="width:54px;">房间名</div>
                    <div>{{item.groupName}}</div>
                  </div>
                  <van-icon name="success" class="select" size="20" v-if="dataInfo.curRoomNo === item.roomNo"/>
                </div>
                <div class="account-detail-content-bottom">
                  <div class="detail-content-item">
                    <div>房间号</div>
                    <div>{{item.roomNo}}</div>
                  </div>
                  <div class="detail-content-item">
                    <div></div>
                    <div style="color:#1989fa;">
                      <span @click.stop="look(item)">查看</span>
                      <span style="margin-left:16px" v-if="dataInfo.curRoomNo != item.roomNo">进入房间</span>
                    </div>
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

import { splitParam }  from'../../../static/js/utils';

import Api from '../../../static/js/service-api';
import commonColumn from '../views/common-column.vue';

export default {
  name: 'group-list-model',
  components:{
    commonColumn
	},
	data() {
		return {
      visible: false,
      groupList: [],
      roomNo: '',
      searchNo: ''
		}
  },
  created(){
    this.getGroupList();
  },
	methods:{
		show(){
			this.visible = true;
    },
    getGroupList(){
      let obj = {
        roomNo: this.searchNo,
        token: this.dataInfo.token
      }
      this.$axios.post(Api.serviceApi.findRooms + splitParam(obj) ).then((res) =>{
				if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{
          this.groupList = res.data.data;
				}
			})
    },
    onSearch(){
      this.getGroupList();
    },
    onClear(){
      this.getGroupList();
    },
    changeGroup(no){
      this.roomNo = no;
      this.$dialog.confirm({
        title: '切换房间',
        message: '点击确认后可切换为当前房间，是否切换？',
        width: '320px',
        beforeClose: this.beforeClose
      })
    },
    beforeClose(action,done){
      let obj = {
        roomNo: this.roomNo,
        token: this.dataInfo.token
      }
      if(action === 'confirm'){
        this.$axios.post(Api.serviceApi.changeRoom + splitParam(obj) ).then((res) =>{
          if(res.data.code !== '0'){
            this.$toast(res.data.msg);
          }else{
            this.getsyncUserInfo(done)
          }
        })
      }else{
        done();
      }
      
    },
    getsyncUserInfo(done){
      let obj = {
        token: this.dataInfo.token
      }
      this.$axios.post(Api.serviceApi.getsyncUserInfo + splitParam(obj) ).then((res) => {
			  if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{
          localStorage.setItem('data',JSON.stringify(res.data.data))
          this.dataInfo = res.data.data;
          this.groupList = this.groupList.slice(0); //触发视图更新
          this.$toast('切换成功');
          done();
          window.location.reload();
        }
			})
    },
    look(obj){
      this.$emit('change',obj);
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
  position:relative;
  border-bottom: 1px solid #f0f3f6;
}
.account-detail-content-top .select{
  position:absolute;
  right: -14px;
  top: -7px;
  color: red;
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
