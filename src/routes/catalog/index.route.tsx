import { createFileRoute } from '@tanstack/react-router';

import { ProductListView } from '$features/catalog/product-list';
import { UserBlockView } from '$features/shared/user-block';

export const Route = createFileRoute('/catalog/')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <UserBlockView />
            <ProductListView />
        </div>
    );
}
