import type { FC, ReactNode } from 'react';
import { reatomComponent } from '@reatom/react';

import type { ProductModel } from '$domain/product';
import { FileLabel } from '$shared/ui-kit';

import { productListResource } from './product-list.model';

interface ProductListViewProps {
    renderProduct: (product: ProductModel) => ReactNode;
}

export const ProductListView: FC<ProductListViewProps> = reatomComponent(({ renderProduct }) => {
    const productList = productListResource.data();
    const productListStatus = productListResource.status();

    if (productListStatus.isPending) {
        return <div style={{ color: 'red', padding: '10px' }}>Loading products...</div>;
    }

    if (productListStatus.isRejected) {
        return (
            <div style={{ color: 'red', padding: '10px' }}>
                Failed to load products.
                <button
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                        productListResource.retry();
                    }}
                >
                    Retry
                </button>
            </div>
        );
    }

    if (productList.length === 0) {
        return <div style={{ padding: '10px' }}>No products available.</div>;
    }

    return (
        <div
            style={{
                background: '#f7f7f7ff',
                border: '1px solid #449cd3ff',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginTop: '10px',
                padding: '10px',
                position: 'relative',
            }}
        >
            <FileLabel color="#449cd3ff" position="left">
                src/features/catalog/product-list/product-list.view.tsx
            </FileLabel>
            {productList.map((product) => renderProduct(product))}
        </div>
    );
}, 'ProductListView');
