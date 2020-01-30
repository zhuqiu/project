<template>
	<div>
    <div class="group-center">
      <van-nav-bar
        title="房间中心"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <ul class="item-list">
          <li v-for="(item, index) in groupList" :key="index" @click="changeGroup(item.roomNo)" class="margin-top">
            <common-column>
              <div class="account-detail-content">
                <div class="account-detail-content-top">
                  <div class="detail-content-item">
                    <div>房间名： {{item.groupName}}</div>
                    <div>房间号： {{item.roomNo}}</div>
                  </div>
                  <van-icon name="success" class="select" size="20" v-if="dataInfo.curRoomNo === item.roomNo"/>
                </div>
                <div class="account-detail-content-bottom">
                  <div class="detail-content-item">
                    <div></div>
                    <div style="color:#1989fa;">
                      <span @click.stop="look(item)">查看</span>
                      <span style="margin-left:16px" @click.stop="update(item)" v-if="dataInfo.uid === item.createUid">修改</span>
                    </div>
                  </div>
                </div>
              </div>
            </common-column>
          </li>
        </ul>
        <div>
          <van-button type="primary" size="large" class="margin-top" @click="creatGroup" v-if="showBtn">创建房间</van-button>
        </div>
    </div>
    <group-setting-model ref="group" @change="onChange"></group-setting-model>
	</div>
</template>

<script>

import commonColumn from '../views/common-column.vue';

import { splitParam }  from'../../../static/js/utils';

import Api from '../../../static/js/service-api';

import groupSettingModel from '../Model/group-setting-model.vue';

export default {
  name: 'group-center',
  components:{
    commonColumn,
    groupSettingModel
	},
	data() {
		return {
      groupList: [],
      roomNo: '',
      showBtn: true
		}
  },
  created(){
    this.getGroupList()
  },
	methods:{
    onClickLeft(){
      this.$router.push({name: 'Index'})
    },
    getGroupList(){
      let obj = {
        token: this.dataInfo.token
      }
      this.$axios.post(Api.serviceApi.findRooms + splitParam(obj) ).then((res) =>{
				if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{
          this.groupList = res.data.data;
          let data = JSON.parse(localStorage.getItem('data'))
          this.groupList.forEach( (g)=>{
            //限制用户只能创建一个房间
            if(g.createUid === data.uid){
              this.showBtn = false;
            }
          })
				}
			})
    },
    onChange(){
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
          this.$toast('更换成功');
          done();
        }
			})
    },
    creatGroup(){
      this.$refs.group.show()
    },
    look(item){
      this.$refs.group.show(item,true)
    },
    update(item){
      this.$refs.group.show(item,false)
    }
	}

}
</script>

<style scoped>
.group-center{
  padding: 0 10px;
}
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
