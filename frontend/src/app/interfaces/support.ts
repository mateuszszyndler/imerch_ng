export interface Support {
  _id: string;
  user_id: string;
  assigned_to: string;
  area: string;
  subject: string;
  description: string;
  status: 'open' | 'closed' | 'in progress';
  priority: 'low' | 'medium' | 'high';
  tags?: string[];
  attachments?: { name: string; url: string }[];
  user_name: string;
  user_email: string;
  user_phone?: string;
  resolution?: string;
  is_active?: boolean;
  deleted_at?: Date | null;
  version?: number;
  activity_log?: { user_id: string; action: string; timestamp: Date }[];
}
