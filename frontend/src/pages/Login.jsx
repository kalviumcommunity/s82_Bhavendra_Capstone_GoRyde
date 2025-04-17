import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/interface"); 
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-teal-100 flex items-center justify-center px-4">
            <div className="bg-white backdrop-blur-sm bg-opacity-90 p-10 rounded-3xl shadow-2xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-teal-700 mb-8">Login to GoRyde</h1>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="mb-2 font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
