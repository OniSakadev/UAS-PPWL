import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen flex items-center justify-center bg-[#181818]">
                <div className="w-full max-w-md bg-[#232526] rounded-2xl shadow-xl p-8 md:p-10">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ff4433]/10">
                            <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                                <rect width="32" height="32" rx="16" fill="#ff4433"/>
                                <path d="M11 16l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-1">Masuk ke Akun Anda</h1>
                        <p className="text-gray-400 text-sm">Silakan login menggunakan email dan password Anda</p>
                    </div>

                    <form className="space-y-6" onSubmit={submit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                                className="w-full rounded-lg border border-gray-700 bg-[#161616] px-4 py-2 text-white focus:border-[#ff4433] focus:ring-2 focus:ring-[#ff4433]/30 outline-none transition"
                            />
                            {errors.email && <div className="text-xs text-red-400 mt-1">{errors.email}</div>}
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                {canResetPassword && (
                                    <a
                                        href={route('password.request')}
                                        className="text-xs text-[#ff4433] hover:underline"
                                    >
                                        Lupa password?
                                    </a>
                                )}
                            </div>
                            <input
                                id="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Password"
                                className="w-full rounded-lg border border-gray-700 bg-[#161616] px-4 py-2 text-white focus:border-[#ff4433] focus:ring-2 focus:ring-[#ff4433]/30 outline-none transition"
                            />
                            {errors.password && <div className="text-xs text-red-400 mt-1">{errors.password}</div>}
                        </div>

                        <div className="flex items-center mb-2">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={() => setData('remember', !data.remember)}
                                className="h-4 w-4 rounded border-gray-700 bg-[#161616] accent-[#ff4433] focus:ring-[#ff4433]/30"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                                Ingat saya
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-2 rounded-lg bg-[#ff4433] hover:bg-[#ff2200] text-white font-semibold text-lg shadow transition"
                        >
                            {processing ? 'Memproses...' : 'Masuk'}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-gray-400 text-sm">
                        Belum punya akun?{' '}
                        <a href={route('register')} className="text-[#ff4433] hover:underline font-semibold">
                            Daftar sekarang
                        </a>
                    </div>

                    {status && (
                        <div className="mt-4 text-center text-sm font-medium text-green-500">{status}</div>
                    )}
                </div>
            </div>
        </>
    );
}
