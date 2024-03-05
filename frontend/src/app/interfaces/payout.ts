export interface Payout {
  _id: string;
  user_id: string;
  amount: number;
  currency: string;
  paymentType: string;
  paymentDate: Date;
  transaction_id: string;
  status: string;
  deletedAt?: Date;
  isActive: boolean;
  version: number;
  payerName: string;
  payerEmail: string;
  payeeName: string;
  payeeEmail: string;
  payeeBankAccount: string;
  transactionReference: string;
  paymentGatewayReference: string;
  feeAmount: number;
  feeCurrency: string;
  metadata?: Record<string, unknown>;
}
