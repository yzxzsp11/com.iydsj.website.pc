/**
* aboutUs.js
*/
var backToTop = require("../component/backToTop.js");
var qrCodeShow = require("../component/qrCodeShow.js");
var btnDownloadAnimate = require("../component/btnDownloadAnimate.js");
var imageLazyLoader = require("../component/imageLazyLoader.js");

$(function () {
	

	qrCodeShow({
		element: $(".u-wx"),
		target: $(".u-wxgzpt")
	});

	backToTop({
		className: "back_to_top"
	});

	btnDownloadAnimate();

	imageLazyLoader({
		transparentPng:"./images/transparent.png"
	});
});