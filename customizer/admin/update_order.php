<?php
session_start();
include_once('../includes/connection.php');
include_once('../includes/order.php');

require '../../phpmailer/PHPMailerAutoload.php';
	$mail = new PHPMailer();
	$mail->isSMTP();
	//$mail->SMTPDebug = 1;                               
    $mail->SMTPAuth = true;
	//$mail->SMTPSecure = 'ssl';          
	$mail->Host = "phantom.mschosting.com";
	$mail->Port = 587;
	$mail->isHTML(true);
	$mail->Username = "contact@beu.com.my";  
	$mail->Password = "27227000beu.";

$order = new Order;
if(isset($_GET['id'])){
	$id = $_GET['id'];
	$data = $order->fetch_data($id);

	if (isset($_POST['status'])){
		$status = $_POST["status"];
		$tracking_code = $_POST["tracking_code"];
		
		if($status=='Pending')
		{
			$query=$pdo->prepare('UPDATE orders SET status="Pending" WHERE order_id = '.$data['order_id'].' ');
			$query->execute();
			header('Location:order.php?id='.$data['order_id']);
		}
		if($status=='Paid')
		{
			$query=$pdo->prepare('UPDATE orders SET status="Paid" WHERE order_id = '.$data['order_id'].' ');
			$query->execute();
			
			$content = "Thanks! Your order " .$data['order_id']. " had been paid with the 
						total sum of RM" .$data['total_price'].".";
			
			$mail->setFrom("contact@beu.com.my", "Contact@BeU");
			$mail->Subject = "BeU Apparel: Order ID" .$data['order_id']. "-Payment Confirmed";
			$mail->Body = $content;
			$mail->addAddress($data['email'], $data['last_name']);
			$mail->send();
			
			header('Location:order.php?id='.$data['order_id']);
		}
		if($status=='Shipped')
		{
			$query=$pdo->prepare('UPDATE orders SET status="Shipped" WHERE order_id = '.$data['order_id'].' ');
			$query->execute();
			$query=$pdo->prepare('UPDATE orders SET tracking_code="'.$tracking_code.'" WHERE order_id = '.$data['order_id'].' ');
			$query->execute();
			
			$content = "Thanks! Your order " .$data['order_id']. " had been shipped. 
						You may track with the tracking code: " .$tracking_code.".";
			
			$mail->setFrom("contact@beu.com.my", "Contact@BeU");
			$mail->Subject = "BeU Apparel: Order ID" .$data['order_id']. "-Shipment Complete";
			$mail->Body = $content;
			$mail->addAddress($data['email'], $data['last_name']);
			$mail->send();

			header('Location:order.php?id='.$data['order_id']);
		}
	}
}else{
	header('Location:index.php');
}
?>