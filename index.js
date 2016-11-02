


// var phone = document.getElementById("phone");
// var password = document.getElementsByTagName('input')[1];


function errorDisplay(elementID) {
	var BoxElementID = elementID + "-box";
	var messageElementID = elementID + "-error-message";
	var aa = document.getElementById(elementID);

	if (!velidator.results[elementID]) {
		changeClassValue(false, 'error-box-display', BoxElementID);
		changeClassValue(false, 'error-message-display', messageElementID);
	}else {
		
		changeClassValue(true, 'error-box-display', BoxElementID);
		changeClassValue(true, 'error-message-display', messageElementID);
		aa.innerHTML = velidator.results[elementID];
	}
	
}

function changeClassValue(add, className, elementID) {
	//add = true 添加
	var element = document.getElementById(elementID);
	var value = element.getAttributeNode('class').value;
	var hasClassNameIndex = value.indexOf(" "+ className);
	if (add && hasClassNameIndex == -1) {
		element.setAttribute('class', value+' ' + className);

	}else if (hasClassNameIndex != -1 && !add) {
		element.setAttribute('class', value.replace(className,''));
	}
}


function postMessage(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState==4 && xmlHttp.status==200) {
			console.log(xmlHttp.responseText);
		}
	}
	xmlHttp.open("get","responseT.json?v=" + new Date() * 1,true);
	xmlHttp.send();
}


document.getElementById("submit").onclick = function submit() {
	velidator.validate();
	if(velidator.isvalid) {
		postMessage();
		console.log('postMessage + velidator: '+ velidator.isvalid);
	}
	else{
		for(var elementID in velidator.results){
			errorDisplay(elementID);
		}
	}
};

var velidator = new Verification({
	rules: {
		'phone' : {
			required : true,
			phone: true
		},
		'password': {
			required: true,
			password: true
		}
	},
	messages: {
		'phone' : {
			'required' : "请输入手机号/邮箱",
			'phone' : "手机号输入格式错误"
		},
		'password' : {
			'required' :"请输入密码",
			'password' :"invalid password format"
		}
	},
	'errorHandle' : function (element, msg){
		console.log("errorHandle: " +element+" 元素 " + msg);
	},
	'onChangeHandle': errorDisplay
});



















