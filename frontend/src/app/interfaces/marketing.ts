export interface Marketing {
  _id: string;
  name: string;
  description: string | null;
  startDate: Date;
  endDate: Date;
  deletedAt: Date | null;
  isActive: boolean;
  version: number;
}
