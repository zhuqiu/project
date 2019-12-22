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
				
			</div>
		</van-popup>
	</div>
</template>

<script>
export default {
	name: 'online-service-model',
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