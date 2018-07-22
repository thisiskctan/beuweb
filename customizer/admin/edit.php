<?php

session_start();

include_once('../includes/connection.php');
include_once('../includes/order.php');

$order = new Order;
$orders = $order->fetch_all();

if(isset($_SESSION['logged_in'])){
	
	if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 300)) {
   	 	// request 30 minutes ago
    	session_destroy();
    	session_unset();
	}
	$_SESSION['LAST_ACTIVITY'] = time(); // update last activity time
	
?>
	
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>BeU - Admin Page | Orders</title>
    <link rel="stylesheet">
</head>
        
<body>
        
    <!-- Header Wrapper -->
<div id="header-wrapper"></div>
                
    <!-- Main Wrapper -->
    <div id="main-wrapper">
                 
        <h4>List of Orders</h4>
        <br/>
                    
        <table border="2" align="center" width="1280">
            <td bgcolor="#999999" align="center" style="color:#000"><b>Order ID</b></td>
            <td bgcolor="#999999" align="center" style="color:#000"><b>Date & Time</b></td>
            <td bgcolor="#999999" align="center" style="color:#000"><b>Total Price</b></td>
            <td bgcolor="#999999" align="center" style="color:#000"><b>Status</b></td>
            <td bgcolor="#999999" align="center" style="color:#000"><b>Details</b></td>
            
			<?php foreach ($orders as $order) { ?>
            <tr>
            	<td align="center"><?php echo $order['order_id'];?></td>
                <td align="center"><?php echo $order['timestamp'];?></td>
                <td align="center"><?php echo $order['total_price'];?></td>
                <td align="center"><?php echo $order['status'];?></td>  
                <td align="center"><a href="order.php?id=<?php echo $order['order_id'];?>">Edit</a></td>   
            </tr>       
            <?php } ?>
                        
		</table>
                    
		<p align="center"><a href="index.php">&larr; Back</a></p>
                    
	</div><!-- Main Wrap Close -->
        
    <!-- Footer Wrapper -->
    <div id="footer-wrapper"></div>
        
</body>
</html>
    
<?php

}else{
	header('Location:index.php');
}

?>