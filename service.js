// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';

//var app_http="http://192.168.5.183:8080/f/app/";
 var app_http="http://39.99.130.130:10003/f/app/";
function getLoginUrl(){	 
    var str="login";
	return app_http+str; 
} 
function gettishiUrl(){	 
    var str="tishi";
	return app_http+str; 
} 
function getbaojingUrl(){	 
    var str="baojing";
	return app_http+str; 
}
function logupdateUrl(){	
	return app_http+"logupdate"
}
function logforgetUrl(){	
	return app_http+"forget"
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
	logforgetUrl,
    getUsers,
    addUser,
	getLoginUrl,
	logupdateUrl,
	getbaojingUrl,
	gettishiUrl
}
