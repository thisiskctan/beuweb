<?php
session_set_cookie_params(0);
session_start();

include_once('../includes/connection.php');

if(isset($_SESSION['logged_in'])){
	
	if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 300)) {
   	 	// request 30 minates ago
    	session_destroy();
    	session_unset();
	}
	$_SESSION['LAST_ACTIVITY'] = time(); // update last activity time
	
?>
	
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>BeU - Admin Page</title>
    <link rel="stylesheet">
</head>
        
<body>
        
	<!-- Header Wrapper -->
<div id="header-wrapper"></div>
                
	<!-- Main Wrapper -->
	<div id="main-wrapper">
                
        <h4>Please choose one of the following:</h4>
        <br/>
        
        <a href="edit.php" class="admin_a">Check Orders</a><br/><br/>
        <a href="logout.php" class="admin_a">Logout</a><br/><br/>

	</div><!-- Main Wrap Close -->
        
	<!-- Footer Wrapper -->
	<div id="footer-wrapper"></div>
        
</body>
</html>
    
    
    
<?php
}else{
	if(isset($_POST['username'],$_POST['password'])){
		$username = $_POST['username'];
		$password = $_POST['password'];
		
		if(empty($username) or empty($password)){
			$error = 'All fields are required.';
		}else{
			$query=$pdo->prepare("SELECT * FROM users WHERE user_name=? AND user_password=?");
			
			$query->bindValue(1,$username);
			$query->bindValue(2,$password);
			
			$query->execute();
			
			$num = $query->rowCount();
			
			if($num==1){
				//user entered correct details
				$_SESSION['logged_in']=true;
				
				header('Location:index.php');
				exit();
			}else{
				//user entered false details
				$error='Incorrect details!';
			}
		}
	}
?>
	
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>BeU - Admin Page</title>
    <link rel="stylesheet">
</head>
        
<body>
        
	<!-- Header Wrapper -->
	<div id="header-wrapper"></div>
                
    <!-- Main Wrapper -->
    <div id="main-wrapper">

        <h4>Kindly login to access admin page</h4>
        
        <?php if(isset($error)){  ?>
       		<small style="color:#aa0000"><?php echo $error; ?>
        	<br/><br/>
        <?php  }  ?>
                                    
        <form action="index.php" method="post" autocomplete="off">
            <input type="text" name="username" placeholder="Username"/>
            <input type="password" name="password" placeholder="Password"/>
            <input type="submit" value="Login"/>
        </form>

	</div><!-- Main Wrap Close -->
        
	<!-- Footer Wrapper -->
	<div id="footer-wrapper"></div>
        
</body>
</html>
	
<?php
}
?>