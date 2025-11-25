import { action, reatomArray } from '@reatom/framework';

import { createCartEntity } from '$entities/cart/cart.model';
import type { CartProductModel } from '$shared/domain/cart/cart.types';
import type { ProductModel } from '$shared/domain/product/product.types';

const cartEntity = createCartEntity();

export const addedProductsArray = reatomArray<CartProductModel>([], 'addedProductsArray');

export const addProductToCartAction = action((ctx, product: ProductModel) => {
    const currentCart = ctx.get(addedProductsArray);

    addedProductsArray(ctx, cartEntity.addProduct(currentCart, product));
}, 'addProductToCartAction');

export const removeProductFromCartAction = action((ctx, productId: CartProductModel['id']) => {
    const currentCart = ctx.get(addedProductsArray);

    addedProductsArray(ctx, cartEntity.removeProductById(currentCart, productId));
}, 'removeProductFromCartAction');
