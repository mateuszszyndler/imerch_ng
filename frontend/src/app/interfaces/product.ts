export interface Product {
  _id: string;
  name: string;
  description: string;
  design_id: string;
  category: string;
  store_id: string;
  predefined_id: string;
  comments: Array<string>;
  sizes: Array<string>;
  colors: Array<string>;
  quantity: number;
  images: Array<string>;
  rating: number;
  type: string;
  tax: number;
  price: number;
  availability: boolean;
  preview_images: Array<string>;
  deletedAt?: Date;
  isActive: boolean;
  version: number;
  timestamps: boolean;
  best: boolean;
}
