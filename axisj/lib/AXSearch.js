﻿/* AXISJ Javascript UI Framework */
/* http://www.axisj.com, license : http://www.axisj.com/license */
 

var AXSearch = Class.create(AXJ, {
    version: "AXSearch V1.21",
    author: "tom@axisj.com",
	logs: [
		"2013-06-04 오후 2:00:44 - tom@axisj.com",
		"2013-07-29 오전 9:35:19 - expandToggle 버그픽스 - tom",
		"2013-09-16 오후 9:59:52 - inputBox 의 경우 엔터 작동 - tom",
		"2013-11-12 오후 6:13:03 - tom : setItemValue bugFix",
		"2013-12-27 오후 4:55:15 - tom : Checkbox, radio onchange 버그픽스"
	],
    initialize: function(AXJ_super) {
        AXJ_super();
        this.config.theme = "AXSearch";
    },
    init: function() {
		var cfg = this.config;
		if(Object.isUndefined(cfg.targetID)){
			trace("need targetID - setConfig({targetID:''})");
			return;
		}
		this.setBody();
    },
    getItem: function(gr, itemIndex, item){
    	var cfg = this.config;
    	var po = [];
    	var itemAddClass = [];
		var itemAddStyles = [];
    	if(item.addClass) itemAddClass.push(item.addClass);
    	if(item.style) itemAddStyles.push(item.style);
    	if(item.type == "label"){
    		po.push("<div class=\"searchItem searchLabel ", itemAddClass.join(" "),"\" style=\"width:", (item.width||""),"px;text-align:", (item.align||"center"),";", itemAddStyles.join(''),"\" align=\"left\">");	
    		po.push(item.value);
    		po.push("</div>");
    	}else if(item.type == "link"){
    		po.push("<div class=\"searchItem searchLink ", itemAddClass.join(" "),"\" style=\"width:", (item.width||""),"px;text-align:", (item.align||"center"),";", itemAddStyles.join(''),"\" align=\"left\">");    		
    		po.push("<input type=\"hidden\" name=\"", item.key,"\" id=\"", cfg.targetID + "_AX_" + gr + "_AX_" + itemIndex + "_AX_" + item.key, "\" value=\"", item.value,"\" />");
			po.push("<table cellpadding=\"0\" cellspacing=\"0\" class=\"itemTable\" align=\"left\">");
			po.push("	<tbody>");
			po.push("		<tr>");
			if(item.label){
				po.push("			<th style=\"width:",(item.labelWidth||100),"px;\">", item.label,"</th>");
			}
			po.push("			<td style=\"",(item.valueBoxStyle||""),"\" title=\"", (item.title||""),"\">");
    		jQuery.each(item.options, function(idx, Opt){
    			if(idx > 0) po.push(" | ");
    			var classOn = "";
    			if(item.value == Opt.optionValue){
    				classOn = " on";
    				item.selectedIndex = idx;
    			}
    			po.push("<a href=\"#Axexec\" class=\"searchLinkItem", classOn, "\" id=\"", cfg.targetID + "_AX_" + gr + "_AX_" + itemIndex + "_AX_" + item.key + "_AX_" + idx, "\" title=\"", (Opt.title||""),"\">", Opt.optionText,"</a>");
    		});
    		po.push("			</td>");
    		po.push("		</tr>");
    		po.push("	</tbody>");
    		po.push("</table>");
    		po.push("</div>");
    	}else if(item.type == "checkBox"){
    		po.push("<div class=\"searchItem searchCheckbox ", itemAddClass.join(" "),"\" style=\"width:", (item.width||""),"px;text-align:", (item.align||"center"),";", itemAddStyles.join(''),"\" align=\"left\">");    		
			po.push("<table cellpadding=\"0\" cellspacing=\"0\" class=\"itemTable\" align=\"left\">");
			po.push("	<tbody>");
			po.push("		<tr>");
			if(item.label){
				po.push("			<th style=\"width:",(item.labelWidth||100),"px;\">", item.label,"</th>");
			}
			po.push("			<td style=\"",(item.valueBoxStyle||""),"\" title=\"", (item.title||""),"\">");
			
			var values = item.value.split(/,/g);
    		jQuery.each(item.options, function(idx, Opt){
    			var isCheck = false;
    			jQuery.each(values, function(){
    				if(this == Opt.optionValue){
    					isCheck = true;
    					return false;
    				}
    			});
    			po.push("<input type=\"checkbox\" class=\"searchCheckboxItem ", itemAddClass.join(" "),"\" name=\"", item.key,"\" id=\"", cfg.targetID + "_AX_" + gr + "_AX_" + itemIndex + "_AX_" + item.key,"_AX_", idx, "\" title=\"", (Opt.title||""),"\" value=\"", Opt.optionValue,"\" ");
    			if(isCheck) po.push(" checked=\"checked\" ");
    			po.push(">");
    			po.push("<label for=\"", cfg.targetID + "_AX_" + gr + "_AX_" + itemIndex + "_AX_" + item.key,"_AX_", idx, "\">", Opt.optionText," </label>");
    		});
    		po.push("			</td>");
    		po.push("		</tr>");
    		po.push("	</tbody>");
    		po.push("</table>");
    		po.push("</div>");
    	}else if(item.type == "radioBox"){
    		po.push("<div class=\"searchItem searchCheckbox ", itemAddClass.join(" "),"\" style=\"width:", (item.width||""),"px;text-align:", (item.align||"center"),";", itemAddStyles.join(''),"\" align=\"left\">");    		
			po.push("<table cellpadding=\"0\" cellspacing=\"0\" class=\"itemTable\" align=\"left\">");
			po.push("	<tbody>");
			po.push("		<tr>");
			if(item.label){
				po.push("			<th style=\"width:",(item.labelWidth||100),"px;\">", item.label,"</th>");
			}
			po.push("			<td style=\"",(item.valueBoxStyle||""),"\">");
			var values = item.value.split(/,/g);
    		jQuery.each(item.options, function(idx, Opt){
    			var isCheck = false;
    			jQuery.each(values, function(){
    				if(this == Opt.optionValue){
    					isCheck = true;
    					return false;
    				}
    			});
    			po.push("<input type=\"radio\" class=\"searchCheckboxItem ", itemAddClass.join(" "),"\" name=\"", item.key,"\" id=\"", cfg.targetID + "_AX_" + gr + "_AX_" + itemIndex + "_AX_" + item.key,"_AX_", idx,"\" title=\"", (item.title||""),"\" value=\"", Opt.optionValue,"\" ");
    			if(isCheck) po.push(" checked=\"checked\" ");
    			po.push(">");
    			po.push("<label for=\"", cfg.targetID + "_AX_" + gr + "_AX_" + itemIndex + "_AX_" + item.key,"_AX_", idx,"\">", Opt.optionText," </label>");
    		});
    		po.push("			</td>");
    		po.push("		</tr>");
    		po.push("	</tbody>");
    		po.push("</table>");
    		po.push("</div>");
    	}else if(item.type == "selectBox"){
    		po.push("<div class=\"searchItem searchSelectbox ", itemAddClass.join(" "),"\" style=\"text-align:", (item.align||"center"),";", itemAddStyles.join(''),"\" align=\"left\">");    		
			po.push("<table cellpadding=\"0\" cellspacing=\"0\" class=\"itemTable\" align=\"left\">");
			po.push("	<tbody>");
			po.push("		<tr>");
			if(item.label){
				po.push("			<th style=\"width:",(item.labelWidth||100),"px;\">", item.label,"</th>");
			}
			po.push("			<td style=\"",(item.valueBoxStyle||""),"\">");
			var selectWidth = (item.width) ? item.width+"px" : "auto";
			po.push("	<select name=\"", item.key,"\" id=\"", cfg.targetID + "_AX_" + gr + "_AX_" + itemIndex + "_AX_" + item.key, "\" title=\"", (item.title||""),"\" class=\"AXSelect searchSelectboxItem", itemAddClass.join(" "),"\" style=\"width:", selectWidth,";\" >");
			
			var values = item.value.split(/,/g);
    		jQuery.each(item.options, function(idx, Opt){
    			var isCheck = false;
    			jQuery.each(values, function(){
    				if(this == Opt.optionValue){
    					isCheck = true;
    					return false;
    				}
    			});
    			
    			po.push("<option value=\"", Opt.optionValue,"\"");
    			if(isCheck) po.push(" selected=\"selected\"");
    			po.push(">", Opt.optionText, "</option>");
    		});
    		po.push("	</select>");
    		po.push("			</td>");
    		po.push("		</tr>");
    		po.push("	</tbody>");
    		po.push("</table>");
    		po.push("</div>");
    	}else if(item.type == "inputText"){
    		po.push("<div class=\"searchItem ", itemAddClass.join(" "),"\" style=\"text-align:", (item.align||"center"),";", itemAddStyles.join(''),"\" align=\"left\">");
			po.push("<table cellpadding=\"0\" cellspacing=\"0\" class=\"itemTable\" align=\"left\">");
			po.push("	<tbody>");
			po.push("		<tr>");
			if(item.label){
				po.push("			<th style=\"width:",(item.labelWidth||100),"px;\">", item.label,"</th>");
			}else{
				item.labelWidth = 0;
			}
			po.push("			<td style=\"",(item.valueBoxStyle||""),"\">");
			var inputWidth = (item.width||100).number();
    		po.push("				<input type=\"text\" name=\"", item.key,"\" id=\"", cfg.targetID + "_AX_" + gr + "_AX_" + itemIndex + "_AX_" + item.key, "\" title=\"", (item.title||""),"\" placeholder=\""+ (item.placeholder||"") +"\" value=\"", item.value,"\" class=\"AXInput searchInputTextItem", itemAddClass.join(" "),"\" style=\"width:", inputWidth,"px;\" />");
    		po.push("			</td>");
    		po.push("		</tr>");
    		po.push("	</tbody>");
    		po.push("</table>");
    		po.push("</div>");
    	}else if(item.type == "hidden"){
    		po.push("<input type=\"hidden\" name=\"", item.key,"\" id=\"", cfg.targetID + "_AX_" + gr + "_AX_" + itemIndex + "_AX_" + item.key, "\" value=\"", item.value,"\" />");
    	}else if(item.type == "button" || item.type == "submit"){
    		po.push("<div class=\"searchItem ", itemAddClass.join(" "),"\" style=\"text-align:", (item.align||"center"),";", itemAddStyles.join(''),"\" align=\"left\">");	
			po.push("<table cellpadding=\"0\" cellspacing=\"0\" class=\"itemTable\" align=\"left\">");
			po.push("	<tbody>");
			po.push("		<tr>");
			if(item.label){
				po.push("			<th style=\"width:",(item.labelWidth||100),"px;\">", item.label,"</th>");
			}else{
				item.labelWidth = 0;
			}
			po.push("			<td style=\"",(item.valueBoxStyle||""),"\">");
			var inputWidth = (item.width||100).number();
    		po.push("				<input type=\""+ item.type +"\" id=\"", cfg.targetID + "_AX_" + gr + "_AX_" + itemIndex + "_AX_" + item.key, "\" title=\"", (item.title||""),"\" placeholder=\"", (item.placeholder||""),"\" style=\"width:", inputWidth,"px;\" class=\"AXButton searchButtonItem ", itemAddClass.join(" "),"\" value=\"", item.value,"\" />");
    		po.push("			</td>");
    		po.push("		</tr>");
    		po.push("	</tbody>");
    		po.push("</table>");
    		po.push("</div>");
    	}
    	return po.join('');
    },
    setBody: function(){
    	var cfg = this.config;
    	var getItem = this.getItem.bind(this);
    	var po = [];
    	var AXBinds = [];
    	po.push("<div class=\"" + cfg.theme + "\">");
    	po.push("<form name=\"", cfg.targetID+"_AX_form", "\" onsubmit=\"return false;\">");
    	var gr = 0;
    	var hasHide = false;
    	for(;gr<cfg.rows.length;){
    		var styles = [];
    		var classs = [];
    		if(!cfg.rows[gr].display){
    			styles.push("display:none;");
    			classs.push("expandGroup");
    			hasHide = true;
    		}
    		if(cfg.rows[gr].addClass) classs.push(cfg.rows[gr].addClass);
    		po.push("<div class=\"searchGroup ", classs.join(" "),"\" style=\"", styles.join(";"),"\">");
    		jQuery.each(cfg.rows[gr].list, function(itemIndex, item){
    			po.push(getItem(gr, itemIndex, item));
    			if(item.AXBind){
    				AXBinds.push({display:cfg.rows[gr].display, gr:gr, itemIndex:itemIndex, item:item});
    			}
    		});
    		po.push("	<div class=\"groupClear\"></div>");
    		po.push("</div>");
    		gr++;	
    	}
    	if(hasHide){
    		po.push("<a href=\"#axexec\" class=\"expandHandle\" id=\"",cfg.targetID,"_AX_expandHandle\">");
    		po.push("상세검색");
    		po.push("</a>");
    	}
    	po.push("</form>");
    	po.push("</div>");
    	
    	jQuery("#"+cfg.targetID).html(po.join(''));
    	
    	if(cfg.onsubmit){
	    	document[cfg.targetID+"_AX_form"].onsubmit = function(){
	    		cfg.onsubmit();
	    		return false;	
	    	};
	    }
    	
    	jQuery("#"+cfg.targetID+"_AX_expandHandle").bind("click", this.expandToggle.bind(this));
    	jQuery("#"+cfg.targetID).find(".searchLinkItem").bind("click", this.onclickLinkItem.bind(this));
    	jQuery("#"+cfg.targetID).find(".searchCheckboxItem").bind("click", this.onclickCheckboxItem.bind(this));
    	jQuery("#"+cfg.targetID).find(".searchSelectboxItem").bind("change", this.onChangeSelect.bind(this));
    	jQuery("#"+cfg.targetID).find(".searchInputTextItem").bind("change", this.onChangeInput.bind(this));
    	jQuery("#"+cfg.targetID).find(".searchButtonItem").bind("click", this.onclickButton.bind(this));

    	this.AXBinds = AXBinds;
    	
    	var _this = this;
    	setTimeout(function(){
    		_this.AXBindItems();
    	}, 100);
    },
    AXBindItems: function(){
    	var cfg = this.config;
    	jQuery.each(this.AXBinds, function(){
    		var gr = this.gr, itemIndex = this.itemIndex, item = this.item;
    		var display = this.display;
    		var itemID = cfg.targetID + "_AX_" + gr + "_AX_" + itemIndex + "_AX_" + item.key;
    		
    		if(display){
	    		if(item.AXBind.type == "selector"){
	    			jQuery("#"+itemID).bindSelector(item.AXBind.config);
	    		}else if(item.AXBind.type == "select"){
		    			jQuery("#"+itemID).bindSelect(item.AXBind.config);
	    		}else if(item.AXBind.type == "date"){
	    			jQuery("#"+itemID).bindDate(item.AXBind.config);
	    		}else if(item.AXBind.type == "twinDate"){
	    			var startTargetID = item.AXBind.config.startTargetID;
	    			var findItemID = "";
	    			jQuery.each(cfg.rows, function(gidx, G){
	    				jQuery.each(this.list, function(itemIndex, item){
			    			if(item.key == startTargetID){
			    				findItemID = cfg.targetID + "_AX_" + gidx + "_AX_" + itemIndex + "_AX_" + item.key;
			    			}
			    		});
	    			});
	    			item.AXBind.config.startTargetID = findItemID;
	    			jQuery("#"+itemID).bindTwinDate(item.AXBind.config);
	    		}
	    	}
    	});    	
    },
    expandToggle: function(){
    	var cfg = this.config;
    	if(this.expanded){
    		jQuery("#"+cfg.targetID+"_AX_expandHandle").html("상세검색");
    		jQuery("#"+cfg.targetID).find(".expandGroup").hide();
    		this.expanded = false;
    	}else{
    		jQuery("#"+cfg.targetID+"_AX_expandHandle").html("상세검색창 닫기");
    		jQuery("#"+cfg.targetID).find(".expandGroup").show();
    		this.expanded = true;
    		
	    	jQuery.each(this.AXBinds, function(){
	    		var gr = this.gr, itemIndex = this.itemIndex, item = this.item;
	    		var display = this.display;
	    		var itemID = cfg.targetID + "_AX_" + gr + "_AX_" + itemIndex + "_AX_" + item.key;
	    		if(!display){
		    		if(item.AXBind.type == "selector"){
		    			jQuery("#"+itemID).bindSelector(item.AXBind.config);
		    		}else if(item.AXBind.type == "select"){
		    			jQuery("#"+itemID).bindSelect(item.AXBind.config);
		    		}else if(item.AXBind.type == "date"){
		    			jQuery("#"+itemID).bindDate(item.AXBind.config);
		    		}else if(item.AXBind.type == "twinDate"){

		    			var startTargetID = item.AXBind.config.startTargetID.split(/_AX_/g).last();
		    			var findItemID = "";
		    			jQuery.each(cfg.rows, function(gidx, G){
		    				jQuery.each(this.list, function(itemIndex, item){
				    			if(item.key == startTargetID){
				    				findItemID = cfg.targetID + "_AX_" + gidx + "_AX_" + itemIndex + "_AX_" + item.key;
				    			}
				    		});
		    			});
		    			
		    			item.AXBind.config.startTargetID = findItemID;
		    			jQuery("#"+itemID).bindTwinDate(item.AXBind.config);

		    		}
		    	}
	    	});
    		
    	}
    }, 
    onclickLinkItem: function(event){
    	var cfg = this.config;
    	var ids = (event.target.id).split(/_AX_/g);
    	var index = ids.pop();
    	var gr = ids[ids.length-3];
    	var itemIndex = ids[ids.length-2];
    	var item = cfg.rows[gr].list[itemIndex];
    	//trace({itemIndex:itemIndex, item:item});
    	
    	var targetID = "";
    	jQuery.each(ids, function(ii, io){
    		if(ii > 0) targetID += "_AX_";
    		targetID += this;
    	});
   		//trace(item.options[index].optionValue);
   		
   		if(item.selectedIndex != undefined){
   			jQuery("#"+targetID+"_AX_"+item.selectedIndex).removeClass("on");
   		}
   		
   		item.selectedIndex = index;
   		item.value = item.options[index].optionValue;
   		jQuery("#"+targetID+"_AX_"+index).addClass("on");
    	jQuery("#"+targetID).val(item.options[index].optionValue);
    	
    	if(item.onChange){
    		item.onChange.call(item, item.options[index], item.options[index].optionValue);
    	}
    },
    onclickCheckboxItem: function(event){
    	var cfg = this.config;
    	var ids = (event.target.id).split(/_AX_/g);
    	var index = ids.pop();
    	var gr = ids[ids.length-3];
    	var itemIndex = ids[ids.length-2];
    	var item = cfg.rows[gr].list[itemIndex];
   		
   		var frm = document[cfg.targetID+"_AX_form"];
   		var selectedIndex = 0;
   		var selectedValue = "";
   		
   		if(isNaN(frm[item.key].length)){
   			if(frm[item.key].checked){
   				selectedValue = frm[item.key].value;
   			}
   		}else{
   			for(var i=0;i<frm[item.key].length;i++){
	   			if(frm[item.key][i].checked){
	   				selectedValue += (selectedValue == "") ? frm[item.key][i].value : "," + frm[item.key][i].value;
	   			}   				
   			}
   		}

   		item.selectedIndex = index;
   		item.value = selectedValue;
    	
    	if(item.onChange){
    		item.onChange.call(item, item.options[index], selectedValue);
    	}
    },
    onChangeSelect: function(event){
    	var cfg = this.config;
    	var ids = (event.target.id).split(/_AX_/g);
    	var gr = ids[ids.length-3];
    	var itemIndex = ids[ids.length-2];
    	var item = cfg.rows[gr].list[itemIndex];
    	
   		var frm = document[cfg.targetID+"_AX_form"];
   		var selectedIndex = frm[item.key].selectedIndex;
   		var selectedValue = frm[item.key].options[selectedIndex].value;

    	if(item.onChange){
    		item.onChange.call(item, item.options[selectedIndex], selectedValue);
    	}
    },
    onChangeInput: function(event){
    	var cfg = this.config;
    	var ids = (event.target.id).split(/_AX_/g);
    	var gr = ids[ids.length-3];
    	var itemIndex = ids[ids.length-2];
    	var item = cfg.rows[gr].list[itemIndex];
    	
    	var frm = document[cfg.targetID+"_AX_form"];
   		var changeValue = frm[item.key].value;

    	if(item.onChange){
    		item.onChange.call(item, changeValue);
    	}
    },
    onclickButton: function(event){
    	var cfg = this.config;
    	var ids = (event.target.id).split(/_AX_/g);
    	var gr = ids[ids.length-3];
    	var itemIndex = ids[ids.length-2];
    	var item = cfg.rows[gr].list[itemIndex];

    	if(item.onclick){
    		item.onclick.call(item);
    	}
    },
    getParam: function(){
    	var cfg = this.config;
    	var frm = document[cfg.targetID+"_AX_form"];
    	return jQuery(frm).serialize();
    },
    getItemId: function(key, value){
    	var cfg = this.config;
    	var gr = 0;
    	var itemID;
    	for(;gr<cfg.rows.length;){
			jQuery.each(cfg.rows[gr].list, function(itemIndex, item){
				if(item.key == key){
					if(item.type == "checkBox" || item.type == "radioBox"){
						itemID = [];
						jQuery.each(item.options, function(idx, Opt){
							itemID.push(cfg.targetID + "_AX_" + gr + "_AX_" + itemIndex + "_AX_" + item.key + "_AX_" + idx);
						});
					}else{
						itemID = cfg.targetID + "_AX_" + gr + "_AX_" + itemIndex + "_AX_" + item.key;
						return false;
					}
				}
			});
			gr++;
		}
		return itemID;
    },
    setItemValue: function(key, value){
    	var cfg = this.config;
    	var gr = 0;
    	for(;gr<cfg.rows.length;){
			jQuery.each(cfg.rows[gr].list, function(itemIndex, item){
				if(item.key == key){
					if(item.type == "checkBox" || item.type == "radioBox"){
						var values = [];
						if(Object.isArray(value)){
							values = value;
						}else if(value == ""){
							
						}else{
							values.push(value);
						}
			    		jQuery.each(item.options, function(idx, Opt){
			    			var itemID = cfg.targetID + "_AX_" + gr + "_AX_" + itemIndex + "_AX_" + item.key + "_AX_" + idx;			
			    			var isCheck = false;
			    			jQuery.each(values, function(){ if(this == Opt.optionValue){ isCheck = true; return false; } });
			    			AXgetId(itemID).checked = isCheck;
			    			itemID = null;
			    		});
					}else{
						var itemID = cfg.targetID + "_AX_" + gr + "_AX_" + itemIndex + "_AX_" + item.key;
						jQuery("#"+itemID).val((value||""));
						itemID = null;
					}
				}
			});
			gr++;
		}
    }
});