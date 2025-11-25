import { reatomComponent } from '@reatom/npm-react';

import { FileLabel } from '$shared/ui-kit/file-label';

import { useUserIsOnline } from './use-user-is-online';

export const UserBlockView = reatomComponent(() => {
    const isOnline = useUserIsOnline();
    return (
        <div
            style={{
                padding: '10px',
                marginTop: '10px',
                border: '1px solid gray',
                borderRadius: '12px',
                position: 'relative',
            }}
        >
            <FileLabel color="#0de049ff">features/shared/user-block/user-block.view.tsx</FileLabel>
            <div data-id="avatar">🃏</div>
            <div data-id="name">John Doe</div>
            <div data-id="status">Status: {isOnline ? 'Online' : 'Offline'}</div>
        </div>
    );
}, 'UserBlockView');
