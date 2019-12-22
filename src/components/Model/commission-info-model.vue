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
				<van-panel title="标题">
				  <div>内容</div>
				</van-panel>
			</div>
		</van-popup>
	</div>
</template>

<script>
export default {
	name: 'commission-info-model',
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
