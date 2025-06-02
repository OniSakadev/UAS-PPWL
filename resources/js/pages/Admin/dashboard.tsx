// resources/js/pages/Admin/Dashboard.tsx

import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Users, Building2, UserCheck, Calendar, Clock, User, FileText, LayoutGrid } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
];

// Interface untuk props sesuai dengan controller yang sudah diperbaiki
interface Props {
    stats: {
        totalUsers: number;
        totalCompanies: number;
        adminAccounts: number;
        newThisMonth: number;
    };
    recentActivities: Array<{
        id: number;
        action: string;
        description: string;
        time: string;
        type: string;
        user_name?: string;
    }>;
    recentUsers?: Array<{
        id: number;
        name: string;
        email: string;
        role: string;
        created_at: string;
    }>;
    roleLabels?: string[];
    roleData?: number[];
    monthLabels?: string[];
    monthData?: number[];
}

export default function AdminDashboard({ 
    stats, 
    recentActivities, 
    recentUsers,
    roleLabels,
    roleData,
    monthLabels,
    monthData 
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-gray-50 dark:bg-gray-900">
                
                {/* Welcome Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Welcome to Admin Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your system data and users efficiently</p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    {/* Total Active Accounts */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Active Accounts</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats?.totalUsers || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Total Companies */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                <Building2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Companies</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats?.totalCompanies || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Admin Accounts */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                <UserCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Admin Accounts</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats?.adminAccounts || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* New This Month */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                                <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">New This Month</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats?.newThisMonth || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Recent Activity - DIPERBAIKI */}
                    <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Clock className="mr-2 h-5 w-5" />
                            Recent Activity
                        </h3>
                        <div className="space-y-3">
                            {recentActivities && recentActivities.length > 0 ? (
                                recentActivities.map((activity) => (
                                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="flex items-center">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                activity.type === 'user' ? 'bg-blue-500' :
                                                activity.type === 'company' ? 'bg-green-500' :
                                                activity.type === 'dashboard' ? 'bg-purple-500' :
                                                'bg-gray-500'
                                            }`}>
                                                {activity.type === 'user' && <User className="h-5 w-5 text-white" />}
                                                {activity.type === 'company' && <Building2 className="h-5 w-5 text-white" />}
                                                {activity.type === 'dashboard' && <LayoutGrid className="h-5 w-5 text-white" />}
                                                {!['user', 'company', 'dashboard'].includes(activity.type) && <FileText className="h-5 w-5 text-white" />}
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.description}</p>
                                                {activity.user_name && (
                                                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                                        by {activity.user_name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <Clock className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No recent activity</p>
                                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                        Activities will appear here when admins perform actions
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Recent Users Section */}
                        {recentUsers && recentUsers.length > 0 && (
                            <div className="mt-6">
                                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Recent Users</h4>
                                <div className="space-y-2">
                                    {recentUsers.slice(0, 3).map((user) => (
                                        <div key={user.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-semibold text-xs">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                                                </div>
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                user.role === 'admin' 
                                                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link 
                                href="/admin/users"
                                className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors block"
                            >
                                <p className="text-sm font-medium text-blue-900 dark:text-blue-200">User Management</p>
                                <p className="text-xs text-blue-600 dark:text-blue-400">Manage all user accounts</p>
                            </Link>
                            
                            <Link 
                                href="/admin/companies"
                                className="w-full text-left p-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors block"
                            >
                                <p className="text-sm font-medium text-green-900 dark:text-green-200">Companies</p>
                                <p className="text-xs text-green-600 dark:text-green-400">Manage company data</p>
                            </Link>
                            
                            <Link 
                                href="/admin/cv"
                                className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors block"
                            >
                                <p className="text-sm font-medium text-purple-900 dark:text-purple-200">CV Management</p>
                                <p className="text-xs text-purple-600 dark:text-purple-400">Manage CV data and verification</p>
                            </Link>
                            
                            <button className="w-full text-left p-3 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-lg transition-colors">
                                <p className="text-sm font-medium text-orange-900 dark:text-orange-200">Settings</p>
                                <p className="text-xs text-orange-600 dark:text-orange-400">System configuration</p>
                            </button>
                        </div>

                        {/* User Role Distribution */}
                        {roleLabels && roleData && (
                            <div className="mt-6">
                                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">User Roles</h4>
                                <div className="space-y-2">
                                    {roleLabels.map((role, index) => (
                                        <div key={role} className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{role}</span>
                                            <div className="flex items-center">
                                                <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                                                    <div 
                                                        className={`h-2 rounded-full ${
                                                            role === 'admin' ? 'bg-purple-500' : 'bg-blue-500'
                                                        }`}
                                                        style={{ 
                                                            width: `${Math.max((roleData[index] / Math.max(...roleData)) * 100, 10)}%` 
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {roleData[index]}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
