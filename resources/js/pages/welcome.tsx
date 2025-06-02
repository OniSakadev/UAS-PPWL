import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Portal Rekrutmen" />
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#232526] to-[#414345]">
                {/* Navbar */}
                <nav className="flex justify-end items-center gap-4 p-6">
                    <Link
                        href={route('login')}
                        className="px-5 py-2 rounded text-sm font-medium text-white bg-transparent border border-gray-400 hover:bg-gray-700 transition"
                    >
                        Login
                    </Link>
                    <Link
                        href={route('register')}
                        className="px-5 py-2 rounded text-sm font-medium text-white bg-[#ff4433] hover:bg-[#ff2200] transition"
                    >
                        Register
                    </Link>
                </nav>

                {/* Main Section */}
                <main className="flex-1 flex flex-col items-center justify-center px-4">
                    <div className="w-full max-w-2xl bg-white/5 rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
                        {/* Left Content */}
                        <div className="flex-1 flex flex-col justify-center p-8">
                            <h1 className="text-3xl font-bold text-[#ff4433] mb-2">Selamat Datang di Portal Rekrutmen</h1>
                            <p className="text-gray-200 mb-6">
                                Daftarkan akun Anda untuk melamar pekerjaan dan mengajukan CV secara online.  
                                Proses mudah, cepat, dan transparan!
                            </p>
                            <button
                                onClick={() => window.location.href = route('login')}
                                className="bg-[#ff4433] hover:bg-[#ff2200] text-white font-semibold px-6 py-3 rounded-lg shadow transition"
                            >
                                Ajukan CV Sekarang
                            </button>
                        </div>
                        {/* Right Illustration */}
                        <div className="hidden md:flex items-center justify-center bg-[#1a1a1a] px-8">
                            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                                <rect x="10" y="10" width="100" height="100" rx="20" fill="#1a1a1a" />
                                <path d="M30 90V60L60 40L90 60V90H30Z" stroke="#ff4433" strokeWidth="4" fill="none" />
                                <circle cx="60" cy="60" r="8" fill="#ff4433" />
                            </svg>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="text-center text-gray-400 text-xs py-6">
                    &copy; {new Date().getFullYear()} Portal Rekrutmen. Powered by Laravel + Inertia.
                </footer>
            </div>
        </>
    );
}
