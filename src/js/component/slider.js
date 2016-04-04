function slider(config) {
	if(!(this instanceof slider)){
		return new slider(config);
	}
	this.init(config);
}
slider.prototype.init = function(config) {
	this.element = config.element;
	this.autoplay = config.autoplay;
	this.callback = config.callback || function(){};
	this.current = 0;
	this.dots = config.dots;

	this.innerElement = this.element.find("ul");
	this.elemList = this.innerElement.find(">li");
	this.prevElem = config.prevElem;
	this.nextElem = config.nextElem;

	this.initSlider();
	this.resizeWindow();

};
slider.prototype.initSlider = function(){
	var _this = this;
	var $dotsList = this.$dotsList = $("<ul></ul");
	var $temLi;


	this.elemList.each(function(index,elem){
		$temLi = $("<li></li>");
		$dotsList.append($temLi);
		$temLi.click(function(){
			_this.goTo(index);
		});
	});

	this.dots.append($dotsList);
	$dotsList.find("li").eq(0).addClass("active");

	this.initControlEvents();
	
	$(window).resize(function(){
		_this.resizeWindow();
	});
}
slider.prototype.initControlEvents = function() {
	var _this = this;

	this.prevElem.click(function(){
		_this.prev();
	});
	this.nextElem.click(function(){
		_this.next();
	});

	this.prevElem.hover(function(){
		$(this).addClass("active");
	},function(){
		$(this).removeClass("active");
	});

	this.nextElem.hover(function(){
		$(this).addClass("active");
	},function(){
		$(this).removeClass("active");
	});
};
slider.prototype.resizeWindow = function(){
	var _this = this;
	this.elemWidth = this.element.width();
	this.innerElement.width(this.elemWidth*this.elemList.length);
	this.elemList.each(function(index,elem){
		$(elem).width(_this.elemWidth);
	});
	this.resetTo(this.current);
}

slider.prototype.next = function(){
	var index = this.getNext();
	
	this.goTo(index);
}
slider.prototype.prev = function(){
	var index = this.getPrev();

	this.goTo(index);
}
slider.prototype.getNext = function(){
	var nextIndex;
	if(this.current+1>=this.elemList.length){
		nextIndex = 0;
	}else{
		nextIndex = this.current+1;
	}
	return nextIndex;
}

slider.prototype.getPrev = function(){
	var prevIndex;
	if(this.current-1<0){
		prevIndex = this.elemList.length-1;
	}else{
		prevIndex = this.current-1;
	}
	return prevIndex;
}
slider.prototype.goTo = function(index){
	var _this = this;
	var prevIndex,nextIndex;

	this.current = index;

	this.innerElement.animate({
		"left": -index*this.elemWidth
	},{
		duration:500,
		complete:function(){
			_this.callback({
				prevIndex:_this.getPrev(),
				nextIndex:_this.getNext()
			});
		}
	});
	this.$dotsList.find("li").removeClass("active");
	this.$dotsList.find("li").eq(index).addClass("active");
}
slider.prototype.resetTo = function(index){
	var _this = this;
	var prevIndex,nextIndex;

	this.current = index;

	this.innerElement.css({
		"left": -index*this.elemWidth
	});
}

module.exports = slider;