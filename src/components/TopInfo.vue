<template>
  <div>
    <van-row>
      <van-col span="10">
        <div class="person-info">
          333
        </div>
      </van-col>
      <van-col span="14">
        <div class="person-operation">
          <div>
            <van-icon name="gold-coin-o" />
            <span>提现</span>
            </div>
          <div>
            <van-icon name="balance-list-o" />
            <span>充值</span>
          </div>
          <div>
            <van-icon name="fire-o" />
            <span>推广</span>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>

export default {
  name: 'top-info',
   components:{

  },
  data () {
    return {

    }
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.person-info{
  text-align: left;
}
.person-operation{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
