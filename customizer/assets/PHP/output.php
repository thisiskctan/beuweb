<?php
session_start();
include_once('../../includes/connection.php');
error_reporting(0);
$format=$_REQUEST['format'];
$viewArr = $_SESSION['productArr'];
$outputarr = $_SESSION['outputArr'];
$pngoutarr = $_SESSION['pngOutputArr'];
$userImgArr = $_SESSION['userImagesArr'];
$toolUrl = $_SESSION['toolUrl'];
$editModeArr = $_SESSION['editModeArr'];
$downloadable = 1; 

if(isset($format) && !empty($format)){
	if($format=='pdf'){
			require_once 'pdf_output.php';
			$downPath = genpdf($viewArr,$outputarr,$toolUrl,$downloadable);
			$srting = "&&&&";
			echo $downPath;//.$srting.$downloadable;
	}
	if($format=='svg'){
			require_once 'svg_output.php';
			$downPath = gensvg($outputarr,$userImgArr,$downloadable);
			$srting = "&&&&";
			echo $downPath;//.$srting.$downloadable;
	}
	if($format=='png'){
			require_once 'png_output.php';
			$downPath = genpng($pngoutarr,$downloadable,$viewArr,$editModeArr,$toolUrl);
			$srting = "&&&&";
			echo $downPath;//$srting.$downloadable;
	}
	if($format=='all'){
			require_once 'pdf_output.php';
			$downPathPdf = genpdf($viewArr,$outputarr,$toolUrl,$downloadable);
			$srting = "&&&&";

			require_once 'svg_output.php';
			$downPathSvg = gensvg($outputarr,$userImgArr,$downloadable);
			$srting = "&&&&";

			require_once 'png_output.php';
			$downPathPng = genpng($pngoutarr,$downloadable,$viewArr,$editModeArr,$toolUrl);
			$srting = "&&&&";

			$first = $_POST["first"];
			$last = $_POST["last"];
			$gender = $_POST["gender"];
			$email = $_POST["email"];
			$contact = $_POST["contact"];
			$address = $_POST["address"];
			$postcode = $_POST["postcode"];
			$country = $_POST["country"];
			
			$color = $_POST["color"];
			$xs = $_POST["xs"];
			$s = $_POST["s"];
			$m = $_POST["m"];
			$l = $_POST["l"];
			$xl = $_POST["xl"];
			$xxl = $_POST["xxl"];
			
			$promo_code = $_POST["promo_code"];
			$with_promo = $_POST["with_promo"];
			$with_manner = $_POST["with_manner"];
			$total_price = $_POST["total_price"];

			$query=$pdo->prepare('INSERT INTO orders (gender, first_name, last_name, email, contact_number, 
													delivery_address, delivery_postcode, delivery_country, png, pdf, svg, color, xs, s, m, l, xl, xxl, promo_code, with_promo, with_manner, total_price, status) 
								VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
				
			$query->bindValue(1,$gender);
			$query->bindValue(2,$first);
			$query->bindValue(3,$last);
			$query->bindValue(4,$email);
			$query->bindValue(5,$contact);
			$query->bindValue(6,$address);
			$query->bindValue(7,$postcode);
			$query->bindValue(8,$country);
			$query->bindValue(9,$downPathPng);
			$query->bindValue(10,$downPathPdf);
			$query->bindValue(11,$downPathSvg);
			$query->bindValue(12,$color);
			$query->bindValue(13,$xs);
			$query->bindValue(14,$s);
			$query->bindValue(15,$m);
			$query->bindValue(16,$l);
			$query->bindValue(17,$xl);
			$query->bindValue(18,$xxl);
			$query->bindValue(19,$promo_code);
			$query->bindValue(20,$with_promo);
			$query->bindValue(21,$with_manner);
			$query->bindValue(22,$total_price);
			$query->bindValue(23,"Pending");
	
			$query->execute();

			header('Location:../../../index.php');
	}
}
?>