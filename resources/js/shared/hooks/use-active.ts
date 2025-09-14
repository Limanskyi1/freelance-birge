import { useCallback, useState } from 'react';

export const useActive = () => {
    const [isActive, setIsActive] = useState(false);

    const activate = useCallback(() => setIsActive(true), []);
    const deactivate = useCallback(() => setIsActive(false), []);
    const toggle = useCallback(() => setIsActive(prev => !prev), []);

    return {
        isActive,
        activate,
        deactivate,
        toggle,
    };
};
