import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

interface CvSubmission {
    id: number;
    name: string;
    email: string;
    position: string;
    cv_file: string;
    created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Manajemen CV',
        href: '/admin/cv-management',
    },
];

export default function CvIndex({ cvSubmissions }: { cvSubmissions: CvSubmission[] }) {
    const { flash } = usePage().props as any;

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus CV ini?')) {
            router.delete(`/admin/cv-management/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl bg-gray-50 p-6 dark:bg-gray-900">
                <h1 className="mb-6 text-3xl font-semibold text-white">Manajemen CV</h1>
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="overflow-x-auto">
                        <table className="w-full rounded-lg overflow-hidden">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nama</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Posisi</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tgl Kirim</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-600 ">
                                {cvSubmissions.length === 0 ? (
                                    <tr className='hover:bg-gray-50 dark:hover:bg-gray-700'>
                                        <td colSpan={5} className="p-4 text-center text-gray-500">
                                            Belum ada CV yang diajukan.
                                        </td>
                                    </tr>
                                ) : (
                                    cvSubmissions.map((cv) => (
                                        <tr key={cv.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 ">
                                            <td className="text-sm py-5 px-5 font-medium text-gray-900 dark:text-white">{cv.name}</td>
                                            <td className="text-sm text-center text-gray-500 dark:text-gray-400">{cv.email}</td>
                                            <td className="text-sm text-center text-gray-500 dark:text-gray-400">{cv.position}</td>
                                            <td className="text-sm text-center text-gray-500 dark:text-gray-400">{new Date(cv.created_at).toLocaleDateString()}</td>
                                            <td className="flex justify-center space-x-2 p-3">
                                                <a
                                                    href={`/admin/cv-management/${cv.id}/download`}
                                                    className="btn btn-sm rounded-md bg-blue-500 px-2 py-2 text-white hover:underline"
                                                >
                                                    Unduh
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(cv.id)}
                                                    className="btn btn-sm ml-2 rounded-md bg-red-500 px-2 py-2 text-white hover:underline"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
