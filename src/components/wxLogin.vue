<template>
	<div>

	</div>
</template>

<script>

import Api from '../../static/js/service-api';

import { splitParam, GetRequest }  from'../../static/js/utils'

export default {
	name: 'wx-login',
	data() {
		return {

		}
  },
  created(){
    let query = GetRequest(window.location.href);
    if(query.code){
      this.wxLogin(query);
    }else{
      this.getWXurl(query);
    }
    //this.checkUserLogin(query);
  },
	methods:{
    checkUserLogin(query){
      let obj = {
        token: this.dataInfo ? this.dataInfo.token : null
      }
      this.$axios.post(Api.serviceApi.checkUserLogin + splitParam(obj) ).then((res) => {
			  if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{
          if(res.data.data){
            this.$router.push({name:'Index'});
          }else{
            if(query.code){
              this.wxLogin(query);
            }else{
              this.getWXurl();
            }
          }
        }
			})
    },
    wxLogin(query){
      let obj = {
        code: query.code,
        inviteCode: query.inviteCode ? query.inviteCode : '15183',
        roomNo: query.roomNo ? query.roomNo  : '1234'
      }
      this.$axios.post(Api.serviceApi.wxLogin + splitParam(obj) ).then((res) => {
			  if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{
          localStorage.setItem('data',JSON.stringify(res.data.data));
          localStorage.setItem('amout',res.data.data.money);
          localStorage.removeItem('list');
          setTimeout(() =>{
            this.$router.push({name:'Index'});
          },500)
        }
			})
    },
    getWXurl(query){
      let obj = {
        inviteCode: query.inviteCode ? (query.inviteCode.indexOf('&') > -1 ? query.inviteCode.substr(0,query.inviteCode.length - 1) : query.inviteCode) : '15183',
        roomNo: query.roomNo ? query.roomNo : '1234'
      }
      this.$axios.get(Api.serviceApi.getWXurl + splitParam(obj) ).then((res) => {
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

</style>
