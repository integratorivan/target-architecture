import type { ProductDTO, ProductListDTO } from '$shared/api/product-list/types';
import type { ProductModel, ProductPayload } from '$shared/domain/product/product.types';

export const mapProductListDtoToDomain = (dto: ProductListDTO): ProductModel[] => {
    return dto.map((item) => ({
        id: item.productId,
        title: item.productName,
        price: `${item.currency} ${item.price.toFixed(2)}`,
    }));
};

export const mapProductInputToDto = (payload: ProductPayload): ProductDTO => {
    return {
        currency: payload.currency,
        price: payload.price,
        productId: payload.id,
        productName: payload.title,
    };
};
