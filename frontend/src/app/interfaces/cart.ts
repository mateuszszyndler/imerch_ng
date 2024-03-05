export interface CartItem {
  _id: string;
  product_id: string;
  images: string[];
  name: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
  type?: string;
  tax?: number;
  discount?: number;
}

export enum CartStatus {
  New = 'new',
  Pending = 'pending',
  Paid = 'paid',
  Failed = 'failed',
  Cancelled = 'cancelled',
  Refunded = 'refunded',
  Completed = 'completed',
}

export enum DeliveryStatus {
  Pending = 'pending',
  Shipped = 'shipped',
  Delivered = 'delivered',
}

export interface DiscountApplied {
  discount_amount?: number;
  description?: string;
}

export interface DeliveryAddress {
  address_name: string;
  business_name?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state_id: string;
  country_id: string;
  zip_code: string;
  phone_number: string;
  is_default?: boolean;
  is_business?: boolean;
}

export interface Delivery {
  shipping_id: string;
  tracking_number: string;
  delivery_time: string;
  delivery_cost: number;
  delivery_status: DeliveryStatus;
}

export interface BillingAddress {
  address_name: string;
  business_name?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state_id: string;
  country_id: string;
  zip_code: string;
  phone_number: string;
  is_default?: boolean;
  is_business?: boolean;
}

export interface Cart {
  _id: string;
  user_id: string;
  session_id?: string;
  items: CartItem[];
  subtotal?: number;
  tax?: number;
  discount?: number;
  coupon?: string;
  payment_fee?: number;
  total_price?: number;
  deleted_at?: Date;
  is_active: boolean;
  status?: CartStatus;
  version: number;
  currency?: string;
  notes?: string;
  is_empty: boolean;
  discounts_applied?: DiscountApplied[];
  delivery: Delivery;
  delivery_address: DeliveryAddress[];
  billing_address: BillingAddress[];
  billing_same_as_shipping?: boolean;
  payment_method: string;
  additional_fields?: any;
}
