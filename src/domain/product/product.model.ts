import type { ProductListDTO } from '$shared/api/product-list';

import type { ProductModel } from './product.types';

export const mapProductListToDomain = (dto: ProductListDTO): ProductModel[] => {
    return dto.map((item) => ({
        id: item.productId,
        price: `${item.currency} ${item.price.toFixed(2)}`,
        title: item.productName,
    }));
};
