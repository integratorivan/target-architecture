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
            fontFamily: 'monospace',
            fontSize: 10,
            left: position === 'left' ? 0 : undefined,
            position: 'absolute',
            right: position === 'right' ? 0 : undefined,
            top: 0,
            zIndex: 10,
        }}
    >
        {children}
    </p>
);
