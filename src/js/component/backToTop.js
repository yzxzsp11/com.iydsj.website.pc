function back_to_top(config) {
	if(!(this instanceof back_to_top)){
		return new back_to_top(config);
	}
	this.init(config);
}
back_to_top.prototype.init = function(config){
	var _this = this;
	var back_to_top_btn = this.back_to_top_btn= $("<a></a>").addClass(config.className);
	this.screenHeight = $(window).height();
	$("body").append(back_to_top_btn);
	back_to_top_btn.click(function(){
		_this.toTop();
	});
	this.initToTopToggle();
}
back_to_top.prototype.toTop = function(){
	$("html,body").animate({"scrollTop":0},{
		duration: 500,
		easing: "swing"
	})
}
back_to_top.prototype.initToTopToggle = function(first_argument) {
	var _this = this;
	this.onScroll();
	$(window).on("scroll",function(){
		_this.onScroll();
	})
};
back_to_top.prototype.onScroll = function(){
	var tempTop = $(window).scrollTop();
	if(tempTop >= this.screenHeight){
		this.back_to_top_btn.show();
	}else{
		this.back_to_top_btn.hide();
	}
}
module.exports = back_to_top;