/* UAT ONLY */
var domain = "http://uat.kapiticoast.govt.nz.testwin.gdmedia.tv/";
//var domain = "http://www.kapiticoast.govt.nz/";

$('#cemeteries').select(function() {
	console.log('Hi');
	window.open(domain + $(this).val());
});