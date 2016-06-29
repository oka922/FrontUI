$(function() {
	//エクセルファイルへのリンクにxlsというclassを付与	   
	$("a[href$=xls], a[href$=xlsx]").addClass("xls");
	//pdfファイルへのリンクにxlsというclassを付与
	$("a[href$=pdf]").addClass("pdf");
	//zipファイルへのリンクにxlsというclassを付与
	$("a[href$=zip]").addClass("zip");
	//jpgファイルへのリンクにxlsというclassを付与
	$("a[href$=jpg]").addClass("jpg");
	//外部リンクにblankというclassを付与
	$("a[target='_blank']").addClass("blank");
});



