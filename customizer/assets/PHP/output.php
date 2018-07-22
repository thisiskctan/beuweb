<?php
session_start();
include_once('../../includes/connection.php');
error_reporting(1);

$format = $_REQUEST['format'];
$viewArr = $_SESSION['productArr'];
$outputarr = $_SESSION['outputArr'];
$pngoutarr = $_SESSION['pngOutputArr'];
$userImgArr = $_SESSION['userImagesArr'];
$toolUrl = $_SESSION['toolUrl'];
$editModeArr = $_SESSION['editModeArr'];
$downloadable = 1;


function handleCreateOrder($args)
{
    if (!is_array($args)) {
        throw new \InvalidArgumentException("Argument must be in array format.");
    }

    /**
     * Consider to sanitize all inputs before proceed to save into database.
     */
    $_POST = validateRequest($_POST);

    $data = array_merge($_POST, $args);
    saveOrderInDatabase($data);
}

function saveOrderInDatabase($data)
{
    global $pdo;

    $pdo_cols = array(
        'gender', 'first_name', 'last_name', 'email', 'contact_number',
        'delivery_address', 'delivery_postcode', 'delivery_country',
        'png', 'pdf', 'svg', 'color', 'xs', 's', 'm', 'l', 'xl', 'xxl',
        'promo_code', 'with_promo', 'with_manner', 'total_price', 'status'
    );
    $pdo_cols_val = array_map(function ($val) {
        return ':' . $val;
    }, $pdo_cols);

    $statement = '
        INSERT INTO
        orders ('. implode(', ', $pdo_cols) .') 
        VALUES ('. implode(', ', $pdo_cols_val) .')
    ';
    $query = $pdo->prepare($statement);

    /**
     * Insert value to PDO query
     */
    foreach ($data as $key => $value) {
        $query->bindValue(':' . $key, $value);
    }
    $query->bindValue(':status', "Pending");


    /**
     * Execute PDO
     */
    try {
        $query->execute();
        success($pdo->lastInsertId());
    } catch (\PDOException $e) {
        error($e);
    }
}

function validateRequest($post)
{
    /**
     * You can add validation for each input here.
     */

    $promo_code = $post["promo_code"];
    $with_promo = $post["with_promo"];
    $with_manner = $post["with_manner"];
    $total_price = $post["total_price"];

    $post['first_name'] = $post["first"];
    $post['last_name'] = $post["last"];
    $post['contact_number'] = $post["contact"];
    $post['delivery_address'] = $post["address"];
    $post['delivery_postcode'] = $post["postcode"];
    $post['delivery_country'] = $post["country"];

    unset($post["first"]);
    unset($post["last"]);
    unset($post["contact"]);
    unset($post["address"]);
    unset($post["postcode"]);
    unset($post["country"]);

    $post['total_price'] = calculateTotal($post);
    
    return $post;
}

function calculateTotal($post)
{
    /**
     * Make sure to re-calculate total again.
     * Don't trust frontend value.
     *
     * I leave this calculation part to you.
     */
    
    $xs = $post["xs"];
    $s = $post["s"];
    $m = $post["m"];
    $l = $post["l"];
    $xl = $post["xl"];
    $xxl = $post["xxl"];

    $promo_code = $post["promo_code"];
    $total_price = $post["total_price"];
    $total_price = calculateDiscount($promo_code, $total_price);

    return $total_price;
}

function calculateDiscount($promo_code, $total)
{
    /**
     * You can calculate discount here and minus total price.
     */
    $discount = 0;
    
    return $total - $discount;
}

function success($order_id = null)
{
    echo 'Success' . "\n";

    if (is_null($order_id) || $order_id == 0) {
        throw new \InvalidArgumentException("Order ID cannot be null.");
    }

    $_SESSION['_checkout_order_id'] = $order_id;
    header('Location: ../../checkout.php');
}

function error($e)
{
    /**
     * Your can change what need to do for error.
     */
    
    echo $e->getMessage();
    exit;
}

if (isset($format) && !empty($format)) {
    if ($format=='pdf') {
        require_once 'pdf_output.php';
        $downPath = genpdf($viewArr, $outputarr, $toolUrl, $downloadable);
        $srting = "&&&&";
        echo $downPath;//.$srting.$downloadable;
    }
    if ($format=='svg') {
        require_once 'svg_output.php';
        $downPath = gensvg($outputarr, $userImgArr, $downloadable);
        $srting = "&&&&";
        echo $downPath;//.$srting.$downloadable;
    }
    if ($format=='png') {
        require_once 'png_output.php';
        $downPath = genpng($pngoutarr, $downloadable, $viewArr, $editModeArr, $toolUrl);
        $srting = "&&&&";
        echo $downPath;//$srting.$downloadable;
    }
    if ($format=='all') {
        require_once 'pdf_output.php';
        $downPathPdf = genpdf($viewArr, $outputarr, $toolUrl, $downloadable);
        $srting = "&&&&";

        require_once 'svg_output.php';
        $downPathSvg = gensvg($outputarr, $userImgArr, $downloadable);
        $srting = "&&&&";

        require_once 'png_output.php';
        $downPathPng = genpng($pngoutarr, $downloadable, $viewArr, $editModeArr, $toolUrl);
        $srting = "&&&&";

        $params = array(
            'png' => $downPathPng,
            'pdf' => $downPathPdf,
            'svg' => $downPathSvg,
        );
        handleCreateOrder($params);
        exit;


        /**
         * Consider to sanitize all inputs before proceed to save into database.
         */

        $pdo_cols = array(
            'gender', 'first_name', 'last_name', 'email', 'contact_number',
            'delivery_address', 'delivery_postcode', 'delivery_country',
            'png', 'pdf', 'svg', 'color', 'xs', 's', 'm', 'l', 'xl', 'xxl',
            'promo_code', 'with_promo', 'with_manner', 'total_price', 'status'
        );
        $statement = '
            INSERT INTO
            orders ('. implode(', ', $pdo_cols) .') 
            VALUES ('. implode(', ', array_fill(0, sizeof($pdo_cols), '?')) .')
        ';

        $query = $pdo->prepare($statement);

        $query->bindValue(1, $gender);
        $query->bindValue(2, $first);
        $query->bindValue(3, $last);
        $query->bindValue(4, $email);
        $query->bindValue(5, $contact);
        $query->bindValue(6, $address);
        $query->bindValue(7, $postcode);
        $query->bindValue(8, $country);
        $query->bindValue(9, $downPathPng);
        $query->bindValue(10, $downPathPdf);
        $query->bindValue(11, $downPathSvg);
        $query->bindValue(12, $color);
        $query->bindValue(13, $xs);
        $query->bindValue(14, $s);
        $query->bindValue(15, $m);
        $query->bindValue(16, $l);
        $query->bindValue(17, $xl);
        $query->bindValue(18, $xxl);
        $query->bindValue(19, $promo_code);
        $query->bindValue(20, $with_promo);
        $query->bindValue(21, $with_manner);
        $query->bindValue(22, $total_price);
        $query->bindValue(23, "Pending");


        try {
            $query->execute();
            $_SESSION['_checkout_order_id'] = $pdo->lastInsertId();

            exit;
            header('Location: ../../checkout.php');
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }
}
