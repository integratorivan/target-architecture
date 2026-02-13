import { reatomComponent } from '@reatom/react';

import { FileLabel } from '$shared/ui-kit';

import { useUserIsOnline } from './use-user-is-online.hook';

export const UserBlockView = reatomComponent(() => {
    const isOnline = useUserIsOnline();

    return (
        <div
            style={{
                border: '1px solid #0de049ff',
                borderRadius: '12px',
                marginTop: '10px',
                padding: '10px',
                position: 'relative',
            }}
        >
            <FileLabel color="rgb(5, 5, 5)">features/user/user-block/user-block.view.tsx</FileLabel>
            <div data-id="avatar">🃏</div>
            <div data-id="name">John Doe</div>
            <div data-id="status">Status: {isOnline ? 'Online' : 'Offline'}</div>
        </div>
    );
}, 'UserBlockView');
