jq.getJSON(opc_Text_Font_JSON,function(data){
	
		opc_Font_Data=data.fonts;
		jq.each(opc_Font_Data,function(key,font)
		{
			var fontTTFPath=opc_ToolPath+font.ttf;
			//console.log(fontTTFPath)
			var t = document.createTextNode('@font-face {font-family:"' + font.fontName + '";src:url(' + (fontTTFPath) + ');}');
			//console.log(opc_Font_Style)
			opc_Font_Style.appendChild(t);
		})
		//console.log(opc_Font_Style)
		document.head.appendChild(opc_Font_Style);
		setTimeout(function(){
			jq.each(opc_Font_Data,function(key,value)
			{
				if (key == 0) {
					opc_Font_List += '<li class="active" alt="'+value.fontName+'"><a href="javascript:void(0);" nodefamily = "" style="font-family : ' + value.fontName + ' ">' + value.fontName + '</a></li>';
				} else
					opc_Font_List += '<li alt="'+value.fontName+'"><a href="javascript:void(0);" style="font-family : ' + value.fontName + ' ">' + value.fontName + '</a></li>';

			})
			

			jq('.content_1 ul').html(opc_Font_List).promise().done(function() {
				jq(".content_1").mCustomScrollbar({
					scrollButtons : {
						enable : true
					}
				});
		
		
				// var fontIndex = jq('.mCSB_container li:eq(0)').attr('alt').split('_')[1];
				// jq.each(WebFontConfig.google.families, function(key, value) {
					// if (key == fontIndex) {
						// value.match('italic') ? jq('#fontDecor li:eq(1)').show() : jq('#fontDecor li:eq(1)').hide();
						// value.match('700') ? jq('#fontDecor li:eq(0)').show() : jq('#fontDecor li:eq(0)').hide();
					// }
				// });

			});
		},500)
	})