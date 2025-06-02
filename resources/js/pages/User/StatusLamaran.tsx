import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';

export default function UserStatusLamaran() {
  const { submissions, success } = usePage().props as any;

  return (
    <AppLayout breadcrumbs={[{ title: 'Status Lamaran', href: '/status-lamaran' }]}>
      <Head title="Status Lamaran" />

      <div className="max-w-5xl mx-auto p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-lg mt-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Status Lamaran Anda</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Informasi terkini mengenai lamaran yang Anda ajukan ke PT Telkom Indonesia.
            </p>
          </div>
          <img
            src="https://upload.wikimedia.org/wikipedia/id/thumb/c/c4/Telkom_Indonesia_2013.svg/200px-Telkom_Indonesia_2013.svg.png"
            alt="Logo Telkom Indonesia"
            width={100}
            height={100}
            className="object-contain bg-white ml-4 p-2 rounded"
          />
        </div>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        {submissions.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">
            Belum ada lamaran yang dikirim. Silakan ajukan CV Anda terlebih dahulu.
          </p>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {submissions.map((item: any) => (
              <li key={item.id} className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="font-semibold">👤 Nama: {item.name}</p>
                    <p>📧 Email: {item.email}</p>
                    <p>💼 Posisi: {item.position}</p>
                    <p>
                      📎 File CV:{' '}
                      <a
                        href={`/storage/${item.cv_file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Lihat CV
                      </a>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppLayout>
  );
}
