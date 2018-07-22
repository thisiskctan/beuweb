<?php
// HTTP headers for no cache etc
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
define("DIRECTORY_SEPARATOR", "/");
$userUpdOriginalImage = "../Customizer_Images/User_Upload/original/";
$userUpdLargeImage = "../Customizer_Images/User_Upload/large/";
$userUpdThumbImage = "../Customizer_Images/User_Upload/thumb/";
$text = '';
$targetDir = $userUpdOriginalImage;

$cleanupTargetDir = true;
// Remove old files
$maxFileAge = 5 * 3600;
// Temp file age in seconds

// 5 minutes execution time
@set_time_limit(5 * 60);

// Uncomment this one to fake upload time
// usleep(5000);

// Get parameters
$chunk = isset($_REQUEST["chunk"]) ? intval($_REQUEST["chunk"]) : 0;
$chunks = isset($_REQUEST["chunks"]) ? intval($_REQUEST["chunks"]) : 0;
$fileName = isset($_REQUEST["name"]) ? $_REQUEST["name"] : '';

// Clean the fileName for security reasons
$fileName = preg_replace('/[^\w\._]+/', '_', $fileName);

// Make sure the fileName is unique but only if chunking is disabled
if ($chunks < 2 && file_exists($targetDir . DIRECTORY_SEPARATOR . $fileName)) {
	$ext = strrpos($fileName, '.');
	$fileName_a = substr($fileName, 0, $ext);
	$fileName_b = substr($fileName, $ext);

	$count = 1;
	while (file_exists($targetDir . DIRECTORY_SEPARATOR . $fileName_a . '_' . $count . $fileName_b))
		$count++;

	$fileName = $fileName_a . '_' . $count . $fileName_b;
}

$filePath = $targetDir . $fileName;
// Create target dir
if (!file_exists($targetDir))
	@mkdir($targetDir);


// Remove old temp files
if ($cleanupTargetDir) {

	if (is_dir($targetDir) && ($dir = opendir($targetDir))) {
		while (($file = readdir($dir)) !== false) {
			$tmpfilePath = $targetDir . DIRECTORY_SEPARATOR . $file;

			// Remove temp file if it is older than the max age and is not the current file
			if (preg_match('/\.part$/', $file) && (filemtime($tmpfilePath) < time() - $maxFileAge) && ($tmpfilePath != "{$filePath}.part")) {
				@unlink($tmpfilePath);
			}
		}
		closedir($dir);
	} else {
		die('{"jsonrpc" : "2.0", "error" : {"code": 100, "message": "Failed to open temp directory."}, "id" : "id"}');
	}
}

// Look for the content type header
if (isset($_SERVER["HTTP_CONTENT_TYPE"]))
	$contentType = $_SERVER["HTTP_CONTENT_TYPE"];

if (isset($_SERVER["CONTENT_TYPE"]))
	$contentType = $_SERVER["CONTENT_TYPE"];

// Handle non multipart uploads older WebKit versions didn't support multipart in HTML5
if (strpos($contentType, "multipart") !== false) {
	if (isset($_FILES['file']['tmp_name']) && is_uploaded_file($_FILES['file']['tmp_name'])) {
		// Open temp file
		$out = @fopen("{$filePath}.part", $chunk == 0 ? "wb" : "ab");
		if ($out) {
			// Read binary input stream and append it to temp file
			$in = @fopen($_FILES['file']['tmp_name'], "rb");

			if ($in) {
				while ($buff = fread($in, 4096))
					fwrite($out, $buff);
			} else
				die('{"jsonrpc" : "2.0", "error" : {"code": 101, "message": "Failed to open input stream."}, "id" : "id"}');
			@fclose($in);
			@fclose($out);
			@unlink($_FILES['file']['tmp_name']);
		} else
			die('{"jsonrpc" : "2.0", "error" : {"code": 102, "message": "Failed to open output stream."}, "id" : "id"}');
	} else
		die('{"jsonrpc" : "2.0", "error" : {"code": 103, "message": "Failed to move uploaded file."}, "id" : "id"}');
} else {
	// Open temp file
	$out = @fopen("{$filePath}.part", $chunk == 0 ? "wb" : "ab");
	if ($out) {
		// Read binary input stream and append it to temp file
		$in = @fopen("php://input", "rb");

		if ($in) {
			while ($buff = fread($in, 4096))
				fwrite($out, $buff);
		} else
			die('{"jsonrpc" : "2.0", "error" : {"code": 101, "message": "Failed to open input stream."}, "id" : "id"}');

		@fclose($in);
		@fclose($out);
	} else
		die('{"jsonrpc" : "2.0", "error" : {"code": 102, "message": "Failed to open output stream."}, "id" : "id"}');
}

