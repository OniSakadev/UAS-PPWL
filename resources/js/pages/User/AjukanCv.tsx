import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function AjukanCv({ existingSubmission }: { existingSubmission: boolean }) {
  const { auth } = usePage().props as any;
  const { data, setData, post, processing, errors, reset } = useForm({
    name: auth?.user?.name || '',
    email: auth?.user?.email || '',
    position: '',
    cv_file: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.name as keyof typeof data, e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setData('cv_file', file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingSubmission) {
      alert('Anda sudah pernah mengirim CV. Anda tidak dapat mengirim lebih dari satu lamaran.');
      return;
    }
    post('/ajukan-cv', {
      forceFormData: true,
      onSuccess: () => {
        reset();
        window.location.href = '/status-lamaran';
      },
    });
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Ajukan CV', href: '/ajukan-cv' }]}>
      <Head title="Ajukan CV" />
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="bg-[#232526] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
          {/* Gambar */}
          <div className="md:w-1/2 flex items-center justify-center bg-[#18181b]">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
              alt="Ajukan CV"
              className="object-cover w-full h-72 md:h-full"
            />
          </div>
          {/* Form */}
          <div className="md:w-1/2 flex flex-col justify-center p-8">
            <h1 className="text-2xl font-bold text-[#ff4433] mb-2">Ajukan CV Baru</h1>
            <p className="text-gray-300 mb-4">
              Isi data dan unggah CV Anda untuk mengikuti proses rekrutmen.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-200 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-[#18181b] border border-[#333] text-white"
                  disabled={processing}
                />
                {errors.name && <div className="text-xs text-red-400">{errors.name}</div>}
              </div>
              <div>
                <label className="block text-gray-200 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  readOnly
                  className="w-full px-3 py-2 rounded-lg bg-[#18181b] border border-[#333] text-gray-400"
                />
                {errors.email && <div className="text-xs text-red-400">{errors.email}</div>}
              </div>
              <div>
                <label className="block text-gray-200 mb-1">Posisi yang Dilamar</label>
                <input
                  type="text"
                  name="position"
                  value={data.position}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-[#18181b] border border-[#333] text-white"
                  disabled={processing}
                />
                {errors.position && <div className="text-xs text-red-400">{errors.position}</div>}
              </div>
              <div>
                <label className="block text-gray-200 mb-1">Unggah CV (PDF, DOC, DOCX)</label>
                <input
                  type="file"
                  name="cv_file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-[#18181b] border border-[#333] text-white"
                  disabled={processing}
                />
                {errors.cv_file && <div className="text-xs text-red-400">{errors.cv_file}</div>}
              </div>
              <button
                type="submit"
                disabled={processing || existingSubmission}
                className="w-full py-2 rounded-lg bg-[#ff4433] hover:bg-[#ff2200] text-white font-semibold transition disabled:opacity-60"
              >
                {processing ? 'Mengirim...' : 'Kirim CV'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
