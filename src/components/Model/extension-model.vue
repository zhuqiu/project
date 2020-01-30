<template>
	<div>
		<van-popup
		  v-model="visible"
		  closeable
		  get-container="body"
		  class="common-model-class"
		>
			<div class="common-model-title">长按保存图片，发给朋友</div>
			<div class="common-model-content">
				<img :src="dataInfo.qrCode" alt="">
			</div>
		</van-popup>
	</div>
</template>

<script>
export default {
	name: 'extension-model',
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

<style scoped>
.common-model-content img{
  width: 100%;
}
</style>
