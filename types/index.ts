// Product Types
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  brandId: number | null;
  brand: Brand | null;
  categoryId: number;
  category: Category | null;
  variants: ProductVariant[];
  previewVideoId: number | null;
  status: ProductStatus;
  badge?: string | null;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: number;
  price: number;
  compareAtPrice?: number | null;
  stock: number;
  barcode: string;
  sku: string;
  thumbnails: Image[];
  options: ProductVariantOption[];
}

export interface ProductVariantOption {
  id: number;
  title: string;
  value: string;
}

export enum ProductStatus {
  Draft = 0,
  Active = 1,
  Inactive = 2,
  Deleted = 3,
}

// Category Types
export interface Category {
  id: number;
  name: string;
  slug: string;
  parentCategoryId: number | null;
  imageId: number | null;
  image: Image | null;
  children: Category[];
  attributes: CategoryAttribute[];
  productCount?: number;
}

export interface CategoryAttribute {
  inputType: string;
  label: string;
  options: string[] | null;
}

// Brand Types
export interface Brand {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  websiteUrl: string | null;
  logoUrl?: string | null;
}

// Cart Types
export interface CartItem {
  id: number;
  variantId: number;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  isSelected: boolean;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Image Types
export interface Image {
  id: number;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

// User Types
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}

// Sort Types
export enum SortBy {
  Recommended = 0,
  PriceLowToHigh = 1,
  PriceHighToLow = 2,
  Newest = 3,
  BestSelling = 4,
  TopRated = 5,
  NameAZ = 6,
  NameZA = 7,
}

// Filter Types
export interface ProductFilters {
  categorySlug?: string;
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: SortBy;
  page?: number;
  pageSize?: number;
  search?: string;
}
