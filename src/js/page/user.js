/**
* user.js
*/
var slider = require("../component/slider.js");
var backToTop = require("../component/backToTop.js");
var qrCodeShow = require("../component/qrCodeShow.js");
var fixedTop = require("../component/fixedTop.js");
var btnDownloadAnimate = require("../component/btnDownloadAnimate.js");
var imageLazyLoader = require("../component/imageLazyLoader.js");

$(function () {
	

	slider({
		element: $(".carousel_view"),
		dots: $(".dots"),
		autoplay:true,
		prevElem: $(".carousel_control .prev"),
		nextElem: $(".carousel_control .next"),
		callback:function(msg){
			this.prevElem.find("span").html("SLIDE "+(msg.prevIndex+1));
			this.nextElem.find("span").html("SLIDE "+(msg.nextIndex+1));
		}
	});

	qrCodeShow({
		element: $(".u-wx"),
		target: $(".u-wxgzpt")
	});

	backToTop({
		className: "back_to_top"
	});
	
	fixedTop({
		elem:$(".header"),
		fixedClass:"u-fixed",
		opacityNumber:"0.85"
	});

	btnDownloadAnimate();

	imageLazyLoader({
		transparentPng:"./images/transparent.png"
	});
});