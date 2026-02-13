import { action, reatomArray } from '@reatom/core';

import { addProductToCart, removeProductById } from '$shared/domain/cart/cart.model';
import type { CartProductModel } from '$shared/domain/cart/cart.types';
import type { ProductModel } from '$shared/domain/product/product.types';

export const addedProductsArray = reatomArray<CartProductModel>([], 'addedProductsArray');

export const addProductToCartAction = action((product: ProductModel) => {
    const currentCart = addedProductsArray();

    addedProductsArray.set(addProductToCart(product, currentCart));
}, 'addProductToCartAction');

export const removeProductFromCartAction = action((productId: CartProductModel['id']) => {
    const currentCart = addedProductsArray();

    addedProductsArray.set(removeProductById(currentCart, productId));
}, 'removeProductFromCartAction');
