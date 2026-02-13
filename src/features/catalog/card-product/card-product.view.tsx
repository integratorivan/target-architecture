import type { FC } from 'react';
import { wrap } from '@reatom/core';
import { reatomComponent } from '@reatom/react';

import { FileLabel } from '$shared/ui-kit';

import { handleAddProductToCartAction } from './card-product.model';
import type { CardProductViewProps } from './card-product.types';

export const CardProductView: FC<CardProductViewProps> = reatomComponent(({ id, price, title }) => {
    return (
        <div
            style={{
                border: '1px solid #ff0000ff',
                borderRadius: '8px',
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
            <button onClick={wrap(() => handleAddProductToCartAction({ id, price, title }))}>
                Положить в корзину
            </button>
        </div>
    );
}, 'CardProductView');
