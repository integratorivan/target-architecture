import { createFileRoute } from '@tanstack/react-router';

import { UserBlockView } from '$features/user/user-block';

export const Route = createFileRoute('/account/')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <UserBlockView />
            <h1>Hello "/account/"!</h1>
        </div>
    );
}
