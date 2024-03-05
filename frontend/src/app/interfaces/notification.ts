export interface Notification {
  _id: string;
  user_id: string;
  message: string;
  type: string;
  deletedAt: Date | null;
  isRead: boolean;
  isActive: boolean;
  version: number;
}
