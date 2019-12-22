const  remoteUrl = 'http://106.52.123.85:8888/';
export default{
	serviceApi:{

		//用户登录
		login: remoteUrl + '/data/api/login',

		//用户注册
		register: remoteUrl + '/data/api/registerByPhone',

		//发红包
		sendRedPackage: remoteUrl + '/data/api/fabao',

		//抢红包
    getRedPackage: remoteUrl + '/data/api/qiangbao',

    //获取验证码
    getPhoneCode: remoteUrl + '/data/api/getPhoneCode'

	}
}

