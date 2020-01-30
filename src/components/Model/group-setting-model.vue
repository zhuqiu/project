<template>
	<div>
		<van-popup
		  v-model="visible"
		  closeable
		  get-container="body"
		  class="common-model-class"
		>
			<div class="common-model-title">{{ title }}</div>
			<div class="common-model-content">
				<van-row class="margin-top">
          <van-col span="8">
            <span class="title required">房间名称：</span>
          </van-col>
          <van-col span="16">
            <van-field v-model="formData.groupName" placeholder="请输入房间名称" :disabled="status"/>
          </van-col>
        </van-row>
        <van-row class="margin-top">
          <van-col span="8">
            <span class="title required">发包几包：</span>
          </van-col>
          <van-col span="10">
            <van-stepper v-model="formData.redAmount" :min="1" integer :disabled="status"/>
          </van-col>
        </van-row>
        <van-row class="margin-top">
          <van-col span="8">
            <span class="title required">发包赔率：</span>
          </van-col>
          <van-col span="10">
            <van-stepper v-model="formData.redPayRate" :min="0" :step="0.1" :disabled="status"/>
          </van-col>
        </van-row>
        <van-row class="margin-top">
          <van-col span="8">
            <span class="title required">过期时间：</span>
          </van-col>
          <van-col span="10">
            <van-stepper v-model="formData.redExpireMinutes" :min="5" integer :disabled="status"/>
          </van-col>
          <van-col span="4">
            <span class="title">分</span>
          </van-col>
        </van-row>
        <van-row class="margin-top">
          <van-col span="8">
            <span class="title required">最小红包：</span>
          </van-col>
          <van-col span="10">
            <van-stepper v-model="formData.minVal" :min="10" :step="10" integer :disabled="status"/>
          </van-col>
        </van-row>
        <van-row class="margin-top">
          <van-col span="8">
            <span class="title required">最大红包：</span>
          </van-col>
          <van-col span="10">
            <van-stepper v-model="formData.maxVal" :min="10" :step="10" integer :disabled="status"/>
          </van-col>
        </van-row>
        <!-- <van-row class="margin-top">
          <van-col span="8">
            <span class="title">房间密码：</span>
          </van-col>
          <van-col span="16">
            <van-field v-model="formData.pwd" placeholder="请输入房间密码" :disabled="status"/>
          </van-col>
        </van-row> -->
        <div style="text-align:center;margin-top:20px" v-if="!status">
          <van-button type="primary" size="small" :loading="loading" @click="submit">{{ btnName }}</van-button>
        </div>
        <div v-html="dataInfo.room.roomDesc" v-if="!status" class="margin-top" style="color:#1989fa;line-height:30px"></div>
    </div>
		</van-popup>
	</div>
</template>

<script>
import { splitParam, deepClone }  from'../../../static/js/utils';

import Api from '../../../static/js/service-api';

export default {
	name: 'extension-model',
	data() {
		return {
			visible: false,
      formData: {
        groupName: '',
        redAmount: 7,
        redPayRate: 1.6,
        redExpireMinutes: 15,
        minVal: 30,
        maxVal: 200,
        pwd: ''
      },
      resetForm: {
        groupName: '',
        redAmount: 7,
        redPayRate: 1.6,
        redExpireMinutes: 15,
        minVal: 30,
        maxVal: 200,
        pwd: ''
      },
      edit: false,
      status: false,
      title: '',
      btnName: '',
      loading: false
		}
	},
	methods:{
		show(obj,status){
      this.edit = false;
      if(obj){
        //为编辑状态
        this.title = '房间设置' + '(房号：' + obj.roomNo +')';
        this.btnName = '修改房间';
        this.edit = true;
        this.formData.groupName = obj.groupName;
        this.formData.redAmount = obj.redAmount;
        this.formData.redPayRate = obj.redPayRate;
        this.formData.redExpireMinutes = obj.redExpireMinutes;
        this.formData.minVal = obj.minVal;
        this.formData.maxVal = obj.maxVal;
        this.formData.pwd = obj.pwd;
        this.formData.roomNo = obj.roomNo;
      }else{
        this.formData = deepClone(this.resetForm);
        this.title='创建房间';
        this.btnName = '创建房间';
      }
      //是否为查看状态
      this.status = status;
      if(status){
        this.title = '查看房间'
      }
			this.visible = true;
    },
    submit(){
      this.formData.token = this.dataInfo.token;
      this.loading = true;
      this.$axios.post((this.edit ? Api.serviceApi.updateRoom : Api.serviceApi.createRoom) + splitParam(this.formData) ).then((res) =>{
				if(res.data.code !== '0'){
          this.$toast(res.data.msg);
          this.loading = false;
        }else{
          this.formData = deepClone(this.resetForm);
          this.visible = false;
          if(this.edit){
            this.$toast('修改成功');
          }else{
            this.$toast('您的房间已创建成功')
          }
          this.$emit('change');
				}
			})
    }
	}

}
</script>

<style scoped>
.van-cell{
  padding: 0;
}
.title{
  position: relative;
  top: 2px;
}
.required:before{
  content: '*';
  position: absolute;
  color: red;
  left: -6px;
}
.van-row{
  margin-left: 6px;
}
</style>