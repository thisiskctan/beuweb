(function($) {
	/*
	 Clipart Load section
	 */

	jq.getJSON(opc_Clipart_JSON + '?_=' + new Date().getTime(), function(data) {
		opc_Clipart_Data = data;
		opc_Load_Clipart(opc_Clipart_Data, 'default', '', '');
	});

	opc_Load_Clipart = function(json, type, isDefaultCat, isDefaultSubCat) {
		var totalLength = '', catName = '', catId = '', catLi = '', clipPrice = '', subCatName = '', subCatId = '', subCatLi = '', clipId = '', clipName = '', clipPath = '', clipPrice = '', isDefaultCat = isDefaultCat, isDefaultSubCat = isDefaultSubCat, firstId = '', firstName = '';
		if (jq(window).width() > 959)
			clipLi = '<li><ul>';
		else if (jq(window).width() < 960) {
			clipLi = '';
		}
		jq.each(json[0].design[0].category, function(key, value) {
			catName = value.label;
			catId = value.id;
			catLi += '<option id="cat_' + catId + '">' + catName + '</option>';
			isDefaultCat = ((type == 'default') ? value.isDefault : isDefaultCat);
			if (catId == isDefaultCat) {
				jq.each(value.subcategory, function(key, value) {
					subCatName = value.label;
					subCatId = value.id;
					var c = 1;
					var checker = opc_Show_Img_No;

					if (type == 'default' || type == 'catChange')
						isDefaultSubCat = value.isDefault;

					subCatLi += '<option id="subCat_' + subCatId + '">' + subCatName + '</option>';
					if (subCatId == isDefaultSubCat) {
						totalLength = value.clipart.length;
						clipPrice = new Array();
						jq.each(value.clipart, function(key, value) {
							clipId = value.id;
							clipName = value.title;
							clipPath = value.image;

							opc_Clipart_Price.push({
								"id" : clipId,
								"price" : value.price,
								'colorable' : value.colorable
							});

							if (jq(window).width() > 959) {
								if (totalLength == c) {
									clipLi += '<li><a href="javascript:void(0);" ><img id="clip_' + clipId + '" width="60" height="56" alt="clipart" data-src="' + clipPath + '" data-src-retina="' + clipPath + '" src="assets/Skin/images/Spinning-line.gif"></a></li></ul></li>';
								} else if (c == checker) {
									clipLi += '<li><a href="javascript:void(0);" ><img id="clip_' + clipId + '" width="60" height="56" alt="clipart" data-src="' + clipPath + '" data-src-retina="' + clipPath + '" src="assets/Skin/images/Spinning-line.gif"></a></li></ul></li><li><ul>';
									checker = checker + opc_Show_Img_No;
								} else {
									clipLi += '<li><a href="javascript:void(0);" ><img id="clip_' + clipId + '" width="60" height="56" alt="clipart" data-src="' + clipPath + '" data-src-retina="' + clipPath + '" src="assets/Skin/images/Spinning-line.gif"></a></li>';
								}
							} else if (jq(window).width() < 960) {
								clipLi += '<li><a href="javascript:void(0);" ><img id="clip_' + clipId + '" width="60" height="56" alt="clipart" data-src="' + clipPath + '" data-src-retina="' + clipPath + '" src="assets/Skin/images/Spinning-line.gif"></a></li>';
							}

							c++;
						});
					}
				});
			}
		});

		if (type == 'default') {
			jq('#clipartCat').html(catLi).promise().done(function() {
				jq(".clipartSelect").selectbox({
					onChange : function(target) {
						var catId = jq('#clipartCat').next().find('a.sbSelector').attr('nodeval').split('_')[1];
						opc_Load_Clipart(opc_Clipart_Data, 'catChange', catId, '');
					}
				});
			});
			jq('#clipartSubcat').html(subCatLi).promise().done(function() {
				jq(".select").selectbox({
					onChange : function() {
						var catId = jq('#clipartCat').next().find('a.sbSelector').attr('nodeval').split('_')[1];
						var subCatId = jq('#clipartSubcat').next().find('a.sbSelector').attr('nodeval').split('_')[1];
						opc_Load_Clipart(opc_Clipart_Data, 'subCatChange', catId, subCatId);
					}
				});
			});
		} else if (type == 'catChange') {
			jq("#clipartSubcat").selectbox('detach');
			jq('#clipartSubcat').html(subCatLi);
			jq("#clipartSubcat").selectbox('attach', {
				onChange : function() {
					var catId = jq('#clipartCat').next().find('a.sbSelector').attr('nodeval').split('_')[1];
					var subCatId = jq('#clipartSubcat').next().find('a.sbSelector').attr('nodeval').split('_')[1];
					opc_Load_Clipart(opc_Clipart_Data, 'subCatChange', catId, subCatId);
				}
			});
		}

		jq('#cWrapper ul:first').html(clipLi).promise().done(function() {
			//console.log("hsdgh")
			responsive_slide('opc_Clipart_Slider', 'cWrapper');
			jq("#cWrapper  img").unveil(300);
		});
	}
	/*
	 Product Load Section
	 */

	jq.getJSON(opc_Product_JSON + '?_=' + new Date().getTime(), function(data) {
		opc_Product_Data = data;
		opc_Load_Product(opc_Product_Data, 'default', '', '', '')
	});

	opc_Load_Product = function(json, type, isDefaultCat, isDefaultSubCat, isDefaultProd, isDefaultColor) {
		var totalLength = '', catName = '', viewLi = '', catId = '', catLi = '', subCatName = '', subCatId = '', subCatLi = '', prodName = '', prodId = '', prodPath = '', prodPrice = '', pColorLi = '', pSize = '', pId = '', getCatName = '', getSubCatName = '';
		if (jq(window).width() > 959)
			prodLi = '<li><ul>';
		else if (jq(window).width() < 960)
			prodLi = '';
		jq.each(json.AllCategorys.Category, function(key, value) {
			catName = value.title;
			catId = value.id;
			catLi += '<option id="cat_' + catId + '">' + catName + '</option>';

			isDefaultCat = ((type == 'default') ? value.isDefault : isDefaultCat);

			if (isDefaultCat == catId) {
				jq.each(value.subCategory, function(key, value) {
					subCatName = value.title;
					subCatId = value.id;
					subCatLi += '<option id="subCat_' + subCatId + '">' + subCatName + '</option>';

					if (type == 'default' || type == 'catChange')
						isDefaultSubCat = value.isDefault;

					var c = 1;
					var checker = opc_Show_Img_No;
					if (isDefaultSubCat == subCatId) {
						totalLength = value.products.length;
						jq.each(value.products, function(key, value) {
							prodName = value.title;
							prodId = value.id;
							prodPath = value.thumbnail;
							prodPrice = value.rawprice;

							if (jq(window).width() > 959) {
								if (totalLength == c) {
									prodLi += '<li id="p_' + value.id + '" class="check_prod"><a href="javascript:void(0);"><img width="60" height="56" alt=" " data-src="' + prodPath + '" data-src-retina="' + prodPath + '" src="assets/Skin/images/Spinning-line.gif"></a></li></ul></li>';
								} else if (c == checker) {
									prodLi += '<li id="p_' + value.id + '" class="check_prod"><a href="javascript:void(0);"><img width="60" height="56" alt=" " data-src="' + prodPath + '" data-src-retina="' + prodPath + '" src="assets/Skin/images/Spinning-line.gif"></a></li></ul></li><li><ul>';
									checker = checker + opc_Show_Img_No;
								} else {
									prodLi += '<li id="p_' + value.id + '" class="check_prod"><a href="javascript:void(0);"><img width="60" height="56" alt=" " data-src="' + prodPath + '" data-src-retina="' + prodPath + '" src="assets/Skin/images/Spinning-line.gif"></a></li>';
								}
							} else if (jq(window).width() < 960) {
								prodLi += '<li id="p_' + value.id + '" class="check_prod"><a href="javascript:void(0);"><img width="60" height="56" alt=" " data-src="' + prodPath + '" data-src-retina="' + prodPath + '"  src="assets/Skin/images/Spinning-line.gif"></a></li>';
							}

							c++;

							if (type == 'default' || type == 'catChange' || type == 'subCatChange')
								isDefaultProd = value.isDefault;

							if (isDefaultProd == prodId) {
								jq.each(value.colors.color, function(key, value) {
									pColorLi += '<li  id="pColor_' + value.id + '" title="' + value.title + '" style="background: ' + value.colorcode + ';"></li>';

									if (type == 'default' || type == 'catChange' || type == 'subCatChange' || type == 'productChange')
										isDefaultColor = value.isDefault;

									if (value.id == isDefaultColor && (type == 'default' || type == 'productChange' || type == 'colorChange')) {
										opc_View = new Array();
										opc_png_Output = new Array();
										opc_Output_SVG = new Array();
										opc_view_name = new Array();
										previewArr = new Array();

										jq.each(value.views.view, function(key, value) {
											opc_View.push({
												'path' : value.viewthumbnail,
												'width' : value.imagewidth,
												'height' : value.imageheight,
												'id' : value.id,
												'name' : value.viewname,
												'x' : value.x,
												'y' : value.y,
												'drawWidth' : value.width,
												'drawHeight' : value.height,
												'catId' : isDefaultCat,
												'subCatId' : isDefaultSubCat,
												'prodId' : isDefaultProd,
												'printwidth' : value.printwidth,
												'printheight' : value.printheight,
											});

											opc_Output_SVG[key] = value.viewthumbnail.replace('thumb', 'large');
											opc_png_Output[key] = value.viewthumbnail.replace('thumb', 'large');
											opc_view_name[key] = value.viewname;
											previewArr[key] = value.viewthumbnail.replace('thumb', 'large');

											if (key == 0) {
												viewLi += '<li id="view_' + key + '" class="active" style="display: block;"><img width="48" height="52" alt="" data-src="' + value.viewthumbnail + '" data-src-retina="' + value.viewthumbnail + '"  src="assets/Skin/images/Spinning-line.gif"><span class="trn">' + value.viewname + '</span></li>';
												jq('.viewport img').attr('src', value.viewthumbnail.replace('thumb', 'large'));
												if (type != 'default')
													setTimeout(function() {
														opc_Canvas_Load(value.viewthumbnail.replace('thumb', 'large'), key);
													}, 500);
												opc_OverlayImg = value.viewthumbnail.replace('thumb', 'large');

											} else {
												viewLi += '<li id="view_' + key + '" style="display: block;"><img width="48" height="52" alt="" data-src="' + value.viewthumbnail + '" data-src-retina="' + value.viewthumbnail + '" src="assets/Skin/images/Spinning-line.gif"><span class="trn">' + value.viewname + '</span></li>';
											}

										});

										opc_Product_Size_Price = new Array();
										jq.each(value.views.Sizes.size, function(key, value) {
											if (key == 0) {
												opc_Product_Price = prodPrice;
												opc_Size_Price = value.sizeprice;
											}

											pSize += '<option id="size_' + value.id + '">' + value.title + '</option>';

											opc_Product_Size_Price.push({
												"id" : value.id,
												"price" : value.sizeprice
											});
										});

									}
								});
							}
						});
					}
				});
			}
		});

		if (type == 'default') {
			jq('#prodCat, #prodSubCat').selectbox('detach');
			jq('#prodCat').html(catLi);
			jq('#prodSubCat').html(subCatLi);
			jq('#prodCat').selectbox('attach', {
				onOpen : function() {
					getCatName = jq('#prodCat').next().find('a.sbSelector').text();
				},
				onChange : function(data) {
					var catId = jq('#prodCat').next().find('a.sbSelector').attr('nodeval').split('_')[1];
					if (getCatName != data) {
						opc_Load_Product(opc_Product_Data, 'catChange', catId, '', '', '');
					}
				}
			});
			jq('#prodSubCat').selectbox('attach', {
				onOpen : function() {
					getSubCatName = jq('#prodSubCat').next().find('a.sbSelector').text();
				},
				onChange : function(data) {
					var catId = jq('#prodCat').next().find('a.sbSelector').attr('nodeval').split('_')[1];
					var subCatId = jq('#prodSubCat').next().find('a.sbSelector').attr('nodeval').split('_')[1];
					if (getSubCatName != data) {
						opc_Load_Product(opc_Product_Data, 'subCatChange', catId, subCatId, '', '');
					}

				}
			});
		} else if (type == 'catChange') {
			jq('#prodSubCat').selectbox('detach');
			jq('#prodSubCat').html(subCatLi);
			jq('#prodSubCat').selectbox('attach', {
				onOpen : function() {
					getSubCatName = jq('#prodSubCat').next().find('a.sbSelector').text();
				},
				onChange : function(data) {
					var catId = jq('#prodCat').next().find('a.sbSelector').attr('nodeval').split('_')[1];
					var subCatId = jq('#prodSubCat').next().find('a.sbSelector').attr('nodeval').split('_')[1];
					if (getSubCatName != data) {
						opc_Load_Product(opc_Product_Data, 'subCatChange', catId, subCatId, '', '');
					}

				}
			});
		}

		if (type == 'default' || type == 'catChange' || type == 'subCatChange')
			jq('#pWrapper ul:first').html(prodLi).promise().done(function() {
				if (type == 'default')
					jq(this).find('li:first > ul > li:first').addClass('active');
				responsive_slide('opc_Product_Slider', 'pWrapper');
			});

		if (type == 'default' || type == 'productChange' || type == 'colorChange') {
			jq('#thumbView').html(viewLi).promise().done(function() {
				direction();
			});
			jq('#sizeList').selectbox('detach');
			jq('#sizeList').html(pSize).selectbox('attach', {
				onChange : function() {
					var sizeId = jq('#sizeList').next().find('a.sbSelector').attr('nodeval').split('_')[1];
					jq.each(opc_Product_Size_Price, function(key, value) {
						if (sizeId == value.id)
							opc_Size_Price = value.price;
					});
					opc_Cal_Price('', opc_Size_Price);
				}
			});

			if (type != 'colorChange') {
				jq('#pColor').html(pColorLi).find('li:first').addClass('active');
				$.each(opc_View, function(key, value) {
					if (canvas) {
						canvas.clear();
						canvas.renderAll();
					}
					opc_Canvas_arr[key] = new Array();
				});
				opc_GetPrice = 0;
			}

		}

		window.onload = function() {
			opc_Canvas_Load(opc_View[opc_Current_View].path.replace('thumb', 'large'), opc_Current_View);
			responsive_slide('opc_Product_Slider', 'pWrapper');
			if (opc_use_undo_redo == true) {
				var headElement = document.getElementsByTagName('head')[0], scriptEl = document.createElement('script')
				scriptEl.onload = function() {
					opc_Default_Design ? jq.getJSON(opc_Default_Design_obj + '?_=' + new Date().getTime(), function(data) {

						opc_Default_Design_fun(data)
					}) : opc_DefaultLoad();
				}
				scriptEl.onerror = function() {
					opc_use_undo_redo = false;
					jq(".undo-redo-area").css({
						"display" : "none"
					});
					opc_Default_Design ? jq.getJSON(opc_Default_Design_obj + '?_=' + new Date().getTime(), function(data) {

						opc_Default_Design_fun(data)
					}) : opc_DefaultLoad();
					console.clear();
					alert("Undo Redo File Is Missing")
				}
				scriptEl.src = "assets/Library/jquery.sparx.undo-redo.js";
				headElement.appendChild(scriptEl);

			} else {

				jq(".undo-redo-area").css({
					"display" : "none"
				});
				opc_Default_Design ? jq.getJSON(opc_Default_Design_obj + '?_=' + new Date().getTime(), function(data) {

					opc_Default_Design_fun(data)
				}) : opc_DefaultLoad();
			}

			jq("img").unveil(300);

			jq(window).resize(function() {
				opc_Canvas_Load(opc_OverlayImg, opc_Current_View);
			});
			opc_winWidth = jq(window).width();
		}

		jq("#pWrapper  img").unveil(300);
		//alert(opc_location_hash);
		setTimeout(function() {
			opc_Change_Lang(opc_location_hash);
		}, 500);
	}
	/*
	 Font Load  Section
	 */

	if (opc_use_google_Font == true) {
		var fontLiOpt = '', fontsName = [];
		var fontpopup = true;
		var fontfamilyname = '';
		/*
		 jq.each(WebFontConfig.google.families, function(key, value) {
		 if (key == 0) {
		 opc_Font_List += '<li class="active" alt="font_' + key + '"><a href="javascript:void(0);" nodefamily = "" style="font-family : ' + value.split(':')[0].replace(/\+/g, ' ') + ' ">' + value.split(':')[0].replace(/\+/g, ' ') + '</a></li>';
		 fontLiOpt += '<option id="cat_' + key + '" style="font-family :' + value.split(':')[0].replace(/\+/g, ' ') + '">' + value.split(':')[0].replace(/\+/g, ' ') + '</option>';
		 fontsName[key] = value.split(':')[0].replace(/\+/g, ' ');
		 } else {
		 opc_Font_List += '<li alt="font_' + key + '"><a href="javascript:void(0);" style="font-family : ' + value.split(':')[0].replace(/\+/g, ' ') + ' ">' + value.split(':')[0].replace(/\+/g, ' ') + '</a></li>';
		 fontLiOpt += '<option id="cat_' + key + '" style="font-family :' + value.split(':')[0].replace(/\+/g, ' ') + '">' + value.split(':')[0].replace(/\+/g, ' ') + '</option>';
		 fontsName[key] = value.split(':')[0].replace(/\+/g, ' ');
		 }
		 });*/
		jq.each(opc_WebFontConfig, function(key, value) {
			if (key == 0) {
				//fontfamilyname += '@font-face {font-family:"' + value.split(':')[0].replace(/\+/g, ' ') + '"};';
				fontfamilyname += value.name;
				opc_Font_List += '<li class="active" alt="font_' + key + '"><a href="javascript:void(0);" nodefamily = "" style="font-family : ' + value.name + '">' + value.name + '</a></li>';
			} else {
				opc_Font_List += '<li alt="font_' + key + '"><a href="javascript:void(0);" style="font-family : ' + value.name + ' ">' + value.name + '</a></li>';
				//fontfamilyname += '@font-face {font-family:"' + value.split(':')[0].replace(/\+/g, ' ') + '"};';
				fontfamilyname += value.name;

			}
			//console.log(fontfamilyname);
		});
		jq('#fontSelectbox').selectbox('detach');
		jq('#fontSelectbox').html(fontLiOpt).selectbox('attach', {
			onOpen : function() {
				if (fontpopup) {
					jq('#fontSelectbox').next().find('ul li').each(function(key, value) {
						jq(this).find('a').css('font-family', fontsName[key]);
					})
					jq('#fontSelectbox').next().find('ul li:first').addClass('activeFont');
					jq('#fontSelectbox').next().find('ul li:first >a').css('color', '#fff');
				}
			},
			onChange : function() {
				fontpopup = false;
				jq('#fontSelectbox').next().find('ul li:first >a').css('color', '#666666');
				var text = jq('#fontSelectbox').next().find('a.sbSelector').text();
				var fontIndex = jq('#fontSelectbox').next().find('a.sbSelector').attr('nodeval').split('_')[1];
				jq('#fontSelectbox').next().find('a.sbSelector').css('font-family', text);
				jq('#fontSelectbox').next().find('ul li').removeClass('activeFont').each(function() {
					jq(this).find('a').css('color', '#666666');
					if (jq(this).find('a').text() == text) {
						jq(this).addClass('activeFont');
						jq(this).find('a').css('color', '#fff');
					}
				});
				//font change code in Mobile case
				opc_GetObj = canvas.getActiveObject();
				if (opc_GetObj && opc_GetObj.name == 'text') {
					if (opc_use_google_Font == true) {
						/*
						 jq.each(WebFontConfig.google.families, function(key, value) {
						 if (key == fontIndex) {
						 value.match('italic') ? jq('#fontDecor li:eq(1)').show() : jq('#fontDecor li:eq(1)').hide();
						 value.match('700') ? jq('#fontDecor li:eq(0)').show() : jq('#fontDecor li:eq(0)').hide();
						 }
						 });*/
						jq.each(opc_WebFontConfig, function(key, value) {
							if (key == fontIndex) {
								(value.varients == 'italic') ? jq('#fontDecor li:eq(1)').show() : jq('#fontDecor li:eq(1)').hide();
								(value.varients == '400') ? jq('#fontDecor li:eq(0)').show() : jq('#fontDecor li:eq(0)').hide();
								//value.varients.match('italic') ? jq('#fontDecor li:eq(1)').show() : jq('#fontDecor li:eq(1)').hide();
								//value.varients.match('700') ? jq('#fontDecor li:eq(0)').show() : jq('#fontDecor li:eq(0)').hide();
							}
						});					}
					opc_GetObj.setFontFamily(text);
					opc_GetObj.setCoords();
					canvas.renderAll();
					canvas.calcOffset();
				}
				if (opc_GetObj && opc_GetObj.name == 'effectText') {
					if (opc_use_google_Font == true) {
						/*
						 jq.each(WebFontConfig.google.families, function(key, value) {
						 if (key == fontIndex) {
						 value.match('italic') ? jq('#fontDecorSgLine li:eq(1)').show() : jq('#fontDecorSgLine li:eq(1)').hide();
						 value.match('700') ? jq('#fontDecorSgLine li:eq(0)').show() : jq('#fontDecorSgLine li:eq(0)').hide();
						 }
						 });*/
						jq.each(opc_WebFontConfig, function(key, value) {
							if (key == fontIndex) {
								(value.varients == 'italic') ? jq('#fontDecor li:eq(1)').show() : jq('#fontDecor li:eq(1)').hide();
								(value.varients == '400') ? jq('#fontDecor li:eq(0)').show() : jq('#fontDecor li:eq(0)').hide();
								//value.varients.match('italic') ? jq('#fontDecor li:eq(1)').show() : jq('#fontDecor li:eq(1)').hide();
								//value.varients.match('700') ? jq('#fontDecor li:eq(0)').show() : jq('#fontDecor li:eq(0)').hide();
							}
						});
					}
					opc_GetObj.set({
						fontFamily : text,
						selectedTextFont : text
					});
					if (opc_GetObj.get("effectType") == "outline") {
						opc_Text_Draw_Outline_Update('effect');
					} else
						opc_updateEffectText();
					opc_GetObj.setCoords();
					canvas.renderAll();
					canvas.calcOffset();
				}
			}		});
				jq('.content_1 ul').html(opc_Font_List).promise().done(function() {
			jq(".content_1").mCustomScrollbar({
				scrollButtons : {
					enable : true
				}
			});
			var fontIndex = jq('.mCSB_container li:eq(0)').attr('alt').split('_')[1];
			/*
			 jq.each(WebFontConfig.google.families, function(key, value) {
			 if (key == fontIndex) {
			 value.match('italic') ? jq('#fontDecor li:eq(1)').show() : jq('#fontDecor li:eq(1)').hide();
			 value.match('700') ? jq('#fontDecor li:eq(0)').show() : jq('#fontDecor li:eq(0)').hide();
			 }
			 });*/
			jq.each(opc_WebFontConfig, function(key, value) {
				if (key == fontIndex) {
					(value.varients == 'italic') ? jq('#fontDecor li:eq(1)').show() : jq('#fontDecor li:eq(1)').hide();
					(value.varients == '400') ? jq('#fontDecor li:eq(0)').show() : jq('#fontDecor li:eq(0)').hide();
					//value.varients.match('italic') ? jq('#fontDecor li:eq(1)').show() : jq('#fontDecor li:eq(1)').hide();
					//value.varients.match('700') ? jq('#fontDecor li:eq(0)').show() : jq('#fontDecor li:eq(0)').hide();
				}
			});
		});	} else {
		//console.log("jq")
		//jq("body").append("<script src='assets/Library/jquery.sparx.ttf.js'>");
		var headElement = document.getElementsByTagName('head')[0], scriptEl = document.createElement('script')
		scriptEl.onload = function() {

		}
		scriptEl.onerror = function() {

			opc_use_google_Font = false;
			console.clear();
			alert("Normal Font TTF  Files Is Missing");
		}
		scriptEl.src = "assets/Library/jquery.sparx.ttf.js";
		headElement.appendChild(scriptEl);
	}
	/*
	 Design Color Load Section
	 */

	jq.getJSON(opc_Design_Color_JSON + '?_=' + new Date().getTime(), function(data) {
		opc_Color_Data = data;
		opc_Load_Color(opc_Color_Data);
	});

	opc_Load_Color = function(json) {
		var colorLi = '', showColor = '';
		var totalLength = json.length;
		if (totalLength < 8) {
			jq('.morecolorbox').css('display', 'none');
		}
		jq.each(json, function(key, value) {
			if (key < 7) {
				showColor += '<li title="' + value.title + '" style="background-color: ' + value.value + ';"></li>';
			}
			colorLi += '<li title="' + value.title + '" style="background-color: ' + value.value + ';"></li>';
		});

		jq('.clipart-color').html(showColor);
		jq('.morecolorbox ul').html(colorLi);
	}
	/**********Text Effect Load json**************/
	//load text script when opc_Text_Effect_Show if true
	//and jquery.sparx.texteffect.js provide to client

	/*
	 Language Manage Section.
	 */

	jq.getJSON(opc_Multi_Lang_JSON + '?_=' + new Date().getTime(), function(data) {
		opc_multi_lang_Data = data;
		opc_Load_Multi_Lang(opc_multi_lang_Data);
	});

	opc_Load_Multi_Lang = function(json) {
		var lang_li = '', default_lang = '';
		jq.each(json, function(key, value) {
			if (opc_location_hash && value.lang_short == opc_location_hash) {
				default_lang = '<img width="23" height="17" src="' + value.flag + '" title="' + value.lang + '" alt="' + value.lang_short + '">';
			} else if (key == 0) {
				default_lang = '<img width="23" height="17" src="' + value.flag + '" title="' + value.lang + '" alt="' + value.lang_short + '">';
			}
			lang_li += '<li><a href="javascript:void(0);"><img width="23" height="17" src="' + value.flag + '" title="' + value.lang + '" alt="' + value.lang_short + '"></a></li>';
		});
		jq('.flag').html(default_lang);
		jq('.flag-list').html(lang_li);
	}
})(jQuery);

