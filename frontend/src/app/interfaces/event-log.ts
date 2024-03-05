export interface EventLog {
  event_name: string;
  event_data: any;
  // user_id: string;
  ip_address: string;
  user_agent: string;
  referrer: string;
  page_url: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}
