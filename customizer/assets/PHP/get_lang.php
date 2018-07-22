<?php 
header('content-type:text/html;charset=utf-8');
$lang = $_REQUEST['lang'];
$csvArray= array_map('str_getcsv', file('./../Language/'.$lang.'/label.csv'));

$resultArray = array();
foreach($csvArray as $csvArrayValue){
		$outputArray = array();
		$outputArray[$lang] = $csvArrayValue[1];
		$resultArray[$csvArrayValue[0]] = $outputArray;
		unset($outputArray);
}
//echo "<pre>"; print_r($resultArray); exit;
 echo json_encode($resultArray); 
 ?>
