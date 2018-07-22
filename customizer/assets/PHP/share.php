<?php
$data = $_REQUEST['imgData'];
$file1 = '../Customizer_Images/Share/TH-' . date("Y-m-d",time()) .'-'. str_replace(' ', '', microtime()). '.png';
$imgData1 = base64_decode(substr($data, 22));
if (file_exists($file1)) {
	unlink($file1);
}
// write $imgData into the file
$fp1 = fopen($file1, 'w');
fwrite($fp1, $imgData1);
fclose($fp1);

$downloadPath = str_replace('share.php', $file1, $_SERVER['SCRIPT_NAME']);
$downloadPath =	$_SERVER['HTTP_HOST'].$downloadPath;

echo $downloadPath;
?>