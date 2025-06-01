import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard Karyawan',
    href: '/user/dashboard',
  },
];

const companyImageUrl =
  'https://upload.wikimedia.org/wikipedia/id/thumb/c/c4/Telkom_Indonesia_2013.svg/200px-Telkom_Indonesia_2013.svg.png';

export default function UserDashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard Karyawan" />

      <div className="flex flex-col md:flex-row gap-8 p-6 m-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-md">
        {/* Gambar Perusahaan */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={companyImageUrl}
            width="400"
            height="400"
            alt="Logo Perusahaan Telkom Indonesia"
            className="rounded-lg shadow-lg max-w-full h-auto object-contain bg-white p-4"
          />
        </div>

        {/* Konten Dashboard */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <section>
            <h2 className="text-3xl font-bold mb-4">Selamat Datang di Portal Rekrutmen Telkom Indonesia!</h2>

            <p className="mb-3">
              Terima kasih atas ketertarikan Anda untuk bergabung bersama <strong>PT Telkom Indonesia (Persero) Tbk</strong>. Melalui platform ini, Anda dapat mengajukan CV dan mengikuti proses seleksi secara mudah dan transparan.
            </p>

            <p className="mb-3">
              Kami mencari individu terbaik yang siap berkontribusi dalam menghadirkan solusi digital untuk Indonesia. Pastikan Anda melengkapi data dan mengunggah dokumen yang dibutuhkan.
            </p>

            <p className="mb-2 font-semibold text-xl mt-4">Langkah-langkah Pendaftaran:</p>
            <ul className="list-decimal list-inside space-y-1 text-gray-800 dark:text-gray-200">
              <li>Baca profil dan visi misi perusahaan kami.</li>
              <li>Persiapkan CV terbaru Anda dalam format PDF, DOC, atau DOCX.</li>
              <li>Klik tombol di bawah untuk mengajukan CV Anda.</li>
            </ul>

            {/* Tombol Aksi */}
            <div className="mt-6">
              <Link
                href="/ajukan-cv"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Ajukan CV Sekarang
              </Link>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
