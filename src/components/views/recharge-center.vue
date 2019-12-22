<template>
	<div>
    <div class="recharge-center">
      <van-nav-bar
        title="充值中心"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
	</div>
</template>

<script>
export default {
	name: 'recharge-center',
	data() {
		return {

		}
  },
  mounted(){
    console.log(this.$route.params.num)
  },
	methods:{
    onClickLeft(){
      this.$router.push({name: 'Index'})
    }
	}

}
</script>

<style>

</style>
