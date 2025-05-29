// resources/js/components/app-sidebar.tsx
import { usePage } from '@inertiajs/react';
import { AdminSidebar } from './admin-sidebar';
import { UserSidebar } from './user-sidebar';

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const isAdmin = auth.user?.role === 'admin' || auth.user?.is_admin;
    
    return isAdmin ? <AdminSidebar /> : <UserSidebar />;
}
