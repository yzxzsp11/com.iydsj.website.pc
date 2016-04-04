function qrCodeShow(config) {
	if(!(this instanceof qrCodeShow)){
		return new qrCodeShow(config);
	}
	this.init(config);
}
qrCodeShow.prototype.init = function(config) {
	var element = config.element;
	var target = config.target;
	var _this = this;

	element.hover(function(){
		target.show();
	},function(){
		!_this.isNeedShow && target.hide();
	});
	element.click(function(){
		_this.isNeedShow = !_this.isNeedShow;
	});
};
module.exports = qrCodeShow;