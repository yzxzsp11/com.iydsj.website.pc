/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* aboutUs.js
	*/
	var backToTop = __webpack_require__(1);
	var qrCodeShow = __webpack_require__(2);
	var btnDownloadAnimate = __webpack_require__(3);
	var imageLazyLoader = __webpack_require__(4);

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
			transparentPng:"../images/transparent.png"
		});
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

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

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ },
/* 3 */
/***/ function(module, exports) {

	function btnDownloadAnimate(config) {
		if(!(this instanceof btnDownloadAnimate)){
			return new btnDownloadAnimate(config);
		}
		this.init(config);
	}

	btnDownloadAnimate.prototype.init = function(config) {
		// body...
		$(".download_area").each(function(){
			var $this = $(this);
			$(this).find(".btn_download,.close_download").click(function(){
				$this.toggleClass("show_qr");
				if($this.hasClass("show_qr")){
					$this.find("img").css({"top":"-42px"})
					$this.find("img").animate({"top":0},{
						duration: 500,
						easing: "swing"
					});
				}
			});
		});

	};
	module.exports = btnDownloadAnimate;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Created by junyu on 2016/3/23.
	 */
	function imageLazyLoader(config){
	    if(!(this instanceof imageLazyLoader)){
	        return new imageLazyLoader(config);
	    }
	    this.init(config);
	}
	imageLazyLoader.prototype.init = function(config){
	    this.transparentPng = config.transparentPng;
	    $("img.lazy").lazyload({
	        effect : "fadeIn",
	        no_fake_img_loader:false,
	        load:function($elem){
	            $elem.removeClass("lazy").removeClass("lazy_small");
	        },
	        placeholder_data_img: this.transparentPng,
	        placeholder_real_img: this.transparentPng
	    });
	};
	module.exports = imageLazyLoader;

/***/ }
/******/ ]);