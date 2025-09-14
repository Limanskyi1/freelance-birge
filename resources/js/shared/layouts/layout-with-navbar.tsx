import { Navbar } from '@/widgets/navbar';
import { usePage } from '@inertiajs/react';
import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/use-is-mobile';

export const LayoutWithNavbar = ({ children }: { children: ReactNode }) => {
    const { url } = usePage();
    const [isFocused, setIsFocused] = useState(false);
    const isMobile = useIsMobile();
    useEffect(() => {
        if (!isMobile) return;

        const inputElements = document.querySelectorAll('input, textarea');

        const handleFocus = () => {
            setIsFocused(true);
        };

        const handleBlur = () => {
            setIsFocused(false);
        };

        inputElements.forEach((input) => {
            input.addEventListener('focus', handleFocus);
            input.addEventListener('blur', handleBlur);
        });

        return () => {
            inputElements.forEach((input) => {
                input.removeEventListener('focus', handleFocus);
                input.removeEventListener('blur', handleBlur);
            });
        };
    }, [url, isMobile]);
    return (
        <main className="flex flex-col h-[100vh] overflow-hidden">
            <div
                className={classNames('flex flex-1 flex-col overflow-auto', {
                    'min-h-[100vh]!': isFocused,
                })}
            >
                {children}
            </div>
            <footer
                className={classNames('w-full', {
                    hidden: isFocused,
                })}
            >
                <Navbar />
            </footer>
        </main>
    );
};
