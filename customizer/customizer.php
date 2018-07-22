<?php
session_start();
header('content-type:text/html;charset=utf-8');
$langCheck=$_REQUEST['lang'];
$lang=$_REQUEST['lang']?$_REQUEST['lang']:$_SESSION['lang'];
$lang=$lang?$lang:'en';
?>
<!DOCTYPE html>
<html class="no-js" lang="en">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>BeU | Create Your T-Shirt</title>
		<link href='https://fonts.googleapis.com/css?family=Lobster|Lora|Roboto+Condensed|Montserrat|Philosopher|Indie+Flower|Pacifico|Monoton|Cookie|Raleway|Yanone+Kaffeesatz|Droid+Sans|Shadows+Into+Light|Play|Unkempt|Orbitron' rel='stylesheet' type='text/css'>
		<!-- <link href='http://fonts.googleapis.com/css?family=PT+Serif:400,400italic,700,700italic' rel='stylesheet' type='text/css'> -->
		<link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
		<link href="assets/Skin/css/fancySelect.css" rel="stylesheet" type="text/css">
		<link href="assets/Skin/css/jquery.fancybox.css" rel="stylesheet" type="text/css">
		<link href="assets/Skin/css/style.css" rel="stylesheet" type="text/css">
		<link href="assets/Skin/less/less.less" rel="stylesheet/less" type="text/css">
		<link href="assets/Skin/css/responsive.css" rel="stylesheet" type="text/css">
		<link href="assets/Skin/css/jquery.mCustomScrollbar.css" rel="stylesheet" type="text/css">
		
		<script type="text/javascript" src="assets/Skin/js/jquery-latest.js"></script>
  		<!-- <script src="http://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js" type="text/javascript" async=""></script> -->
		<script src="assets/Skin/js/less-1.3.0.min.js" type="text/javascript"></script>
