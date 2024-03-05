// order.model.ts

export enum DeliveryStatus {
  Pending = 'pending',
  Shipped = 'shipped',
  Delivered = 'delivered',
}

export enum OrderStatus {
  Pending = 'pending',
  Paid = 'paid',
  Failed = 'failed',
  Shipped = 'shipped',
  Delivered = 'delivered',
}

export interface ProductItem {
  product_id: string;
  name: string;
  images: string[];
  price: number;
  discount?: number;
  color?: string;
  size?: string;
  type?: string;
  quantity: number;
}

export interface Address {
  address_name: string;
  business_name?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  phone_number: string;
  is_default?: boolean;
  is_business?: boolean;
}

export interface Payment {
  transaction_id: string;
  amount: number;
  payment_method: string;
  transaction_status: string;
}

export interface Delivery {
  shipping_id: string;
  tracking_number: string;
  delivery_time: string;
  delivery_cost: number;
  delivery_status: DeliveryStatus;
}

export interface Invoice {
  invoice_number: string;
  payment_due_date: Date;
  notes?: string;
  deleted_at?: Date;
  is_active: boolean;
  version?: number;
  invoice_document?: ArrayBuffer;
}

export interface OrderHistory {
  status: string;
  notes?: string;
  updated_at: Date;
}

export interface Refund {
  refund_id: string;
  amount: number;
  refund_status: string;
  refund_reason: string;
  refund_address: string;
}

export interface Order {
  _id: string;
  order_number: string;
  user_id: string;
  products: ProductItem[];
  notes?: any;
  total_price: number;
  delivery_address: Address[];
  payment: Payment[];
  delivery: Delivery[];
  invoice: Invoice[];
  status: OrderStatus;
  order_history: OrderHistory[];
  promotion_codes?: string[];
  refunds: Refund[];
  deleted_at?: Date;
  is_active?: boolean;
  version?: number;
}
