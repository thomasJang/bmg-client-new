﻿var myTabOption = [
	{optionValue:"AXSelect", optionText:"AXSelect", addClass:"", url:"index.html"},
	{optionValue:"AXSelectControl", optionText:"AXSelectControl", addClass:"", url:"selectControl.html"}
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