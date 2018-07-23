<?php
session_start();
include_once('./includes/connection.php');
include_once('./includes/order.php');
$payment_gateway = include_once('./includes/payment_gateway.php');
error_reporting(1);

if (!isset($_SESSION['_checkout_order_id'])) {
    header('Location: ./customizer.php');
}

$order_id = $_SESSION['_checkout_order_id'];
$orderClass = new Order();
$order = (object) $orderClass->fetch_data($order_id);
$payment = $orderClass->checkout($order);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>BeU | Preview &amp; Check Out</title>
  <meta name="author" content="sis203" />
  <link href="assets/Skin/css/style.css" rel="stylesheet" type="text/css">
  <link href="assets/Skin/css/responsive.css" rel="stylesheet" type="text/css">
  <style>
    label{display:inline-block;text-align:right;margin-right:5px;width:30px;}
  </style>
  <!-- Facebook Pixel Code -->
  <script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '2030476210560162');
    fbq('init', '218730028677294'); // BACKUP
    fbq('track', 'PageView');
  </script>
  <noscript>
    <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2030476210560162&ev=PageView&noscript=1" />
    <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=218730028677294&ev=PageView&noscript=1" />
  </noscript>
  <!-- End Facebook Pixel Code -->
</head>
<body>
  <div class="main-contentarea">
    <div class="page-title"></div>

    <div id="payment-gateway">
      <form id="form-payment-gateway" name="frmTestPay" method="post" action="<?php echo $payment_gateway['posturl'] ?>">
        <input type="hidden" name="TxnType" value="PAY" />
        <input type="hidden" name="MerchantID" value="<?php echo $payment_gateway['merchant_id']; ?>" />
        <input type="hidden" name="MerchantPymtID" value="<?php echo $payment->paymentid; ?>" />
        <input type="hidden" name="MerchantOrdID" value="<?php echo $payment->orderid; ?>" />
        <input type="hidden" name="MerchantOrdDesc" value="<?php echo $payment->ordertext; ?>" />
        <input type="hidden" name="MerchantTxnAmt" value="<?php echo $payment->orderamt; ?>" />
        <input type="hidden" name="MerchantCurrCode" value="<?php echo $payment->ordercurr ?>" />
        <input type="hidden" name="MerchantRURL" value="<?php echo $payment->response_url; ?>" />
        <input type="hidden" name="CustIP" value="<?php echo $payment->ipaddress; ?>" />
        <input type="hidden" name="CustName" value="<?php echo $payment->name; ?>" />
        <input type="hidden" name="CustEmail" value="<?php echo $payment->email; ?>" />
        <input type="hidden" name="CustPhone" value="<?php echo $payment->phone; ?>" />
        <input type="hidden" name="Sign" value="<?php echo $payment->signature; ?>" />
        <input type="hidden" name="MerchantCallbackURL" value="<?php echo $payment->callback_url; ?>" />
      </form>
    </div>
  </div>
  <script>
    var $form = document.querySelector('#form-payment-gateway');
    setTimeout(function(){
      $form.submit();
    }, 1000);
  </script>
</body>
</html>

