/*
	Google Font scripting code.
*/

WebFontConfig = {
	google : {
		families : ['Lobster::latin', 'Lora:400,400italic,700,700italic:latin', 'Roboto+Condensed:400,700,700italic:latin', 'Montserrat:400,700:latin', 'Philosopher:400,400italic,700,700italic:latin', 'Indie+Flower::latin', 'Pacifico::latin', 'Monoton::latin', 'Cookie::latin', 'Raleway:400,700:latin', 'Yanone+Kaffeesatz:400,700:latin', 'Droid+Sans:400,700:latin', 'Shadows+Into+Light::latin', 'Play:400,700:latin', 'Unkempt:400,700:latin', 'Orbitron:400,700:latin']
	}
};

(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();
