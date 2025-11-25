import { useEffect, useState } from 'react';

/**
 * Хук для определения, есть ли у пользователя интернет-соединение.
 * Возвращает булево значение: `true` — онлайн, `false` — офлайн.
 * Использует `navigator.onLine` и события `online` / `offline`.
 */
export const useUserIsOnline = (): boolean => {
    const getInitial = () => {
        if (typeof navigator === 'undefined') return true;
        return Boolean(navigator.onLine);
    };

    const [isOnline, setIsOnline] = useState<boolean>(getInitial);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline;
};