<!-- 		<script src="assets/Library/webfont.js"></script> -->
		<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		<!--[if (lt IE 9) & (!IEMobile)]>
		<script src="assets/Skin/js/selectivizr-min.js"></script>
		<![endif]-->
		<script type="text/javascript"  src="assets/Skin/js/modernizr-2.js"></script>
		<script type="text/javascript" src="assets/Skin/js/jquery-latest.js"></script>
		<script type="text/javascript" src="assets/Skin/js/jquery-ui.js"></script>
		<script type="text/javascript" src="assets/Skin/js/jquery.ui.touch-punch.min.js"></script>
		<script type="text/javascript" src="assets/Skin/js/jquery.unveil.js"></script>
		<script type="text/javascript" src="assets/Library/webcam.min.js"></script>

		<script type="text/javascript">
			var opc_lang_val =  '<?php echo $lang ?>';
        	var opc_lang_check = '<?php echo $langCheck ?>';
		</script>
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
		<div class="outer">
			<!--Outer Container Start Here-->
			<div id="tooler">
				<!--Viewport Start Here-->
				<div class="viewport"><img src="assets/Customizer_Images/Product/large/201410080943281.jpg"  alt="" />

				</div>
				<!--Handler Start Here-->
				<div id="handler">
					<div class="handler-area">
						<canvas id="drawingArea" class="hidediv"></canvas>
						<canvas id="canvas"></canvas>
						<!-- This canvas used for png output on edge browser (bug) -->
						<canvas id="compositeCanvas" class="hidediv"></canvas>
					</div>										
				</div>
				<!--Sidebar Start Here-->
				<div id="sBar">
					<!--Sidebar Tab Panel Start Here-->
					<div id="sBarTabWidget">
						<!--Sidebar Tab Nav Start Here-->
						<div class="sBarTabs-wapper" >
							<ul id="sBarTabs">

								<li class="products first active">
									<a href="javascript:void(0);" title="products"> <span></span> <i class="trn">Products</i> </a>
								</li>
								<li id="clip-art" class="">
									<a href="javascript:void(0);" title="cliparts"> <span></span> <i class="trn">Stickers</i> </a>
								</li>
								<li class="text last">
									<a href="javascript:void(0);" class="text"> <span></span> <i class="trn">Text</i> </a>
								</li>
							</ul>
						</div>
						<!--Sidebar Tab Nav End Here-->	
						<!--Sidebar Tab Target Start Here-->
						<div class="sBarTarget ProductTab">
							<a href="javascript:void(0);" class="close_btn trn">BACK</a>
							<a href="javascript:void(0);" class="panel_cls trn">CLOSE</a>
							<div class="main-tabcontent">
								<div class="clearfix prodCat-option">
									<select id="prodCat" name="" class="ProductSelect select">
										<option>1</option>
										<option>2</option>
										<option>2</option>
									</select>
									<div class="prod-SubCat">
										<select id="prodSubCat" name="" class="select">
											<option>Select something…</option>
											<option> 1</option>
											<option> 4</option>
											<option> 5</option>
											<option> 1</option>
										</select>
									</div>
								</div>
								<div id="pWrapper" class="product flexslider">
									<ul class="clearfix pSlides">

									</ul>
									<div class="slider-overlay"></div>
									<span class="bx-paging">1/9</span>
								</div>
							</div>

						</div>
						<div class="sBarTarget clipart">
							<a href="javascript:void(0);" class="close_btn trn">BACK</a>
							<a href="javascript:void(0);" class="panel_cls trn">CLOSE</a>
							<div class="main-tabcontent">

								<div class="clearfix prodCat-option">
									<select id="clipartCat" name="" class="clipartSelect">
										<option>Select something…</option>
										<option> 1</option>
										<option> 4</option>
										<option> 5</option>
										<option> 1</option>
									</select>
									<div class="prod-SubCat">
										<select id="clipartSubcat" name="" class="select">
											<option>Select something…</option>
											<option> 1</option>
											<option> 4</option>
											<option> 5</option>
											<option> 1</option>
										</select>
									</div>

								</div>
								<div id="cWrapper" class="product flexslider">
									<ul class="clearfix cSlides"></ul>
									<div class="slider-overlay"></div>
									<span class="bx-paging">1/9</span>
								</div>

								<div class="upload">
									<div class="upload-detail uploadCommon">
										<div class="uploadContent">
                                        	<div class="buttonset">
												<button class="continue trn">
													continue
												</button>
												<button class="cancel trn">
													cancel
												</button>
											</div>
											<p class="trn">
											In order to use a design (photograph, logo, brand logo, saying, text, etc) you must have the full rights to this design. If you are not sure, please confirm ownership or ask the rightful owner for usage rights before uploading a design! By using a design on BeU Apparel Website, you are confirming:
											</p>
											<ul>
												<li class="trn">
													I hold the specific right to commercially reproduce this design.
												</li>
												<li class="trn">
													If, for any reason, the legal beholder of this copyright contacts BeU Apparel, I understand that he/she will be referred directly to me.
												</li>
												<li class="trn">
													I understand that illegal usage of a third party's protected design is no small offence and can result in heavy penalties.
												</li>
											</ul>	
										</div>
									</div>
									<div class="upload-wrapper uploadCommon">
										<div class="uploadContent">
											<div id="uWrapper" class="upload-container product">
												<div class="uploadimg-content trn">
													No Image Uploaded
												</div>
												<div class="uploadimg-content loaderimg">
													<div class="loaderImage trn"></div>
												</div>
												<ul class="clearfix uSlides">

												</ul>
												<div class="slider-overlay"></div>
												<span class="bx-paging">0/0</span>
											</div>
                                            <div id="uploader" class="uploadOption ">
													<div class="buttonset">
														<a href="javascript:void(0);" class="left upload-photo-btn upload-image file-upload big plupload_button plupload_add upload-logo trn"  id="upload_file">Upload Photo</a>
														<a href="javascript:;" class="upload-photo-btn cancel-btn right trn">cancel</a>
													</div>
													<a href="javascript:void(0);" onClick="return false;"  class="plupload_button plupload_start hidediv" >Start upload</a>

											</div>
											<div class="upload-photo">
												<ul>
													<li class="trn">
														.png, or .jpg
													</li>
													<li class="trn">
														min. 50x50 pixels, max. 4000x4000 pixels
													</li>
													<li class="trn">
														maximum 10 MB
													</li>
												</ul>
											</div>
										</div>
									</div>
									<button class="upload-btn">
										<span class="trn">UPLOADED IMAGE</span>
									</button>
								</div>
							</div>

						</div>

						<div class="sBarTarget TextTab">
							<a href="javascript:void(0);" class="close_btn trn">BACK</a>
							<a href="javascript:void(0);" class="panel_cls trn">CLOSE</a>
							<form class="select-line">
								<ul>
									<li>
										<input id="singlelinecheck" type="radio" name="line" value="singleline" class="editor2" checked />
										single-line
									</li>
									<li>
										<input id="multilinecheck" type="radio" name="line" value="multiline" class="editor1" checked />
										multi-line
									</li>
								</ul>
							</form>
							<div class="main-tabcontent active-font multiline" id="editor1">
								<div class="addText">
									<div class="textarea-wrapper">
										<textarea id="textVal" placeholder="Enter Text" class="enter-text"  name=""></textarea>
									</div>
									<div class="buttonset">
										<button id="addTextBTN" class="trn left">
											ADD TEXT
										</button>
										<button id="updateBTN" class="trn right add-disabled">
											UPDATE TEXT
										</button>
									</div>
								</div>
								<div class="font">
									<span class="heading">SELECT A FONT:</span>
									<div class="select-font">
										<div class="font-detail">
											<div  class="content_1 scroll">
												<ul>

													<li><img src="assets/Skin/images/no-refresh.png" alt="" width="226" height="47">
													</li>
													<li>
														<a href="javascript:void(0);">Open sanse</a>
													</li>
													<li>
														<a href="javascript;:">Open sanse</a>
													</li>
													<li>
														<a href="javascript;:">Open sanse</a>
													</li>
													<li>
														<a href="javascript;:">Open sanse</a>
													</li>
													<li>
														<a href="javascript;:">Open sanse</a>
													</li>
													<li>
														<a href="javascript;:">Open sanse</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<span class="heading">FONT STYLES / text effects:</span>
									<!--<ul id="fontDecor" class="font-style">
										<li class="bold">
											B
										</li>
										<li class="italic">
											i
										</li>
										<li class="underline">
											u
										</li>
									</ul>-->
									<ul id="fontAlign" class="font-style  none">
										<li class="active left" title="Left"><img width="17" height="13" alt="" src="assets/Skin/images/icon/left-line.png">
										</li>
										<li class="center" title="Center"><img width="17" height="13" alt="" src="assets/Skin/images/icon/center-line.png">
										</li>
										<li class="right" title="Right"><img width="17" height="13" alt="" src="assets/Skin/images/icon/right-line.png">
										</li>
									</ul>
								</div>
							</div>
							<div class="main-tabcontent active-font single-line" id="editor2">
								<div class="addText">
									<div class="textarea-wrapper input-type-wrapper">
										<input id="add-text-area" type="text" placeholder="Enter Text" />
									</div>
									<div class="buttonset">
										<button id="addTextBTNEffect" class="left">
											ADD TEXT
										</button>
										<button id="updateBTNEffect" class="right add-disabled">
											UPDATE TEXT
										</button>
									</div>
								</div>
								<div class="single-font">
									<div class="font">
										<span class="heading">SELECT A FONT:</span>
										<div class="select-font">
											<div class="font-detail">
												<div  class="content_1 scroll">
													<ul>

														<li><img src="assets/Skin/images/no-refresh.png" alt="" width="226" height="47">
														</li>
														<li>
															<a href="javascript:void(0);">Open sanse</a>
														</li>
														<li>
															<a href="javascript;:">Open sanse</a>
														</li>
														<li>
															<a href="javascript;:">Open sanse</a>
														</li>
														<li>
															<a href="javascript;:">Open sanse</a>
														</li>
														<li>
															<a href="javascript;:">Open sanse</a>
														</li>
														<li>
															<a href="javascript;:">Open sanse</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									<div class="font effect">
										<span class="heading">SELECT A EFFECT:</span>
										<div class="select-font select-effect">
											<div class="font-detail effect detail">
												<div class="content_33 scroll">
													<ul>

													</ul>
												</div>
											</div>
										</div>
									</div>
									<div class="font arching">
										<span class="heading">SET ARCHING</span>
										<div class="clipartNavigator">

											<div id="slider1" class="layout-slider"></div>
										</div>
									</div>
									<div class="font spacing">
										<span class="heading">SET SPACING</span>
										<div class="clipartNavigator">

											<div id="slider2" class="layout-slider"></div>
										</div>
									</div>
									<div class="font outline-color">
										<span class="heading">SELECT OUTLINE COLOR</span>
										<div class="color-list">
											<ul id="outline-color">
												<li>
													<a style="background-color: #E54D09;" href="javascript:void(0)"></a>
												</li>
												<li>
													<a style="background-color: #D9CDC5;" href="javascript:void(0)"></a>
												</li>
												<li>
													<a style="background-color: #FFB430;" href="javascript:void(0)"></a>
												</li>
												<li>
													<a style="background-color: #D4CFC3;" href="javascript:void(0)"></a>
												</li>
												<li>
													<a style="background-color: #FEF344;" href="javascript:void(0)"></a>
												</li>
												<li>
													<a style="background-color: #3F3F38;" href="javascript:void(0)"></a>
												</li>
												<li>
													<a style="background-color: #A7FC5C;" href="javascript:void(0)"></a>
												</li>
												<li>
													<a style="background-color: #142510;" href="javascript:void(0)"></a>
												</li>
												<li>
													<a style="background-color: #9DCBEB;" href="javascript:void(0)"></a>
												</li>
												<li>
													<a style="background-color: #5C739C;" href="javascript:void(0)"></a>
												</li>
												<li>
													<a style="background-color: #1A2F78;" href="javascript:void(0)"></a>
												</li>
												<li>
													<a style="background-color: #4B256E;" href="javascript:void(0)"></a>
												</li>
												<li>
													<a style="background-color: #EFC5D1;" href="javascript:void(0)"></a>
												</li>
												<li>
													<a style="background-color: #9F0110;" href="javascript:void(0)"></a>
												</li>
												<li>
													<a style="background-color: #3C0404;" href="javascript:void(0)"></a>
												</li>
												<li>
													<a style="background-color: #BFBABA;" href="javascript:void(0)"></a>
												</li>
												<li>
													<a style="background-color: #000000;" href="javascript:void(0)"></a>
												</li>
												<li>
													<a style="background-color: #FFFFFF;" href="javascript:void(0)"></a>
												</li>
											</ul>
										</div>
									</div>
									<!--<div class="rahi">
										<span class="heading">FONT STYLES / text effects:</span>
										<ul id="fontDecorSgLine" class="font-style">
											<li class="bold">
												B
											</li>
											<li class="italic">
												i
											</li>
										</ul>
									</div>-->
								</div>
							</div>

						</div>
						<!--Sidebar Tab Target End Here-->
					</div>
					<!--Sidebar Tab Panel End Here-->
				</div>
				<!--Sidebar End Here-->
					<!-- undo redo Here-->
					<div class="edit-area">
						<ul>
							<li><span>Undo</span><a href="#" id="undo"><img src="assets/Skin/images/undo.png" alt=""></a></li>
							<li><span>Redo</span><a class="redo-button" href="#" id="redo"><img src="assets/Skin/images/redo.png" alt=""></a></li>
						</ul>
					</div>
				<!--Top Text Panel Start Here-->
				<div class="top-text-panel">
					<!--<div id="language">
						<span class="flag"></span>
						<ul class="flag-list">

						</ul>
						<span class="language trn flag-change-link">change language</span>

					</div>-->

					<a href="javascript:void(0);" class="how-to-use help trn">How to customize</a>
					<div id="helpdiv" class="how-use">
						<a href="javascript:void(0);" onclick="return false;" class="how-to-use trn">How to customize</a><a href="javascript:void(0);" class="close how-to-use trn">Close</a>
						<ul>
							<li>
								<span class="trn">Step 1</span><img width="36" height="44" src="assets/Skin/images/step-1.png" alt="">
								<small class="trn">Select
									<br>
									your product</small>
							</li>
							<li>
								<span class="trn">Step 2</span><img width="90" height="44" src="assets/Skin/images/step-2.png" alt="">
								<small class="trn">Upload your images or choose from the gallery</small>
							</li>
							<li>
								<span class="trn">Step 3</span><img width="31" height="44" src="assets/Skin/images/step-3.png" alt="">
								<small class="trn">Preview your design and click DONE</small>
							</li>
						</ul>

					</div>
					 <!--<a class="previewShow"><img src="assets/Skin/images/preview-icon.png" alt="" >Preview</a>
					 <a class="TakesanpShot" id="TakesanpShot"><img src="assets/Skin/images/preview-icon.png" alt="" >Snape Shot</a>-->
					 <!-- sanp shot section  by rahi-->
					 <!--<div class="camra_popup" id="camraFrame">
					 	<div class="camera_preveiw_container">
					 		 <div class="camra_prevwie_pop" id="camraPreview">
		                  
		                    </div>
		                   <button type="button" id="take_snap">Take Snap</button>
					 	</div>
		             </div>-->
				</div>
				<!--Top Text Panel End Here-->
				<!--<div class="preview-mobile">
					 <a class="previewShow"><img src="assets/Skin/images/preview-icon.png" alt="" >Preview</a> 
				</div>-->
				
				<!--Rightbar Start Here-->
				<div class="custom-order-overlay"></div>
				<div class="custom-order">
					<!--<div class="open-icon">
						X
					</div>
					<a href="javascript:void(0);" class="close_btn trn">BACK</a>
					<a href="javascript:void(0);" class="close-btn trn">close</a>-->
					<!--Product Size Start Here-->
					<!--<span class="layerHeading"> <small class="ui-draggable-handle trn">Order Info</small> </span>-->
					<div class="custom-order-content">

						<div id="productSize" style="display:none;">
							<div class="qty">
								<label class="trn">QTY.</label>
								<input type="text" value="1" id="qtyVal" class="cep" maxlength="3"  name="qty">
							</div>
							<div>
								<label class="trn">size</label>
								<select id="sizeList" name="size" class="select">
									<option>1</option>
									<option>2</option>
									<option>L</option>
									<option>XL</option>
									<option>XXL</option>
								</select>
							</div>
						</div>
						<!--Product Size End Here-->
						<!--Product Price Start Here-->
						<div class="productPrice">
							<label class="trn" style="display:none;">ORDER TOTAL:</label>
							<span style="display:none;">$69.70 <small class="trn">Only</small> </span>

							<button class="addCartBtn trn">
								done
							</button>
						</div>
						<!--Product Price End Here-->
						<!--Social Icon Start Here-->
						<!--<div class="socialWidget">
							<span class="trn">Share Design:</span>
							<ul>
								<li>
									<a href="javascript:void(0);"><img width="18" height="16" src="assets/Skin/images/icon/twitter.png" alt=" "></a>
								</li>
								<li>
									<a href="javascript:void(0);"><img width="18" height="16" src="assets/Skin/images/icon/facebook.png" alt=" "></a>
								</li>
								<li>
									<a href="javascript:void(0);"><img width="18" height="16" src="assets/Skin/images/icon/msg.png" alt=" "></a>
								</li>
							</ul>
						</div>-->
						<!--Social Icon End Here-->
					</div>
				</div>

				<!--Layer Panel Start Here-->
				<!--<div id="layerWidget">
					<div class="open-icon">
						X
					</div>
					<span class="layerHeading"><small class="trn">layers panel</small></span>
					<ul>

					</ul>
				</div>-->
				<!--Layer Panel End Here-->
               <!--<div class="download-button">
                 <a href="#">download digital proof</a>
               </div>-->


				<div id="rsBar">
					<!--Product Color pallete Start Here-->
					<div class="productColorWidget">
						<span class="trn">Product Colors</span>
						<div class="color-list">

							<a class="panel_cls trn" href="javascript:void(0);">CLOSE</a>
							<ul id="pColor">

							</ul>
						</div>
					</div>
					<!--Product Color pallete End Here-->
					<!--Product Thumbnail Start Here-->
					<!--<div id="productThumb">
						<a class="direction-link trn" href="javascript:void(0);"><span>&nbsp;</span> <i class="trn">direction</i> </a>
						<a href="javascript:void(0);" class="close_btn trn">BACK</a>
						<ul id="thumbView"></ul>
					</div>-->
					<!--Product Thumbnail End Here-->

					<!--Product Delete Start Here-->
					<!--<a href="javascript:void(0);" id="productDelBtn">&nbsp;</a>-->
					<!--Product Delete End Here-->
				</div>
				<!--Rightbar End Here-->
				<!--Product Design Editor Start Here-->
				<div id="designEditor" >
					<div id="designColorWidget">
						<span class="trn">Edit Design Color</span>
						<ul class="clipart-color">

						</ul>
						<a href="javascript:void(0);" class="morelink"><span class="trn">More</span><i class="trn">Close</i></a>

						<div class="morecolorbox">
							<ul>

							</ul>

						</div>

					</div>
					<div id="clipartEditor">
						<ul class="clipartRotator">
							<li><img width="27" height="24" src="assets/Skin/images/arrow/flip-hor.png" alt=" ">
							</li>
							<li><img width="27" height="24" src="assets/Skin/images/arrow/flip-ver.png" alt=" ">
							</li>
							<li><img width="28" height="26" src="assets/Skin/images/arrow/middle.png" alt=" ">
							</li>
							<li><img width="28" height="26" src="assets/Skin/images/arrow/center.png" alt=" ">
							</li>
							<li><img width="28" height="26" src="assets/Skin/images/arrow/center-middle.png" alt=" ">
							</li>
						</ul>
						<div class="clipartNavigator">

							<div id="slider" class="layout-slider"></div>
						</div>
					</div>
					<!--<div class="position-handler">
						<span class="position left"> <img width="19" height="19" src="assets/Skin/images/arrow/left-arrow.png" alt=""> </span><span class="position top"> <img width="19" height="19" src="assets/Skin/images/arrow/top-arrow.png" alt=""> </span><span class="position right"> <img width="19" height="19" src="assets/Skin/images/arrow/right-arrow.png" alt=""> </span><span class="position bottom"> <img width="19" height="19" src="assets/Skin/images/arrow/bottom-arrow.png" alt=""> </span>
					</div>-->
					<div class="degree">
						<span class="trn">0-360 degree
							<br>
							(counter-clockwise)</span>
						<input type="text" id="rotateVal" class="cep" maxlength="3" name="rotateBox" value="0">
						<input type="button" name="" class="trn" value="ROTATE">
					</div>
					<div class="edit-area">
						<ul>
							<li><span>Redo</span><a class="redo-button" href="#"><img src="assets/Skin/images/redo.png" alt=""></a></li>
						    <li><span>Undo</span><a href="#"><img src="assets/Skin/images/undo.png" alt=""></a></li>
						</ul>
					</div>
				</div>
				<!--Product Design Editor End Here-->
				<!--Dialog Box Start Here-->
				<div class="overlay">

					<div class="loading-content loader1">
						<div class="html5-ui-img">
							<figure>
								<img src="assets/Skin/images/dum-bell.png" />
							</figure>
						</div>
						<div class="load-filepath trn" >
							Just a few seconds... let's customize & set the trend!
						</div>

						<div class="load-filesize" >
							<div class="loaderImage trn">

							</div>
							<div class="trn">
								Being Yourself is "more than different"
							</div>
						</div>
					</div>

					<div class="loading-content loader2">
						<span class="loader-wait trn"><i></i> Loading</span>
						<div class="load-filepath trn">
							Just a few seconds... let's customize & set the trend!
						</div>

						<div class="meter">
							<span></span>
						</div>

						<div class="load-filesize trn" >
							Being Yourself is "more than different"
						</div>
					</div>

				</div>

				<div class="inneroverlay">
					<div class="load-content">
						<div class="loaderImage">
							<div align="center" class="fond">
								<div class="contener_general">
									<div class="contener_mixte">
										<div class="ballcolor ball_1">
											&nbsp;
										</div>
									</div>
									<div class="contener_mixte">
										<div class="ballcolor ball_2">
											&nbsp;
										</div>
									</div>
									<div class="contener_mixte">
										<div class="ballcolor ball_3">
											&nbsp;
										</div>
									</div>
									<div class="contener_mixte">
										<div class="ballcolor ball_4">
											&nbsp;
										</div>
									</div>
								</div>

							</div>

						</div>
						<strong class="trn">Being Yourself is "more than different"</strong>
						<span class="trn">Directing to next page in 5 seconds</span>
					</div>
				</div>
				<!-- <div class="video-wrapper">
				<div class="video-loader"></div>
				<div class="iframe-wrapper">
				<a href="javascript:void(0);" class="close-vbtn">Close</a>
				<iframe id="videoT" src="https://www.youtube.com/embed/gcRQxNuP65g" frameborder="0" allowfullscreen></iframe></div>
				</div> -->
				<div class="ShoppingCart">
					<a href="javascript:void(0);" class="cart_img"></a>
					<h3 class="trn">You have added to your shopping cart</h3>
					<figure><img src="assets/Skin/images/shopping-cart-img.jpg" alt="" width="100" height="100">
					</figure>
					<span class="trn">1xBaby Rib 3/4 Sleeve Raglan</span>
					<ul class="option-btn">
						<li>
							<a href="javascript:void(0);">Design Another</a>
						</li>
						<li>
							<a href="javascript:void(0);">continue designing</a>
						</li>
						<li class="check-out">
							<a href="javascript:void(0);">checkout</a>
						</li>
					</ul>
				</div>
				<!--Dailog Box End Here-->
				<!--MSG ALERT-->
				<div class="how-use msg outside-click">
					<p>
						You have placed the image partially <strong>outside the decoration area</strong> and it will be cropped.
					</p>
				</div>
				<div class="how-use msg resized">
					<p>
						This image has been resized to the point where it may appear <strong>blurred</strong>.
					</p>
				</div>
				<!--msg alert-->
			</div>
			<!--Outer Container End Here-->

			<!--IPOD HTML START HERE-->
			<!--Ipod Bottom Start Here-->
			<div class="ipod-bottom">
				<a class="edit-design-color" href="javascript:void(0);"><img src="assets\Skin\images\color_wheel.png"></a><!--<a class="order-info" href="javascript:void(0);">ORDER INFO</a><span class="tool-click"> <span>TOOLS</span> </span>-->
			</div>
			<!--Ipod Bottom End Here-->
			<div class="i-pod-tab" id="cliparts">
				<a href="javascript:void(0);" class="close_btn trn">BACK</a>
			</div>

			<!--IPOD HTML END HERE-->

		</div>

		<script type="text/javascript" src="assets/Skin/js/jquery.mousewheel.min.js"></script>
		<script type="text/javascript" src="assets/Skin/js/jquery.mCustomScrollbar.js"></script>
		<script type="text/javascript" src="assets/Skin/js/jquery.bxslider.js"></script>
		<script type="text/javascript" src="assets/Library/tool.setting.js"></script>
		<script type="text/javascript" src="assets/Library/model.js"></script>
		<script type="text/javascript" src="assets/Library/webfont.js"></script>
		<script type="text/javascript" src="assets/Skin/js/responsive.js"></script>

		<script type="text/javascript" src="assets/Library/jquery.sparx-tool.js"></script>

		<script type="text/javascript" src="assets/Skin/js/fancySelect.js"></script>
		<script type="text/javascript" src="assets/Library/jquery.fancybox.js"></script>
		<script type="text/javascript" src="assets/Skin/js/jquery.touchSwipe.min.js"></script>
		<script type="text/javascript" src="assets/Skin/js/jquery.masking.js"></script>

		<script type="text/javascript" src="assets/Library/command.js"></script>
		<script type="text/javascript" src="assets/Library/services.js"></script>
		<script type="text/javascript" src="assets/Library/controller.js"></script>

		<script type="text/javascript" src="assets/Library/plupload.full.js"></script>
		<script type="text/javascript" src="assets/Library/jquery.plupload.queue.js"></script>
		<script type="text/javascript" src="assets/Library/percentage.js"></script>

		<script type="text/javascript" src="assets/Skin/js/canvg.js"></script>
		<script type="text/javascript" src="assets/Skin/js/jquery.translate.js"></script>
		<script src="assets/Library/jQuery.fabricCurvText.js"></script>
		
	</body>

</html>
