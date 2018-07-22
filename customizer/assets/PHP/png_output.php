<?php
session_start();
require_once ("PDF_Lib/zip.class.php");

/*
 This code is used for creating PNG output Image files.
 */

function genpng($pngoutarr, $downloadable, $viewArr, $editModeArr,$toolUrl) {
	$zipArr = array();
	if ($pngoutarr) {
		$imgData = $pngoutarr; 
		foreach ($imgData as $value) {
			$imgCheck = explode('/', $value);
			$file = '../Output/png_output/OPC-' . date("Y-m-d", time()) . '-' . str_replace(' ', '', microtime()) . '.png';
			if ($imgCheck[0] == 'data:image') {
				$imgData = base64_decode(stripslashes(substr($value, 22)));
				if (file_exists($file)) {
					unlink($file);
				}
				// write $imgData into the file
				$fp1 = fopen($file, 'w');
				fwrite($fp1, $imgData);
				fclose($fp1);
				$zipArr[] = $file;
			} else {
				$temp_path = str_replace('assets/PHP/output.php', '', $_SERVER['SCRIPT_FILENAME']);
				$value = $temp_path . $value;
				copy($value, $file);
				$zipArr[] = $file;
			}

		}
		//Add All image in Zip file.
		foreach ($editModeArr as $key => $value){
			foreach ($value as $key1 => $value1) {
				foreach ($value1 as $key2 => $value2) {
					if($value2['type']== 'image'){
						$zipArr[] = $value2['src'];
					}
				};
			}
		}
		
		foreach ($viewArr as $value) {
			$tempSrc = ($toolUrl.$value['path']);
			$tempSrc =str_replace('thumb','large',$tempSrc);
			//$zipArr[] = $tempSrc;
		}
		
		//$fileName = "../Output/png_output/TH-" . date("Y-m-d",time()) ."-". str_replace(' ', '', microtime()) . ".zip";
		$zipFileName = "OPC-" . date("Y-m-d", time()) . '-' . str_replace(' ', '', microtime()) . ".zip";
		$fileName = "../Output/png_output/" . $zipFileName;
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
}
?>