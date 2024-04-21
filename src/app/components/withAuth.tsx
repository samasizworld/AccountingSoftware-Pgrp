'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppSelector } from '../store/store';

const withAuth = (WrappedComponent: any) => {
    const Auth = (props: any) => {
        const isAuthenticated = useAppSelector(state => state.auth.authenticated);
        const router = useRouter();

        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/login'); // Redirect to login if not authenticated
            }
        }, [isAuthenticated, router]);

        return isAuthenticated ? <WrappedComponent {...props} /> : null;
    };

    return Auth;
};

export default withAuth;
