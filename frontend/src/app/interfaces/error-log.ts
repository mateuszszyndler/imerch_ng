export interface ErrorLog {
  event_name: string;
  event_data: any;
  stack: string;
  timestamp: Date;
  url: string;
  referrer_url: string;
  device_info: string;
  // user_id: string;
  additionalData: any;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}
