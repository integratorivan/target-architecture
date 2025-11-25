import type { ProductModel } from '../product/product.types';
import type { CartProductModel } from './cart.types';

export const addProductToCart = (
    newProduct: ProductModel,
    productList: CartProductModel[],
    now: () => Date = () => new Date(),
): CartProductModel[] => {
    return [...productList, { ...newProduct, date_added: now() }];
};

export const removeProductById = (
    productList: CartProductModel[],
    productId: CartProductModel['id'],
): CartProductModel[] => {
    return productList.filter(({ id }) => id !== productId);
};

export const hasProduct = (
    productList: CartProductModel[],
    productId: CartProductModel['id'],
): boolean => {
    return productList.some(({ id }) => id === productId);
};
