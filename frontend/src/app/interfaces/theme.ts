// Filename: theme.model.ts

export interface Theme {
  _id: string;
  name: string;
  store_id: string; // assuming these are strings as they are ObjectIds
  user_id: string; // same assumption as store_id
  deleted_at?: Date | null; // optional and can be Date or null
  is_active: boolean;
  version: number;
  primary_color?: string; // optional properties
  secondary_color?: string;
  background_color?: string;
  font?: string;
  header_image?: string;
  footer_image?: string;
  menu_image?: string;
  background_image?: string;
  custom_css?: string;
  createdAt?: Date; // added for the findByCreatedAtRange query method
  updatedAt?: Date; // added assuming timestamps: true in Mongoose adds this field
}
