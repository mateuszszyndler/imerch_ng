export interface Subscription {
  _id: string;
  name: string;
  description: string;
  type: 'client' | 'basic' | 'pro' | 'vip';
  price: number;
  discount?: number;
  configuration: { name: string; value: any }[];
  features?: string[];
  benefits?: string[];
  deleted_at?: Date | null;
  is_active?: boolean;
  version?: number;
}
