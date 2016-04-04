/**
* 锚点插件
*

*/
var util = require("./util.js");
var anchor = function(config) {

	this.init(config);

}
anchor.prototype.init = function(config) {
	var _this = this;
	this.anchorBar = config.anchorBar;
	this.elements = config.elements;
	this.target = config.target;
	this.hashNames = [];
	this.targetTop = [];
	var temp = "";
	$(this.elements).each(function(index,element) {
		temp = "target_"+index;
		_this.hashNames.push(temp);
		_this.targetTop.push(_this.target.eq(index).offset().top - _this.anchorBar.height());
		util.setHref(element,"#"+temp);
		$(element).bind("click",function(){setTimeout(function(){_this.changeHash()},10)});
	});
	setTimeout(function(){
		_this.changeHash();
	},500);

	this.initScroll();
};
anchor.prototype.initScroll = function () {
	var _this = this;
    var url = window.location.toString();
	var hashName = url.split("#")[1];
	this.top = this.anchorBar.offset().top;
    if(!! hashName){
        
        this.onScroll();    
    }
	$(window).on("scroll",function(){
		if(_this.isInnerScroll){
			return;
		}
		_this.onScroll();
	});
};
anchor.prototype.onScroll = function(){

	var anchorBar = this.anchorBar;
	var top = this.top ;
	var tempTop = this.tempTop = $(window).scrollTop();
	var targetTop = this.targetTop;
	var index ;
	
	if(tempTop >= top){
		anchorBar.addClass("u-fixed");
	}else{
		anchorBar.removeClass("u-fixed");
	}

	if(tempTop < targetTop[0]){
		index = -1;
	}else{
		for (var i = 0; i < targetTop.length; i++) {
			
			if(tempTop < targetTop[i+1] && tempTop>= targetTop[i]){
				index = i;
				break;
			}
			
		}
	}

	// (index > targetTop.length-1 ) && (index = targetTop.length-1);
	
	// (index < 0)&&( index = 0);
	this.activeAnchor(index);


};
anchor.prototype.changeHash =function changeHash() {
	var _this = this;
	var url = window.location.toString();
	var hashName = url.split("#")[1];
	var anchorIndex = util.indexOf(this.hashNames,hashName);
	var top;
	if(!!hashName && (anchorIndex!=-1)){
		// _this.activeAnchor(anchorIndex);
		top = this.targetTop[anchorIndex];
		_this.isInnerScroll = true;
		$("html,body").animate({scrollTop: (top+1) + "px"},{
			duration: 500,
			easing: "swing",
			complete:function(){
				_this.onScroll();
				_this.isInnerScroll = false;

			}
		});

	}

};
anchor.prototype.activeAnchor =function(index){
    this.elements.removeClass("active");
    if(index != -1) {
        this.elements.eq(index).addClass("active");
    }
    var hashName = this.hashNames[index] || "";
    if("#"+hashName != location.hash){
        location.hash = hashName;    
    }
	
	
};

module.exports = anchor;
