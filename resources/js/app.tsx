/* eslint-disable @typescript-eslint/no-explicit-any */
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { RoleProvider } from './features/role';
import {
    QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactNode } from 'react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const queryClient = new QueryClient()

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx');
        const page: any = await resolvePageComponent(`./pages/${name}.tsx`, pages);
        const originalLayout = page.default.layout;
        page.default.layout = (pageElement: ReactNode) => {
            const content = originalLayout ? originalLayout(pageElement) : pageElement;
            return (
                <QueryClientProvider client={queryClient}>
                    <RoleProvider>{content}</RoleProvider>
                </QueryClientProvider>
            );
        };
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
