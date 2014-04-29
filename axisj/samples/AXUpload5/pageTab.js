﻿
var myTabOption = [
	{optionValue:"AXUpload5", optionText:"AXUpload5", addClass:"", url:"index.html"},
	{optionValue:"AXUpload5_option", optionText:"AXUpload5(options)", addClass:"", url:"options.html"},
	{optionValue:"singleUpload", optionText:"singleUpload", addClass:"", url:"single.html"},
	{optionValue:"selectMainImage", optionText:"selectMainImage", addClass:"", url:"selectMainImage.html"}
];

var pageTabChange = function(selectedObject, value){
	location.href = selectedObject.url;
};

$(document.body).ready(function(){
	var myPageID = "";
	try{
		myPageID = pageID;
	}catch(e){
		
	}
	$("#demoPageTabTarget").bindTab({
		value: (myPageID||""), 
		overflow: "scroll", 
		options: myTabOption, 
		onchange: pageTabChange
	});
});