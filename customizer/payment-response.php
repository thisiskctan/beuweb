<?php
session_start();
include_once('./includes/connection.php');
include_once('./includes/order.php');
include_once('./includes/transaction.php');
$payment_gateway = include_once('./includes/payment_gateway.php');
error_reporting(1);

$response = $_REQUEST;
if (sizeof($response) < 1) {
    header('Location: ../../');
}

if (isset($_SESSION['_checkout_order_id'])) {
    unset($_SESSION['_checkout_order_id']);
}

// var_dump($response);
// exit;

$transaction = new Transaction();
$result = $transaction->handleTransaction($response);

if ($result['status'] === 'success') {
    /**
     * Can redirect user to success page.
     */
    
    // header('Location: ./order-complete.php');
} else {
    /**
     * Can redirect user to error page.
     * with message = $result['message'].
     */
    
    // header('Location: ./order-reject.php');
}
print_r($result);
