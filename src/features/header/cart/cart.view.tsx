import { reatomComponent } from '@reatom/npm-react';

import { FileLabel } from '$shared/ui-kit/file-label';
import { addedProductsArray } from '$features/cart/cart.model';

export const CartView = reatomComponent(({ ctx }) => {
    const addedProducts = ctx.spy(addedProductsArray);

    console.log(addedProducts);

    return addedProducts.map((product, index) => (
        <div
            key={index}
            style={{ borderBottom: '1px solid gray', padding: '8px 0', position: 'relative' }}
        >
            <FileLabel color="#735BE8">features/header/cart/cart.view.tsx</FileLabel>
            <div data-id="product-name">Product: {product.title}</div>
            <div data-id="product-price">Price: ${product.price}</div>
        </div>
    ));
}, 'CartView');
