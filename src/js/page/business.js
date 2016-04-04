/**
* business.js
*/
var anchor = require("../component/anchor.js");
var qrCodeShow = require("../component/qrCodeShow.js");
var carousel = require("../component/carousel.js");
var backToTop = require("../component/backToTop.js");
var btnDownloadAnimate = require("../component/btnDownloadAnimate.js");
var imageLazyLoader = require("../component/imageLazyLoader.js");

$(document).ready(function () {

	new anchor({
		anchorBar:$(".tab .tab_header"),
		elements:$(".tab .tab_header").find("a"),
		target:$("[achorTarget]")
	});
	new qrCodeShow({
		element:$(".u-wx"),
		target:$(".u-wxgzpt")
	});

	new carousel({
		carouselElem:$(".app_show_screen_box"),
		controlElem:$(".app_show_control")
	});
	new backToTop({
		className:"back_to_top"
	});

	btnDownloadAnimate();

	imageLazyLoader({
		transparentPng:"./images/transparent.png"
	});
});