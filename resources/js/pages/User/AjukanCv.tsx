import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Ajukan CV',
    href: '/ajukan-cv',
  },
];

const companyImageUrl =
  'https://upload.wikimedia.org/wikipedia/id/thumb/c/c4/Telkom_Indonesia_2013.svg/200px-Telkom_Indonesia_2013.svg.png';

export default function AjukanCv() {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    position: '',
    cv_file: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.name as keyof typeof data, e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      setData('cv_file', file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/ajukan-cv', {
      forceFormData: true,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ajukan CV" />

      <div className="flex flex-col md:flex-row gap-8 p-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-md m-auto">
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={companyImageUrl}
            width="400"
            height="400"
            alt="Logo Perusahaan Telkom Indonesia"
            className="rounded-lg shadow-lg max-w-full h-auto object-contain bg-white p-4"
          />
        </div>

        <div className="md:w-1/2 flex flex-col gap-6">
          <section>
            <h2 className="text-3xl font-bold mb-4">Ajukan CV Anda</h2>
            <p className="mb-3">
              Silakan unggah CV terbaru Anda untuk mengikuti proses rekrutmen di{' '}
              <strong>PT Telkom Indonesia (Persero) Tbk</strong>.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block font-medium mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={handleInputChange}
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="position" className="block font-medium mb-1">
                  Posisi yang Dilamar
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={data.position}
                  onChange={handleInputChange}
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors.position && <p className="text-red-600 text-sm">{errors.position}</p>}
              </div>

              <div>
                <label htmlFor="cv_file" className="block font-medium mb-1">
                  Unggah CV (PDF, DOC, DOCX)
                </label>
                <input
                  type="file"
                  id="cv_file"
                  name="cv_file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="block w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors.cv_file && <p className="text-red-600 text-sm">{errors.cv_file}</p>}
              </div>

              <button
                type="submit"
                disabled={processing}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                {processing ? 'Mengirim...' : 'Kirim CV'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
