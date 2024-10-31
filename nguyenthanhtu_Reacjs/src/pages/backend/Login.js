import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserServiced from '../../services/UserService'; // Đảm bảo import đúng axios instance

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Gọi API để đăng nhập
            const response = await UserServiced.getList(formData);

            // Giả sử API trả về token hoặc thông tin người dùng
            if (response.user.success) {
                setMessage('Đăng nhập thành công!');
                setTimeout(() => {
                    navigate('/'); // Chuyển hướng về trang chủ sau 2 giây
                }, 2000);
                // Lưu token hoặc thông tin người dùng vào localStorage hoặc state
                localStorage.setItem('token', response.data.token);
            } else {
                setMessage('Đăng nhập thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            setMessage('Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Đăng Nhập</h2>
                {message && <p className="mb-4 text-center text-red-600">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Mật Khẩu</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white p-2 rounded hover:bg-blue-600`}
                        disabled={loading}
                    >
                        {loading ? 'Đang Đăng Nhập...' : 'Đăng Nhập'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <a href="#" className="text-blue-500 hover:underline">Quên mật khẩu?</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