// Check if file has been uploaded
if (!$chunks || $chunk == $chunks - 1) {

	// Strip the temp .part suffix off
	rename("{$filePath}.part", $filePath);
	
	if ($filePath) {

		$userUpdOriginalImage = $userUpdOriginalImage . $fileName;

		$thumbW = 70;
		$thumbH = 70;
		//$thumbsize = getImageRatio($thumbW, $thumbH, $userUpdOriginalImage);
		$usrImgThumb = $userUpdThumbImage . $fileName;
		$usrImgThumb = resize($userUpdOriginalImage, $thumbW, $thumbH, $usrImgThumb);

		$largeW = 623;
		$largeH = 623;
		//$largetImageSize = getImageRatio($largeW, $largeH, $userUpdOriginalImage);
		$usrImgLarge = $userUpdLargeImage . $fileName;
		$usrImgLarge = resize($userUpdOriginalImage, $largeW, $largeH, $usrImgLarge);

		$status = 1;
	} else {
		@unlink($filePath);
		$status = 0;
		$text = 'The uploaded file does not have the required size or pixels to ensure the best quality and will reflect in the design area. Please upload images/art which have more than 50x50 pixels.';
	}

	if ($text == '')
		echo str_replace('../', '', $usrImgThumb);
	else
		echo $text . 'Error';
	
}

//die('{"jsonrpc" : "2.0", "result" : null, "id" : "id"}');
function getImageRatio($ratioW, $ratioH, $imgPath) {
	$imageRatio = '';
	list($width, $height) = @(getimagesize($imgPath));
	if ($width > $ratioW && $height > $ratioH) {
		$imageRatio = $ratioW . 'x' . $ratioH;
	} else if ($width < $ratioW && $height > $ratioH) {
		$imageRatio = 'x' . $ratioH;
	} else if ($width > $ratioW && $height < $ratioH) {
		$imageRatio = $ratioW . 'x';
	} else {
		$imageRatio = $width . 'x' . $height;
	}
	return $imageRatio;
}

function resize($img, $w, $h, $newfilename) {

	//Check if GD extension is loaded
	if (!extension_loaded('gd') && !extension_loaded('gd2')) {
		trigger_error("GD is not loaded", E_USER_WARNING);
		return false;
	}

	//Get Image size info
	$imgInfo = getimagesize($img);
	switch ($imgInfo[2]) {
		case 1 :
			$im = imagecreatefromgif($img);
			break;
		case 2 :
			$im = imagecreatefromjpeg($img);
			break;
		case 3 :
			$im = imagecreatefrompng($img);
			break;
		default :
			trigger_error('Unsupported filetype!', E_USER_WARNING);
			break;
	}

	//If image dimension is smaller, do not resize
	if ($imgInfo[0] <= $w && $imgInfo[1] <= $h) {
		$nHeight = $imgInfo[1];
		$nWidth = $imgInfo[0];
	} else {
		//yeah, resize it, but keep it proportional
		if ($w / $imgInfo[0] > $h / $imgInfo[1]) {
			$nWidth = $w;
			$nHeight = $imgInfo[1] * ($w / $imgInfo[0]);
		} else {
			$nWidth = $imgInfo[0] * ($h / $imgInfo[1]);
			$nHeight = $h;
		}
	}
	$nWidth = round($nWidth);
	$nHeight = round($nHeight);

	$newImg = imagecreatetruecolor($nWidth, $nHeight);

	/* Check if this image is PNG or GIF, then set if Transparent*/
	if (($imgInfo[2] == 1) OR ($imgInfo[2] == 3)) {
		imagealphablending($newImg, false);
		imagesavealpha($newImg, true);
		$transparent = imagecolorallocatealpha($newImg, 255, 255, 255, 127);
		imagefilledrectangle($newImg, 0, 0, $nWidth, $nHeight, $transparent);
	}
	imagecopyresampled($newImg, $im, 0, 0, 0, 0, $nWidth, $nHeight, $imgInfo[0], $imgInfo[1]);

	//Generate the file, and rename it to $newfilename
	switch ($imgInfo[2]) {
		case 1 :
			imagegif($newImg, $newfilename);
			break;
		case 2 :
			imagejpeg($newImg, $newfilename);
			break;
		case 3 :
			imagepng($newImg, $newfilename);
			break;
		default :
			trigger_error('Failed resize image!', E_USER_WARNING);
			break;
	}
	
	return $newfilename;
}
