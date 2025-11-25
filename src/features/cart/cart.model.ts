import { action, reatomArray } from '@reatom/framework';

import { addProductToCart, removeProductById } from '$shared/domain/cart/cart.model';
import type { CartProductModel } from '$shared/domain/cart/cart.types';
import type { ProductModel } from '$shared/domain/product/product.types';

export const addedProductsArray = reatomArray<CartProductModel>([], 'addedProductsArray');

export const addProductToCartAction = action((ctx, product: ProductModel) => {
    const currentCart = ctx.get(addedProductsArray);

    addedProductsArray(ctx, addProductToCart(product, currentCart));
}, 'addProductToCartAction');

export const removeProductFromCartAction = action((ctx, productId: CartProductModel['id']) => {
    const currentCart = ctx.get(addedProductsArray);

    addedProductsArray(ctx, removeProductById(currentCart, productId));
}, 'removeProductFromCartAction');
