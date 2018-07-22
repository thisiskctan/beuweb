/*
 This file is using for managing a responsive template.
 */
jq(document).ready(function() {
	jq(window).resize(function() {
		canvas.deactivateAll().renderAll();
		if (this.resizeTO)
			clearTimeout(this.resizeTO);
		this.resizeTO = setTimeout(function() {
			jq(this).trigger('resizeEnd');
		}, 500);
	});

	/*
	 Window resizing event for managing a slide and template content.
	 */

	jq(window).bind('resizeEnd', function() {
		var index = jq('#sBarTabs li.active').index();
		switch(index) {
			case 0 :
				responsive_slide('opc_Product_Slider', 'pWrapper');
				break;
			case 1 :
				responsive_slide('opc_Clipart_Slider', 'cWrapper');
				responsive_slide('opc_upload_Slider', 'uWrapper');
				break;
			default :
				responsive_slide('opc_Product_Slider', 'pWrapper');
				break;

		}

		if (jq('#prodCat').next().find('a.sbSelector').attr('nodeval')) {
			var catId = jq('#prodCat').next().find('a.sbSelector').attr('nodeval').split('_')[1];
			var subCatId = jq('#prodSubCat').next().find('a.sbSelector').attr('nodeval').split('_')[1];
			opc_Load_Product(opc_Product_Data, 'subCatChange', catId, subCatId, '', '');
		}

		if (jq('#clipartCat').next().find('a.sbSelector').attr('nodeval')) {
			var clipCatId = jq('#clipartCat').next().find('a.sbSelector').attr('nodeval').split('_')[1];
			var clipSubCatId = jq('#clipartSubcat').next().find('a.sbSelector').attr('nodeval').split('_')[1];
			opc_Load_Clipart(opc_Clipart_Data, 'subCatChange', clipCatId, clipSubCatId);
		}

		//opc_Change_Lang(jq('.flag img').attr('alt'));

	});

});

/*
 This function is used for managing responsive content.
 */
