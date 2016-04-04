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
	* user.js
	*/
	var slider = __webpack_require__(8);
	var backToTop = __webpack_require__(1);
	var qrCodeShow = __webpack_require__(2);
	var fixedTop = __webpack_require__(9);
	var btnDownloadAnimate = __webpack_require__(3);
	var imageLazyLoader = __webpack_require__(4);

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

/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

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

/***/ },
/* 9 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);