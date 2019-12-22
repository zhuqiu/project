<template>
	<div>
		<van-popup
		  v-model="visible"
		  closeable
		  get-container="body"
		  class="common-model-class"
		>
			<div class="common-model-title">321321312</div>
			<div class="common-model-content">
				<div >
					<span>支付方式：</span>
					<van-checkbox v-model="checked">微信支付</van-checkbox>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
export default {
	name: 'account-details-model',
	data() {
		return {
			visible: false,
			checked:true
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