import type { ProductListDTO } from './types';

export const getProductList = (): Promise<ProductListDTO> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    currency: 'USD',
                    price: 10.99,
                    productId: 1,
                    productName: 'Product 1',
                },
                {
                    currency: 'USD',
                    price: 25.5,
                    productId: 2,
                    productName: 'Product 2',
                },
                {
                    currency: 'EUR',
                    price: 35.0,
                    productId: 3,
                    productName: 'Product 3',
                },
            ]);
        }, 500);
    });
};
