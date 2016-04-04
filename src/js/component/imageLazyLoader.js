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