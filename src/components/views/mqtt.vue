<template>
  <div></div>
</template>

<script>
export default {
  name: 'mqtt',
  props: {
    topic: {
      type: String,
      default: ''
    },
    tousepic: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      client: null
    }
  },
  methods: {
    // 建立新连接
    buildConnect (clientParams) {
      // eslint-disable-next-line
      this.client = new Paho.MQTT.Client(
        clientParams.hostname,
        clientParams.port,
        clientParams.clientId
      )

      // 建立客户端实例
      let options = {
        invocationContext: {
          host: clientParams.hostname,
          port: clientParams.port,
          path: this.client.path,
          clientId: clientParams.clientId
        },
        timeout: 5,
        keepAliveInterval: 50,
        cleanSession: false,
        useSSL: false,
        userName: clientParams.userName,
        password: clientParams.password,
        onSuccess: this.clientSuccess,
        onFailure: this.clientFailure
      }

      this.client.connect(options) // 连接服务器并注册连接成功处理事件
      this.client.onConnectionLost = this.onConnectionLost // 注册连接断开处理事件
      this.client.onMessageArrived = this.onMessageArrived // 注册消息接收处理事件
    },
    // mqtt连接成功
    clientSuccess () {
      // console.log('连接成功')
      // this.$emit('messageArrived', '连接成功')
      this.client.subscribe(this.topic) // 订阅主题
      this.client.subscribe(this.tousepic) // 订阅主题
    },
    // mqtt连接失败
    clientFailure (e) {
      this.$emit('messageArrived', "{type:7}")
    },
    // 连接丢失
    onConnectionLost (responseObject) {
      if (responseObject.errorCode === 0) {
        console.log('连接已断开')
      } else {
        console.log('异常：连接丢失' + responseObject.errorMessage)
      }
    },
    // 接收消息事件
    onMessageArrived (message) {
      this.$emit('messageArrived', message.payloadString)
    },
    // 断开mqtt连接
    disconnect () {
      this.client.disconnect()
    }
  }
}
</script>

<style>
</style>
