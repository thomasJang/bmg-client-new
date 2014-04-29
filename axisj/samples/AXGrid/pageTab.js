﻿	
var myTabOption = [
	{optionValue:"AXGrid", optionText:"AXGrid", addClass:"", url:"index.html"},
	{optionValue:"colHead", optionText:"colHead", addClass:"", url:"colhead.html"},
	{optionValue:"fixedColSeq", optionText:"fixedColSeq", addClass:"", url:"fixedColSeq.html"},
	{optionValue:"body", optionText:"body", addClass:"", url:"body.html"},
	{optionValue:"headfoot", optionText:"head & foot", addClass:"", url:"headfoot.html"},
	{optionValue:"marker", optionText:"marker", addClass:"", url:"marker.html"},
	{optionValue:"editor", optionText:"editor", addClass:"", url:"editor.html"},
	{optionValue:"ajax", optionText:"ajax & paging", addClass:"", url:"ajax.html"},
	{optionValue:"passive", optionText:"passive", addClass:"", url:"passive.html"},
	{optionValue:"viewMode", optionText:"viewMode", addClass:"", url:"viewMode.html"}/*,
	{optionValue:"bigData", optionText:"bigData", addClass:"", url:"bigData.html"}*/
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
    AXTab.setConfig({responseiveMobile:640}); /* mobile 너비 지정 */
	$("#demoPageTabTarget").bindTab({
		value: (myPageID||""), 
		overflow: "scroll", 
		options: myTabOption, 
		onchange: pageTabChange
	});
});