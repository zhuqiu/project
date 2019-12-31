<template>
	<div>
		<van-popup
		  v-model="visible"
		  closeable
		  get-container="body"
		  class="common-model-class"
		>
			<div class="common-model-title">金币互转</div>
			<div class="common-model-content">
        <van-steps :active="active">
          <van-step>转账金币</van-step>
          <van-step>商家接单</van-step>
        </van-steps>
			</div>
		</van-popup>
	</div>
</template>

<script>
export default {
	name: 'money-transfer-account-model',
	data() {
		return {
			visible: false
		}
	},
	methods:{
		show(){
			this.visible = true;
		}
	}

}
</script>

<style>

</style>
