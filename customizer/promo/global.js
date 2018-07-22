$('input#promo-apply').on('click',function() {
	var promo = $('input#promo').val();
	if($.trim(promo) != '')
	{
		$.post('promo/promo.php', {promo: promo}, function(data)
		{
			$('div#promo-data').text(data);
		});
	}
});