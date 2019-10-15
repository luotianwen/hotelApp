
var app_http="http://192.168.0.120:8081/";
 
/*
 * 登录接口
 */
function getLoginUrl(){	 
    var str="oauth/login";
	return app_http+str; 
}
/*
 * 短信接口
 */
function getSmsCodeUrl(){
    var str="sms";
	return app_http+str; 
}
/*
 * 注册接口
 */
function getRegisterUrl(){
    var str="mobile/register";
	return app_http+str; 
}
/*
 * 忘记密码接口
 */
function getResetUrl(){
    var str="mobile/forgetPwd";
	return app_http+str; 
}
/**
 * 主页轮播图
 */
function getMainpic(){

	 var str="indexImg/getIndexImg";
	return app_http+str; 
}
 
 
/**
 * 获取免责条款
 */
function getDisclaimer(){
	var str="mobile/promise";
	return app_http+str; 
}

/*
 * 首页数据
 */
function getHomehouseUrl(){
	var str="project/moreProject";
	return app_http+str
}
/*
 * 首页获取省份
 */
function getHomeProvinceUrl(){
	var str="city/getCityAll";
	return app_http+str
}
/*
 * 通过经纬度获取省份名
 */
function getHomeProvinceNameUrl(){
	var str="city/getAdd";
	return app_http+str
}

/**
 * 获取项目城市
 */
function getCityFirst(){
	var str="city/getCityFirst";
	return app_http+str; 
}

/**
 * 获取项目城市
 */
function getCitySecond(){
	var str="city/getCitySecond";
	return app_http+str; 
}
/**
 * 获取推荐项目
 */
function getRecommendProjectCity(){
	var str="city/getCity";
	return app_http+str; 
}
/**
 * 保存推荐
 */
function saveRecommendProject(){
	var str="record/checkProjectInfo";
	return app_http+str; 
}
/**
 * 首页收藏
 */
function homeSc(){
	var str="project/concern";
	return app_http+str; 
}
 /**
 * 我的客户
 */
function getMyCustomerNum(){
	var str="user/myCustomerNum";
	return app_http+str; 
} /**
 * 我的客户
 */
function getMyCustomer(){
	var str="user/myCustomer";
	return app_http+str; 
}
/**
 * 我的账单总计
 */
function myBillTotal (){
	var str="user/myBillNum";
	return app_http+str; 
}
/**
 * 我的账单项目列表
 */
function myBillList (){
	var str="user/myBillList";
	return app_http+str; 
}

/**
 * 我的账单项目详细
 */
function myBillProjectNum (){
	var str="user/myBillProjectNum";
	return app_http+str; 
}
/**
 *   http://localhost:8081/user/myDeal?memberId=500
 */
function myDeal (){
	var str="user/myDeal";
	return app_http+str; 
}
 
