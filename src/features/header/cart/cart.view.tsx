import { reatomComponent } from '@reatom/react';

import { FileLabel } from '$shared/ui-kit/file-label';
import { addedProductsArray } from '$features/cart/cart.model';

export const CartView = reatomComponent(() => {
    const addedProducts = addedProductsArray();

    if (addedProducts.length === 0) {
        return (
            <div
                style={{
                    padding: '8px',
                    position: 'relative',
                    border: '2px solid #735BE8',
                    borderRadius: 8,
                }}
            >
                <FileLabel color="#735BE8">features/header/cart/cart.view.tsx</FileLabel>
                <div data-id="empty-cart">Your cart is empty.</div>
            </div>
        );
    }

    return addedProducts.map((product, index) => (
        <div
            key={index}
            style={{
                border: '1px solid #735BE8',
                padding: '8px',
                borderRadius: '8px',
                position: 'relative',
                margin: 2,
            }}
        >
            <FileLabel color="#735BE8">features/header/cart/cart.view.tsx</FileLabel>
            <div data-id="product-name">Product: {product.title}</div>
            <div data-id="product-price">Price: ${product.price}</div>
        </div>
    ));
}, 'CartView');
