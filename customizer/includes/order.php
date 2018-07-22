<?php

class Order{
	public function fetch_all(){
		global $pdo;
		
		$query = $pdo->prepare("SELECT * FROM orders");
		$query->execute();
		
		return $query->fetchAll();
	}
	
	public function fetch_data($order_id){
		global $pdo;
		
		$query = $pdo->prepare("SELECT * FROM orders WHERE order_id=?");
		$query->bindValue(1,$order_id);
		$query->execute();
		
		return $query->fetch();
	}
	
}

?>