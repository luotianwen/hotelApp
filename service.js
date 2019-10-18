// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';

var app_http="http://192.168.2.124:8083/f/app/";
 
/*
 * 登录接口
 */
function getLoginUrl(){	 
    var str="login";
	return app_http+str; 
}
const getUsers = function () {
    let ret = '';
    ret = uni.getStorageSync(USERS_KEY);
    if (!ret) {
        ret = '{}';
    }
    return JSON.parse(ret);
}

const addUser = function (userInfo) {
    uni.setStorageSync(USERS_KEY, JSON.stringify(userInfo));
}

export default {
    getUsers,
    addUser,
	getLoginUrl
}
