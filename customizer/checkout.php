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
$merchant_id = $payment_gateway['merchant_id'];
$app_id = $payment_gateway['app_id'];
$app_secret = $payment_gateway['app_secret'];


$order = new Order();
$order = (object) $order->fetch_data($order_id);

$currency = 'MYR';
$order_id = 'A'.str_pad($order->order_id, 5, '0', STR_PAD_LEFT);
$amount = $order->total_price;
$email = $order->email;

$data = array(
  'mid'        => $merchant_id,
  'appid'      => $app_id,
  'muid'       => $email,
  'orderid'    => $order_id,
  'ordercurr'  => $currency,
  'orderamt'   => $amount,
  // 'ordertext'  => "Payment for item:{$order_id}",
);
$data['msignature'] = generateSignature($data);

$checkout_params = http_build_query($data);
$payment_entry_point = "https://www.paydibs.com:8443/upaytest/transact_iframeneworderbyinv";
$payment_gateway_url = $payment_entry_point . "?" . $checkout_params;

function generateSignature($data)
{
    global $app_secret;

    $data = array(
        $data['appid'],
        $data['orderid'],
        $data['ordercurr'],
        $data['orderamt'],
        $app_secret,
    );

    return md5(implode('', $data));
}


print_r($payment_gateway_url);
exit;
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
  <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2030476210560162&ev=PageView&noscript=1" /></noscript>
  <!-- Facebook Pixel Code (BACKUP) -->
  <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=218730028677294&ev=PageView&noscript=1" /></noscript>
  <!-- End Facebook Pixel Code -->
</head>
<body>
  <div class="main-contentarea">
    <div class="page-title"></div>

    <div id="payment-gateway-iframe">
      <iframe src='<?php echo $payment_gateway_url; ?>' width='1000' height='1000' scrolling='auto' frameborder='0'></iframe>
    </div>
  </div>


  <script type="text/javascript" src="assets/Skin/js/jquery-latest.js"></script>
  <script type="text/javascript" src="assets/Skin/js/jquery.translate.js"></script>
  <script>
    var jq = $.noConflict();
    var eventType ='';  //'ontouchend' in document ? 'touchstart' : 'click';
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      if ('ontouchend' in document || (/windows phone/i.test(navigator.userAgent.toLowerCase()))){
       eventType = (document.ontouchstart!==null)? 'click' : 'touchstart';
       }
    }else if ('onclick' in document.documentElement) {
      if ((document.ontouchstart!==null) || (document.ontouchstart===null) ) {
        if((document.ontouchstart!==null)){eventType = 'click';}
        else{eventType = 'click';}
      }
    }
    var opc_get_lang = 'assets/PHP/get_lang.php';
    var opc_lang = '<?php echo $_SESSION['lang']?>';
    var opc_views = '<?php echo json_encode($pngOutputArr);?>';
    var opc_viewName = '<?php echo json_encode($viewsName);?>';
    //this is used for feedback form
    /*
    jq(document).on('click','#feedbackform',function(){
          jq("#backoverlay").css("display", "block");
          jq("#feedFormDiv").css("display", "block");
        });
        jq(document).on('click','#feedFormDiv p',function(){
          jq("#backoverlay").css("display", "none");
          jq("#feedFormDiv").css("display", "none");
        });
        jq(document).on('click','#feedFormDiv p',function(){
          jq("#backoverlay").css("display", "none");
          jq("#feedFormDiv").css("display", "none");
        });
        jq(document).on('click','#submitForm',function() {
          if (jq('#inptName').val() != '' && jq('#inptEmail').val()) {
            jq("#backoverlay").css("display", "none");
            jq("#feedFormDiv").css("display", "none");
            jq("#outputGen .pdfDown").removeClass("disabledATag");
            jq("#outputGen .svgDown").removeClass("disabledATag");
            jq('#inptName').val('');
            jq('#inptEmail').val('');
            jq('#inptNumber').val('');
            jq('#inptComment').val('');
          }
          else{
            
          }
        });*/
    
    //submitForm
  </script>
  <script type="text/javascript" src="assets/Library/output.js"></script>
</body>
</html>

