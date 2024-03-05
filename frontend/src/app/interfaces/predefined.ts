// File: product.model.ts

export enum Category {
  TShirt = "tshirt",
  Hoodie = "hoodie",
  Sweatshirt = "sweatshirt",
  TankTop = "tanktop",
  LongSleeve = "longsleeve",
  Polo = "polo",
  Jacket = "jacket",
  Shorts = "shorts",
  Pants = "pants",
  Hat = "hat",
  Bag = "bag",
  Shoes = "shoes",
  Socks = "socks",
  Accessories = "accessories",
}

export enum PrintAreaName {
  LargePlate = "Large Plate",
  MediumPlate = "Medium Plate",
  SmallPlate = "Small Plate",
  SleevePrintingPlate = "Sleeve Printing Plate",
}

export enum Unit {
  Cm = "cm",
  Mm = "mm",
  In = "in",
  Px = "px",
}

export interface PrintArea {
  name: PrintAreaName;
  description: string;
  width: number;
  height: number;
  unit: Unit;
}

export enum SizeName {
  Xs = "xs",
  S = "s",
  M = "m",
  L = "l",
  Xl = "xl",
  Xxl = "xxl",
  Xxxl = "xxxl",
}

export enum SizeSystem {
  Us = "us",
  Eu = "eu",
  Uk = "uk",
  Cm = "cm",
  In = "in",
}

export enum SizeType {
  Regular = "regular",
  Slim = "slim",
  Loose = "loose",
  Oversize = "oversize",
}

export interface Dimensions {
  length?: number;
  width?: number;
  height?: number;
  diameter?: SizeName;
  gauge?: number;
}

export interface Size {
  name: SizeName;
  description: string;
  dimensions: Dimensions;
  size_system?: SizeSystem;
  size_type?: SizeType;
}

export enum ProductType {
  Man = "man",
  Woman = "woman",
  Unisex = "unisex",
  Kids = "kids",
  Baby = "baby",
}

export interface Predefined {
  _id: string;
  name: string;
  description: string;
  category: Category;
  print_areas: PrintArea[];
  sizes: Size[];
  colors: string[];
  images: string[];
  type: ProductType;
  tax: number;
  price: number;
  availability?: boolean;
  quantity?: number;
  created_at?: Date;
  deleted_at?: Date | null;
  is_active?: boolean;
  version?: number;
  timestamps?: boolean;
}