/*
 This function is used for managing Domcontent loaded event for some browser.
 */

function setupDomLoader() {
	if (document.addEventListener) {
		document.addEventListener("DOMContentLoaded", domLoader, null);
	}
	if (navigator.userAgent.match(/msie/i) == 'MSIE') {
		var head = document.getElementsByTagName('HEAD')[0];
		var script = document.createElement('script');
		script.setAttribute('defer', 'defer');
		script.appendChild(document.createTextNode(domLoader()));
		head.appendChild(script);
	}
	window.onload = domLoader;
};
setupDomLoader();

function domLoader() {
	if (arguments.callee.done) {
		return setTimeout(function() {
			if (opc_View[opc_Current_View] !== 'undefined') {
				console.log(opc_View[opc_Current_View])
				opc_Canvas_Load(opc_View[opc_Current_View].path.replace('thumb', 'large'), opc_Current_View);
				responsive_slide('opc_Product_Slider', 'pWrapper');
				if (opc_use_undo_redo == true) {
					var headElement = document.getElementsByTagName('head')[0], scriptEl = document.createElement('script')
					scriptEl.onload = function() {
						opc_Default_Design ? jq.getJSON(opc_Default_Design_obj + '?_=' + new Date().getTime(), function(data) {
							opc_Default_Design_fun(data)
						}) : opc_DefaultLoad();
					}
					scriptEl.onerror = function() {
						opc_use_undo_redo = false
						jq(".undo-redo-area").css({
							"display" : "none"
						});
						opc_Default_Design ? jq.getJSON(opc_Default_Design_obj + '?_=' + new Date().getTime(), function(data) {
							opc_Default_Design_fun(data)
						}) : opc_DefaultLoad();
						console.clear();
						alert("Undo Redo File Is Missing")
					}
					scriptEl.src = "assets/Library/jquery.sparx.undo-redo.js";
					headElement.appendChild(scriptEl);				} else {
					jq(".undo-redo-area").css({
						"display" : "none"
					});
					opc_Default_Design ? jq.getJSON(opc_Default_Design_obj + '?_=' + new Date().getTime(), function(data) {
						opc_Default_Design_fun(data)
					}) : opc_DefaultLoad();
				}
				jq("img").unveil(500);

				jq(window).resize(function() {
					opc_Canvas_Load(opc_OverlayImg, opc_Current_View);
				});
			}
		}, 1500);
	}
	arguments.callee.done = true;
};
/****************Manage all dynamic script*****************/

