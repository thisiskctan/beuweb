<?php


require_once ("PDF_Lib/zip.class.php");
require_once ("PDF_Lib/tcpdf/tcpdf.php");

/*
	This code is used for creating svg files.	
 */
function genpdf($viewArr,$outputarr,$toolUrl,$downloadable=1)
{
	$zipArr = array(); 
	if ($outputarr) {
		
		$yuio = 0;
		foreach ($outputarr as $value) {
			if(strpos($value, 'clipPath'))
			{
				$file = '../Output/pdf_output/OPC-' . date("Y-m-d",time()) .'-'. str_replace(' ', '', microtime()) . '.svg';
				if (file_exists($file)) {
					unlink($file);
				}
				
				$replaceStr = 'xlink:href="'.$toolUrl.'assets/Customizer_Images/User_Upload/original/';
				$value = str_replace('xlink:href="',$replaceStr,$value);
				// write $value into the file
				$fp1 = fopen($file, 'w');
				fwrite($fp1, stripslashes($value));
				fclose($fp1);
				//print_r($value);exit;
				///Pdf output file starts here
				$output_file = '../Output/pdf_output/OPC-'.date("Y-m-d",time()) .'-'. str_replace(' ', '', microtime()).'.pdf';
				$printW=$viewArr[$yuio][printwidth]*72;
				$printH=$viewArr[$yuio][printheight]*72;
				$size = array($printW,$printH);
	            $pdf = new TCPDF(PDF_PAGE_ORIENTATION, 'pt', '', true, 'UTF-8', false);
				$pdf->SetPrintHeader(false);
				$pdf->SetPrintFooter(false);
				$pdf->SetAutoPageBreak(false, 0);
				$pdf->SetMargins(0,0,0,$keepmargins = false);
				$orientation = ($printW>$printH) ? 'L' : 'P';
		        $pdf->AddPage($orientation,$size);
				$pdf->ImageSVG($file, $x=0, $y=0, $w=$printW, $h=$printH, $link='', $align='', $palign='', $border=0, $fitonpage=false);
				$pdf->Output( $output_file, 'F');
				$zipArr[] = $output_file;
				
				
			}else{
				
				$temp_path = str_replace('assets/PHP/pdf_output.php', '', $_SERVER['SCRIPT_FILENAME']);
				$value = $temp_path.$value;
				$file = '../Output/pdf_output/OPC-' . date("Y-m-d",time()) .'-'. str_replace(' ', '', microtime()) . '.png';
				copy($value, $file);
				//$zipArr[] = $file;
				
			}
			$yuio++;
		}
		
		/*
			This code is used for creating a image Zip file.
		*/
		$zipFileName = "OPC-" . date("Y-m-d",time()) .'-'. str_replace(' ', '', microtime()) . ".zip";
		$fileName = "../Output/pdf_output/".$zipFileName;
		$fd = fopen($fileName, "wb");
		$createZip = new ZipFile($fd);
		foreach ($zipArr as $filzip) {
			$zipfileName = substr($filzip, strrpos($filzip, "/") + 1);
			$createZip -> addFile($filzip, $zipfileName, true);
		}
		$downloadPath = 'assets/'.str_replace('../', '', $fileName);
		$createZip -> close();
		if($downloadable==1)
			return $downloadPath;
		else
			return $zipFileName;
	}
}
?>