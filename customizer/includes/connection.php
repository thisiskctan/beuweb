<?php

try{
	$pdo = new PDO('mysql:host=110.4.46.121;dbname=tshirts', 'root00', 'root00');
} catch(PDOException $e){
	exit('Database error.');
}

?>