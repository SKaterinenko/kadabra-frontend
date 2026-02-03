'use client';

import { refresh } from '@/src/shared/api/server/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

const EXPIRATION_TIME = 1 * 60 * 1000; // 1 min in milliseconds

export function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 минута
            },
        },
    }));
    
    setInterval(() => {
        refresh()
    }, EXPIRATION_TIME);
    
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}