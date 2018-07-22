/*---------------------Twitter sharing -----------------------*/
function onTwitterShare(url) {

	var urlTw = 'http://api.addthis.com/oexchange/0.8/forward/twitter/offer?url='+url;
	window.open(urlTw, '_blank');

}

/*---------------------Email sharing -----------------------*/
function onEmailShare(url) 
{
	var urlTw = 'http://api.addthis.com/oexchange/0.8/forward/email/offer?url='+url;
	window.open(urlTw, '_blank');
}

/*---------------------Facebook sharing -----------------------*/
function onFacebookShare(url,imgUrl) 
{
	var urlTw = 'http://api.addthis.com/oexchange/0.8/forward/facebook/offer?url='+imgUrl+ '&title='+url;
	window.open(urlTw, '_blank');	
}

