function Verification(option) {
	this.rules = option.rules;
	var messages = option.messages;
	var errorHandle = option.errorHandle;
	var onChangeHandle = option.onChangeHandle;
	var methods = {
		required: function (str) {
			return str !== '';
		},

		phone: function(str) {
			return str.length > 8;
		},
		password: function(str) {
			return str.length > 6;
		}
	}
	this.isvalid;
	this.results = {};

	this.validate = function () {
		this.isvalid = true;
		this.results = {};
		for(var elementID in this.rules) {
			var rule = this.rules[elementID];

			var element = document.getElementById(elementID);
			var  val = element.value;

			for(var key in rule){

				var method = methods[key];
				if (!method(val) == rule[key]) {

					errorHandle(elementID,messages[elementID][key]);
					this.isvalid = false;
					this.results[elementID] = messages[elementID][key];
					break;
				}				
			}
		}
	}

	var that = this;	

	for(let elementID in this.rules) {

		document.getElementById(elementID).onchange = function () {
			that.validate();
			console.log("onchange " + elementID);
			onChangeHandle(elementID); 
		}
	}
}