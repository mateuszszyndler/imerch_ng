// payment.model.ts

export interface Payment {
  _id: string;
  name: string;
  apiKey: string;
  apiUrl: string;
  p24_merchant_id?: string;
  p24_pos_id?: string;
  p24_crc?: string;
  stripe_secret_key?: string;
  stripe_publishable_key?: string;
  paypal_client_id?: string;
  paypal_client_secret?: string;
  card_payment_gateway_username?: string;
  card_payment_gateway_password?: string;
  card_payment_gateway_url?: string;
  is_active?: boolean;
  deleted_at?: Date | null;
}
