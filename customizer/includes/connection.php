<?php

try{
	$pdo = new PDO('mysql:host=localhost;dbname=beuweb','root','jenking');
} catch(PDOException $e){
	exit('Database error.');
}

?>
