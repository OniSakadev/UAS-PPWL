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
      onSuccess: () => reset(),
    });
  };

  return (
    <>
      <Head title="Ajukan CV" />
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Form Pengajuan CV</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-900">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
          </div>

          <div>
            <label className="block font-medium text-gray-900">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>

          <div>
            <label className="block font-medium text-gray-900">Posisi yang Dilamar</label>
            <input
              type="text"
              name="position"
              value={data.position}
              onChange={(e) => setData('position', e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            {errors.position && <div className="text-red-500 text-sm">{errors.position}</div>}
          </div>

          <div>
            <label className="block font-medium text-gray-900">Upload CV (PDF, DOC, DOCX)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setData('cv_file', e.target.files?.[0] || null)}
              className="w-full p-2 border rounded"
              required
            />
            {errors.cv_file && <div className="text-red-500 text-sm">{errors.cv_file}</div>}
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={processing}
            >
              {processing ? 'Mengirim...' : 'Kirim CV'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
