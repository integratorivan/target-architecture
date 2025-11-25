import { reatomComponent } from '@reatom/npm-react';

import { FileLabel } from '$shared/ui-kit/file-label';

import { CardProductView } from '../card-product/card-product.view';
import { productListResource } from './product-list.model';

export const ProductListView = reatomComponent(({ ctx }) => {
    const productList = ctx.spy(productListResource.dataAtom);
    const productListStatus = ctx.spy(productListResource.statusesAtom);

    if (productListStatus.isPending) {
        return <div style={{ padding: '10px', color: 'red' }}>Loading products...</div>;
    }

    return (
        <div
            style={{
                background: '#f7f7f7ff',
                borderRadius: '12px',
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '10px',
                position: 'relative',
            }}
        >
            <FileLabel position="left">
                features/catalog/card-product/card-product.view.tsx
            </FileLabel>
            {productList.map((product) => (
                <CardProductView key={product.id} {...product} />
            ))}
        </div>
    );
}, 'ProductListView');
