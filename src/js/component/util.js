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