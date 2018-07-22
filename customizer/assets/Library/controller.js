jq(document).ready(function() {

	/*
	 Tap click event code.
	 */

	jq(document).on(opc_EventType, '#sBarTabs li', function() {
		var index = jq(this).index();
		jq('#sBarTabs li').removeClass('active');
		jq(this).addClass('active');

		jq('.sBarTarget').removeClass('block');
		jq('.sBarTarget').eq(index).addClass('block');

		switch (index) {
			case 0 :
				responsive_slide('opc_Product_Slider', 'pWrapper');
				break;
			case 1 :
				responsive_slide('opc_Clipart_Slider', 'cWrapper');
				break;
			case 2	:
				break;
		}

		//alert(12);

		if (jq(window).width() < 768) {
			jq('.ipod-bottom').hide('slide', {
				direction : 'down'
			});
			jq('.custom-order, #thumbView').fadeOut();
			jq('.morecolorbox').removeClass('block');
			jq('.edit-design-color').html('<img src="assets/Skin/images/color_wheel.png">');
		}

		opc_Change_Lang(jq('.flag img').attr('alt'));

		return false;
	});

	/*
	 Cancel Button event for Responsive template
	 */

	jq(document).on(opc_EventType, '.panel_cls', function() {
		var index = jq(this).parent().index() - 1;
		jq(this).parent().removeClass('block');
		jq('#sBarTabs li:eq(' + index + ')').removeClass('active');
		if (jq(window).width() < 768) {
			jq('.ipod-bottom').show('slide', {
				direction : 'down'
			});
			jq('.custom-order, #thumbView').fadeIn();
		}

		return false;
	});

	/*
	 Product Click Event.
	 */

	jq(document).off(opc_EventType, '#pWrapper li.check_prod').on(opc_EventType, '#pWrapper li.check_prod', function() {
		console.log(1)
		if (!jq(this).hasClass('active')) {
			msg = confirm('Are you Sure you want to change this product?');
			msg = (opc_EventType == "touchend") ? true : msg
			if (msg) {
				jq('#pWrapper li').removeClass('active');
				jq(this).addClass('active')
				var catId = jq('#prodCat').next().find('a.sbSelector').attr('nodeval').split('_')[1];
				var subCatId = jq('#prodSubCat').next().find('a.sbSelector').attr('nodeval').split('_')[1];
				var pId = jq(this).attr('id').split('_')[1];
				canvas.backgroundImage = null;
				canvas.renderAll();
				opc_Load_Product(opc_Product_Data, 'productChange', catId, subCatId, pId, '');
			}
		}
		return false;
	});

	/*
	 Product Color click event.
	 */

	jq(document).on(opc_EventType, '#pColor li', function(e) {
		if (!jq(this).hasClass("active")) {
			if (opc_product_color_change == true) {
				opc_Show_Loader();
				opc_Color_Change = true;
				jq("#pColor li").removeClass("active");
				jq(this).addClass("active");
				var catId = opc_View[0].catId;
				var subCatId = opc_View[0].subCatId;
				var pId = opc_View[0].prodId;
				var colorId = jq(this).attr('id').split('_')[1];
				canvas.backgroundImage = null;
				canvas.deactivateAll().renderAll();
				console.log('click event of color change')
				opc_Canvas_arr[opc_Current_View] = JSON.parse(JSON.stringify(canvas));
				opc_Load_Product(opc_Product_Data, 'colorChange', catId, subCatId, pId, colorId);
				if (opc_view_show == true)
					opc_Change_View(opc_View[0].path.replace('thumb', 'large'), 0);
				createUnrenderedViewsData();
			}
		}
	});

	/*
	 Product View thumb click event.
	 */

	jq(document).on(opc_EventType, '#productThumb li', function() {
		if (!jq(this).hasClass("active")) {
			opc_Show_Loader();
			opc_Color_Change = false;
			jq("#productThumb li").removeClass("active");
			jq(this).addClass("active");
			jq('.viewport img').attr('src', opc_View[jq(this).attr('id').split('_')[1]].path.replace('thumb', 'large'));
			direction();
			updateDesignPreview();
			if (opc_view_show == true)
				opc_Change_View(opc_View[jq(this).attr('id').split('_')[1]].path.replace('thumb', 'large'), jq(this).attr('id').split('_')[1]);
		}
	});

	/*
	 View Direction event code.
	 */

	jq('body').on(opc_EventType, '.direction-link', function(event) {
		updateDesignPreview();
		direction();
		return false;
	});

	/*
	 Edit Design color panel show/hide event code.
	 */

	jq(".morelink").click(function() {
		jq(this).toggleClass("morelink-close");
		jq(".morecolorbox").toggleClass("morelink-open");
		return false;
	});

	/*
	 Product color Tab event for Responsive template.
	 */

	jq('body').on(opc_EventType, '.productColorWidget span', function() {
		canvas.deactivateAll().renderAll();
		jq('.productColorWidget .color-list').addClass('block');
		if (jq(window).width() < 768) {
			jq('.custom-order, #thumbView').fadeOut();
			jq('.ipod-bottom').hide('slide', {
				direction : 'down'
			})
		}
	});

	/*
	 Video Wrapper hide.
	 */

	jq(document).on(opc_EventType, '.video-wrapper .close-vbtn', function() {
		jq('.video-wrapper').hide();
		var bk_src = jq("#videoT").attr("src");
		jq("#videoT").attr("src", "").promise().done(function() {
			jq("#videoT").attr("src", bk_src);
		});
		return false;
	});

	/*
	 Click event for changing object color.
	 */
	jq('body').on(opc_EventType, '.edit-design-color', function(event) {
		event.stopPropagation();
		jq('.morecolorbox').toggleClass('block');
		jq('.morecolorbox').hasClass('block') ? jq(this).text('close').parent().addClass('openlist') : jq(this).html('<img src="assets/Skin/images/color_wheel.png">').parent().removeClass('openlist');

	});

	/*
	 Order info button event for responsive template
	 */

	jq('body').on(opc_EventType, '.order-info', function(event) {
		order_info();
	});

	jq(document).on(opc_EventType, '.custom-order .close-btn', function() {
		jq('.custom-order').animate({
			left : '100%'
		}, 500, function() {
			jq('.custom-order .open-icon').removeClass('right').css('display', 'none');
			jq('.custom-order-overlay').css('display', 'none');
		}).removeClass('show');
	});

	/*
	 Flag Manage.
	 */

	jq(document).on(opc_EventType, '.flag, .flag-change-link', function() {
		jq('.flag').next().slideToggle('slow')
	});
	jq(document).on(opc_EventType, '.flag-list li', function() {
		var msg = confirm('Are you Sure you want to change a Language?');
		if (msg) {
			opc_redirect_check = false;
			var this_html = jq(this).html();
			var lang = jq(this).find('img').attr('alt');
			jq('.flag').html(this_html)
			jq('.flag-list').slideUp('slow');

			var newPath = replaceQueryString(window.location.href, 'lang', lang);

			setTimeout(function() {
				window.location.href = newPath;
			}, 500);
		} else {
			jq('.flag-list').slideUp('slow');
		}

	});

	/*
	 Event for Add clipart in Design Area.
	 */

	jq('body').on(opc_EventType, '#cWrapper li', function() {
		canvas.deactivateAll().renderAll();
		var clipId = jq(this).find('img').attr('id').split('_')[1];
		var clipPrice = '';
		var colorAble = '';
		jq.each(opc_Clipart_Price, function(key, value) {
			if (value.id == clipId) {
				clipPrice = value.price;
				colorAble = value.colorable;
			}
		});
		opc_Default_checker = true;
		opc_Svg_Draw(jq(this).find('img').attr('src').replace(/\png/g, 'svg'), jq(this).find('img').attr('alt'), parseFloat(clipPrice), colorAble, 'normal');
		saveState_added();
		jq(document).find('a#undo').parent('li').removeClass('disabled')
		return false;
	});

	/*
	 Event For Add Upload Image in Design Area.
	 */

	jq('body').on(opc_EventType, '#uWrapper img', function() {
		canvas.deactivateAll().renderAll();
		opc_Default_checker = true;
		opc_Img_Draw(jq(this).attr('src').replace('thumb', 'large'), jq(this).attr('alt'), 'normal');
		return false;
	});

	/*
	 Continue Button Event In Clipart Panel.
	 */

	jq('body').on(opc_EventType, '.continue', function() {
		jq('.upload-wrapper').slideDown(600, function() {
			jq('.upload-detail').hide();
			responsive_slide('opc_upload_Slider', 'uWrapper');
		});
	});

	jq('body').on(opc_EventType, '.upload-btn', function() {
		if (!jq('.upload-photo').is(':visible')) {
			jq('.upload-detail').slideDown(600)
		}
	});

	/*
	 Cancel Button Event In Clipart Panel.
	 */

	jq('body').on(opc_EventType, '.cancel-btn, .cancel', function() {
		jq('.uploadCommon').slideUp(600);
		responsive_slide('opc_Clipart_Slider', 'cWrapper');
		return false;
	});

	/*
	 Object Flip, Object center code.
	 */

	jq('body').on(opc_EventType, '.clipartRotator li', function() {
		opc_GetObj = canvas.getActiveObject() || canvas.getActiveGroup();
		if (opc_GetObj) {
			var index = jq(this).index();
			switch (index) {
				case 0 :
					jq(this).toggleClass('active');
					opc_GetObj.flipX = jq(this).hasClass('active') ? true : false;
					break;
				case 1 :
					jq(this).toggleClass('active');
					opc_GetObj.flipY = jq(this).hasClass('active') ? true : false;
					break;
				case 2 :
					opc_GetObj.set({
						top : (parseInt(opc_View[opc_Current_View].y)) + ((parseInt(opc_View[opc_Current_View].drawHeight)) / 2),
					})
					break;
				case 3 :
					opc_GetObj.set({
						left : (parseInt(opc_View[opc_Current_View].x)) + ((parseInt(opc_View[opc_Current_View].drawWidth)) / 2)
					})
					break;
				case 4 :
					opc_GetObj.set({
						left : (parseInt(opc_View[opc_Current_View].x)) + ((parseInt(opc_View[opc_Current_View].drawWidth)) / 2),
						top : (parseInt(opc_View[opc_Current_View].y)) + ((parseInt(opc_View[opc_Current_View].drawHeight)) / 2),
					})
					break;
			}
			opc_GetObj.setCoords();
			canvas.renderAll();
			canvas.calcOffset();

		}
	});

	/*
	 Object Zoom Slider function
	 */
	jq("#slider").slider({
		min : 10,
		value : 750,
		orientation : "horizontal",
		range : "min",
		animate : true,
		max : 1500,
		slide : function(event, ui) {
			opc_GetObj = canvas.getActiveObject() || canvas.getActiveGroup();
			if (opc_GetObj) {
				opc_GetObj.scale(ui.value / 100);
				opc_GetObj.setCoords();
				canvas.renderAll();
				canvas.calcOffset();
			}
		}
	});

	/*
	 How to use Event.
	 */

	jq('body').on(opc_EventType, '.help, .close', function() {
		if (jq(this).hasClass('help')) {
			jq('#helpdiv').show('fade');
		} else if (jq(this).hasClass('close')) {
			jq('#helpdiv').hide('fade');
		}
		return false;
	});

	/*
	 Object Postion Update code
	 */

	jq('body').on(opc_EventType, '.position-handler span', function() {
		opc_GetObj = canvas.getActiveObject() || canvas.getActiveGroup();
		if (opc_GetObj) {
			var index = jq(this).index();
			switch (index) {
				case 0 :
					opc_GetObj.setLeft(opc_GetObj.getLeft() - 2);
					break;
				case 1 :
					opc_GetObj.setTop(opc_GetObj.getTop() - 2);
					break;
				case 2 :
					opc_GetObj.setLeft(opc_GetObj.getLeft() + 2);
					break;
				case 3 :
					opc_GetObj.setTop(opc_GetObj.getTop() + 2);
					break;
			}
			opc_GetObj.setCoords();
			canvas.renderAll();
			canvas.calcOffset();
		}
	});

	/*
	 Rotate Button code
	 */

	jq(function() {

		jq('.cep').mask('999');

		jq('.cep_with_callback').mask('000', {
			onComplete : function(cep) {
				console.log('Mask is done!:', cep);
			},
			onKeyPress : function(cep, event, currentField, options) {
				console.log('An key was pressed!:', cep, ' event: ', event, 'currentField: ', currentField.attr('class'), ' options: ', options);
			}
		});

	});

	jq.fn.ForceNumericOnly = function() {
		return this.each(function() {
			jq(this).keydown(function(e) {
				var key = e.charCode || e.keyCode || 0;
				// allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
				// home, end, period, and numpad decimal
				return (key == 8 || key == 9 || key == 46 || key == 110 || key == 190 || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
			});

			jq(this).keyup(function() {
				if (jq(this).attr('id') == 'rotateVal') {
					if (jq(this).val() < 0 || jq(this).val() > 360) {
						jq('.degree span ').css('color', 'red');
						jq('input[value="ROTATE"]').prop('disabled', true).css('opacity', 0.5);
					} else {
						jq('.degree span ').css('color', 'black');
						jq('input[value="ROTATE"]').prop('disabled', false).css('opacity', 1);
					}
				}
			});
		});
	};

	jq('input[name="rotateBox"], input[name="qty"]').ForceNumericOnly();

	jq('body').on(opc_EventType, 'input[value="ROTATE"]', function() {
		opc_GetObj = canvas.getActiveObject() || canvas.getActiveGroup();
		if (opc_GetObj) {
			opc_GetObj.setAngle(jq('input[name="rotateBox"]').val());
			opc_GetObj.setCoords();
			canvas.renderAll();
			canvas.calcOffset();
		}
	});

	jq('input[name="qty"]').keyup(function() {
		opc_Cal_Price('', '');
	});

	jq('input[name="qty"]').blur(function() {
		if (jq(this).val() <= 0)
			jq(this).val(1);

		opc_Cal_Price('', '');
	});

	/*
	 Click Event For change object color.
	 */
	jq('body').on(opc_EventType, '.outline-color li a', function(event) {
		opc_GetObj = canvas.getActiveObject();
		if (opc_GetObj && opc_GetObj.name == "effectText") {
			if (opc_GetObj.get("effectType") == "outline") {
				opc_GetObj.set({
					stroke : jq(this).css("backgroundColor")
				});
				canvas.renderAll()

			}
		}
	});
	jq('body').on(opc_EventType, '#designColorWidget li', function() {
		var color = jq(this).css('background-color');
		opc_GetObj = canvas.getActiveObject() || canvas.getActiveGroup();
		//alert(opc_GetObj.type);
		if (canvas.getActiveObject()) {
			switch (opc_GetObj.name) {
				case 'text' :
					opc_GetObj.setFill(color);
					break;
				case 'effectText' :
					opc_GetObj.setFill(jq(this).css('background-color'));
					break;
				case 'clipart' :
					if (opc_GetObj.get('objColorAble') == 'true') {
						if (opc_GetObj.isSameColor && opc_GetObj.isSameColor() || !opc_GetObj.paths) {
							opc_GetObj.setFill(color);
						} else if (opc_GetObj.paths) {
							for (var i = 0; i < opc_GetObj.paths.length; i++) {
								opc_GetObj.paths[i].setFill(color);
							}
						}
					} else {
						alert('Non-colorable object.');
					}

			}
		} else if (canvas.getActiveGroup()) {
			canvas.getActiveGroup().forEachObject(function(opc_GetObj) {
				switch (opc_GetObj.name) {
					case 'text' :
						opc_GetObj.setFill(color);
						break;
					case 'clipart' :
						if (opc_GetObj.get('objColorAble') == 'true') {
							if (opc_GetObj.isSameColor && opc_GetObj.isSameColor() || !opc_GetObj.paths) {
								opc_GetObj.setFill(color);
							} else if (opc_GetObj.paths) {
								for (var i = 0; i < opc_GetObj.paths.length; i++) {
									opc_GetObj.paths[i].setFill(color);
								}
							}
						} else {
							//alert('Non-colorable object.');
						}

				}
			});
		}
		opc_GetObj.setCoords();
		canvas.renderAll();
		canvas.calcOffset();
		//canvg(document.getElementById('drawingArea'), canvas.toSVG());
	});

	/*
	 Add Text button Click
	 */

	jq('body').on(opc_EventType, '#addTextBTN', function() {
		var val = jq('#textVal').val();
		if (val) {
			canvas.deactivateAll().renderAll();
			opc_Default_checker = true;
			jq('#fontDecor li').removeClass('active');
			jq('#fontAlign li').removeClass('active').eq(0).addClass('active');
			var childs = jq('.content_1 div.mCSB_container li.active').find('a');
			var font_family = jq(childs[0]).text();
			opc_Text_Draw(val, font_family, 'normal');
		}
	});

	jq('body').on(opc_EventType, '#addTextBTNEffect', function() {
		var val = jq('#add-text-area').val();
		if (val) {
			//jq('#fontDecor li').removeClass('active');
			var childs = jq('.content_1 div.mCSB_container li.active').find('a');
			var font_family = jq(childs[0]).text();
			if (jq(window).width() <= 768 || opc_winWidth <= 768) {
				font_family = jq('#fontSelectbox').next().find('a.sbSelector').text();
			}
			var effectName = jq('.content_33 div.mCSB_container li.active').find('a').attr("effectName");
			if (jq(window).width() <= 768 || opc_winWidth <= 768) {
				effectName = jq('.effect_selectbox .eftImage').attr("effectName");
			}
			if (effectName == 'outline')
				opc_Text_Draw_Outline(val, font_family, effectName);
			else
				opc_Text_Draw_Effect(val, font_family, effectName);

		}
	});
	/*
	 Update Text Button Click
	 */
	jq('body').on(opc_EventType, '#updateBTN', function() {
		opc_GetObj = canvas.getActiveObject();
		if (opc_GetObj && opc_GetObj.name == 'text') {
			opc_GetObj.setText(jq('#textVal').val());
			opc_GetObj.setCoords();
			canvas.renderAll();
			canvas.calcOffset();
			saveState_modified();

		}
	});
	jq('body').on(opc_EventType, '#updateBTNEffect', function() {
		opc_GetObj = canvas.getActiveObject();
		if (opc_GetObj && opc_GetObj.name == 'effectText') {
			var val = jq('#add-text-area').val();
			if (val) {
				//jq('#fontDecor li').removeClass('active');
				var childs = jq('.content_1 div.mCSB_container li.active').find('a');
				var font_family = jq(childs[0]).text();
				if (jq(window).width() <= 768 || opc_winWidth <= 768) {
					font_family = jq('#fontSelectbox').next().find('a.sbSelector').text();
				}
				var effectName = jq('.content_33 div.mCSB_container li.active').find('a').attr("effectName");
				if (jq(window).width() <= 768 || opc_winWidth <= 768) {
					effectName = jq('.effect_selectbox .eftImage').attr("effectName");
				}
				if (effectName == 'outline')
					opc_Text_Draw_Outline_Update('textUpdate');
				else
					opc_updateEffectText('textUpdate');
			}
		}
	});
	/*
	 Font Change code
	 */

	jq('body').on(opc_EventType, '.content_1 div.mCSB_container li', function() {
		jq('.content_1 div.mCSB_container li').removeClass('active');
		jq(this).addClass('active');
		opc_GetObj = canvas.getActiveObject();
		if (opc_GetObj && opc_GetObj.name == 'text') {
			if (opc_use_google_Font == true) {
				var fontIndex = jq(this).attr('alt').split('_')[1];
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
						(value.varients == '400' || value.varients == '700') ? jq('#fontDecor li:eq(0)').show() : jq('#fontDecor li:eq(0)').hide();
					}
				});
			}
			opc_GetObj.setFontFamily(jq(this).find('a').text());
			opc_GetObj.setCoords();
			canvas.renderAll();
			canvas.calcOffset();
		}
		if (opc_GetObj && opc_GetObj.name == 'effectText') {
			if (opc_use_google_Font == true) {
				var fontIndex = jq(this).attr('alt').split('_')[1];
				/*
				 jq.each(WebFontConfig.google.families, function(key, value) {
				 if (key == fontIndex) {
				 value.match('italic') ? jq('#fontDecorSgLine li:eq(1)').show() : jq('#fontDecorSgLine li:eq(1)').hide();
				 value.match('700') ? jq('#fontDecorSgLine li:eq(0)').show() : jq('#fontDecorSgLine li:eq(0)').hide();
				 }
				 });*/
				jq.each(opc_WebFontConfig, function(key, value) {
					if (key == fontIndex) {
						(value.varients == 'italic') ? jq('#fontDecorSgLine li:eq(1)').show() : jq('#fontDecorSgLine li:eq(1)').hide();
						(value.varients == '400' || value.varients == '700') ? jq('#fontDecorSgLine li:eq(0)').show() : jq('#fontDecorSgLine li:eq(0)').hide();
					}
				});
			}
			opc_GetObj.set({
				fontFamily : jq(this).find('a').text(),
				selectedTextFont : jq(this).find('a').text()
			});
			if (opc_GetObj.get("effectType") == "outline") {
				opc_Text_Draw_Outline_Update('effect');
			} else
				opc_updateEffectText();
			opc_GetObj.setCoords();
			canvas.renderAll();
			canvas.calcOffset();
		}
		return false;
	});
	/**********Effect Selection************/
	jq('body').on(opc_EventType, '.content_33 div.mCSB_container li', function() {
		jq('.content_33 div.mCSB_container li').removeClass('active');
		jq(this).addClass('active');
		var effectTitle = jq(this).find('a').attr("effectName");
		if (effectTitle == 'outline') {
			jq("#editor2 div.outline-color").show()
			jq("#editor2 div.arching").hide()
			jq("#editor2 div.spacing").hide()
		} else {
			jq("#editor2 div.outline-color").hide()
			jq("#editor2 div.arching").show()
			jq("#editor2 div.spacing").show()
		}
		opc_GetObj = canvas.getActiveObject();
		if (opc_GetObj && opc_GetObj.name == 'effectText') {
			//console.log(opc_GetObj)
			if (effectTitle != opc_GetObj.get("effectType")) {
				opc_GetObj.set({
					effectType : effectTitle
				});
				canvas.renderAll()
				if (effectTitle == "outline") {
					opc_Text_Draw_Outline_Update('effect')
				} else
					opc_updateEffectText('effectUpdate')
			}

		}

		return false;
	});
	/***********Text Effect Slider and on of event******************/
	jq('body').on('click', '.editor1, .editor2', function() {
		canvas.discardActiveObject();
		canvas.renderAll();
		if (jq(this).attr("class") == "editor1") {
			jq("#editor1").show();
			jq("#editor2").hide();
			if (jq(window).width() <= 768 || opc_winWidth <= 768) {
				jq('.fontselectBox .select_effect').hide();
				jq('.TextTab .heading.respHead').hide();
			}
		} else {
			jq("#editor1").hide();
			jq("#editor2").show();
			if (jq(window).width() <= 768 || opc_winWidth <= 768) {
				jq('.fontselectBox .select_effect').show();
				jq('.TextTab .heading.respHead').show();
			}
		}

	})
	jq("#slider1").slider({
		value : 0,
		min : -100,
		max : 100,
		orientation : "horizontal",
		range : "min",
		animate : true,
		stop : function() {

			canvas.renderAll();
		},
		slide : function(event, ui) {
			opc_GetObj = canvas.getActiveObject();
			if (opc_GetObj && opc_GetObj.name == "effectText") {
				opc_Make_Effect(ui.value)
			}
		}
	});
	jq("#slider2").slider({
		value : 0,
		min : 0,
		max : 10,
		orientation : "horizontal",
		range : "min",
		animate : true,
		stop : function() {
			canvas.renderAll();
		},
		slide : function(event, ui) {
			opc_GetObj = canvas.getActiveObject();
			if (opc_GetObj && opc_GetObj.name == "effectText") {
				opc_SpacingOnText(ui.value);
			}
		}
	});

	/*
	 Font Alignment Code.
	 */

	jq('body').on(opc_EventType, '#fontAlign li', function() {
		jq('#fontAlign li').removeClass('active');
		jq(this).addClass('active');
		opc_GetObj = canvas.getActiveObject();
		if (opc_GetObj && opc_GetObj.name == 'text') {
			opc_GetObj.setTextAlign(jq(this).attr('title').toLowerCase());
			opc_GetObj.setCoords();
			canvas.renderAll();
			canvas.calcOffset();
		}
	});

	/*
	 This code is used for managing a text Bold/Italic effect.
	 */

	jq('body').on(opc_EventType, '#fontDecor li', function() {
		opc_GetObj = canvas.getActiveObject();
		if (opc_GetObj && opc_GetObj.name == 'text') {
			jq(this).toggleClass('active');
			switch (jq(this).index()) {
				case 0 :
					jq(this).hasClass('active') ? opc_GetObj.setFontWeight('700') : opc_GetObj.setFontWeight('normal');
					break;
				case 1 :
					jq(this).hasClass('active') ? opc_GetObj.setFontStyle('italic') : opc_GetObj.setFontStyle('');
					break;
				case 2 :
					jq(this).hasClass('active') ? opc_GetObj.setTextDecoration('underline') : opc_GetObj.setTextDecoration('');
					break;
			}
			opc_GetObj.setCoords();
			canvas.renderAll();
			canvas.calcOffset();
		}

	});
	/*
	 This code is used for managing a text Bold/Italic effect in single text.
	 */
	jq('body').on(opc_EventType, '#fontDecorSgLine li', function() {
		opc_GetObj = canvas.getActiveObject();
		if (opc_GetObj && opc_GetObj.name == 'effectText') {
			jq(this).toggleClass('tempCheck');
			switch (jq(this).index()) {
				case 0 :
					jq(this).hasClass('tempCheck') ? opc_updateEffectText('FontWeight', 'bold') : opc_updateEffectText('FontWeight', 'normal');
					break;
				case 1 :
					jq(this).hasClass('tempCheck') ? opc_updateEffectText('FontStyle', 'italic') : opc_updateEffectText('FontStyle', '');
					break;
			}
			opc_GetObj.setCoords();
			canvas.renderAll();
			canvas.calcOffset();
		}
	});
	/*
	 Prize and size panel Event Code.
	 */

	jq('body').on(opc_EventType, '.custom-order .open-icon', function() {
		if (jq('.custom-order').css('left') == '-' + jq('.custom-order').outerWidth() + 'px') {
			jq('.custom-order .open-icon').css('display', 'none')
			jq('.custom-order').animate({
				left : 1
			})
		} else {
			jq('.custom-order .open-icon').removeClass('right')
			var total = parseInt(jq('.custom-order').css('left')) - parseInt(jq('.custom-order').outerWidth());
			jq('.custom-order').animate({
				left : total - 1
			}, 500)
		}
	});

	/*
	 Layer Panel Show/hide code For reponsive template.
	 */

	jq('body').on(opc_EventType, '#layerWidget .open-icon', function() {
		if (jq(window).width() < 768) {
			if (jq('#layerWidget').css('left') == '-' + jq('#layerWidget').outerWidth() + 'px') {
				jq('#layerWidget .open-icon').css('display', 'none')
				jq('#layerWidget').animate({
					left : 1
				})
			} else {
				jq('#layerWidget .open-icon').removeClass('right')
				var total = parseInt(jq('#layerWidget').css('left')) - parseInt(jq('#layerWidget').outerWidth());
				jq('#layerWidget').animate({
					left : total - 1
				}, 500)
			}
		}
	});

	/*
	 Layer manage code.
	 */
	if (opc_winWidth > 768 || jq(window).width() > 768) {
		jq('#layerWidget').addClass('ui-draggable').draggable({
			containment : "document",
			handle : '.layerHeading small',
			stop : function() {
				if (jq(window).width() < 768) {
					var this_width = jq('#layerWidget').outerWidth();
					var this_left = jq('#layerWidget').css('left');
					var window_width = jq(window).width();
					var right_position = parseInt(window_width) - parseInt(this_width)
					if (jq('#layerWidget').css('left') <= '0px') {
						jq('#layerWidget').animate({
							left : -this_width
						}, 500, function() {
							jq('#layerWidget .open-icon').css('display', 'block');
						})
					} else if (parseInt(jq('#layerWidget').css('left')) >= right_position) {
						jq('#layerWidget').animate({
							left : window_width
						}, 500, function() {
							jq('#layerWidget .open-icon').addClass('right')
						})
					} else {
						jq('#layerWidget .open-icon').removeClass('right').css('display', '');
					}
				}

			}
		}).find('ul').sortable({
			containment : "#layerWidget",
			start : function(event, ui) {
				ui.item.startPos = ui.item.index();
			},
			stop : function(event, ui) {
				setTimeout(function() {
					if (jq('.ui-sortable li').length > 0) {
						var start = parseInt(jq('.ui-sortable li').length - 1) - ui.item.startPos;
						var stop = parseInt(jq('.ui-sortable li').length - 1) - ui.item.index();
						opc_Layer_Sort(start, stop);
					}
				});
			}
		}).disableSelection();

		jq('#layerWidget .layerHeading').dblclick(function() {
			jq('#layerWidget ul').slideToggle();
		});
	}
	/************* New code date -1-Sep - 2016 for new design in mobile case*******************/
	jq(document).on(opc_EventType, '.layerWidgetPanel ,.customOrderInfo', function() {
		if (opc_winWidth <= 768 || jq(window).width() <= 768) {//
			if (jq(this).hasClass('customOrderInfo'))
				jq('.custom-order-content').toggle();
			if (jq(this).hasClass('layerWidgetPanel'))
				jq('#layerWidget ul').toggle();
		}
	})
	jq(document).on(opc_EventType, '.effect_selectbox .eftToogl', function() {
		jq('#textEffectList').toggle();
	})
	jq(document).on(opc_EventType, '#textEffectList li', function() {
		var src = jq(this).find('img').attr('src');
		var effectTitle = jq(this).find('a').attr('effectName');
		jq('.effect_selectbox .eftImage >img').attr('src', src);
		jq('.effect_selectbox .eftImage').attr('effectName', effectTitle);
		jq('#textEffectList li').removeClass('active').each(function() {
			if (jq(this).find('img').attr('src') == src)
				jq(this).addClass('active');
		});
		jq('#textEffectList').hide();

		if (effectTitle == 'outline') {
			jq("#editor2 div.outline-color").show()
			jq("#editor2 div.arching").hide()
			jq("#editor2 div.spacing").hide()
		} else {
			jq("#editor2 div.outline-color").hide()
			jq("#editor2 div.arching").show()
			jq("#editor2 div.spacing").show()
		}
		opc_GetObj = canvas.getActiveObject();
		if (opc_GetObj && opc_GetObj.name == 'effectText') {
			if (effectTitle != opc_GetObj.get("effectType")) {
				opc_GetObj.set({
					effectType : effectTitle
				});
				canvas.renderAll()
				if (effectTitle == "outline") {
					opc_Text_Draw_Outline_Update('effect')
				} else
					opc_updateEffectText('effectUpdate')
			}

		}
	})
	/*
	 Layer list click event.
	 */

	jq('body').on(opc_EventType, '#layerWidget li', function() {
		opc_Click_Layer(jq(this));
	})
	/*
	 Layer delete event.
	 */

	jq('body').on(opc_EventType, '.delete', function() {
		opc_Delete_Layer(jq(this));
	})
	/*
	 Layer up/down event.
	 */

	jq('body').on(opc_EventType, 'a.bottom, a.top', function() {
		opc_Layer_Up_Down(jq(this));
	});

	/*
	 Add To cart
	 */

	jq('body').on(opc_EventType, '.addCartBtn', function() {
		opc_Add_To_Cart();
	});

	/*
	 Social Sharing button Event code.
	 */

	jq('body').on(opc_EventType, '.socialWidget li', function() {
		var index = jq(this).index();
		canvg(document.getElementById('drawingArea'), canvas.toSVG());
		setTimeout(function() {
			opc_png_Output[opc_Current_View] = document.getElementById('drawingArea').toDataURL("image/png");
			jq.ajax({
				url : opc_ShareImg,
				type : 'POST',
				async : false,
				data : {
					imgData : opc_png_Output[opc_Current_View]
				},
				success : function(path) {
					switch (index) {
						case 0 :
							onTwitterShare(path);
							break;
						case 1 :
							onFacebookShare(opc_ToolPath, path);
							break;
						case 2 :
							onEmailShare(path);
							break;
					}
				}
			});
		}, 350);
	});

	/*
	 This function is called for managing default content.
	 */
	/*Rajeev Rahi may 10*/
	jq(document).on(opc_EventType, '.previewShow', function(event) {
		event.preventDefault()
		managePreviewPopUp();
	})
	/*This event for undo redo*/
	jq(document).on(opc_EventType, '#undo , #redo', function(e) {
		e.preventDefault();
		var tempId = jq(this).attr('id');
		if (tempId == 'undo') {
			stateIndex--;
			if (stateIndex < 0) {
				jq(this).parent('li').addClass('disabled');

			} else {
				jq(this).parent('li').siblings('li').removeClass('disabled');
			}
			opc_undoFun();
		} else {
			stateIndex++;
			//console.log(stateIndex)
			if (stateIndex > 0) {
				jq('.disabled').removeClass('disabled');
			}
			if (stateIndex >= opc_back_forward) {
				jq(this).parent('li').addClass('disabled')
			}
			opc_redoFun(jq(this));
		}
	});
});
/*This event for Download Digital Proof*/
jq(document).on(opc_EventType, '.download-button a', function(event) {
	event.preventDefault();
	opc_Add_To_Cart('yes');
});
/******This event used for snapshot *****/
jq(document).on(opc_EventType, '#TakesanpShot', function() {
	jq('#camraFrame').css('display','block');
	screenShotInt();
})
jq(document).on(opc_EventType, '#take_snap', function() {
	take_snapshot();
})

