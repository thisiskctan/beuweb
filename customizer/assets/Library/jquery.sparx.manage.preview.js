opc_Update_Preview = function() {
	canvg(document.getElementById('drawingArea'), canvas.toSVG());
	setTimeout(function(){
		opc_png_Output[opc_Current_View] = document.getElementById('drawingArea').toDataURL("image/png");
	//console.log(opc_png_Output)
	var previewArr=new Array();
	//console.log(opc_View)
	for(var i=0;i<opc_png_Output.length;i++)
	{
		var obj={href:opc_png_Output[i],title:opc_View[i].name}
		previewArr.push(obj)
	}
	//console.log(previewArr)
	jq.fancybox(previewArr, {
		    padding: 0,
		    
	});
	},300)
	
	// previewArr[opc_Current_View] = document.getElementById('drawingArea').toDataURL({
		// format : 'png',
		// quality : 1,
		// x : parseInt(opc_View[opc_Current_View].x) * opc_RatioX,
		// y : parseInt(opc_View[opc_Current_View].y) * opc_RatioY,
		// width : parseInt(opc_View[opc_Current_View].drawWidth) * opc_RatioX,
		// height : parseInt(opc_View[opc_Current_View].drawHeight) * opc_RatioY
	// });

}
managePreviewPopUp = function() {
	opc_Update_Preview();

}