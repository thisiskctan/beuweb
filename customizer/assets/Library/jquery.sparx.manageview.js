opc_Change_View = function(overlayImage, id) {
		canvas.deactivateAll().renderAll();
		opc_getUserImages();
		canvg(document.getElementById('drawingArea'), canvas.toSVG());
		updateDesignPreview();
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
						if(jq(window).width()<=768)
							jq('#layerWidget').show();
						if (jq(window).width() > 959) {
							opc_GetObj ? jq('#designEditor').hide() : jq('#designEditor').hide();
						}
						if (opc_GetObj) {
							jq("#slider").slider('value', (opc_GetObj.scaleX) * 100);
						}
						canvas.forEachObject(function(slantObj) {
							//console.log(slantObj)
							if (slantObj.name == "effectText") {
								if (slantObj.get("effectType") == "slanted") {
									var objects = slantObj.getObjects();
									for (var i = 0; i < objects.length; i++) {
										objects[i].set({
											transformMatrix : objects[i].customTrans
										});
										canvas.renderAll();
										//console.log(objects[i])
									}
								}
							}
						})
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