/*********This event for Preview**********/
// jq(document).on(opc_EventType,'.previewShow',function(event){
// event.preventDefault()
// previewShow();
// })

function replaceQueryString(url, param, value) {
	var re = new RegExp("([?|&])" + param + "=.*?(&|$)", "i");
	if (url.match(re))
		return url.replace(re, '$1' + param + "=" + value + '$2');
	else
		return url + '?' + param + "=" + value;
}

function order_info() {
	var right_position = parseInt(jq(window).width()) - parseInt(jq('.custom-order').outerWidth());
	var bottom_position = parseInt(jq(window).height()) - parseInt(jq('.custom-order').outerHeight());
	if (parseInt(jq('.custom-order').css('top')) >= bottom_position || parseInt(jq('.custom-order').css('top')) < 0 || parseInt(jq('.custom-order').css('left')) < 0 || parseInt(jq('.custom-order').css('left')) >= right_position) {
		var left = parseInt(jq(window).width()) / 2 - parseInt(jq('.custom-order').outerWidth()) / 2;
		var top = parseInt(jq(window).height()) / 2 - parseInt(jq('.custom-order').outerHeight()) / 2;
		jq('.custom-order').animate({
			left : left + 'px',
			top : top + 'px'
		}, 500, function() {
			jq('.custom-order').css('display', 'block').addClass('show');
			jq('.custom-order .open-icon').removeClass('right').css('display', 'none');
		})
	}
	(jq(window).width() < 768) ? jq('.custom-order-overlay').show() : '';
	return false;
}

