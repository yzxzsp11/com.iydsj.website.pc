function carousel(config) {
	this.init(config);
}
carousel.prototype.init = function(config) {
	this.carouselElem = config.carouselElem;
	this.controlElem = config.controlElem;
	this.activeIndex = 0;
	
	this.carouselList = this.carouselElem.find(">li");
	this.carouselListLen = this.carouselList.length;
	this.carouselElemItemMarginRight = parseInt(this.carouselList.eq(0).css("margin-right"));
	this.carouselListElemWidth = this.carouselList.eq(0).width();
	this.carouselListElemSpace = this.carouselListElemWidth + this.carouselElemItemMarginRight;
	this.carouselElemWidth = this.carouselList.length * this.carouselListElemSpace;
	this.carouselElem.width(this.carouselElemWidth);

	this.prev = this.controlElem.find("a").eq(0);
	this.next = this.controlElem.find("a").eq(1);

	this.initControl()
};
carousel.prototype.initControl = function(){
	var _this = this;
	this.prev.click(function(){
		_this.prevFn();
	});
	this.next.click(function(){
		_this.nextFn();
	});
};
carousel.prototype.prevFn = function(){
	this.activeTo(--this.activeIndex);
}
carousel.prototype.nextFn =  function(){
	this.activeTo(++this.activeIndex);
}
carousel.prototype.activeTo = function(index){
	this.carouselElem.append(this.carouselElem.find(">li")[0]);
}

module.exports = carousel;