<?php
session_start();
if (isset($_POST) && count($_POST) != 0) {
	$_SESSION = $_POST;
}
$pngOutputArr = array();
$pngOutputArr['pngOutputArr'] = $_SESSION['pngOutputArr'];
$viewsName = array();
$viewsName['viewsName'] = $_SESSION['viewsName'];

$color = $_SESSION['color'];
if($color == "#000000") $singlePrice = "109";
if($color == "#ffffff") $singlePrice = "109";

$manner = $_SESSION['price'];
$manner = preg_replace('/\D/', '', $manner);
if($manner <= "9000") $gotmanner = "0";
if($manner > "9000") $gotmanner = "1";
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
          fbq('track', 'PageView');
        </script>
        <noscript><img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=2030476210560162&ev=PageView&noscript=1"
        /></noscript>
        <!-- End Facebook Pixel Code -->
        <!-- Facebook Pixel Code (BACKUP) -->
            <script>
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '218730028677294');
              fbq('track', 'PageView');
            </script>
            <noscript><img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=218730028677294&ev=PageView&noscript=1"
            /></noscript>
        <!-- End Facebook Pixel Code -->
	</head>
	<body>
	<div class="main-contentarea">
	<div class="page-title">
	<h1 class="trn">Preview & Check Out</h1>
	<a href="customizer.php" id="changePage" class="upload-photo-btn right trn">back</a>
	</div>
		<div id="inform" style="font-size:1.5em;">
		
		<table>
			<tr class="tablehead">
				
				<td class="trn">Personal Details</td>
				<td class="trn">Size & Quantity</td>
				<td class="trn">Order Summary</td>
			</tr>
            
			<tr class="tablebody">
				
				<td style="font-size:85%;"><strong class="trn">Personal Details</strong>
                    <form action="assets/PHP/output.php?format=all" method="post" 
                    				autocomplete="off" enctype="multipart/form-data">
                       
                        First Name: <input type="text" name="first"/> <br>
                        Last Name: <input type="text" name="last"/> <br><br>
                        Gender: <select name="gender"> 
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select> <br><br>
                        Email: <input type="text" name="email"/> <br>
                        Contact Number: <input type="text" name="contact"/> <br><br>
                        Delivery Address: <input type="text" name="address"/> <br>
                        Postcode: <input type="text" name="postcode"/> <br>
                        Country: <input type="text" name="country"/><br><br>
                        
                        <input type="hidden" id="color" value="<?php echo $color ?>" name="color"/>
                </td>
                
				<td style="font-size:85%;"><strong class="trn">Size & Quantity</strong>
					<?php echo $_SESSION['viewsName'][0] ?><br><br>
                    <label>XS: </label><input type="number" value="0" min="0" id="xs" oninput="calculatePrice()" name="xs" 
                    style="width: 3em"><br><br>
                    <label>S: </label><input type="number" value="0" min="0" id="s" oninput="calculatePrice()" name="s"
                    style="width: 3em"><br><br>
                    <label>M: </label><input type="number" value="0" min="0" id="m" oninput="calculatePrice()" name="m"
                    style="width: 3em"><br><br>
                    <label>L: </label><input type="number" value="0" min="0" id="l" oninput="calculatePrice()" name="l"
                    style="width: 3em"><br><br>
                    <label>XL: </label><input type="number" value="0" min="0" id="xl" oninput="calculatePrice()" name="xl"
                    style="width: 3em"><br><br>
                    <label>XXL: </label><input type="number" value="0" min="0" id="xxl" oninput="calculatePrice()" name="xxl"
                    style="width: 3em">
                </td>
                
				<td style="font-size:85%;"><strong class="trn">Order Summary</strong>
                    <p id="tshirtPrice">T-Shirt Total Price: RM0</p><br>
                    Promo Code: <input type="text" id="promo" size="6" name="promo_code"/> 
                    <input type="button" id="promo-apply" value="Apply" onclick="setTimeout(calculatePrice, 1000)"><br>
                        <script src="promo/jquery-3.3.1.min.js"></script>
                        <script src="promo/global.js"></script>     
                    <div id="discountStyle" style="font-size:90%; font-style:italic;">
                    	Discount: <div id="promo-data" style="display:inline;"></div>
                        <p id="discount_unit" style="display:inline;"></p>
                    </div>
                    <input type="hidden" id="with_promo" value="" name="with_promo"/>
                    <input type="hidden" id="with_manner" value="<?php echo $gotmanner ?>" name="with_manner"/>
                    <br>
                    <p id="discount">After Discount: -</p><br> 
                    
                    Shipping Fees: RM10 <br><br>
                    <p id="totalPrice" style="font-weight:600;">Nett Total: RM0</p><br>
                    <input type="hidden" id="total" value="" min="0" name="total_price"/>
                
					<script>
                    function calculatePrice()
                    {
                        var a = parseInt(document.getElementById("xs").value);
                        var b = parseInt(document.getElementById("s").value);
                        var c = parseInt(document.getElementById("m").value);
                        var d = parseInt(document.getElementById("l").value);
                        var e = parseInt(document.getElementById("xl").value);
                        var f = parseInt(document.getElementById("xxl").value);
                        var totalQuantity = a+b+c+d+e+f;		
                        var tshirtPrice = <?php echo json_encode($singlePrice); ?> * totalQuantity;
                        document.getElementById("tshirtPrice").innerHTML = "T-Shirt Total Price: RM" + tshirtPrice;
                        
                        var promo = parseInt(document.getElementById("promo-data").textContent) || 0;
                        if(promo != 0)
                        {
							document.getElementById("discount_unit").innerHTML = "%";
                            $("#with_promo").val("1");
                            var discounted = tshirtPrice * ( 100 - promo ) / 100
                            document.getElementById("discount").innerHTML = "After Discount: RM" + discounted.toFixed(2);
                            var total = discounted + 10;
                            document.getElementById("totalPrice").innerHTML = "Nett Total: RM" + total.toFixed(2);
                            $("#total").val(total.toFixed(2));
                        } else {
							document.getElementById("discount_unit").innerHTML = "";
                            $("#with_promo").val("0");
                            document.getElementById("discount").innerHTML = "After Discount: Not Applicable";
                            var total = tshirtPrice + 10;
                            document.getElementById("totalPrice").innerHTML = "Nett Total: RM" + total.toFixed(2);
                            $("#total").val(total.toFixed(2));
                        }
                    }	
                    </script>
                    
                    	<a href="javascript:void(0);" onclick="document.forms[0].submit();return false;"
                        	alt="all" class="upload-photo-btn left trn">Check Out</a>                    
                	</form>
                </td>
			</tr>	
		</table>
		
		</div>
		<!--<div class="downloadContent">
		<h2 class="trn">Download Ready to Print Final Output Files</h2>
		<p class="trn">

        </p>
		<h5 class="trn">Hello All If you want to download PDF or SVG then please fill feedback form.</h2>
		<a href="javascript:void(0);" alt="feedback" class="trn feedback" id="feedbackform">FeedBack Form</a>
		</div>-->
		<br/><br/><br/><br/>
		    <!--<div class="buttonset" id="outputGen">
              	<a href="javascript:void(0);" alt="png" class="upload-photo-btn left trn">PNG Download</a>
                <a href="javascript:void(0);" alt="pdf" class="upload-photo-btn left trn">PDF Download</a>
                <a href="javascript:void(0);" alt="svg" class="upload-photo-btn left trn">SVG Download</a>
                <a href="javascript:void(0);" alt="all" class="upload-photo-btn left trn">Save All To Server</a>
    		</div>-->
		</div>
	</body>
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
</html>

