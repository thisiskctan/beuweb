var fontScript = '<link href="https://fonts.googleapis.com/css?family=Black+Ops+One|Carter+One|Federo|Londrina+Outline|Monoton|Permanent+Marker|Roboto+Condensed|Sedgwick+Ave+Display|Tangerine" rel="stylesheet">';

var APIKEY = 'AIzaSyAsjJ9ucDV0d1r2IFDNKFxXOK1_bkiuq2M';

var extraction = fontScript.split('?family=')[1].split('" rel="')[0].replace(/\+/g, ' ').split('|');

var fontList = extraction.map(function(x) {
	var name
	var varients

	if (x.indexOf(':') > -1) {
		name = x.split(':')[0];
		varients = x.split(':')[1].split(',')
	} else {
		name = x;
		varients = ['400'];
	}

	return {
		name : name,
		varients : varients
	}
});

jQuery.ajax({
	url : 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAsjJ9ucDV0d1r2IFDNKFxXOK1_bkiuq2M',
	type : 'GET',
	success : function(resp) {

		var fontArray = []

		var fontName = fontList.map( x => x.name);

		jq.each(resp.items, function(key, val) {
			if (fontName.indexOf(val.family) > -1) {
				fontArray.push(val)
			}
		})
		var style = document.createElement('style');
		style.type = 'text/css';
		var fontfamilyname = ''
		jq.each(fontArray, function(key, val) {
			// console.log(fontList[key])
			// console.log(val)
			jq.each(fontList[key].varients, function(k, v) {
				// console.log(val.files)
				if (v.indexOf('i') > -1) {
					if (v === '400i') {
						//console.log(val.family + val.files['italic'])
						fontfamilyname += '@font-face {font-family:"' + val.family + '"; src : url(\'' + val.files['italic'] + '\');}';
					} else {
						//console.log(val.family + val.files[v.replace('i', 'italic')])
						fontfamilyname += '@font-face {font-family:"' + val.family + '"; src : url(\'' + val.files[v.replace('i', 'italic')] + '\');}';
					}

				} else {
					if (v === '400') {
						//console.log(val.family + val.files['regular'])
						fontfamilyname += '@font-face {font-family:"' + val.family + '"; src : url(\'' + val.files['regular'] + '\');}';
					} else {
						//console.log(val.family + val.files[v])
						fontfamilyname += '@font-face {font-family:"' + val.family + '"; src : url(\'' + val.files[v] + '\');}';
					}

				}

			})
		})
		//console.log(fontfamilyname)
		style.innerHTML = fontfamilyname;
		document.getElementsByTagName('head')[0].appendChild(style);
	}
})
opc_WebFontConfig = fontList;

