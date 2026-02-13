import { action } from '@reatom/core';

import type { ProductModel } from '$domain/product';
import { addProductToCartAction } from '$entities/cart';

// UI card triggers cart domain action; keep cart naming for state/side effects
export const handleAddProductToCartAction = action((product: ProductModel) => {
    addProductToCartAction(product);
}, 'handleAddProductToCartAction');
