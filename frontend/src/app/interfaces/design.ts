export interface Design {
  _id: string;
  name: string;
  user_id: string;
  product_id: string;
  predefined_product_id: string;
  images: string[];
  design_preview: string[];
  design_file_urls: string[];
  dimensions: {
    width: number;
    height: number;
    top: number;
    left: number;
  };
  deletedAt: Date | null;
  isActive: boolean;
  version: number;
}
