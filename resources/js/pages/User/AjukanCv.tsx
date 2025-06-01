import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard Karyawan',
    href: '/user/dashboard',
  },
  {
    title: 'Ajukan CV',
    href: '/ajukan-cv',
  },
];

const companyImageUrl =
  'https://upload.wikimedia.org/wikipedia/id/thumb/c/c4/Telkom_Indonesia_2013.svg/200px-Telkom_Indonesia_2013.svg.png';

export default function AjukanCv() {
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      alert('Mohon unggah file CV terlebih dahulu.');
      return;
    }
    // Di sini kamu bisa lanjutkan ke pengiriman data lewat Inertia.post atau fetch API
    console.log('Mengirim file:', cvFile);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ajukan CV" />

      <div className="flex flex-col md:flex-row gap-8 p-36 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-md m-auto">
        {/* Gambar Perusahaan */}
        <div className="md:w-1/2 flex justify-center items-center m-20">
          <img
            src={companyImageUrl}
            width="400"
            height="400"
            alt="Logo Perusahaan Telkom Indonesia"
            className="rounded-lg shadow-lg max-w-full h-auto object-contain bg-white p-4"
          />
        </div>

        {/* Form Ajukan CV */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <section>
            <h2 className="text-3xl font-bold mb-4">Ajukan CV Anda</h2>

            <p className="mb-3">
              Silakan unggah CV terbaru Anda untuk mengikuti proses rekrutmen di{' '}
              <strong>PT Telkom Indonesia (Persero) Tbk</strong>.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="cv" className="block font-medium mb-1">
                  Unggah CV (PDF, DOC, DOCX)
                </label>
                <input
                  type="file"
                  id="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="block w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Kirim CV
              </button>
            </form>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
