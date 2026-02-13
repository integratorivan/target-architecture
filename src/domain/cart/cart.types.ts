import type { ProductModel } from '../product/product.types';

export type CartProductModel = ProductModel & { date_added: Date };
