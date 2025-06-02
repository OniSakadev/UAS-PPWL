import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18181b] to-[#232526]">
                <div className="w-full max-w-md bg-[#232526] rounded-2xl shadow-2xl p-8 md:p-10">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ff4433]/10">
                            <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                                <rect width="32" height="32" rx="16" fill="#ff4433"/>
                                <path d="M10 20v-6a6 6 0 0112 0v6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-1">Buat Akun Baru</h1>
                        <p className="text-gray-400 text-sm">Isi data berikut untuk membuat akun Anda</p>
                    </div>
                    <form className="space-y-6" onSubmit={submit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                                Nama Lengkap
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Nama lengkap"
                                className="w-full rounded-lg border border-gray-700 bg-[#161616] px-4 py-2 text-white focus:border-[#ff4433] focus:ring-2 focus:ring-[#ff4433]/30 outline-none transition"
                            />
                            {errors.name && <div className="text-xs text-red-400 mt-1">{errors.name}</div>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="email@example.com"
                                className="w-full rounded-lg border border-gray-700 bg-[#161616] px-4 py-2 text-white focus:border-[#ff4433] focus:ring-2 focus:ring-[#ff4433]/30 outline-none transition"
                            />
                            {errors.email && <div className="text-xs text-red-400 mt-1">{errors.email}</div>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Password"
                                className="w-full rounded-lg border border-gray-700 bg-[#161616] px-4 py-2 text-white focus:border-[#ff4433] focus:ring-2 focus:ring-[#ff4433]/30 outline-none transition"
                            />
                            {errors.password && <div className="text-xs text-red-400 mt-1">{errors.password}</div>}
                        </div>
                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-300 mb-1">
                                Konfirmasi Password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                required
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Konfirmasi password"
                                className="w-full rounded-lg border border-gray-700 bg-[#161616] px-4 py-2 text-white focus:border-[#ff4433] focus:ring-2 focus:ring-[#ff4433]/30 outline-none transition"
                            />
                            {errors.password_confirmation && <div className="text-xs text-red-400 mt-1">{errors.password_confirmation}</div>}
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-2 rounded-lg bg-[#ff4433] hover:bg-[#ff2200] text-white font-semibold text-lg shadow transition"
                        >
                            {processing ? 'Membuat akun...' : 'Buat Akun'}
                        </button>
                    </form>
                    <div className="mt-8 text-center text-gray-400 text-sm">
                        Sudah punya akun?{' '}
                        <a href={route('login')} className="text-[#ff4433] hover:underline font-semibold">
                            Masuk
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
