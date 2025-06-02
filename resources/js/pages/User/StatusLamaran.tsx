import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';

const companyLogo = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

export default function UserStatusLamaran() {
  const { submissions, success } = usePage().props as any;

  return (
    <AppLayout breadcrumbs={[{ title: 'Status Lamaran', href: '/status-lamaran' }]}>
      <Head title="Status Lamaran" />
      <div className="max-w-3xl mx-auto p-8 bg-[#232526] text-[#ededec] rounded-2xl shadow-2xl mt-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#ff4433]">Status Lamaran Anda</h1>
            <p className="text-gray-300">
              Berikut riwayat lamaran yang sudah Anda ajukan.
            </p>
          </div>
          <img
            src={companyLogo}
            alt="Logo Perusahaan"
            width={56}
            height={56}
            className="object-contain bg-[#18181b] p-2 rounded-xl shadow"
          />
        </div>
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}
        {(!submissions || submissions.length === 0) ? (
          <p className="text-gray-400">
            Belum ada lamaran yang dikirim. Silakan ajukan CV Anda terlebih dahulu.
          </p>
        ) : (
          <ul className="divide-y divide-[#313136]">
            {submissions.map((item: any) => (
              <li key={item.id} className="py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-2">
                    <p className="font-semibold flex items-center gap-2">
                      <span role="img" aria-label="user">👤</span> <span className="text-white">{item.name}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span role="img" aria-label="position">💼</span> {item.position}
                    </p>
                    <p className="flex items-center gap-2">
                      <span role="img" aria-label="cv">📎</span>
                      <a
                        href={`/storage/${item.cv_file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ff4433] hover:underline font-medium"
                      >
                        Lihat CV
                      </a>
                    </p>
                  </div>
                  {/* Tambahkan status jika ada */}
                  <div className="text-right">
                    <span className="inline-block bg-[#ff4433] text-white px-4 py-1 rounded-full text-xs font-semibold">
                      {item.status ? item.status : 'Diproses'}
                    </span>
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
