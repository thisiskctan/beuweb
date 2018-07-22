jq(document).ready(function() {

	/*
	 Canvas creation code.
	 */

	canvas = new sparx.Canvas('canvas', {
		controlsAboveOverlay : true,
		selection : true
	});

	opc_DefaultLoad = function() {

		//   Show First Tabbing content.
		jq('.sBarTarget').first().addClass('block ');

		opc_Drag();

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			sparx.Object.prototype.cornerSize = 35;
		} else {
			sparx.Object.prototype.cornerSize = 20;
		}

		if (jq(window).width() < 768) {
			jq('.sBarTarget').removeClass('block');
			jq('#sBarTabs li').removeClass('active');
			var top = parseInt(jq(window).height()) / 2 - parseInt(jq('.custom-order').outerHeight()) / 2;
			jq('.custom-order').css('top', top + 'px');
			jq('#layerWidget').css('left', '-175px');
			jq('.open-icon').css('display', 'block');
		}

		switch(opc_Default_Tab_selection) {
			case 'Product' :
				jq('#sBarTabs li:eq(0)').trigger('click')
				break;
			case 'Clipart' :
				jq('#sBarTabs li:eq(1)').trigger('click')
				break;
			case 'Text'	:
				jq('#sBarTabs li:eq(2)').trigger('click')
				break;
		}

		opc_flag_show_hide ? jq('#language').css('display', 'block') : jq('#language').css('display', 'none');
		// This code is used for change language panel show and hide.

		setTimeout(function() {
			opc_Change_Lang(opc_location_hash);
		}, 300);

		/*
		 Browser close Event.
		 */

		if (!opc_isIE) {
			window.onbeforeunload = function(e) {
				return opc_redirect_check ? "Do you really want to close?" : null;
			}
		}
	}
	opc_Canvas_Load = function(overlayImage, opc_Current_View) {
		opc_OverlayImg = overlayImage;
		jq('.handler-area').css({
			width : jq('.viewport img').width() + "px",
			height : jq('.viewport img').height() + "px"
		});

		canvas.setWidth(jq('.viewport img').width());
		canvas.setHeight(jq('.viewport img').height());
		canvas.setBackgroundImage(overlayImage, canvas.renderAll.bind(canvas));

		jq('#drawingArea').width(jq('.viewport img').width());
		jq('#drawingArea').height(jq('.viewport img').height());

		opc_RatioX = parseInt(jq('.viewport img').width()) / parseInt(opc_View[opc_Current_View].width);
		opc_RatioY = parseInt(jq('.viewport img').height()) / parseInt(opc_View[opc_Current_View].height);
		//console.log("opc_RatioX" + opc_RatioX +  "opc_RatioY" + opc_RatioY);
		opc_clip_rect();

		canvas.renderAll();
		opc_Update_Layer();
	}
	/*
	 Update Rotate Box Value
	 */

	opc_Update_Rotataeval = function() {
		opc_GetObj = canvas.getActiveObject() || canvas.getActiveGroup();
		if (opc_GetObj) {
			var angleVal = (Math.round(opc_GetObj.getAngle()) < (Math.ceil(Math.round(opc_GetObj.getAngle()) / 360) * 360)) ? 360 - ((Math.ceil(Math.round(opc_GetObj.getAngle()) / 360) * 360) - Math.round(opc_GetObj.getAngle())) : Math.round(opc_GetObj.getAngle());
			jq('input[name="rotateBox"]').val(angleVal);
		}
	}
	/*
	 Manage Object Rotation value.
	 */

	canvas.on('object:rotating', opc_Update_Rotataeval);

	canvas.on('selection:cleared', function() {
		jq("#slider").slider('value', 750);
		jq('input[name="rotateBox"]').val(0);
		jq('.clipartRotator li:lt(2)').removeClass('active');
		jq('#fontDecor li').removeClass('active');
		jq('#textVal').val('');
		jq('.TextTab .main-tabcontent').addClass('active-font');
		opc_clip_rect();
	});

	canvas.on('mouse:up', function() {
		opc_GetObj = canvas.getActiveObject() || canvas.getActiveGroup();
		opc_GetObj ? jq('#layerWidget').show() : jq('#layerWidget').hide();
		if (jq(window).width() > 959) {
			opc_GetObj ? jq('#designEditor').show() : jq('#designEditor').hide();
		}
		if (opc_GetObj) {
			jq("#slider").slider('value', (opc_GetObj.scaleX) * 100);
			opc_GetObj.flipX ? jq('.clipartRotator li:eq(0)').addClass('active') : jq('.clipartRotator li:eq(0)').removeClass('active');
			opc_GetObj.flipY ? jq('.clipartRotator li:eq(1)').addClass('active') : jq('.clipartRotator li:eq(1)').removeClass('active');
		}
		if (!canvas.getActiveGroup())
			canvg(document.getElementById('drawingArea'), canvas.toSVG());

		opc_Update_Rotataeval();
	});

	canvas.on('mouse:move', function() {
		opc_GetObj = canvas.getActiveObject() || canvas.getActiveGroup();
		opc_GetObj ? jq('#layerWidget').show() : jq('#layerWidget').hide();
		if (jq(window).width() > 959) {
			opc_GetObj ? jq('#designEditor').show() : jq('#designEditor').hide();
		}
		if (opc_GetObj) {
			jq("#slider").slider('value', (opc_GetObj.scaleX) * 100);
		}
	});

	canvas.observe('object:selected', function(obj) {

		if (!canvas.getActiveGroup()) {
			opc_GetObj = canvas.getActiveObject();
			switch(opc_GetObj.name) {
				case 'text' :
					(jq(window).width() > 959 && opc_Default_checker) ? jq('#sBarTabs li:eq(2)').trigger('click') : '';
					jq('.mCSB_container li').removeClass('active').each(function() {
						(jq(this).find('a').text() == opc_GetObj.getFontFamily()) ? jq(this).addClass('active') : '';
					});

					jq('#fontAlign li').removeClass('active').each(function() {
						jq(this).hasClass(opc_GetObj.getTextAlign()) ? jq(this).addClass('active') : '';
					});

					jq('#textVal').val(opc_GetObj.getText());

					jq.each(WebFontConfig.google.families, function(key, value) {
						if (value.split(':')[0].replace(/\+/g, ' ') == opc_GetObj.getFontFamily()) {
							value.match('italic') ? jq('#fontDecor li:eq(1)').show() : jq('#fontDecor li:eq(1)').hide();
							value.match('700') ? jq('#fontDecor li:eq(0)').show() : jq('#fontDecor li:eq(0)').hide();
						}
					});
					jq('.TextTab .main-tabcontent').removeClass('active-font');

					(opc_GetObj.getTextDecoration() == 'underline') ? jq('#fontDecor li:eq(2)').addClass('active') : jq('#fontDecor li:eq(2)').removeClass('active');
					(opc_GetObj.getFontStyle() == 'italic') ? jq('#fontDecor li:eq(1)').addClass('active') : jq('#fontDecor li:eq(1)').removeClass('active');
					(opc_GetObj.getFontWeight() == '700') ? jq('#fontDecor li:eq(0)').addClass('active') : jq('#fontDecor li:eq(0)').removeClass('active');

					break;
				case 'clipart' :
					(jq(window).width() > 959 && opc_Default_checker) ? ((!jq('#sBarTabs li:eq(1)').hasClass('active')) ? jq('#sBarTabs li:eq(1)').trigger('click') : '') : '';
					break;
				case 'upload' :
					(jq(window).width() > 959 && opc_Default_checker) ? ((!jq('#sBarTabs li:eq(1)').hasClass('active')) ? jq('#sBarTabs li:eq(1)').trigger('click') : '') : '';
					break;
			}
			var objIndex = parseInt(canvas.getObjects().indexOf(opc_GetObj));
			jq('#layerWidget li').removeClass('active ui-draggable')
			jq('#layerWidget li[rel="' + objIndex + '"]').addClass('active ui-draggable');
			jq("#slider").slider('value', (opc_GetObj.scaleX) * 100);
			canvg(document.getElementById('drawingArea'), canvas.toSVG());
		} else {
			jq("#slider").slider('value', (canvas.getActiveGroup().scaleX) * 100);
		}
		opc_clip_rect();
		opc_Update_Rotataeval();
		canvas.renderAll();
		canvas.calcOffset();
	});

	opc_Change_View = function(overlayImage, id) {
		canvas.deactivateAll().renderAll();
		opc_getUserImages();
		canvg(document.getElementById('drawingArea'), canvas.toSVG());

		setTimeout(function() {

			opc_Output_SVG[opc_Current_View] = canvas.toSVG({
				viewBox : {
					x : parseInt(opc_View[opc_Current_View].x) * opc_RatioX,
					y : parseInt(opc_View[opc_Current_View].y) * opc_RatioY,
					width : parseInt(opc_View[opc_Current_View].drawWidth) * opc_RatioX,
					height : parseInt(opc_View[opc_Current_View].drawHeight) * opc_RatioY
				},
				customType : 'checker'
			}, function(svg) {
				return svg.replace('font-weight="700"', 'font-weight="bold"');
			});

			opc_png_Output[opc_Current_View] = document.getElementById('drawingArea').toDataURL("image/png");
			opc_Canvas_arr[opc_Current_View] = JSON.parse(JSON.stringify(canvas));
			canvas.clear();
			opc_Current_View = id;
			var itemIndx = opc_unrenderedViews.indexOf(parseInt(opc_Current_View));
			if (itemIndx > -1)
				opc_unrenderedViews.splice(itemIndx, 1);
			if (opc_Canvas_arr[opc_Current_View] != '') {
				canvas.loadFromJSON(opc_Canvas_arr[opc_Current_View], function() {
					canvas.renderAll();
					canvas.calcOffset();
					opc_Canvas_Load(overlayImage, opc_Current_View);
					opc_Update_Layer();

					setTimeout(function() {
						opc_GetObj = canvas.getActiveObject();
						opc_GetObj ? jq('#layerWidget').hide() : jq('#layerWidget').hide();
						if (jq(window).width() > 959) {
							opc_GetObj ? jq('#designEditor').hide() : jq('#designEditor').hide();
						}
						if (opc_GetObj) {
							jq("#slider").slider('value', (opc_GetObj.scaleX) * 100);
						}
					}, 300);

				});
			} else {
				opc_Canvas_Load(overlayImage, opc_Current_View);
			}

			/*
			 Other view price calculate.
			 */
			opc_GetPrice = 0;
			jq.each(opc_Canvas_arr, function(key, value) {
				if (opc_Current_View != key && opc_Canvas_arr[key].objects) {
					jq.each(value.objects, function(key, value) {
						opc_GetPrice = opc_GetPrice + value.objPrice;
					});
				}
			});

			if (opc_Add_to_Cart_Check == false)
				setTimeout(function() {
					opc_Hide_Loader()
				}, 600);

		}, 300);

	}
	/*
	 Layer Management function
	 */

	opc_Update_Layer = function() {
		this.canvasObjects = canvas.getObjects()
		var layerLi = '';
		var i = '';
		if (this.canvasObjects.length > 0) {
			canvas.forEachObject(function(object) {
				i = parseInt(canvas.getObjects().indexOf(object));
				if (i >= 0) {
					switch(object.name) {
						case 'text' :
							var title = object.getText();
							if (title.length > 6) {
								title = title.substr(0, 6);
								title += '--';
							}
							elementTobeAdded = title;
							layerLi += '<li id="layerID' + i + '" rel="' + i + '" ><span><img width="26" height="25" alt="" src="assets/Skin/images/icon/text.png"></span><small>' + elementTobeAdded + '</small><strong><a class="top" href="javascript:void(0);"></a><a class="bottom" href="javascript:void(0);"></a></strong><a class="delete" href="javascript:void(0);"> </a></li>';
							break;
						case 'upload' :
							var src = object.getSrc().replace('large', 'thumb');
							layerLi += '<li id="layerID' + i + '" rel="' + i + '"><span><img width="26" height="25" alt="" src="' + src + '"></span><small class="trn">Upload</small><strong><a class="top" href="javascript:void(0);"></a><a class="bottom" href="javascript:void(0);"></a></strong><a class="delete" href="javascript:void(0);"> </a></li>';
							break;
						case 'clipart' :
							var src = object.get('svgTOpng');
							layerLi += '<li id="layerID' + i + '" rel="' + i + '"><span><img width="26" height="25" alt="" src="' + src + '"></span><small class="trn">Clipart</small><strong><a class="top" href="javascript:void(0);"></a><a class="bottom" href="javascript:void(0);"></a></strong><a class="delete" href="javascript:void(0);"> </a></li>';
							break;
					}
				}
			});
			jq('.ui-sortable').html(layerLi);
			opc_GetObj = canvas.getActiveObject();
			if (opc_GetObj) {
				var objIndex = parseInt(canvas.getObjects().indexOf(opc_GetObj));
				jq('#layerWidget li').removeClass('active ui-draggable')
				jq('#layerWidget li[rel="' + objIndex + '"]').addClass('active ui-draggable');
				jq('#layerWidget').show();
				if (jq(window).width() > 959) {
					jq('#designEditor').show();
				}
			}
		} else {
			jq('#layerWidget').hide();
			if (jq(window).width() > 959) {
				jq('#designEditor').hide();
			}
			jq('.ui-sortable').html('');

		}
		setTimeout(function() {
			loaderHide();
			if (opc_Add_to_Cart_Check == false)
				opc_Hide_Loader();
		}, 600);

		opc_Cal_Price(opc_Product_Price, opc_Size_Price);

		canvas.setZoom(opc_RatioX);
		canvas.renderAll();
		canvas.calcOffset();

		canvg(document.getElementById('drawingArea'), canvas.toSVG());
		opc_png_Output[opc_Current_View] = document.getElementById('drawingArea').toDataURL("image/png");
	}
	opc_Click_Layer = function(event) {
		canvas.deactivateAll().renderAll();
		var objectIndex = parseInt(event.attr('rel'));
		jq('#layerWidget').find('li').removeClass('active ui-draggable')
		event.addClass('active ui-draggable');
		var canvasObjects = canvas.getObjects();
		if (canvasObjects[objectIndex]) {
			canvas.forEachObject(function(obj) {
				obj.set('active', false);
			});
			canvasObjects[objectIndex].set('active', true);
			canvas.setActiveObject(canvasObjects[objectIndex]);
			canvas.renderAll();
			canvas.calcOffset();
		}
	}
	opc_Delete_Layer = function(event) {
		canvas.deactivateAll().renderAll();
		event.parent().remove();
		var rel = parseInt(event.parent().attr('rel'));
		var canvasObjects = canvas.getObjects();
		if (canvasObjects[rel]) {
			canvas.remove(canvasObjects[rel]);
			canvas.renderAll();
			canvas.calcOffset();
			opc_Update_Layer();
			jq("#slider").slider('value', 750);
		}
	}
	opc_Layer_Up_Down = function(event) {
		var Index = parseInt(event.parent().parent().attr('rel'));
		var canvasObjects = canvas.getObjects();
		if (canvasObjects[Index]) {
			var key = parseInt(canvasObjects.length - 1) - Index;
			switch(event.attr('class')) {
				case 'top' :
					if (Index != (canvasObjects.length - 1)) {
						var src1 = jq('.ui-sortable li[rel=' + Index + ']').html();
						//.find("img").attr("src");
						var top = Index + 1;
						var src2 = jq('.ui-sortable li[rel=' + top + ']').html();
						//.find("img").attr("src");
						opc_Layer_Sort(Index, top);
						jq('.ui-sortable li[rel=' + Index + ']').html(src2);
						//.find("img").attr("src", src2);
						jq('.ui-sortable li[rel=' + top + ']').html(src1);
						//.find("img").attr("src", src1);
					}
					break;
				case 'bottom' :
					if (Index > 0) {
						var src1 = jq('.ui-sortable li[rel=' + Index + ']').html();
						//.find("img").attr("src");
						var bottom = Index - 1;
						var src2 = jq('.ui-sortable li[rel=' + bottom + ']').html();
						//.find("img").attr("src");
						opc_Layer_Sort(Index, bottom);
						jq('.ui-sortable li[rel=' + Index + ']').html(src2);
						//.find("img").attr("src", src2);
						jq('.ui-sortable li[rel=' + bottom + ']').html(src1);
						//.find("img").attr("src", src1);
					}
					break;
			}
		}
	}
	opc_Layer_Sort = function(start, stop) {
		canvas.deactivateAll().renderAll();
		var canvasObjects = canvas.getObjects();
		canvas.moveTo(canvasObjects[start], stop);
		setTimeout(function() {
			canvasObjects = canvas.getObjects();
			canvas.setActiveObject(canvasObjects[stop]);
			canvasObjects[stop].setCoords();
			canvas.renderAll();
			canvas.calcOffset();
			opc_GetObj = canvas.getActiveObject();
			if (opc_GetObj) {
				jq("#slider").slider('value', (opc_GetObj.scaleX) * 100);
			}

			var active = parseInt(jq('.ui-sortable li').length - 1) - stop;

			jq('.ui-sortable li').each(function(key, value) {
				var id_val = parseInt(jq('.ui-sortable li').length - 1) - parseInt(key);
				jq(this).attr({
					id : 'layerID' + id_val,
					rel : id_val
				})
			}).removeClass('active').eq(active).addClass('active');
		});

	}
	/*
	 Image Draw function
	 */

	opc_Svg_Draw = function(imgSRC, name, clipPrice, colorAble, loadType) {
		var left = (loadType == 'normal') ? (parseInt(opc_View[opc_Current_View].x) + (parseInt(opc_View[opc_Current_View].drawWidth) / 2)) : (parseInt(opc_View[opc_Current_View].x) + parseInt(this[0]));
		var top = (loadType == 'normal') ? (parseInt(opc_View[opc_Current_View].y) + (parseInt(opc_View[opc_Current_View].drawHeight) / 2)) : (parseInt(opc_View[opc_Current_View].y) + parseInt(this[1]));
		var scaleVal = this[2] ? this[2] : 0.5;
		var rotateVal = this[3] ? this[3] : 0;
		sparx.loadSVGFromURL(imgSRC, function(objects, options) {
			opc_Show_Loader();
			var obj = sparx.util.groupSVGElements(objects, options);
			canvas.add(obj.rotate(rotateVal).scale(scaleVal).set({
				originX : "center",
				originY : "center",
				left : left,
				top : top,
				name : name,
				svgTOpng : imgSRC.replace(/\png/g, 'svg'),
				objPrice : parseFloat(clipPrice),
				objColorAble : colorAble
			}));
			canvas.renderAll();
			canvas.remove(obj);
			obj.scale(scaleVal).cloneAsImage(function(clone) {
				clone.set({
					left : obj.left,
					top : obj.top,
					scaleX : obj.scaleX,
					scaleY : obj.scaleY
				});
			});
			canvas.add(obj);
			//if (loadType == 'normal') {
			canvas.setActiveObject(obj);
			obj.setCoords();
			//}
			canvas.renderAll();
			canvas.calcOffset();
			opc_Update_Layer();
		});
	}
	opc_Img_Draw = function(imgSRC, name, loadType) {
		console.log("opc_Img_Draw");
		var left = (loadType == 'normal') ? (parseInt(opc_View[opc_Current_View].x) + (parseInt(opc_View[opc_Current_View].drawWidth) / 2)) : (parseInt(opc_View[opc_Current_View].x) + parseInt(this[0]));
		var top = (loadType == 'normal') ? (parseInt(opc_View[opc_Current_View].y) + (parseInt(opc_View[opc_Current_View].drawHeight) / 2)) : (parseInt(opc_View[opc_Current_View].y) + parseInt(this[1]));
		sparx.Image.fromURL(imgSRC, function(obj) {
			opc_Show_Loader();
			canvas.add(obj.rotate(0).scale(0.3).set({
				originX : "center",
				originY : "center",
				left : left,
				top : top,
				name : name,
				objPrice : opc_upload_img_price
			}));
			//if (loadType == 'normal') {
			canvas.setActiveObject(obj);
			obj.setCoords();
			//}
			canvas.renderAll();
			canvas.calcOffset();
			opc_Update_Layer();
		})
	}
	/*
	 Add Text function
	 */

	opc_Text_Draw = function(val, fontFamily, loadType) {
		var scaleVal = this[2] ? this[2] : 1;
		var rotateVal = this[3] ? this[3] : 0;
		var boldVal = this[4] ? 700 : 'normal';
		opc_Show_Loader();
		var left = (loadType == 'normal') ? (parseInt(opc_View[opc_Current_View].x) + (parseInt(opc_View[opc_Current_View].drawWidth) / 2)) : (parseInt(opc_View[opc_Current_View].x) + parseInt(this[0]));
		var top = (loadType == 'normal') ? (parseInt(opc_View[opc_Current_View].y) + (parseInt(opc_View[opc_Current_View].drawHeight) / 2)) : (parseInt(opc_View[opc_Current_View].y) + parseInt(this[1]));
		var text = new sparx.Text(val, {
			originX : "center",
			originY : "center",
			left : left,
			top : top,
			fontFamily : fontFamily,
			fill : "#000",
			fontSize : 30,
			textAlign : "left",
			name : "text",
			objPrice : opc_text_price,
		});
		text.scale(scaleVal);
		text.rotate(rotateVal);
		text.setFontWeight(boldVal);
		canvas.add(text);
		canvas.setActiveObject(text);
		text.setCoords();
		if (loadType == 'default') {
			jq('.TextTab .main-tabcontent').addClass('active-font');
			jq('#textVal').val('');
		}
		canvas.renderAll();
		canvas.calcOffset();
		opc_Update_Layer();
	}
	var opc_default_fun_check = true;
	opc_Default_Design_fun = function(json) {
		if (opc_default_fun_check) {
			jq.each(json, function(key, value) {
				switch(value.Type) {
					case 'image' :
						opc_Img_Draw.call([value.PostionX, value.PostionY, value.scale], value.Image_Path, 'upload', 'default');
						break;
					case 'text' :
						opc_Text_Draw.call([value.PostionX, value.PostionY, value.scale, value.rotate, value.bold], value.Text_Name, value.font_family, 'default');
						break;
					case 'svg' :
						opc_Svg_Draw.call([value.PostionX, value.PostionY, value.scale, value.rotate], value.SVG_Path, 'clipart', value.clipPrice, value.colorAble, 'default');
						break;
				}
			});
			opc_default_fun_check = false;
			opc_DefaultLoad()
			setTimeout(function() {
				opc_Default_checker = true;
			}, 500);
		}
	}
	/*
	 Draggable code for Prize and size panel.
	 */
	opc_Drag = function() {
		jq('.custom-order').addClass('ui-draggable').css('position', 'absolute').draggable({
			containment : "document",
			handle : '.layerHeading small',
			cancel : "div.open-icon, #qtyVal",
			//HIDE AND SHOW IN IPAD
			stop : function() {
				var this_width = jq('.custom-order').outerWidth();
				var this_left = jq('.custom-order').css('left');
				var window_width = jq(window).width();
				var right_position = parseInt(window_width) - parseInt(this_width)
				if (jq('.custom-order').css('left') <= '0px') {
					jq('.custom-order').animate({
						left : -this_width
					}, 500, function() {
						jq('.custom-order .open-icon').css('display', 'block');
					})
				} else if (parseInt(jq('.custom-order').css('left')) >= right_position) {
					jq('.custom-order').animate({
						left : window_width
					}, 500, function() {
						jq('.custom-order .open-icon').addClass('right')
					})
				} else {
					jq('.custom-order .open-icon').removeClass('right').css('display', '');
				}
			}
		});
	}
	/*
	 Price function
	 */

	opc_Cal_Price = function(rowPrice, sizePrice) {
		if (rowPrice)
			this.rowPrice = parseInt(rowPrice);
		if (sizePrice)
			this.sizePrice = parseInt(sizePrice);

		opc_Current_View_Price = 0
		canvas.forEachObject(function(obj) {
			opc_Current_View_Price = opc_Current_View_Price + parseInt(obj.get('objPrice'));
		});

		var temp_qty = (jq('input[name="qty"]').val() == '') ? 0 : parseInt(jq('input[name="qty"]').val());

		setTimeout(function() {
			var totalPrice = (this.rowPrice + this.sizePrice + opc_Current_View_Price + opc_GetPrice) * temp_qty;
			jq('.productPrice span').html('$' + totalPrice + ' <small class="trn">Only</small>');
		}, 500);

	}
	/*
	 Add to Cart function
	 */
	opc_Add_To_Cart = function() {
		if (jq('input[name="qty"]').val()) {
			canvas.deactivateAll().renderAll();
			opc_redirect_check = false;
			opc_Show_Loader();
			opc_Add_to_Cart_Check = true;
			var timer = 5000 * opc_unrenderedViews.length;
			opc_getUserImages();
			var c = parseInt(timer / 1000);
			if (opc_unrenderedViews.length > 0) {
				jq('.inneroverlay span').css('display', 'block');
				var myVar = setInterval(function() {
					myTimer()
				}, timer / c);

				function myTimer() {
					jq('.loaderImage').next().next().text('Sending to Add to Cart page in ' + c-- + ' seconds');
					if (c == 0)
						clearInterval(myVar);
				}

				canvg(document.getElementById('drawingArea'), canvas.toSVG());
				opc_png_Output[opc_Current_View] = document.getElementById('drawingArea').toDataURL("image/png");
				setTimeout(renderViewsOnSaveData, 1000);
				
			} else {
				timer = 600;
			}
			setTimeout(function() {
				canvg(document.getElementById('drawingArea'), canvas.toSVG());
				setTimeout(function() {
					opc_png_Output[opc_Current_View] = document.getElementById('drawingArea').toDataURL("image/png");
					opc_Output_SVG[opc_Current_View] = canvas.toSVG({
						viewBox : {
							x : parseInt(opc_View[opc_Current_View].x) * opc_RatioX,
							y : parseInt(opc_View[opc_Current_View].y) * opc_RatioY,
							width : parseInt(opc_View[opc_Current_View].drawWidth)* opc_RatioX,
							height : parseInt(opc_View[opc_Current_View].drawHeight) * opc_RatioY
						},
						customType : 'checker'
					}, function(svg) {
						return svg.replace('font-weight="700"', 'font-weight="bold"');
					});
					opc_Canvas_arr[opc_Current_View] = JSON.parse(JSON.stringify(canvas));
					jq.ajax({
						url : opc_Cart_URL,
						type : 'POST',
						data : {
							qty : jq('input[name="qty"]').val(),
							size : jq('#sizeList').next().find('.sbSelector').text(),
							price : jq('.productPrice span').text(),
							color : jq('#pColor li.active').attr('title'),
							lang : jq('.flag img').attr('alt'),
							editModeArr : JSON.stringify(opc_Canvas_arr),
							productArr : opc_View,
							outputArr : opc_Output_SVG,
							pngOutputArr : opc_png_Output,
							userImagesArr : opc_UserImages,
							viewsName : opc_view_name,
							toolUrl : opc_ToolPath
						},
						success : function(data) {
							location.href = opc_Cart_URL;
							opc_Hide_Loader();
							opc_Add_to_Cart_Check = false;
						}
					});
				}, 300);
			}, timer);
		}
	}
	/*
	 Loader Show and Hide function.
	 */
	loaderShow = function() {
		jq('.overlay').css('display', 'block');
	}
	loaderHide = function() {
		jq('.overlay').css('display', 'none');
	}
	opc_Show_Loader = function() {
		jq('.inneroverlay').css('display', 'block');
	}
	opc_Hide_Loader = function() {
		jq('.inneroverlay').css('display', 'none');
	}
	/*
	 Draw Rect Clip
	 */

	opc_clip_rect = function() {
		canvas.clipTo = function(ctx) {
			ctx.rect(parseInt(opc_View[opc_Current_View].x) * opc_RatioX, parseInt(opc_View[opc_Current_View].y) * opc_RatioX, parseInt(opc_View[opc_Current_View].drawWidth) * opc_RatioX, parseInt(opc_View[opc_Current_View].drawHeight) * opc_RatioX);
			if (canvas.getActiveObject() || canvas.getActiveGroup()) {
				ctx.strokeStyle = opc_Stroke_Style;
				ctx.save();
				ctx.shadowBlur = opc_Shadow_Blur;
				ctx.shadowColor = opc_Shadow_Color;
				ctx.lineWidth = opc_Line_Width;
				if ( typeof ctx.setLineDash !== 'undefined' && opc_Rect_Dotted_Style)
					ctx.setLineDash([6]);
				ctx.stroke();
				opc_GetObj = canvas.getActiveObject() || canvas.getActiveGroup();
				if (opc_GetObj)
					ctx.restore();

			}
		}
	}
	/*
	 Change Lanuage.
	 */

	opc_Change_Lang = function(l) {
		language = l;
		jQuery.ajax({
			url : opc_get_lang,
			type : 'post',
			data : 'lang=' + l,
			success : function(responseText) {
				dict = JSON.parse(responseText);
				var translator = jQuery('body').translate({
					lang : l,
					t : dict
				});
			}
		});
	}
	opc_getUserImages = function() {
		var tempURL = '';
		canvas.forEachObject(function(obj) {

			if (obj.name == 'upload') {
				tempURL = obj.getSrc();
				if (opc_UserImages.indexOf(tempURL) == -1) {
					opc_UserImages.push(tempURL);
				}

			}
		});
	}
	renderViewsOnSaveData = function() {

		if (opc_unrenderedViews.length > 0) {

			var change = opc_unrenderedViews[0];
			jq('.viewport img').attr('src', opc_View[change].path.replace('thumb', 'large'));
			opc_Change_View(opc_View[change].path.replace('thumb', 'large'), change);
			setTimeout(renderViewsOnSaveData, 1000);
		}

	}
	createUnrenderedViewsData = function() {
		opc_unrenderedViews = new Array();
		var totalViews = parseInt(jq('#thumbView li').length);
		for (var i = 1; i < totalViews; i++) {
			opc_unrenderedViews.push(i);
		}
	}
});
