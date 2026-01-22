import React, { useState } from 'react';
import useAuthStore from '../store/authStore';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const { login, signup } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        let result;
        if (isLogin) {
            result = await login(email, password);
        } else {
            result = await signup(email, password, name);
        }

        if (result.success) {
            window.location.href = '/';
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center p-4">
            {/* Grid Background */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#E5E5E5 1px, transparent 1px), linear-gradient(90deg, #E5E5E5 1px, transparent 1px), radial-gradient(circle at 1px 1px, #D4D4D4 3px, transparent 3px)`,
                    backgroundSize: '60px 60px',
                    opacity: 0.6
                }}
            ></div>

            {/* Content Container */}
            <div className="w-full max-w-md relative z-10">
                <div className="mb-12 text-center">
                    <h2 className="font-iki text-5xl md:text-6xl text-black tracking-tighter">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="font-movatif text-gray-500 mt-2 text-lg">
                        {isLogin ? 'Enter your details to access your workspace.' : 'Join us and start creating today.'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-500 p-4 rounded mb-8 font-movatif text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {!isLogin && (
                        <div className="group">
                            <label className="block font-movatif text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-black transition-colors">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-gray-200 py-2 font-movatif text-xl text-black focus:border-black outline-none transition-colors placeholder-gray-300"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    )}

                    <div className="group">
                        <label className="block font-movatif text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-black transition-colors">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border-b-2 border-gray-200 py-2 font-movatif text-xl text-black focus:border-black outline-none transition-colors placeholder-gray-300"
                            placeholder="name@example.com"
                            required
                        />
                    </div>

                    <div className="group">
                        <label className="block font-movatif text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-black transition-colors">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border-b-2 border-gray-200 py-2 font-movatif text-xl text-black focus:border-black outline-none transition-colors placeholder-gray-300"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white font-iki text-xl md:text-2xl py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group"
                    >
                        <span>{isLogin ? 'SIGN IN' : 'SIGN UP'}</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </form>

                <div className="mt-12 text-center">
                    <p className="font-movatif text-gray-500">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-black font-semibold underline decoration-2 underline-offset-4 hover:decoration-4 transition-all"
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
