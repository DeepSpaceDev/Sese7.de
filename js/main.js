$(document).ready(function(){
	$("content").html('<div style="position: absolute; top: calc(50% - 80px); left: calc(50% - 62px);"><img src="img/loader/loader.GIF" alt="loading"></div>');
	var loadtime = 0;
	var loadtimer = setInterval(function(){loadtime = loadtime - 100;}, 100);	

	var scripts = getScripts();
	var slowLoading = false;
	
	if (!('registerElement' in document && 'import' in document.createElement('link') && 'content' in document.createElement('template'))) { //WebComponents unsupported
		console.log("Unsupported Browser loading WebComponents");
		scripts.push("../bower_components/webcomponentsjs/webcomponents-lite.min.js");
		slowLoading = true;
	}
	
	$.getMultiScripts(scripts, 'js/').done(function() {
		if(slowLoading){
			window.addEventListener('HTMLImportsLoaded', function(e) {
				setTimeout(function(){finishLoading(loadtimer);},loadtime);			
			});			
		} else{
			setTimeout(function(){finishLoading(loadtimer);},loadtime);
		}
	});

	$("html").on("contextmenu",function(e){
        e.preventDefault();
        var pageX = e.pageX - 40;
        var pageY = e.pageY - 25;
        $("#rightclickd").css({top: pageY , left: pageX});
        document.querySelector("#rightclickd").open();
    });
});	

$.getMultiScripts = function(arr) {
    var _arr = $.map(arr, function(scr) {
        return $.getScript( ("") + scr );
    });

    _arr.push($.Deferred(function( deferred ){
        $( deferred.resolve );
    }));

    return $.when.apply($, _arr);
}
function finishLoading(loader){
	clearInterval(loader);
	lsite();

	console.log("Loaded - Copyright 2015 Sebastian Schneider");
}
function getScripts(){
	return [	
	"js/lib/analytics.js",
	"js/lib/html2canvas.js", 
	"js/site.js", 
	"js/tools.js"
	];
}