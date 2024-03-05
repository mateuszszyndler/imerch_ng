export interface ChangeHistory {
  timestamp?: Date;
  user_id: string; // This is a reference to another schema and thus we're just storing the id
  details: Record<string, any>; // Mixed type in Mongoose schema translates to a Record type in TypeScript
}

export interface Store {
  _id: string;
  name: string;
  description?: string;
  store_details?: Record<string, any>; // Mixed type in Mongoose schema translates to a Record type in TypeScript
  avatar?: string;
  user_id: string; // This is a reference to another schema and thus we're just storing the id
  theme_id?: string; // This is a reference to another schema and thus we're just storing the id
  customizations?: Record<string, any>; // Mixed type in Mongoose schema translates to a Record type in TypeScript
  products?: string[]; // Array of ids referring to products
  deleted_at?: Date;
  is_active?: boolean;
  version?: number;
  transactions?: string[]; // Array of ids referring to transactions
  inventory?: Record<string, any>[]; // Array of Mixed type translates to an array of Record type
  order_history?: string[]; // Array of ids referring to orders
  sales?: number[];
  order_count?: number;
  reviews?: string[]; // Array of ids referring to comments
  change_history?: ChangeHistory[]; // Using the '_id' as required by your specific guidelines
}
