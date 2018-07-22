<?php

class Transaction
{
    public function fetch_all()
    {
        global $pdo;
        
        $query = $pdo->prepare("SELECT * FROM transactions");
        $query->execute();
        
        return $query->fetchAll();
    }
    
    public function fetch_data($order_id)
    {
        global $pdo;
        
        $query = $pdo->prepare("SELECT * FROM transactions WHERE order_id=?");
        $query->bindValue(1, $order_id);
        $query->execute();
        
        return $query->fetch();
    }
    
    public function record($order_id)
    {
        global $pdo;

        $order_details = $this->get_transaction_details($order_id);
        $status = '';
        $message = '';
        $created_at = now();
        $updated_at = now();

        $data = array(
            'order_id'         => $order_details->orderid,
            'transaction_id'   => '',
            'transaction_date' => '',
            'status'           => '',
            'type'             => '',
            'merchant_id'      => '',
            'app_id'           => '',
            'user_id'          => '',
            'payment_method'   => '',
            'country_code'     => '',
            'payment_paid'     => '',
            'currency'         => '',
            'gross_received'   => '',
            'transaction_fee'  => '',
            'net_received'     => '',
        );

        $pdo_cols_val = array_map(function ($val) {
            return ':' . $val;
        }, array_keys($data));

        $statement = '
            INSERT INTO
            transactions ('. implode(', ', array_keys($data)) .') 
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
        } catch (\PDOException $e) {
            error($e);
        }
    }

    public function get_transaction_details($order_id)
    {
        global $payment_gateway;

        $signature_data = array(
            $payment_gateway['merchant_id'],
            $order_id,
            $payment_gateway['app_secret'],
        );
        $signature = md5(implode('', $signature_data));

        $order = new Order();
        $clear_order_id = ltrim($order_id, 'A');
        $clear_order_id = ltrim($clear_order_id, '0');
        $order = (object) $order->fetch_data($clear_order_id);

        $email = $order->email;
        $email = $order->email;

        $data = array(
            'mid'        => $merchant_id,
            'appid'      => $payment_gateway['app_id'],
            'muid'       => $email,
            'orderid'    => $order_id,
            'msignature' => $signature,
        );

        $checkout_params = http_build_query($data);
        $payment_entry_point = "https://www.paydibs.com:8443/upaytest/call_returntran";
        $payment_gateway_url = $payment_entry_point . "?" . $checkout_params;

        $response = file_get_contents($payment_gateway_url);


        /**
         * Stuck cannot test output provided by server.
         */


        return null;
    }
}
