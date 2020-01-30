<template>

</template>

<script>

import wx from 'weixin-js-sdk';

import Api from '../../../static/js/service-api';

import { splitParam }  from'../../../static/js/utils';

export default {
  name: 'wx-share',
	data() {
		return {

		}
  },
  created(){

  },
  methods:{
    initWxShare(){
      let obj = {
        url: ''
      }
      obj.url = encodeURIComponent(window.location.href.split('#')[0]);
      this.$axios.get(Api.serviceApi.initWXJSInterface + splitParam(obj) ).then((res) => {
			  if(res.data.code !== '0'){
          this.$toast(res.data.msg);
        }else{
          let that = this;
          wx.config({
            debug: false,
            appId: res.data.data.appId,
            timestamp: res.data.data.timestamp,
            nonceStr: res.data.data.nonceStr,
            signature: res.data.data.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 功能列表，我们要使用JS-SDK的什么功能
          });

          wx.ready(function(){
            let title = that.dataInfo ? that.dataInfo.groupName : '金字塔10-500（上分复制金额）';
            let shareCurrurl = obj.url;
            let desc = '千万红包等你免费领取';
            let imgUrl = obj.url + 'static/img/red-package.png';
            // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            wx.onMenuShareTimeline({
              title: title, // 分享标题
              link: shareCurrurl,
              desc: desc, // 分享描述,
              imgUrl: imgUrl, // 分享图标
              success: function () {
                  // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                  // 用户取消分享后执行的回调函数
              }
            });

            // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
            wx.onMenuShareAppMessage({
              title: title, // 分享标题
              link: shareCurrurl,
              desc: desc, // 分享描述,
              imgUrl: imgUrl, // 分享图标
              type: 'link', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
                    // 用户确认分享后执行的回调函数
                    
              },
              cancel: function () {
                    // 用户取消分享后执行的回调函数
              }
            });
            //获取“分享到QQ”按钮点击状态及自定义分享内容接口
            wx.onMenuShareQQ({
              title: title, // 分享标题
              link:shareCurrurl,
              desc: desc, // 分享描述,
              imgUrl: imgUrl, // 分享图标
              success: function () {
                  // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                  // 用户取消分享后执行的回调函数
              }
            });
            // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
            wx.onMenuShareWeibo({
              title: title, // 分享标题
              link:shareCurrurl,
              desc: desc, // 分享描述,
              imgUrl: imgUrl, // 分享图标
              success: function () {
                  // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                  // 用户取消分享后执行的回调函数
              }
            });
            //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
            wx.onMenuShareQZone({
              title: title, // 分享标题
              link:shareCurrurl,
              desc: desc, // 分享描述,
              imgUrl: imgUrl, // 分享图标
              success: function () {
                  // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                  // 用户取消分享后执行的回调函数
              }
            });
					});

        }
			})
    }
  }
}
</script>

<style scoped>

</style>
