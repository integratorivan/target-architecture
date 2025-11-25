import type { FC, ReactNode } from 'react';

interface FileLabelProps {
    children: ReactNode;
    color?: string;
    position?: 'left' | 'right';
}

export const FileLabel: FC<FileLabelProps> = ({
    children,
    color = '#ff0000ff',
    position = 'right',
}) => (
    <p
        style={{
            color: color,
            position: 'absolute',
            right: position === 'right' ? 0 : undefined,
            left: position === 'left' ? 0 : undefined,
            top: 0,
            fontSize: 10,
            fontFamily: 'monospace',
            zIndex: 10,
        }}
    >
        {children}
    </p>
);
