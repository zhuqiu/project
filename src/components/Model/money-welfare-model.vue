<template>
	<div>
		<van-popup
		  v-model="visible"
		  closeable
		  get-container="body"
		  class="common-model-class"
		>
			<div class="common-model-title">推广明细</div>
			<div class="common-model-content">
				
			</div>
		</van-popup>
	</div>
</template>

<script>
export default {
	name: 'money-welfare-model',
	data() {
		return {
			visible: false
		}
	},
	created(){
		this.getRewardList();
	},
	methods:{
		show(){
			this.visible = true;
		},
		getRewardList(){
			let obj = {
				token: this.dataInfo ? this.dataInfo.token : null
			} 
			this.$axios.post(Api.serviceApi.initWXJSInterface + splitParam(obj) ),then((res) =>{
				if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{
					console.log(res.data)
				}
			})
		}
	}
	
}
</script>

<style>
	
</style>