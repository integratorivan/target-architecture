import { reatomComponent } from '@reatom/react';

import { FileLabel } from '$shared/ui-kit/file-label';

import { CardProductView } from '../card-product/card-product.view';
import { productListResource } from './product-list.model';

export const ProductListView = reatomComponent(() => {
    const productList = productListResource.data();
    const productListStatus = productListResource.status();

    if (productListStatus.isPending) {
        return <div style={{ padding: '10px', color: 'red' }}>Loading products...</div>;
    }

    return (
        <div
            style={{
                background: '#f7f7f7ff',
                border: '1px solid #449cd3ff',
                borderRadius: '12px',
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '10px',
                position: 'relative',
            }}
        >
            <FileLabel color="#449cd3ff" position="left">
                src/features/catalog/product-list/product-list.view.tsx
            </FileLabel>
            {productList.map((product) => (
                <CardProductView key={product.id} {...product} />
            ))}
        </div>
    );
}, 'ProductListView');
