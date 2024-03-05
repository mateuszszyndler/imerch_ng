export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  deletedAt: Date | null;
  isActive: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}
