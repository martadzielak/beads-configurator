"use client";
import { Loader } from '@/components/common/Loader';
import { useEffect, lazy, Suspense, FC } from 'react';

const Configurator = lazy(() => import('./Configurator'));

export const ClientRoot: FC = () => {
    useEffect(() => {
        document.documentElement.classList.remove('app-preloading');
    }, []);

    return (
        <Suspense fallback={<Loader />}>
            <Configurator />
        </Suspense>
    );
};