if (opc_Text_Effect_Show == true) {
	//jq("body").append("<script src='assets/Library/jquery.sparx.texteffect.js'>");
	var headElement = document.getElementsByTagName('head')[0], scriptEl = document.createElement('script')
	scriptEl.onload = function() {

	}
	scriptEl.onerror = function() {
		jq(".select-line").hide();
		opc_Text_Effect_Show = false;
		console.clear();
		alert("Text Effect Files Is Missing")
	}
	scriptEl.src = "assets/Library/jquery.sparx.texteffect.js";
	headElement.appendChild(scriptEl);
} else {
	jq(".select-line").hide();
}
if (opc_view_show == true) {

	//jq("body").append("<script src='assets/Library/jquery.sparx.manageview.js'>");
	var headElement = document.getElementsByTagName('head')[0], scriptEl = document.createElement('script')
	scriptEl.onload = function() {

	}
	scriptEl.onerror = function() {
		jq("#productThumb").hide()
		opc_view_show = false;
		console.clear();
		alert("Manage View Files Is Missing")
	}
	scriptEl.src = "assets/Library/jquery.sparx.manageview.js";
	headElement.appendChild(scriptEl);
} else {
	jq("#productThumb").hide()
}
if (opc_product_color_change == false)
	jq(".productColorWidget").hide()
if (opc_social_share == true) {

	//jq("body").append("<script src='assets/Library/socialShare.js'>");
	var headElement = document.getElementsByTagName('head')[0], scriptEl = document.createElement('script')
	scriptEl.onload = function() {

	}
	scriptEl.onerror = function() {
		jq(".socialWidget").hide()
		opc_social_share = false;
		console.clear();
		alert("Social Shairing Files Is Missing");
	}
	scriptEl.src = "assets/Library/socialShare.js";
	headElement.appendChild(scriptEl);

} else {
	jq(".socialWidget").hide()
}

if (opc_Preview_show == true) {
	var headElement = document.getElementsByTagName('head')[0], scriptEl = document.createElement('script')
	scriptEl.onload = function() {

	}
	scriptEl.onerror = function() {
		jq("#previewShow").hide()
		opc_Preview_show = false;
		console.clear();
		alert("Manage Preview Files Is Missing");
	}
	scriptEl.src = "assets/Library/jquery.sparx.manage.preview.js";
	headElement.appendChild(scriptEl);
} else {
	jq("#previewShow").hide()
}

/****************End Dynamic Script*****************************************/