<?php
if(isset($_POST['promo']) === true && empty($_POST['promo']) === false)
{
	require 'connect.php';
	
	$promo = mysql_real_escape_string(trim($_POST['promo']));
	
	$query = mysql_query(" SELECT discount FROM promocode WHERE promo = '$promo' AND available ='1' ");
	
	echo (mysql_num_rows($query) !== 0) ? mysql_result($query, 0, 'discount') : 'Promo Code Not Available' ;
}
?>