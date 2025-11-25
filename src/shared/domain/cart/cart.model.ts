import type { ProductModel } from '../product/product.types';
import type { CartProductModel } from './cart.types';

export const addProductToCart = (
    newProduct: ProductModel,
    productList: CartProductModel[],
    now: () => Date = () => new Date(),
): CartProductModel[] => {
    return [...productList, { ...newProduct, date_added: now() }];
};
