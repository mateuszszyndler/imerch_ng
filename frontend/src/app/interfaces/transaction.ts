// Filename: transaction.model.ts

export interface Transaction {
  _id: string;
  user_id: string;
  order_id?: string;
  payout_id?: string;
  store_id?: string;
  transaction_amount: number;
  transaction_currency: string;
  transaction_fee?: number;
  transaction_date?: Date;
  transaction_status: 'pending' | 'paid' | 'failed';
  transaction_type: 'merch' | 'order' | 'payout' | 'refund' | 'subscription';
  payment_method: string;
  payment_provider: string;
  provider_transaction_id: string;
  receipt?: Buffer;
  p24_token?: string;
  p24_seller_id?: string;
  paypal_order_id?: string;
  paypal_payer_id?: string;
  stripe_charge_id?: string;
  stripe_customer_id?: string;
  card_type?: string;
  cardholder_name?: string;
  card_number?: string;
  card_expiry_date?: string;
  card_security_code?: string;
  deleted_at?: Date;
  is_active?: boolean;
  version?: number;
  timestamps?: boolean;
}
