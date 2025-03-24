import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);
    // Fetch CSRF token from cookies
    useEffect(() => {
        const getCsrfToken = () => {
            const cookieValue = document.cookie
                .split('; ')
                .find((row) => row.startsWith('csrftoken='))
                ?.split('=')[1];
            setCsrfToken(cookieValue || '');
        };
        getCsrfToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/login/' : '/register/';
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        if (!isLogin) formData.append('email', email);

        try {
            const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
                method: 'POST',
                body: formData,
                credentials: 'include',  // Include cookies for session authentication
                headers: {
                    'X-CSRFToken': csrfToken,  // Include CSRF token in the request headers
                },
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setIsLoggedIn(true);
                navigate('/');  // Redirect to home page after login/register
            } else {
                setMessage(data.message || 'An error occurred');
            }
        } catch (error) {
            setMessage('Failed to connect to the server');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isLogin ? 'Login' : 'Register'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>
                    )}
                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
                <p className="mt-4 text-center">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-600 hover:underline"
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>
                {message && <p className="mt-4 text-center text-red-600">{message}</p>}
            </div>
        </div>
    );
};

export default LoginRegister;