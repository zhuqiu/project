<template>
	<div>
		<table class="common-table" border cellspacing="0" cellpadding="0">
      <tr>
        <th v-for="(item,index) in row" :key="index">{{ item.name }}</th>
      </tr>
      <tr v-for="(item,index) in data" :key="index">
        <td v-for="(itemRow,indexRow) in row" :key="indexRow">{{ item[itemRow.slot] }}</td>
      </tr>
    </table>
	</div>
</template>

<script>
export default {
  name: 'common-table',

  props: {
    data: {
      type: Array,
      default: []
    },
    row: {
      type: Array,
      default: []
    }
  },
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
	.common-table{
    width: 100%;
    text-align: center;
    font-size: 10px;
    border-color: #f0f3f6;
  }
  .common-table tr th{
    background: #f0f3f6;
    font-weight: 400;
  }
  .common-table tr th, .common-table tr td{
    padding: 4px 6px;
  }
</style>
