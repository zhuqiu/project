const  remoteUrl = 'http://139.9.91.193:8888';
export default{
	serviceApi:{

		//用户登录
		login: remoteUrl + '/data/api/login',

		//用户注册
    register: remoteUrl + '/data/api/registerByPhone',

    //获取用户红包列表信息
    getsyncUserInfo: remoteUrl + '/data/api/syncUserInfo',

		//发红包
		sendRedPackage: remoteUrl + '/data/api/fabao',

		//抢红包
    getRedPackage: remoteUrl + '/data/api/qiangbao',

    //获取验证码
    getPhoneCode: remoteUrl + '/data/api/getPhoneCode',

    //提现
    getCash: remoteUrl + '/data/api/cash',

    //获取支付地址
    getPayUrl: remoteUrl + '/data/api/getPayUrl',

    //获取提现明细
    getCashList: remoteUrl + '/data/api/cashList',

    //充值明细
    getRechargeList: remoteUrl + '/data/api/chongzhiList',

    //游戏明细
    getGameList: remoteUrl + '/data/api/gameList',

    //佣金明细
    getRewordList: remoteUrl + '/data/api/rewardList',

    //金币互转
    trasfer:  remoteUrl + '/data/api/trasfer',

    //设置自动抢红包
    getRedMoney: remoteUrl + '/data/api/setAutoQiangbao',

    //设置自动发红包
    putRedMoney: remoteUrl + '/data/api/setAutoFabao',

    //判断微信用户是否登录
    checkUserLogin: remoteUrl + '/data/api/checkUserLogin',

    //微信用户登录
    wxLogin: remoteUrl + '/data/api/wxLogin',

    //获取微信用户信息
    getWXurl: remoteUrl + '/data/api/getWXurl',

    //获取微信分享参数
    initWXJSInterface: remoteUrl + '/data/api/initWXJSInterface'
	}
}

