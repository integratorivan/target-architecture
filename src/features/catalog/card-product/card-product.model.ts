import { action } from '@reatom/core';

import type { ProductModel } from '$shared/domain/product/product.types';
import { addProductToCartAction } from '$features/cart/cart.model';

// UI card triggers cart domain action; keep cart naming for state/side effects
export const handleAddProductToCartAction = action((product: ProductModel) => {
    addProductToCartAction(product);
}, 'handleAddProductToCartAction');
