import { reatomResource, withDataAtom, withStatusesAtom } from '@reatom/framework';

import { mapProductListDtoToDomain } from '$shared/api/adapters/product-list.adapter';
import { getProductList } from '$shared/api/product-list';

export const productListResource = reatomResource((ctx) => {
    return ctx.schedule(async () => {
        const productList = await getProductList();

        return mapProductListDtoToDomain(productList);
    });
}, 'productListResource').pipe(withDataAtom([]), withStatusesAtom());
