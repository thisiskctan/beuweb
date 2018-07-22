<?php
session_start();

include_once('../includes/connection.php');
include_once('../includes/order.php');

$order = new Order;
if(isset($_GET['id'])){
	$id = $_GET['id'];
	$data = $order->fetch_data($id);

	if(isset($_SESSION['logged_in'])){
		
		if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 300)) {
			// request 30 minutes ago
			session_destroy();
			session_unset();
		}
		$_SESSION['LAST_ACTIVITY'] = time(); // update last activity time

	if($data['color'] == '#ffffff') $color = 'White';
	if($data['color'] == '#000000') $color = 'Black';
	if($data['with_promo'] == 1) $promo = 'YES';
	if($data['with_promo'] == 0) $promo = 'NO';
	if($data['with_manner'] == 1) $manner = 'YES';
	if($data['with_manner'] == 0) $manner = 'NO';
?>
	
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>BeU - Admin Page | Order <?php echo $data['order_id'];?></title>
    <link rel="stylesheet">
</head>
        
<body>
        
    <!-- Header Wrapper -->
<div id="header-wrapper"></div>
                
    <!-- Main Wrapper -->
    <div id="main-wrapper">
                 
        <h4>Order <?php echo $data['order_id'];?> Details</h4>
        <br/>
                    
        <table border="2" align="center" width="800">
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>Order ID</b></td>
                <td align="center"><?php echo $data['order_id'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>Date & Time</b></td>
                <td align="center"><?php echo $data['timestamp'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>First Name</b></td>
                <td align="center"><?php echo $data['first_name'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>Last Name</b></td>
                <td align="center"><?php echo $data['last_name'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>Gender</b></td>
                <td align="center"><?php echo $data['gender'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>Email</b></td>
                <td align="center"><?php echo $data['email'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>Contact</b></td>
                <td align="center"><?php echo $data['contact_number'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>Address</b></td>
                <td align="center"><?php echo $data['delivery_address'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>Postcode</b></td>
                <td align="center"><?php echo $data['delivery_postcode'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>Country</b></td>
                <td align="center"><?php echo $data['delivery_country'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>PNG</b></td>
                <td align="center"><a href="../<?php echo $data['png'];?>">PNG</a></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>PDF</b></td>
                <td align="center"><a href="../<?php echo $data['pdf'];?>">PDF</a></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>SVG</b></td>
                <td align="center"><a href="../<?php echo $data['svg'];?>">SVG</a></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>Color</b></td>
                <td align="center"><?php echo $color;?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>XS</b></td>
                <td align="center"><?php echo $data['xs'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>S</b></td>
                <td align="center"><?php echo $data['s'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>M</b></td>
                <td align="center"><?php echo $data['m'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>L</b></td>
                <td align="center"><?php echo $data['l'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>XL</b></td>
                <td align="center"><?php echo $data['xl'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>XXL</b></td>
                <td align="center"><?php echo $data['xxl'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>Promo Code</b></td>
                <td align="center"><?php echo $data['promo_code'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>With Promo</b></td>
                <td align="center"><?php echo $promo;?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>Manner Sticker</b></td>
                <td align="center"><?php echo $manner;?></td>
            </tr>
          <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>Total Price</b></td>
                <td align="center"><?php echo $data['total_price'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>Tracking Code</b></td>
                <td align="center"><?php echo $data['tracking_code'];?></td>
            </tr>
            <tr>
                <td bgcolor="#999999" align="right" style="color:#000"><b>Status</b></td>
                <td align="center"><?php echo $data['status'];?></td>
            </tr>
		</table>

        <div align="center">
            <br><br><b>Update Status & Tracking</b><br><br>
            <form action="update_order.php?id=<?php echo $data['order_id'];?>" method="post" autocomplete="off">
                Tracking Code: <input type="text" name="tracking_code"/><br>
                Status: 
                    <select size="1" name="status">
                    	<option value="<?php echo $data['status'];?>" selected><?php echo $data['status'];?></option>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Shipped">Shipped</option>
                    </select><br><br>      
                <input type="submit" value="UPDATE">
            </form>
        </div>        
		<p align="center"><a href="edit.php">&larr; Back</a></p>
                    
	</div><!-- Main Wrap Close -->
        
    <!-- Footer Wrapper -->
    <div id="footer-wrapper"></div>
        
</body>
</html>
    
<?php
	}else{
		header('Location:index.php');
	}
}else{
	header('Location:index.php');
}
?>