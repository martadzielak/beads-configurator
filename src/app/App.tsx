import { Suspense } from 'react';
import { ClientRoot } from './ClientRoot';
import { Loader } from '@/components/common/Loader';

// Server component wrapper: keeps App as RSC-friendly while deferring all client logic
export const App = () => (
    <Suspense fallback={<Loader />}>
        <ClientRoot />
    </Suspense>
);
