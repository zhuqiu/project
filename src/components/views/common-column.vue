<template>
	<div class="common-column">
    <slot></slot>
  </div>
</template>

<script>
export default {
	name: 'common-column',
	data() {
		return {

		}
  },
  mounted(){
    
  },
	methods:{
    
	}

}
</script>

<style scoped>
  .common-column{
    background: #f0f3f6;
    padding: 10px;
    border-left: 4px solid #1989fa;
    border-radius: 2px;
  }
</style>