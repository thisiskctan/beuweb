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
    
    public function record($data)
    {
        global $pdo;

        $data['created_at'] = date('Y-m-d H:i:s');
        $data['updated_at'] = date('Y-m-d H:i:s');

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

        /**
         * Execute PDO
         */
        try {
            $query->execute();
        } catch (\PDOException $e) {
            error($e);
        }
    }

    public function handleTransaction($post)
    {
        $response = array();
        $isError = false;

        $order_id = isset($post['MerchantOrdID']) ? $post['MerchantOrdID'] : null;
        $order_id = $this->convertToNormalId($order_id);

        $data = array(
            'order_id'          => $order_id,
            'ptxn_id'           => isset($post['PTxnID']) ? $post['PTxnID'] : null,
            'ptxn_status'       => isset($post['PTxnStatus']) ? $post['PTxnStatus'] : null,
            'ptxn_msg'          => isset($post['PTxnMsg']) ? $post['PTxnMsg'] : null,
            'txntype'           => isset($post['TxnType']) ? $post['TxnType'] : null,
            'method'            => isset($post['Method']) ? $post['Method'] : null,
            'merchant_id'       => isset($post['MerchantID']) ? $post['MerchantID'] : null,
            'merchant_pymtid'   => isset($post['MerchantPymtID']) ? $post['MerchantPymtID'] : null,
            'merchant_ordid'    => isset($post['MerchantOrdID']) ? $post['MerchantOrdID'] : null,
            'merchant_txnamt'   => isset($post['MerchantTxnAmt']) ? $post['MerchantTxnAmt'] : null,
            'merchant_currcode' => isset($post['MerchantCurrCode']) ? $post['MerchantCurrCode'] : null,
            'sign'              => isset($post['Sign']) ? $post['Sign'] : null,
            'acqbank'           => isset($post['AcqBank']) ? $post['AcqBank'] : null,
            'bankrefno'         => isset($post['BankRefNo']) ? $post['BankRefNo'] : null,
            'authcode'          => isset($post['AuthCode']) ? $post['AuthCode'] : null,
        );
        $this->record($data);

        $order = new Order;
        $order = $order->fetch_data($data['order_id']);

        if (!$this->isSignatureMatch($data, $order)) {
            $response['status'] = 'error';
            $response['message'] = 'Signature not match.';

            $isError = true;
        }
        if (!$this->isOrderExists($data, $order)) {
            $response['status'] = 'error';
            $response['message'] = 'Order is not exist in our system.';

            $isError = true;
        }
        if (!$this->isPaymentStatusSuccess($data, $order)) {
            $response['status'] = 'error';
            $response['message'] = 'Transaction Failed.';

            $isError = true;
        }
        if (!$this->isAmountEqual($data, $order)) {
            $response['status'] = 'error';
            $response['message'] = 'Amount you paid is less than it should be.';

            $isError = true;
        }

        if ($isError === true) {
            $this->updateOrderStatus($data, 'Reject');
        } else {
            $response['status'] = 'success';
            $response['message'] = 'All good!';

            $this->updateOrderStatus($data, 'Paid');
        }
        

        return $response;
    }

    public function convertToNormalId($order_id)
    {
        $order_id = ltrim($order_id, "A");
        $order_id = ltrim($order_id, "0");

        return $order_id;
    }

    public function isSignatureMatch($provided, $order)
    {
        global $payment_gateway;

        $data = array(
            $payment_gateway['merchant_password'],
            $provided['merchant_id'],
            $provided['merchant_pymtid'],
            $provided['ptxn_id'],
            $provided['merchant_ordid'],
            $provided['merchant_txnamt'],
            $provided['merchant_currcode'],
            $provided['ptxn_status'],
            $provided['AuthCode'],
        );
        $signature = hash('sha512', implode('', $data));

        if ($signature != $provided['sign']) {
            return false;
        }

        return true;
    }

    public function isOrderExists($provided, $order)
    {
        global $payment_gateway;

        if (is_null($order)) {
            return false;
        }
        if ($order['order_id'] != $provided['order_id']) {
            return false;
        }

        return true;
    }

    public function isPaymentStatusSuccess($provided, $order)
    {
        if ($provided['ptxn_status'] != '0') {
            return false;
        }

        return true;
    }

    public function isAmountEqual($provided, $order)
    {
        if ($provided['merchant_txnamt'] != $this->moneyFormat($order['total_price'])) {
            return false;
        }

        return true;
    }

    public function updateOrderStatus($provided, $status)
    {
        $order = new Order;
        $order = $order->update_status($provided['order_id'], $status);

        return $response;
    }

    public function moneyFormat($value = 0)
    {
        return str_replace(',', '', number_format($value, 2));
    }
}
