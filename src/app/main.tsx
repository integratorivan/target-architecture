import { createRoot } from 'react-dom/client';
import { connectLogger } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { reatomCtx } from '$shared/reatom-context';

import { routeTree } from '../routeTree.gen';

import './global.css';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

if (import.meta.env.DEV) {
    reatomCtx.run(connectLogger);
}

const StartApp = () => {
    const casino = import.meta.env.VITE_CASINO_NAME;
    const brandVariablesHref = casino ? `/${casino}/variables.css` : null;

    return (
        <>
            <link rel="stylesheet" href="/variables.css" />
            {brandVariablesHref && <link rel="stylesheet" href={brandVariablesHref} />}
            <reatomContext.Provider value={reatomCtx}>
                <RouterProvider router={router} />
            </reatomContext.Provider>
        </>
    );
};

createRoot(document.getElementById('root')!).render(<StartApp />);
