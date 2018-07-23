<?php
session_start();
include_once('./includes/connection.php');
include_once('./includes/order.php');
include_once('./includes/transaction.php');
$payment_gateway = include_once('./includes/payment_gateway.php');
error_reporting(1);

$response = $_REQUEST;
if (sizeof($response) < 1) {
    exit;
}

$transaction = new Transaction();
$result = $transaction->handleTransaction($response);
