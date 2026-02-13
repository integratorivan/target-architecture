import { action, reatomArray } from '@reatom/core';

import { addProductToCart, type CartProductModel } from '$domain/cart';
import type { ProductModel } from '$domain/product';

export const addedProductsArray = reatomArray<CartProductModel>([], 'addedProductsArray');

export const addProductToCartAction = action((product: ProductModel) => {
    const currentCart = addedProductsArray();

    addedProductsArray.set(addProductToCart(product, currentCart));
}, 'addProductToCartAction');
