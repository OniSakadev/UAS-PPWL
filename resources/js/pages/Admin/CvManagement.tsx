import React from 'react';
import { usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

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
        title: 'Cv Management',
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
    <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-semibold mb-6 text-white">Manajemen CV</h1>


      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-3 text-black">Nama</th>
            <th className="p-3 text-black">Email</th>
            <th className="p-3 text-black">Posisi</th>
            <th className="p-3 text-black">Tgl Kirim</th>
            <th className="p-3 text-black text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className='bg-gray-600/40'>
          {cvSubmissions.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                Belum ada CV yang diajukan.
              </td>
            </tr>
          ) : (
            cvSubmissions.map((cv) => (
              <tr key={cv.id} className="border-t">
                <td className="p-3">{cv.name}</td>
                <td className="p-3">{cv.email}</td>
                <td className="p-3">{cv.position}</td>
                <td className="p-3">{new Date(cv.created_at).toLocaleDateString()}</td>
                <td className="p-3 space-x-2 flex justify-center">
                  <a
                    href={`/admin/cv-management/${cv.id}/download`}
                      className="btn btn-sm rounded-md bg-blue-500 text-white py-2 px-2  hover:underline"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => handleDelete(cv.id)}
                    className="btn btn-sm rounded-md bg-red-500 text-white py-2 px-2 ml-2 hover:underline"
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
    </AppLayout>
  );
}
