import { computed, withAsyncData } from '@reatom/core';

import { mapProductListToDomain } from '$domain/product';
import { getProductList } from '$shared/api/product-list';

export const productListResource = computed(async () => {
    const productList = await getProductList();

    return mapProductListToDomain(productList);
}, 'productListResource').extend(withAsyncData({ initState: [], status: true }));
