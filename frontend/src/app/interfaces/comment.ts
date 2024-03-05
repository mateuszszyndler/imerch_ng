export interface Comment {
  _id: string;
  product_id: string;
  user_id: string;
  text: string;
  rating: number;
  likes: number;
  shares: number;
  status: string;
  history: {
    date: Date;
    action: string;
    content: string;
    precontent?: string;
    userId: string;
  }[];
  deletedAt: Date | null;
  isActive: boolean;
  version: number;
  createdAt: Date;  // here
  updatedAt: Date;  // and here
}
