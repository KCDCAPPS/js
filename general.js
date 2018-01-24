/* UAT ONLY */
var domain = "http://uat.kapiticoast.govt.nz.testwin.gdmedia.tv/";
//var domain = "http://www.kapiticoast.govt.nz/";

$('#cemeteries').change(function() {
	console.log('value selected ' + $(this).val())
	window.open(domain + $(this).val());
});