/************ function used for resopnsive Layer management ************/
function LayerManageFun() {
	if (opc_winWidth > 768 || jq(window).width() > 768) {
		console.log('if come');
		jq('#layerWidget').addClass('ui-draggable').draggable({
			containment : "document",
			handle : '.layerHeading small',
			stop : function() {
				if (jq(window).width() < 768) {
					console.log('if come')
					var this_width = jq('#layerWidget').outerWidth();
					var this_left = jq('#layerWidget').css('left');
					var window_width = jq(window).width();
					var right_position = parseInt(window_width) - parseInt(this_width)
					if (jq('#layerWidget').css('left') <= '0px') {
						jq('#layerWidget').animate({
							left : -this_width
						}, 500, function() {
							jq('#layerWidget .open-icon').css('display', 'block');
						})
					} else if (parseInt(jq('#layerWidget').css('left')) >= right_position) {
						jq('#layerWidget').animate({
							left : window_width
						}, 500, function() {
							jq('#layerWidget .open-icon').addClass('right')
						})
					} else {
						jq('#layerWidget .open-icon').removeClass('right').css('display', '');
					}
				}

			}
		}).find('ul').sortable({
			containment : "#layerWidget",
			start : function(event, ui) {
				ui.item.startPos = ui.item.index();
			},
			stop : function(event, ui) {
				setTimeout(function() {
					if (jq('.ui-sortable li').length > 0) {
						var start = parseInt(jq('.ui-sortable li').length - 1) - ui.item.startPos;
						var stop = parseInt(jq('.ui-sortable li').length - 1) - ui.item.index();
						opc_Layer_Sort(start, stop);
					}
				});
			}
		}).disableSelection();

		jq('#layerWidget .layerHeading').dblclick(function() {
			jq('#layerWidget ul').slideToggle();
		});
	}
}
