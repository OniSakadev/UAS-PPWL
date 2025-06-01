import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function AjukanCv() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    position: '',
    cv_file: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/ajukan-cv', {
      forceFormData: true,
      onSuccess: () => {
        reset();
        window.location.href = '/user/dashboard'; // Redirect to dashboard
      },
    });
  };

  return (
    <>
      <Head title="Ajukan CV" />
      <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800 text-center">Form Pengajuan CV</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Masukkan nama lengkap Anda"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="contoh: email@domain.com"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="position" className="block mb-2 font-medium text-gray-700">
              Posisi yang Dilamar
            </label>
            <input
              type="text"
              id="position"
              name="position"
              placeholder="Posisi pekerjaan yang Anda lamar"
              value={data.position}
              onChange={(e) => setData('position', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.position && <p className="mt-1 text-red-500 text-sm">{errors.position}</p>}
          </div>

          <div>
            <label htmlFor="cv_file" className="block mb-2 font-medium text-gray-700">
              Upload CV (PDF, DOC, DOCX)
            </label>
            <input
              type="file"
              id="cv_file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setData('cv_file', e.target.files?.[0] || null)}
              className="w-full text-gray-700 p-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.cv_file && <p className="mt-1 text-red-500 text-sm">{errors.cv_file}</p>}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {processing ? 'Mengirim...' : 'Kirim CV'}
          </button>
        </form>
      </div>
    </>
  );
}