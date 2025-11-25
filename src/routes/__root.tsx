import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

import { CartView } from '$features/header/cart';

export const Route = createRootRoute({
    component: () => (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: 4 }}>
                <p>Tech navigation</p>
                <Link to={'/'} style={{ marginRight: '10px' }}>
                    Go to Index
                </Link>
                <Link to={'/account'} style={{ marginRight: '10px' }}>
                    Go to /account/
                </Link>
                <Link to={'/catalog'}>Go to /catalog/</Link>
            </div>
            <CartView />
            <Outlet />
        </div>
    ),
});
