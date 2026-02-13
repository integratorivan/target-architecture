import { createFileRoute } from '@tanstack/react-router';

import { CardProductView } from '$features/catalog/card-product';
import { ProductListView } from '$features/catalog/product-list';
import { UserBlockView } from '$features/user/user-block';

export const Route = createFileRoute('/catalog/')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <UserBlockView />
            <ProductListView
                renderProduct={(product) => <CardProductView key={product.id} {...product} />}
            />
        </div>
    );
}
