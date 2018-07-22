<?php
require_once ("PDF_Lib/zip.class.php");

function findexts($filename) {
	$filename = strtolower($filename);
	$exts = @split("[/\\.]", $filename);
	$n = count($exts)-1;
	$exts = $exts[$n];
	return $exts;
}
/*
 This code is used for creating svg files.
 */

function gensvg($outputarr,$userImgArr,$downloadable) {

	$zipArr = array();
	if ($outputarr) {
		$new_data = $outputarr; 
		$svgData = str_ireplace('http://norefresh.thesparxitsolutions.com/Rajeevrahi/Live/Customizer_Tool/InkyRobo/assets/Customizer_Images/User_Upload/large/','',$new_data);
		
		foreach ($svgData as $value) {
			if (strpos($value, 'clipPath')) {
				$file = '../Output/svg_output/OPC-' . date("Y-m-d", time()) . '-' . str_replace(' ', '', microtime()) . '.svg';
				if (file_exists($file)) {
					unlink($file);
				}
				// write $value into the file
				$fp1 = fopen($file, 'w');
				fwrite($fp1, stripslashes($value));
				fclose($fp1);
				$zipArr[] = $file;
			} else {
				$temp_path = str_replace('assets/PHP/output.php', '', $_SERVER['SCRIPT_FILENAME']);
				$value = $temp_path . $value;
				$file = '../Output/svg_output/OPC-' . date("Y-m-d", time()) . '-' . str_replace(' ', '', microtime()) . '.png';
				copy($value, $file);
				$zipArr[] = $file;
			}
		}
	}
	if ($userImgArr) {
		$imgData = $userImgArr;
		foreach ($imgData as $value) {
			$extn = '';
			$imgCheck = explode('/', $value);
			$filename = end($imgCheck);
			$extn = findexts($filename);
			if ($extn != 'svg' && !empty($extn)) {
				$file = '../Customizer_Images/User_Upload/original/' . $filename;
			} elseif (!empty($extn)) {
				$file = '../Customizer_Images/Clipart/svg/' . $filename;
			}
			$zipArr[] = $file;

		}
	}
	//$fileName = "../Output/svg_output/TH-" . date("Y-m-d",time()) .'-'. str_replace(' ', '', microtime()) . ".zip";
	$zipFileName = "OPC-" . date("Y-m-d", time()) . '-' . str_replace(' ', '', microtime()) . ".zip";
	$fileName = "../Output/svg_output/" . $zipFileName;
	$fd = fopen($fileName, "wb");
	$createZip = new ZipFile($fd);
	foreach ($zipArr as $filzip) {
		$zipfileName = substr($filzip, strrpos($filzip, "/") + 1);
		$createZip -> addFile($filzip, $zipfileName, true);
	}

	$downloadPath = 'assets/' . str_replace('../', '', $fileName);
	$createZip -> close();
	//return $downloadPath;
	if ($downloadable == 1)
		return $downloadPath;
	else
		return $zipFileName;

}
?>
