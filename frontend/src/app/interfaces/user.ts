export type UserRole = 'client' | 'partner' | 'admin';
export type SubscriptionPlan = 'user' | 'basic' | 'pro' | 'vip';
export type SubscriptionType = 'monthly' | 'quarterly' | 'annually';
export type SubscriptionStatus =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'cancelled'
  | 'expired';

export interface SocialMediaProfile {
  platform: string;
  profile_url: string;
}

export interface Address {
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

export interface Subscription {
  id?: string;
  start_date?: Date;
  expiration_date?: Date;
  plan: SubscriptionPlan;
  type: SubscriptionType;
  price: number;
  discount: number;
  subscription_status: SubscriptionStatus;
}

export interface AuthMethod {
  auth_method: string;
  provider_id: string;
}

export interface BusinessSocialMedia {
  platform: string;
  profile_url: string;
}

export interface BusinessCategory {
  business_type: string;
  business_category: string;
  business_subcategory: string;
}

export interface TaxNumbers {
  NIP: string;
  Regon: string;
  KRS: string;
}

export interface PartnerProfile {
  business_name: string;
  business_email: string;
  business_website: string;
  business_description: string;
  business_logo: string;
  business_social_media: BusinessSocialMedia[];
  business_categories: BusinessCategory[];
  stores: string[];
  themes: string[];
  tax_numbers: TaxNumbers;
}

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password_reset_token?: string;
  password_reset_token_expiration?: Date;
  password_refresh_token?: string;
  role?: string;
  avatar?: string;
  subscription?: Subscription;
  social_media_profiles?: SocialMediaProfile[];
  address?: Address[];
  last_delivery_method?: string;
  profile_history?: any[];
  wishlist?: string[];
  cart?: string[];
  partner_profile?: PartnerProfile[];
  transactions?: string[];
  orders?: string[];
  user_rating?: number;
  comments?: string[];
  auth_methods?: AuthMethod[];
  is_active?: boolean;
  is_verified?: boolean;
  deleted_at?: Date | null;
  token?: string;
}
