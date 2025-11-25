import type { FC } from 'react';
import { reatomComponent } from '@reatom/npm-react';

import { FileLabel } from '$shared/ui-kit/file-label';

import { handleAddProductToCartAction } from './card-product.model';
import type { CardProductViewProps } from './card-product.types';

export const CardProductView: FC<CardProductViewProps> = reatomComponent(
    ({ ctx, id, price, title }) => {
        return (
            <div
                style={{
                    border: '2px solid #ecf6eeff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px',
                    position: 'relative',
                }}
                key={id}
            >
                <FileLabel>features/catalog/card-product/card-product.view.tsx</FileLabel>
                <h3>{title}</h3>
                <p>{price}</p>
                <button onClick={() => handleAddProductToCartAction(ctx, { id, title, price })}>
                    Положить в корзину
                </button>
            </div>
        );
    },
    'CardProductView',
);
