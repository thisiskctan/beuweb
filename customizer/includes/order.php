<?php

class Order
{
    public function fetch_all()
    {
        global $pdo;
        
        $query = $pdo->prepare("SELECT * FROM orders");
        $query->execute();
        
        return $query->fetchAll();
    }
    
    public function fetch_data($order_id)
    {
        global $pdo;
        
        $query = $pdo->prepare("SELECT * FROM orders WHERE order_id=?");
        $query->bindValue(1, $order_id);
        $query->execute();
        
        return $query->fetch();
    }

    public function update_status($order_id, $status)
    {
        global $pdo;
        
        $query = $pdo->prepare("UPDATE orders SET status=? WHERE order_id=?");
        $query->bindValue(1, $status);
        $query->bindValue(2, $order_id);
        $query->execute();
        
        return $query->fetch();
    }

    public function checkout($order)
    {
        global $payment_gateway;
        $order_id = 'A'.str_pad($order->order_id, 5, '0', STR_PAD_LEFT);

        $data = array(
            'email'        => $order->email,
            'name'         => "{$order->first_name} {$order->last_name}",
            'phone'        => $order->contact_number,
            'ipaddress'    => $this->customerIp(),
            'paymentid'    => $order_id . "." . time(),
            'orderid'      => $order_id,
            'ordercurr'    => $payment_gateway['currency'],
            'orderamt'     => $this->moneyFormat($order->total_price),
            'ordertext'    => "Payment for item:{$order_id}",
            'response_url' => $payment_gateway['response_url'],
            'callback_url' => $payment_gateway['callback_url'],
        );
        $data['signature'] = $this->generateSignature($data);
        $payment = (object) $data;

        return $payment;
    }

    public function generateSignature($data)
    {
        global $payment_gateway;

        $data = array(
            $payment_gateway['merchant_password'],
            'PAY',
            $payment_gateway['merchant_id'],
            $data['paymentid'],
            $data['orderid'],
            $data['response_url'],
            $data['orderamt'],
            'MYR',
            $data['ipaddress'],
            $data['callback_url'],
        );

        return hash('sha512', implode('', $data));
    }

    public function moneyFormat($value = 0)
    {
        return str_replace(',', '', number_format($value, 2));
    }

    public function customerIp()
    {
        return $_SERVER['REMOTE_ADDR']?:($_SERVER['HTTP_X_FORWARDED_FOR']?:$_SERVER['HTTP_CLIENT_IP']);
    }
}
