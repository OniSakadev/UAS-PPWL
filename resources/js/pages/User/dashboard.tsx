import { Head, Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function UserDashboard() {
  const { auth } = usePage().props as any;

  return (
    <>
      <Head title="Dashboard Karyawan" />
      <div className="min-h-screen flex bg-gradient-to-br from-[#18181b] to-[#232526] text-[#ededec]">
        {/* SIDEBAR */}
        <aside className="w-64 min-h-screen bg-[#1a1a1a] border-r border-[#232526] flex flex-col py-8 px-4">
          <div className="mb-8 flex items-center gap-2">
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="16" fill="#ff4433"/>
              <path d="M10 20v-6a6 6 0 0112 0v6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xl font-bold text-white">Portal Karyawan</span>
          </div>
          <nav className="flex flex-col gap-2 flex-1">
            <Link
              href="/user/dashboard"
              className="px-4 py-2 rounded-lg hover:bg-[#232526] transition font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/status-lamaran"
              className="px-4 py-2 rounded-lg hover:bg-[#232526] transition font-medium"
            >
              CV Terkirim
            </Link>
          </nav>
          <form
            method="post"
            action={route('logout')}
            className="mt-8"
            onSubmit={e => {
              e.preventDefault();
              // @ts-ignore
              window.location.href = route('logout');
            }}
          >
            <button
              type="button"
              onClick={() => router.post(route('logout'))}
              className="w-full px-4 py-2 rounded-lg bg-[#ff4433] text-white font-semibold hover:bg-[#ff2200] transition"
            >
              Logout
            </button>
          </form>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-3xl w-full bg-[#232526]/90 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
            {/* Ilustrasi */}
            <div className="md:w-1/2 flex items-center justify-center bg-[#18181b]">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Teamwork Illustration"
                className="object-cover w-full h-72 md:h-full"
              />
            </div>
            {/* Konten */}
            <div className="md:w-1/2 flex flex-col justify-center p-8">
              <h1 className="text-3xl font-bold text-[#ff4433] mb-3">
                Selamat Datang, {auth?.user?.name || 'Karyawan'}
              </h1>
              <p className="text-gray-200 mb-4">
                Anda dapat mengelola data CV, memantau status lamaran, dan memperbarui informasi Anda melalui portal ini.
              </p>
              <ul className="list-disc list-inside text-gray-400 mb-6">
                <li>Ajukan CV baru dengan mudah.</li>
                <li>Lihat riwayat dan status CV yang sudah dikirim.</li>
                <li>Kelola data pribadi Anda kapan saja.</li>
              </ul>
              <Link
                href="/ajukan-cv"
                className="bg-[#ff4433] hover:bg-[#ff2200] text-white font-semibold px-6 py-3 rounded-lg shadow transition"
              >
                Ajukan CV Baru
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
