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