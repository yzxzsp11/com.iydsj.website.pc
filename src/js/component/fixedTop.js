function fixedTop(config) {
	if(!(this instanceof fixedTop)){
		return new fixedTop(config);
	}
	this.init(config);
}
fixedTop.prototype.init = function(config) {
	var _this = this;
	this.headerElem = config.elem;
	this.fixedClass = config.fixedClass;
	this.oldScrollTop = 0;
	this.opacityNumber = config.opacityNumber;

	$(window).on("scroll",function(){
		_this.onScroll();
	});
};
fixedTop.prototype.onScroll = function(config) {
	
	var scrollTop = $(window).scrollTop();
	var headerHeight = this.headerElem.height();

	if(scrollTop > headerHeight && this.oldScrollTop < headerHeight){
		this.headerElem
			.addClass(this.fixedClass)
			.css({"top":-headerHeight,
				"opacity": this.opacityNumber
			});

		this.headerElem
			.animate({"top":0},{duration: 500,
				easing: "swing"
			});
		
	}else if(scrollTop < headerHeight && this.oldScrollTop > headerHeight){
		this.headerElem
			.removeClass(this.fixedClass)
			.css({"top":0,
				"opacity":"1"
			});
	}
	this.oldScrollTop = scrollTop;
	
};
module.exports = fixedTop;