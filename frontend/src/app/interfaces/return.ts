export interface Return {
  _id: string;
  title: string;
  description?: string;
  deletedAt?: Date;
  isActive: boolean;
  version: number;
  timePeriod?: string;
  refundMethod?: string;
  restockingFee?: number;
  returnShippingFee?: number;
  exceptions?: string[];
}
