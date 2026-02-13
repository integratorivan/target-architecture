import { computed, withAsyncData } from '@reatom/core';

import { mapProductListDtoToDomain } from '$shared/api/adapters/product-list.adapter';
import { getProductList } from '$shared/api/product-list';

export const productListResource = computed(async () => {
    const productList = await getProductList();

    return mapProductListDtoToDomain(productList);
}, 'productListResource').extend(withAsyncData({ initState: [], status: true }));
