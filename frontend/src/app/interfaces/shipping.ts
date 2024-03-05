export interface Shipping {
  _id: string;
  carrier: string;
  estimatedDeliveryTime: string;
  cost: number;
  deletedAt?: Date;
  isActive: boolean;
  version: number;
}
