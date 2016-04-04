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
	* business.js
	*/
	var anchor = __webpack_require__(5);
	var qrCodeShow = __webpack_require__(2);
	var carousel = __webpack_require__(7);
	var backToTop = __webpack_require__(1);
	var btnDownloadAnimate = __webpack_require__(3);
	var imageLazyLoader = __webpack_require__(4);

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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* 锚点插件
	*

	*/
	var util = __webpack_require__(6);
	var anchor = function(config) {

		this.init(config);

	}
	anchor.prototype.init = function(config) {
		var _this = this;
		this.anchorBar = config.anchorBar;
		this.elements = config.elements;
		this.target = config.target;
		this.hashNames = [];
		this.targetTop = [];
		var temp = "";
		$(this.elements).each(function(index,element) {
			temp = "target_"+index;
			_this.hashNames.push(temp);
			_this.targetTop.push(_this.target.eq(index).offset().top - _this.anchorBar.height());
			util.setHref(element,"#"+temp);
			$(element).bind("click",function(){setTimeout(function(){_this.changeHash()},10)});
		});
		setTimeout(function(){
			_this.changeHash();
		},500);

		this.initScroll();
	};
	anchor.prototype.initScroll = function () {
		var _this = this;
	    var url = window.location.toString();
		var hashName = url.split("#")[1];
		this.top = this.anchorBar.offset().top;
	    if(!! hashName){
	        
	        this.onScroll();    
	    }
		$(window).on("scroll",function(){
			if(_this.isInnerScroll){
				return;
			}
			_this.onScroll();
		});
	};
	anchor.prototype.onScroll = function(){

		var anchorBar = this.anchorBar;
		var top = this.top ;
		var tempTop = this.tempTop = $(window).scrollTop();
		var targetTop = this.targetTop;
		var index ;
		
		if(tempTop >= top){
			anchorBar.addClass("u-fixed");
		}else{
			anchorBar.removeClass("u-fixed");
		}

		if(tempTop < targetTop[0]){
			index = -1;
		}else{
			for (var i = 0; i < targetTop.length; i++) {
				
				if(tempTop < targetTop[i+1] && tempTop>= targetTop[i]){
					index = i;
					break;
				}
				
			}
		}

		// (index > targetTop.length-1 ) && (index = targetTop.length-1);
		
		// (index < 0)&&( index = 0);
		this.activeAnchor(index);


	};
	anchor.prototype.changeHash =function changeHash() {
		var _this = this;
		var url = window.location.toString();
		var hashName = url.split("#")[1];
		var anchorIndex = util.indexOf(this.hashNames,hashName);
		var top;
		if(!!hashName && (anchorIndex!=-1)){
			// _this.activeAnchor(anchorIndex);
			top = this.targetTop[anchorIndex];
			_this.isInnerScroll = true;
			$("html,body").animate({scrollTop: (top+1) + "px"},{
				duration: 500,
				easing: "swing",
				complete:function(){
					_this.onScroll();
					_this.isInnerScroll = false;

				}
			});

		}

	};
	anchor.prototype.activeAnchor =function(index){
	    this.elements.removeClass("active");
	    if(index != -1) {
	        this.elements.eq(index).addClass("active");
	    }
	    var hashName = this.hashNames[index] || "";
	    if("#"+hashName != location.hash){
	        location.hash = hashName;    
	    }
		
		
	};

	module.exports = anchor;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var util = {
		setHref:function(element,href) {
			var oldHref = element.href;
			element.href = href;
			return oldHref;
		},
		indexOf : function(list,elem){
			for (var i =0;i<list.length;i++){
				if(list[i]==elem){
					return i;
				}
			}
			return -1;
		}

	}
	module.exports = util;

/***/ },
/* 7 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);