<?php
$snapShot = $_POST['sanpShot'];
$canvasSnap = $_POST['canvasSnap'];

$imgCheck1 = explode('/', $snapShot);
$imgCheck2 = explode('/', $canvasSnap);
$file = 'SnapShot/SnapShot_' . date("Y-m-d", time()) . '-' . str_replace(' ', '', microtime()) . '.png';
$file1 = 'SnapShot/canvasSnap_' . date("Y-m-d", time()) . '-' . str_replace(' ', '', microtime()) . '.png';
$finalName = 'SnapShot/FinalFile-' . date("Y-m-d", time()) . '-' . str_replace(' ', '', microtime()) . '.png';
$resultFile = 'SnapShot/result-' . date("Y-m-d", time()) . '-' . str_replace(' ', '', microtime()) . '.png';

$transparent_back = "SnapShot/" .'transparent_back.png';
$img_texture = "SnapShot/".'img_texture.png';
$trans_texture = "SnapShot/".'trans_texture.png';
$white_texture = "SnapShot/".'white_texture.png';
$Final_image = "SnapShot/"."finalimage.png";




if ($imgCheck1[0] == 'data:image' && $imgCheck2[0] == 'data:image') {
	$snapShot = base64_decode(stripslashes(substr($snapShot, 22)));
	$canvasSnap = base64_decode(stripslashes(substr($canvasSnap, 22)));
	if (file_exists($file)) {
		unlink($file);
	}
	if (file_exists($file1)) {
		unlink($file1);
	}}
// // write $imgData into the file
$fp1 = fopen($file, 'w');
$fp2 = fopen($file1, 'w');
fwrite($fp1, $snapShot);
fwrite($fp2, $canvasSnap);
fclose($fp1);
fclose($fp2);

/*
if (file_exists($Final_image))
    unlink($Final_image);
$color = '#C99D89';
exec("convert $file -background rgba(0,0,0,0) test111.png");
exec("convert $file fuzz 20% -transparent white $transparent_back");
exec("convert $transparent_back -threshold 35% $img_texture");
exec("convert $img_texture fuzz 20% -transparent white $trans_texture");
/* converts all the pixels that are white to transparent: */
/*
exec("convert $trans_texture -alpha extract -threshold 0  -transparent white $white_texture");
exec("convert $trans_texture  -transparent white  $white_texture");
exec("convert +level-colors 'red',lemonchiffon   $white_texture -trim  $Final_image");*/


 
//exec("convert $file -fuzz 90% -transparent white $resultFile");
//exec("convert $resultFile -fill 'red' result.png");
exec("convert -size 1000x1000  -composite $file1 $file  -geometry +0+5 -depth 8 $finalName");
?>