function responsive_slide(obj, id) {
	//alert(obj+"==="+id);
	setTimeout(function() {
		jq("img").unveil(500);
	},300);

	if (canvas) {
		GetObj = canvas.getActiveObject();
		if (GetObj) {
			(GetObj.name == 'text') ? jq('.TextTab .main-tabcontent').removeClass('active-font') : jq('.TextTab .main-tabcontent').addClass('active-font');
		}
	}

	//img").unveil(300);
	
	opc_before_slide = function(a, b, c) {
		var opc_obj = ''
		switch(obj) {
			case 'opc_upload_Slider' :
				opc_obj = opc_upload_Slider.getSlideCount();
				break;
			case 'opc_Product_Slider' :
				opc_obj = opc_Product_Slider.getSlideCount();
				break;
			case 'opc_Clipart_Slider' :
				opc_obj = opc_Clipart_Slider.getSlideCount();
				break;
		}
		//alert(obj);
		//alert(opc_Clipart_Slider.getSlideCount());
		jq("#" + id + " > span").text((c + 1) + "/" + opc_obj);
		if (c == 0) {
			jq("#" + id + " .bx-prev").addClass("deactive");
			jq("#" + id + " .bx-next").removeClass("deactive");
		} else if (c == (opc_obj - 1)) {
			jq("#" + id + " .bx-next").addClass("deactive");
			jq("#" + id + " .bx-prev").removeClass("deactive");
		} else {
			jq("#" + id + " .bx-next, #" + id + " .bx-prev").removeClass("deactive");
		}
	}
	if (jq(window).width() > 959) {
		if (jq('#sBarTabs li').hasClass('active')) {
			var index = jq('#sBarTabs li.active').index();
			jq('.sBarTarget').removeClass('block').eq(index).addClass('block');
		} else {
			jq('#sBarTabs li:eq(0)').addClass('active');
			jq('.sBarTarget').removeClass('block').eq(0).addClass('block');
		}
		
		jq('#sBar,.custom-order').fadeIn();
		if(opc_product_color_change==true)
					jq(".productColorWidget").fadeIn();
		if(opc_view_show==true)
		jq("#productThumb").fadeIn();
		jq('.ipod-bottom').fadeOut();

		if (canvas)
			opc_GetObj = canvas.getActiveObject();
		opc_GetObj ? jq('#layerWidget').show() : jq('#layerWidget').hide();
		opc_GetObj ? jq('#designEditor').show() : jq('#designEditor').hide();

		jq('#thumbView li.active').css('display', 'block');
		jq('.viewport , #handler').css('bottom', '');
		(jq('#designEditor').css('bottom') == '0px') ? jq('#designEditor').css('bottom', '10px') : '';
		(jq('#designEditor').css('bottom') == '-115px') ? jq('#designEditor').css('bottom', '10px') : '';

		if (jq('.upload-wrapper li').hasClass('responsLi')) {
			var totalLength = jq('.upload-wrapper li.responsLi').length - 1;
			var checker = opc_Show_Img_No - 1;
			jq('.upload-wrapper li.responsLi').each(function(key, value) {
				jq(this).addClass('upInnerLi');
				if (totalLength == key) {
					jq('.responsLi').wrapAll('<ul class="upInnerUl"></ul>');
					jq('.upInnerUl').wrap('<li></li>');
					jq('.upInnerLi').removeClass('responsLi');
				} else if (key == checker) {
					jq('.upInnerLi').wrapAll('<ul class="upInnerUl"></ul>');
					jq('.upInnerLi').removeClass('responsLi');
					checker = checker + opc_Show_Img_No;
				}
			});
		}

		switch(obj) {
			case 'opc_Product_Slider' :
				opc_Product_Slider.destroySlider();
				opc_Product_Slider.reloadSlider({
					minSlides : 1,
					maxSlides : 1,
					moveSlides : 0,
					slideWidth : 0,
					onSliderLoad : function() {
						jq('.bx-controls-direction a').addClass('trn');
						jq("#pWrapper .bx-prev").addClass("deactive");
					},
					onSlideBefore : function(a, b, c) {
						opc_before_slide(a, b, c);
					}
				});
				(opc_Product_Slider.getSlideCount() > 1) ? jq('#pWrapper .bx-controls-direction').removeClass('direction-deactive') : jq('#pWrapper .bx-controls-direction').addClass('direction-deactive');
				jq('#pWrapper > span').text('1/' + opc_Product_Slider.getSlideCount());
				break;
			case 'opc_Clipart_Slider' :
				opc_Clipart_Slider.destroySlider();
				opc_Clipart_Slider.reloadSlider({
					minSlides : 1,
					maxSlides : 1,
					moveSlides : 0,
					slideWidth : 0,
					onSliderLoad : function() {
						jq('.bx-controls-direction a').addClass('trn');
						jq("#cWrapper .bx-prev").addClass("deactive");
					},
					onSlideBefore : function(a, b, c) {
						opc_before_slide(a, b, c);
					}
				});
				(opc_Clipart_Slider.getSlideCount() > 1) ? jq('#cWrapper .bx-controls-direction').removeClass('direction-deactive') : jq('#cWrapper .bx-controls-direction').addClass('direction-deactive');
				jq('#cWrapper > span').text('1/' + opc_Clipart_Slider.getSlideCount());
				break;
			case 'opc_upload_Slider' :
				opc_upload_Slider.destroySlider();
				opc_upload_Slider.reloadSlider({
					minSlides : 1,
					maxSlides : 1,
					moveSlides : 0,
					slideWidth : 0,
					onSliderLoad : function() {
						jq('.bx-controls-direction a').addClass('trn');
						jq("#uWrapper .bx-prev").addClass("deactive");
					},
					onSlideBefore : function(a, b, c) {
						opc_before_slide(a, b, c);
					}
				});
				(opc_upload_Slider.getSlideCount() > 1) ? jq('#uWrapper .bx-controls-direction').removeClass('direction-deactive') : jq('#uWrapper .bx-controls-direction').addClass('direction-deactive');
				jq('#uWrapper > span').text('1/' + opc_upload_Slider.getSlideCount());
				break;
		}

		var totalHeight = parseInt(jq('#sBarTabs').offset().top) + parseInt(jq('#sBarTabs li').height()) + parseInt(jq('#designEditor').css('bottom')) + parseInt(jq('.sBarTarget').css('padding-top')) + parseInt(jq('.sBarTarget').css('padding-bottom'));
		jq('.sBarTarget').height(parseInt(jq('body').height()) - totalHeight);

	} else if (jq(window).width() < 960) {
		jq('.sBarTarget').height('');
		jq('.ipod-bottom').fadeIn();

		jq('.upInnerUl, .upInnerLi').unwrap();
		jq('.upload-wrapper li.upInnerLi').addClass('responsLi').removeClass('upInnerLi');

		jq('#thumbView li.active').css('display', 'block');
		(jq('#designEditor').css('bottom') == '10px') ? jq('#designEditor').css('bottom', '-115px') : '';
		(jq('#designEditor').css('bottom') == '0px') ? jq('#designEditor').css('bottom', '-115px') : '';
		jq('#designEditor').show();
		jq('.ipod-bottom').css('bottom', '0px');
		jq('.tool-click').height('36px').removeClass('change');
		jq('.tool-click').off(opc_EventType).on(opc_EventType, function(event) {
			if (jq(this).hasClass('change')) {

				jq(this).animate({
					height : '36px'
				}).removeClass('change');

				jq('.ipod-bottom').animate({
					bottom : '0px'
				});

				jq('#designEditor').animate({
					bottom : '-115px'
				});

				jq('.top-text-panel').animate({
					bottom : '39px'
				});

				jq('#productDelBtn').animate({
					bottom : '38px'
				});
				
				jq('#sBar,.custom-order').fadeIn(500);
				if(opc_product_color_change==true)
					jq(".productColorWidget").fadeIn(500);
				if(opc_view_show==true)
		        jq("#productThumb").fadeIn(500);

				jq('.viewport , #handler').animate({
					bottom : '130'
				}, 600);

			} else {

				jq(this).animate({
					height : '15px'
				}).addClass('change');

				(jq(window).width() < 768) ? jq('.ipod-bottom').animate({
					bottom : '95px'
				}) : jq('.ipod-bottom').animate({
					bottom : '115px'
				});

				jq('#designEditor').animate({
					bottom : '0'
				});

				jq('#sBar,.custom-order').fadeOut();
				if(opc_product_color_change==true)
					jq(".productColorWidget").fadeOut();
				if(opc_view_show==true)
		        jq("#productThumb").fadeOut();

				jq('.top-text-panel, #productDelBtn').animate({
					bottom : '133px'
				});

				jq('.viewport , #handler').animate({
					bottom : '300'
				}, 600);
			}
		});

		jq(".tool-click ").swipe({

			//Generic swipe handler for all directions
			swipeUp : function(event, direction, distance, duration, fingerCount, fingerData, e) {
				if (direction == 'Up' || direction == 'up' || direction == 'UP') {
					jq(this).animate({
						height : '15px'
					}).addClass('change');

					(jq(window).width() < 768) ? jq('.ipod-bottom').animate({
						bottom : '95px'
					}) : jq('.ipod-bottom').animate({
						bottom : '115px'
					});

					jq('#designEditor').animate({
						bottom : '0'
					})
					jq('#sBar,.custom-order ,#layerWidget').fadeOut();
					if(opc_product_color_change==true)
					jq(".productColorWidget").fadeout();
					if(opc_view_show==true)
		            jq("#productThumb").fadeOut();
					jq('.top-text-panel, #productDelBtn').animate({
						bottom : '133px'
					});
					jq('.viewport').animate({
						bottom : '300'
					}, 600);
				}
			},
			swipeDown : function(event, direction, distance, duration, fingerCount, fingerData, e) {
				if (direction == 'Down' || direction == 'down' || direction == 'DOWN') {
					jq('.ipod-bottom').animate({
						bottom : '0px'
					});

					jq('#designEditor').animate({
						bottom : '-115px'
					})
					jq(this).animate({
						height : '36px'
					}).removeClass('change');
					jq('.top-text-panel').animate({
						bottom : '39px'
					});
					jq('#productDelBtn').animate({
						bottom : '38px'
					});
					jq('#sBar,.custom-order ,#layerWidget').fadeIn(500);
					if(opc_product_color_change==true)
					jq(".productColorWidget").fadeIn(500);
					if(opc_view_show==true)
		            jq("#productThumb").fadeIn(500);
					jq('.viewport').animate({
						bottom : '130'
					}, 600);
				}
			},
		});

		if (jq(window).width() < 768) {
			switch(obj) {
				case 'opc_Product_Slider' :
					opc_Product_Slider.destroySlider();
					opc_Product_Slider.reloadSlider({
						minSlides : 1,
						maxSlides : 100,
						slideMargin : 10,
						slideWidth : 52,
						onSliderLoad : function() {
							jq('.bx-controls-direction a').addClass('trn');
							jq("#pWrapper .bx-prev").addClass("deactive");
						},
						onSlideBefore : function(a, b, c) {
							opc_before_slide(a, b, c);
						}
					});
					(opc_Product_Slider.getSlideCount() > 1) ? jq('#pWrapper .bx-controls-direction').removeClass('direction-deactive') : jq('#pWrapper .bx-controls-direction').addClass('direction-deactive');
					break;
				case 'opc_Clipart_Slider' :
					opc_Clipart_Slider.destroySlider();
					opc_Clipart_Slider.reloadSlider({
						minSlides : 1,
						maxSlides : 100,
						slideMargin : 10,
						slideWidth : 52,
						onSliderLoad : function() {
							jq('.bx-controls-direction a').addClass('trn');
							jq("#cWrapper .bx-prev").addClass("deactive");
						},
						onSlideBefore : function(a, b, c) {
							opc_before_slide(a, b, c);
						}
					});
					(opc_Clipart_Slider.getSlideCount() > 1) ? jq('#cWrapper .bx-controls-direction').removeClass('direction-deactive') : jq('#cWrapper .bx-controls-direction').addClass('direction-deactive');
					break;
				case 'opc_upload_Slider' :
					opc_upload_Slider.destroySlider();
					opc_upload_Slider.reloadSlider({
						minSlides : 1,
						maxSlides : 100,
						slideMargin : 10,
						slideWidth : 52,
						onSliderLoad : function() {
							jq('.bx-controls-direction a').addClass('trn');
							jq("#uWrapper .bx-prev").addClass("deactive");
						},
						onSlideBefore : function(a, b, c) {
							opc_before_slide(a, b, c);
						}
					});
					(opc_upload_Slider.getSlideCount() > 1) ? jq('#uWrapper .bx-controls-direction').removeClass('direction-deactive') : jq('#uWrapper .bx-controls-direction').addClass('direction-deactive');
					break;
			}

			jq('#thumbView li').css('display', 'none');
			// alert(jq('.custom-order').css('left'));
			// order_info();
			jq('.custom-order').hasClass('show') ? order_info() : '';
		} else {
			switch(obj) {
				case 'opc_Product_Slider' :
					opc_Product_Slider.destroySlider();
					opc_Product_Slider.reloadSlider({
						minSlides : 1,
						maxSlides : 100,
						slideMargin : 10,
						slideWidth : 148,
						onSliderLoad : function() {
							jq('.bx-controls-direction a').addClass('trn');
							jq("#pWrapper .bx-prev").addClass("deactive");
						},
						onSlideBefore : function(a, b, c) {
							opc_before_slide(a, b, c);
						}
					});
					(opc_Product_Slider.getSlideCount() > 1) ? jq('#pWrapper .bx-controls-direction').removeClass('direction-deactive') : jq('#pWrapper .bx-controls-direction').addClass('direction-deactive');
					break;
				case 'opc_Clipart_Slider' :
					opc_Clipart_Slider.destroySlider();
					opc_Clipart_Slider.reloadSlider({
						minSlides : 1,
						maxSlides : 100,
						slideMargin : 10,
						slideWidth : 148,
						onSliderLoad : function() {
							jq('.bx-controls-direction a').addClass('trn');
							jq("#cWrapper .bx-prev").addClass("deactive");
						},
						onSlideBefore : function(a, b, c) {
							opc_before_slide(a, b, c);
						}
					});
					(opc_Clipart_Slider.getSlideCount() > 1) ? jq('#cWrapper .bx-controls-direction').removeClass('direction-deactive') : jq('#cWrapper .bx-controls-direction').addClass('direction-deactive');
					break;
				case 'opc_upload_Slider' :
					opc_upload_Slider.destroySlider();
					opc_upload_Slider.reloadSlider({
						minSlides : 1,
						maxSlides : 100,
						slideMargin : 10,
						slideWidth : 148,
						onSliderLoad : function() {
							jq('.bx-controls-direction a').addClass('trn');
							jq("#uWrapper .bx-prev").addClass("deactive");
						},
						onSlideBefore : function(a, b, c) {
							opc_before_slide(a, b, c);
						}
					});
					(opc_upload_Slider.getSlideCount() > 1) ? jq('#uWrapper .bx-controls-direction').removeClass('direction-deactive') : jq('#uWrapper .bx-controls-direction').addClass('direction-deactive');
					break;
			}

		}

	}

}

/*
 This function is used for managing view direction slide effect code.
 */

function direction() {
	if (jq(window).width() > 767) {
		jq('#productThumb li').each(function() {
			jq(this).not('.active').slideToggle();
		});
	} else if (jq(window).width() < 768) {
		jq('#thumbView li').slideToggle();
	}
	jq("img").unveil(300);
}
