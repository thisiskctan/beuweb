if (opc_Text_Effect_Show == true) {
	jq.getJSON(opc_Text_Effect_JSON, function(data) {
		opc_text_effect_data = data.textEffect;
		opc_select_text_line = data.defaultSelectedText;

		opc_select_text_line = opc_Selected_Text_Radio.toLowerCase();
		opc_text_effect_ui_show = opc_Text_Effect_Show;
		if (opc_text_effect_ui_show == true) {
			if (opc_select_text_line == "single line") {
				document.getElementById("singlelinecheck").checked = true;
				document.getElementById("multilinecheck").checked = false;
				jq("#editor1").hide();
				jq("#editor2").show();
			} else {
				document.getElementById("singlelinecheck").checked = false;
				document.getElementById("multilinecheck").checked = true;
				jq("#editor1").show();
				jq("#editor2").hide();
			}
		}

		(opc_text_effect_ui_show == true) ? jq(".select-line").show() : jq(".select-line").hide();
		opc_Load_TextEffect(opc_text_effect_data);
	});
	opc_Load_TextEffect = function(json) {
		var textEffectList = '';
		jq.each(json, function(key, value) {
			if (key == 0) {
				textEffectList += '<li class="active"><a effectName="' + value.effectType + '" href="javascript:void(0);"><img src="' + value.thumb + '" alt="" /></a></li>';
				jq('.effect_selectbox .eftImage').attr('effectName',value.effectType);
				jq('.effect_selectbox .eftImage >img').attr('src', value.thumb);
			} else
				textEffectList += '<li><a effectName="' + value.effectType + '" href="javascript:void(0);"><img src="' + value.thumb + '" /></a></li>';
		});
		jq('#textEffectList').html(textEffectList);

		jq('.content_33 ul').html(textEffectList).promise().done(function() {
			jq(".content_33").mCustomScrollbar({
				scrollButtons : {
					enable : true
				}
			});

		});

	}
}
opc_Text_Draw_Outline = function(val, fontFamily, effectType) {
	var text = new sparx.Text(val, {
		originX : "center",
		originY : "center",
		left : (parseInt(opc_View[opc_Current_View].x)) + ((parseInt(opc_View[opc_Current_View].drawWidth)) / 2),
		top : (parseInt(opc_View[opc_Current_View].y)) + ((parseInt(opc_View[opc_Current_View].drawHeight)) / 2),
		fontFamily : fontFamily,
		selectedTextFont : fontFamily,
		fill : "#000000",
		strokeWidth : 1,
		stroke : "#ffffff",
		txtString : val,
		txtSpacing : 0,
		arcValue : 0,
		fontSize : 30,
		textAlign : "left",
		name : "effectText",

		effectType : effectType,
		objPrice : opc_text_price,
	});
	canvas.add(text);
	canvas.setActiveObject(text);
	text.setCoords();
	canvas.renderAll();
	canvas.calcOffset();
	canvas.renderAll();
	jq('.TextTab .main-tabcontent').removeClass('active-font');
	opc_Update_Layer();
	jq('#add-text-area').val('');
	canvas.discardActiveObject();
}
/*************Add Effect Text***************/
opc_Text_Draw_Effect = function(val, fontFamily, effectType) {
	// console.log('font_family');	canvas.setZoom(1)
	jq("#slider1").slider({
		value : 0
	});
	jq(".slider2").slider({
		value : 0
	});
	opc_charList[0] = new Array();

	if (val) {

		for (var i = 0; i < val.length; i++) {

			var txt = new sparx.Text(val.charAt(i), {
				fontFamily : fontFamily,
				hexColorCode : '000000',
				color : "#000000",
				fill : "#000000",
				padding : 0,
				fontSize : 30

			});
			opc_charList[0][i] = txt;

		}
		var grpObj = new sparx.Group(opc_charList[0]);

		grpObj.set({
			originX : "center",
			originY : "center",
			left : (parseInt(opc_View[opc_Current_View].x)) + ((parseInt(opc_View[opc_Current_View].drawWidth)) / 2),
			top : (parseInt(opc_View[opc_Current_View].y)) + ((parseInt(opc_View[opc_Current_View].drawHeight)) / 2),
			effectType : effectType,
			selectedTextFont : fontFamily,
			fontFamily : fontFamily,
			txtString : val,
			hexColorCode : '000000',
			fill : "#000000",
			name : "effectText",
			objPrice : opc_text_price

		})
		canvas.renderAll();
		canvas.calcOffset();
		opc_CurrentGroup = grpObj;
		canvas.add(grpObj);
		canvas.renderAll();

		opc_Arrange();

	}
	jq('#add-text-area').val('');
	if (jq(window).width() <= 768 || opc_winWidth <= 768) {
		jq('.fontselectBox .select_effect').show();
	}
}
opc_Arrange = function(str, spa) {
	var objects = opc_CurrentGroup.getObjects();
	var arcStr = opc_CurrentGroup.get("txtString");
	var pos = 0;
	opc_disLength = 0;
	if (spa) {
		var spacing = spa;
		opc_spacing = spa;
	} else {
		var spacing = 0;
		opc_spacing = 0;
	}

	var squashFactor = 1.100000E+000 + spacing * 1.000000E-001;
	for (var i = 0; i < objects.length; i++) {
		objects[i].set({
			left : pos
		});

		opc_disLength += ((arcStr.charAt(i) == " ") ? objects[i].getWidth() : objects[i].getWidth()) * 5.000000E-001 * squashFactor;
	}
	pos = -opc_disLength;
	//console.log(opc_disLength)
	for (var k = 0; k < objects.length; k++) {
		objects[k].set({
			originX : "center",
			originY : "center"
		})
		objects[k].set({
			left : (pos + (objects[k].getWidth() / 2))
		});

		objects[k].set({
			top : 0
		});
		objects[k].set({
			angle : 0
		});
		//objects[k].setCoords();
		//canvas.renderAll();
		pos = pos + ((arcStr.charAt(k) == " ") ? objects[k].getWidth() : objects[k].getWidth()) * squashFactor + opc_spacing;

	}

	if (str == "update") {
		opc_AddUpdatedArcText3('update');
		//opc_AddUpdatedArcText1();

	} else {
		opc_AddUpdatedArcText1();
	}

}
opc_AddUpdatedArcText1 = function() {
	opc_img1[0] = new Array();
	var objects = opc_CurrentGroup.getObjects();
	for (var i = 0; i < objects.length; i++) {
		opc_img1[0][i] = objects[i];

	}
	var left = (parseInt(opc_View[opc_Current_View].x)) + ((parseInt(opc_View[opc_Current_View].drawWidth)) / 2);
	var top = (parseInt(opc_View[opc_Current_View].y)) + ((parseInt(opc_View[opc_Current_View].drawHeight)) / 2);
	var txtString = opc_CurrentGroup.get("txtString");
	var effectType = opc_CurrentGroup.get("effectType");
	var selectedTextFont = opc_CurrentGroup.get("selectedTextFont");
	var fontweight = opc_CurrentGroup.get("fontWeight");
	var fontstyle = opc_CurrentGroup.get("fontStyle");

	//alert(selectedTextFont)
	var hexColorCode = opc_CurrentGroup.get("hexColorCode");
	//console.log(effectType)
	canvas.remove(opc_CurrentGroup);
	var grpObj = new sparx.Group(opc_img1[0], {
		left : left,
		txtString : txtString,
		top : top,
		objPrice : opc_text_price,
		effectType : effectType,
		txtSpacing : 0,
		hexColorCode : hexColorCode,
		selectedTextFont : selectedTextFont,
		fontWeight : fontweight,
		fontStyle : fontstyle,
		arcValue : 0,
		name : "effectText",
		originX : "center",
		originY : "center"

	});

	opc_CurrentGroup = grpObj;
	grpObj.hasControls = true;
	canvas.add(grpObj);
	canvas.discardActiveObject();
	//canvas.setActiveObject(grpObj)
	canvas.renderAll();

	opc_CurrentGroup.setCoords();
	canvas.renderAll();
	//console.log("sgfdsf 00");
	opc_Make_Effect(0)
	jq('.TextTab .main-tabcontent').removeClass('active-font');
	opc_Update_Layer();
	// console.log(opc_CurrentGroup)
	jq('#add-text-area').val('');
	jq("#updateBTNEffect").addClass("add-disabled");

}
opc_AddUpdatedArcText3 = function(str) {
	opc_flag = true;
	opc_img1[0] = new Array();
	var objects = opc_CurrentGroup.getObjects();
	for (var i = 0; i < objects.length; i++) {
		opc_img1[0][i] = objects[i];

	}
	var scaleX = opc_CurrentGroup.get("scaleX");
	var scaleY = opc_CurrentGroup.get("scaleY");
	var left = opc_CurrentGroup.getLeft();
	var top = opc_CurrentGroup.getTop()
	var angle = opc_CurrentGroup.getAngle();
	var arcValue = opc_CurrentGroup.get("arcValue");
	var effectType = opc_CurrentGroup.get("effectType");
	var txtString = opc_CurrentGroup.get("txtString");
	var fontSize = 30;
	var hexColorCode = opc_CurrentGroup.get("hexColorCode");
	var fill = opc_CurrentGroup.get("fill");
	var selectedTextFont = opc_CurrentGroup.get("selectedTextFont");
	var fontweight = opc_CurrentGroup.get("fontWeight");
	var fontstyle = opc_CurrentGroup.get("fontStyle");
	var padding = 0;
	var txtSpacing = opc_CurrentGroup.get("txtSpacing");
	//canvas.remove(opc_CurrentGroup);
	var grpObj = new sparx.Group(opc_img1[0], {
		left : left,
		txtString : txtString,
		top : top,
		scaleX : scaleX,
		scaleY : scaleY,
		fill : fill,
		objPrice : opc_text_price,
		effectType : effectType,
		txtSpacing : txtSpacing,
		hexColorCode : hexColorCode,
		selectedTextFont : selectedTextFont,
		fontWeight : fontweight,
		fontStyle : fontstyle,
		arcValue : arcValue,
		name : "effectText",
		originX : "center",
		originY : "center"

	});
	opc_CurrentGroup.set({
		width : grpObj.width,
		height : grpObj.height,
		scaleX : scaleX,
		objPrice : opc_text_price,
		scaleY : scaleY

	})
	canvas.setActiveObject(opc_CurrentGroup);

	opc_CurrentGroup._objects = grpObj._objects;
	// opc_CurrentGroup = grpObj;
	// grpObj.hasControls = true;
	// canvas.add(grpObj);

	//opc_CurrentGroup.setCoords();
	canvas.renderAll();

	if (str == "blockMakeCall") {
	} else {

		opc_Make_Effect(arcValue);
	}

	jq('.TextTab .main-tabcontent').removeClass('active-font');
	opc_Update_Layer();
	opc_flag = false;
}
opc_Make_Effect = function(val) {
	canvas.setZoom(1)
	var effectName = jq('.content_33 div.mCSB_container li.active').find('a').attr("effectName")
	opc_CurrentGroup.set({
		arcValue : val
	})
	//console.log(val)
	//console.log(effectName)
	if (effectName == "arch") {
		opc_Arch_Effect(val);
	} else if (effectName == "outline") {
		//opc_Outline_Effect(val);
		opc_Text_Draw_Outline_Update('effect');
	} else if (effectName == "slanted") {
		opc_Slanted_Effect(val);
	} else if (effectName == "curve") {
		opc_Curve_Effect(val);
	} else if (effectName == "bridge") {
		opc_Bridge_Effect(val);
	} else if (effectName == "bulge") {
		opc_Bulge_Effect(val);
	} else {
		canvas.renderAll();
	}
	canvas.setZoom(opc_RatioX);
	//canvas.renderAll()

}
opc_Bridge_Effect = function(val) {
	var object = opc_CurrentGroup.getObjects();

	var a = 80;
	//currentGroup.getHeight();
	var height = 80;
	//currentGroup.height;

	var n = object.length;
	var d = 0;
	var per = 90;
	var tn = (( Math.abs(val) ) / 100 ) * (per / 100 ) * a;

	opc_img1[0] = new Array()
	for (var i = 0; i < n; i++) {

		var h = tn * Math.sin(opc_GetAngle((i) * 180 / (n)));

		var heig = 0;

		heig = a - h;

		var scaleY = heig * 1 / height;
		//console.log("scale"+scaleY)
		//var reduseHeight=(a-heig);
		var top = Math.abs((height - scaleY * height) / 4);
		//console.log("height"+object[i].getHeight())
		//console.log("top"+top)
		object[i].set({
			scaleY : scaleY
		});
		if (val >= 0)
			object[i].set({
				top : top
			});
		else
			object[i].set({
				top : -top
			});

		opc_img1[0][i] = sparx.util.object.clone(object[i]);

	}

	opc_ImprovedUpdate(opc_img1[0])
}
opc_Bulge_Effect = function(val) {
	var object = opc_CurrentGroup.getObjects();

	var a = opc_CurrentGroup.getHeight();

	opc_img1[0] = new Array();
	var n = object.length;
	var d = 0;
	var per = 90;
	var tn = (( Math.abs(val) ) / 100 ) * (per / 100 ) * a;
	for (var i = 0; i < n; i++) {

		var h = tn * Math.sin(opc_GetAngle((i + 1) * 180 / (n)));

		var heig = 0;
		if (val >= 0)
			heig = a - h;
		else
			heig = a - tn + h;

		var scaleY = heig * 1 / a;

		object[i].set({
			scaleY : scaleY
		})
		opc_img1[0][i] = sparx.util.object.clone(object[i]);

	}

	opc_ImprovedUpdate(opc_img1[0])
}
opc_Arch_Effect = function(val) {
	var object = opc_CurrentGroup.getObjects();
	var a = 80;
	//opc_CurrentGroup.getHeight();
	var gscaleY = opc_CurrentGroup.get("scaleX");
	var n = object.length;
	var d = 0;
	var per = 35;
	var tn = (( Math.abs(val) ) / 100 ) * (per / 100 ) * a;
	opc_img1[0] = new Array();
	for (var i = 0; i < n; i++) {

		var h = tn * Math.sin(opc_GetAngle((i + 1) * 180 / (n + 1)));

		var heig = 0;
		if (val >= 0)
			heig = opc_CurrentGroup.getTop() - h;
		else
			heig = opc_CurrentGroup.getTop() - tn + h;

		object[i].set({
			top : (opc_CurrentGroup.getTop() - heig) / 2
		})
		opc_img1[0].push(sparx.util.object.clone(object[i]));

	}

	opc_ImprovedUpdate(opc_img1[0])
}
opc_Slanted_Effect = function(val) {
	val = val / 100;
	var object = opc_CurrentGroup.getObjects();

	var a = opc_CurrentGroup.getHeight();

	opc_img1[0] = new Array();
	var n = object.length;
	var d = 0;
	var per = 90;
	var tn = (( Math.abs(val) ) / 100 ) * (per / 100 ) * a;
	for (var i = 0; i < n; i++) {

		var h = tn * Math.sin(opc_GetAngle((i + 1) * 180 / (n)));

		var heig = 0;
		if (val >= 0)
			heig = a - h;
		else
			heig = a - tn + h;

		var scaleY = heig * 1 / a;

		object[i].set({
			transformMatrix : [1, 0, val, 1, 0, 0]
		})
		object[i].set({
			customTrans : [1, 0, val, 1, 0, 0]
		});
		opc_img1[0][i] = object[i];

	}
	canvas.renderAll();
	//console.log(opc_CurrentGroup)

}
opc_Curve_Effect = function(val) {

	opc_arc = val;
	opc_Arc(val);
}
opc_Arc = function(archValue, update) {

	if (opc_arc != 0) {
		opc_arc = archValue;
	}
	var distortPercent = Math.abs(opc_arc);

	opc_distortValue = distortPercent * 5.000000E-003;
	if (distortPercent == 0) {
		//removeArch();
		return;
	}
	opc_xOffset = 0;
	opc_yOffset = 0;
	opc_disLength = 0;
	//var spacing:Number=0;
	opc_squashFactor = 1.100000E+000 - opc_distortValue + opc_spacing * 1.000000E-001;
	opc_DrawFullArch(update);
}
opc_GetAngle = function(rad) {
	return rad * Math.PI / 180;
}
opc_ImprovedUpdate = function() {
	var scaleX = opc_CurrentGroup.get("scaleX");
	var scaleY = opc_CurrentGroup.get("scaleY");
	var left = opc_CurrentGroup.getLeft();
	var top = opc_CurrentGroup.getTop();
	var angle = opc_CurrentGroup.getAngle();
	var grpObj = new sparx.Group(opc_img1[0], {
		left : left,
		angle : angle,
		top : top,
		scaleX : scaleX,
		scaleY : scaleY,
		originX : "center",
		originY : "center",

	});

	opc_CurrentGroup.set({
		width : grpObj.width,
		height : grpObj.height,
		scaleX : scaleX,
		scaleY : scaleY

	})

	opc_CurrentGroup.setCoords();
	canvas.calcOffset();
	canvas.renderAll()
	//console.log(opc_CurrentGroup)
}
opc_DrawFullArch = function(update) {

	var objects = opc_CurrentGroup.getObjects();
	opc_disLength = 0;
	var arcStr = opc_CurrentGroup.get("txtString");
	var i;
	for ( i = 0; i < objects.length; i++) {

		opc_disLength = opc_disLength + ((arcStr[i].charAt == " ") ? objects[i].getWidth() : objects[i].getWidth()) * opc_squashFactor;
	}

	opc_disHeight = opc_disLength * opc_distortValue;
	opc_xOffset = -opc_disLength * 5.000000E-001;
	opc_yOffset = opc_disHeight * 5.000000E-001;
	opc_pi = 3.141593E+000;
	var radFirstPart = Math.sqrt(opc_disHeight * opc_disHeight + opc_disLength * opc_disLength / 4);
	var disRadius = radFirstPart / (2 * Math.cos(Math.atan(opc_disLength / (2 * opc_disHeight))));
	disRadius = disRadius > 15 ? disRadius : 15;

	var phraseWidth = 0;
	opc_img1[0] = new Array();

	var letterWidth = 0;
	for ( i = 0; i < objects.length; i++) {
		letterWidth = (arcStr[i].charAt == " ") ? objects[i].getWidth() : objects[i].getWidth();
		letterWidth = letterWidth;
		var letterPlacement = phraseWidth + letterWidth * 5.000000E-001 * opc_squashFactor;
		phraseWidth = phraseWidth + letterWidth * opc_squashFactor;
		var letterAngle = opc_pi / 4 - (2 - 4 * letterPlacement / opc_disLength) * (opc_pi / 2 - Math.atan(opc_disLength / (2 * opc_disHeight)));
		var letterAngleDegrees = letterAngle * (360 / opc_pi);

		if (opc_arc > 0) {

			var left = -(disRadius / 2 * Math.cos(letterAngle * 2) - opc_disLength / 2 - letterPlacement + letterPlacement) + opc_xOffset;
			var top = -((disRadius * Math.sin(letterAngle * 2) - (disRadius - opc_disHeight)) + opc_yOffset) / 2;
			objects[i].originX = "center";
			objects[i].originY = "center";
			objects[i].set({
				left : left
			});
			/*  + _spacing */;
			objects[i].set({
				top : top
			});
			/*  + _spacing */;
			objects[i].set({
				angle : (letterAngleDegrees - 90)
			});
			//objects[i].setCoords();
			//canvas.renderAll();
			opc_img1[0][i] = sparx.util.object.clone(objects[i]);

		} else {
			var left = -(disRadius / 2 * Math.cos(letterAngle * 2) - opc_disLength / 2 - letterPlacement + letterPlacement) + opc_xOffset;
			var top = (disRadius * Math.sin(letterAngle * 2) - (disRadius - opc_disHeight) - opc_yOffset) / 2;

			objects[i].originX = "center";
			objects[i].originY = "center";
			objects[i].set({
				left : left
			});
			/*  + _spacing */;
			objects[i].set({
				top : top
			});
			/*  + _spacing */;
			objects[i].set({
				angle : -(letterAngleDegrees - 90)
			});
			//objects[i].setCoords();
			//canvas.renderAll();
			opc_img1[0][i] = sparx.util.object.clone(objects[i]);
		}
	}
	opc_ImprovedUpdateArc(opc_img1[0])
	//opc_ImprovedUpdate(opc_img1[0])
	//opc_AddUpdatedArcText3("blockMakeCall")

}
opc_ImprovedUpdateArc = function(list) {
	var scaleX = opc_CurrentGroup.get("scaleX");
	var scaleY = opc_CurrentGroup.get("scaleY");
	var left = opc_CurrentGroup.getLeft();
	var top = opc_CurrentGroup.getTop();
	var angle = opc_CurrentGroup.getAngle();
	var grpObj = sparx.util.object.clone(new sparx.Group(list, {
		left : left,
		angle : angle,
		top : top,
		scaleX : scaleX,
		scaleY : scaleY,
		originX : "center",
		originY : "center",

	}));

	opc_CurrentGroup.set({
		width : grpObj.width,
		height : grpObj.height,
		scaleX : scaleX,
		scaleY : scaleY

	})

	opc_CurrentGroup._objects = grpObj._objects;
	opc_CurrentGroup.setCoords();
	canvas.calcOffset();
	canvas.renderAll()
	//console.log(opc_CurrentGroup)
}
opc_SpacingOnText = function(val, block) {
	//opc_updateEffectText("spacing",val)
	canvas.setZoom(1)
	opc_flag = true;
	opc_CurrentGroup = canvas.getActiveObject();

	var txtSpacing = val;

	var scaleX = opc_CurrentGroup.get("scaleX");
	var scaleY = opc_CurrentGroup.get("scaleY");
	var left = opc_CurrentGroup.getLeft();
	var top = opc_CurrentGroup.getTop();
	var hexCode = opc_CurrentGroup.get("hexColorCode");
	var angle = opc_CurrentGroup.getAngle();
	var arcValue = opc_CurrentGroup.get("arcValue");
	var effectType = opc_CurrentGroup.get("effectType");
	var fill = opc_CurrentGroup.getFill();
	var fontFamily = opc_CurrentGroup.get("selectedTextFont");
	var fontweight = opc_CurrentGroup.get("fontWeight");
	var fontstyle = opc_CurrentGroup.get("fontStyle");
	var padding = 0;
	var arcStr = opc_CurrentGroup.get("txtString")

	var opc_charList = new Array()
	opc_charList[0] = new Array();
	for (var i = 0; i < arcStr.length; i++) {

		var txt = new sparx.Text(arcStr.charAt(i), {
			fontSize : 30,
			fontFamily : fontFamily,
			padding : padding,
			hexColorCode : hexCode,
			color : fill,
			fill : fill,

		});

		opc_charList[0][i] = sparx.util.object.clone(txt);

	}
	var grpObj = new sparx.Group(opc_charList[0], {
		left : left,
		effectType : effectType,
		arcValue : arcValue,
		angle : angle,
		top : top,
		name : "effectText",
		selectedTextFont : fontFamily,
		fontWeight : fontweight,
		fontStyle : fontstyle,
		scaleX : scaleX,
		scaleY : scaleY,
		txtSpacing : txtSpacing,
		txtString : arcStr,
		fill : fill,
		originX : "center",
		originY : "center",

	});
	opc_CurrentGroup.set({
		txtSpacing : txtSpacing
	})
	opc_CurrentGroup._objects = grpObj._objects;
	// grpObj.setCoords();
	opc_Arrange('update', txtSpacing);
	//canvas.renderAll();
	opc_flag = false;

}
opc_Text_Draw_Outline_Update = function(str) {
	opc_flag = true;
	opc_CurrentGroup = canvas.getActiveObject();
	var scaleX = opc_CurrentGroup.get("scaleX");
	var scaleY = opc_CurrentGroup.get("scaleY");
	var left = opc_CurrentGroup.getLeft();
	var top = opc_CurrentGroup.getTop();
	var angle = opc_CurrentGroup.getAngle();
	var stroke = opc_CurrentGroup.get('stroke');

	if (!stroke)
		stroke = "#ffffff";

	var fill = opc_CurrentGroup.getFill();
	var fontFamily = opc_CurrentGroup.get("selectedTextFont");
	var fontweight = opc_CurrentGroup.get("fontWeight");
	var fontstyle = opc_CurrentGroup.get("fontStyle");
	var hexCode = opc_CurrentGroup.get("hexColorCode");
	var val = opc_CurrentGroup.get("txtString");
	if (str == "textUpdate") {
		val = jq("#add-text-area").val();
	}
	var effectType = opc_CurrentGroup.get("effectType");
	canvas.remove(opc_CurrentGroup);
	canvas.renderAll();
	var text = new sparx.Text(val, {
		originX : "center",
		originY : "center",
		left : left,
		top : top,
		fontFamily : fontFamily,
		selectedTextFont : fontFamily,
		fontWeight : fontweight,
		fontStyle : fontstyle,
		fill : fill,
		strokeWidth : 1,
		stroke : stroke,
		txtString : val,
		txtSpacing : 0,
		arcValue : 0,
		fontSize : 30,
		scaleX : scaleX,
		scaleY : scaleY,
		textAlign : "left",
		name : "effectText",

		effectType : effectType,
		objPrice : opc_text_price,
	});
	canvas.add(text);
	canvas.setActiveObject(text);
	text.setCoords();
	canvas.renderAll();
	canvas.calcOffset();
	canvas.renderAll();
	jq('.TextTab .main-tabcontent').removeClass('active-font');
	opc_Update_Layer();
	opc_flag = false;
}
opc_updateEffectText = function(str, spa) {
	canvas.setZoom(1)
	opc_flag = true;
	opc_CurrentGroup = canvas.getActiveObject();
	if (str == "spacing") {
		var txtSpacing = spa;
	} else
		var txtSpacing = opc_CurrentGroup.get("txtSpacing");

	var scaleX = opc_CurrentGroup.get("scaleX");
	var scaleY = opc_CurrentGroup.get("scaleY");
	var left = opc_CurrentGroup.getLeft();
	var top = opc_CurrentGroup.getTop();
	var hexCode = opc_CurrentGroup.get("hexColorCode");
	var angle = opc_CurrentGroup.getAngle();
	var arcValue = opc_CurrentGroup.get("arcValue");
	var effectType = opc_CurrentGroup.get("effectType");
	var fill = opc_CurrentGroup.getFill();
	var fontFamily = opc_CurrentGroup.get("selectedTextFont");
	var fontweight = '', fontstyle = '';
	(str == 'FontWeight' && (spa == 'bold' || spa == 'normal')) ? ( fontweight = spa) : ( fontweight = opc_CurrentGroup.get("fontWeight"));
	(str == 'FontStyle' && (spa == 'italic' || spa == ' ')) ? ( fontstyle = spa) : ( fontstyle = opc_CurrentGroup.get("fontStyle"));

	//alert(fontFamily)
	var padding = 0;
	//console.log(scaleX)
	//console.log(scaleY)
	// if(str=="effectUpdate")
	// {
	// jq("#slider1").slider({
	// value : 0
	// });
	// jq("#slider2").slider({
	// value : 0
	// });
	// arcValue=0;
	// txtSpacing=0;
	//
	// }

	var arcStr = opc_CurrentGroup.get("txtString")
	if (str == "textUpdate") {
		arcStr = jq("#add-text-area").val();
	}

	//alert(arcStr)
	var opc_charList = new Array()
	opc_charList[0] = new Array();
	for (var i = 0; i < arcStr.length; i++) {
		var txt = new sparx.Text(arcStr.charAt(i), {
			fontSize : 30,
			fontFamily : fontFamily,
			padding : padding,
			hexColorCode : hexCode,
			color : fill,
			fill : fill,

		});

		opc_charList[0][i] = sparx.util.object.clone(txt);

	}

	canvas.remove(opc_CurrentGroup);
	var grpObj = new sparx.Group(opc_charList[0], {
		left : left,
		effectType : effectType,
		arcValue : arcValue,
		angle : angle,
		top : top,
		name : "effectText",
		selectedTextFont : fontFamily,
		fontWeight : fontweight,
		fontStyle : fontstyle,
		scaleX : scaleX,
		scaleY : scaleY,
		txtSpacing : txtSpacing,
		txtString : arcStr,
		fill : fill,
		originX : "center",
		originY : "center",

	});
	canvas.add(grpObj);
	opc_CurrentGroup = grpObj;
	grpObj.setCoords();
	opc_Arrange('update', txtSpacing);
	//canvas.renderAll();
	opc_flag = false;

}