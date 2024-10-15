import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryService from '../../../services/CategoryService';

function CreateCategory() {
    const [categories, setcategories] = useState({
        name: '',       // Thêm trường name
        slug: '',       // Thêm trường link
        description: '', // Thêm trường description
        image: null,
        parent_id: '',
        sort_order: '',  // Thêm trường sort_order
        status: '',      // Có thể là 'active' hoặc 'inactive'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setcategories({
            ...categories,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setcategories({
            ...categories,
            image: e.target.files[0], // Đổi từ thumbnail sang image
        });
    };

    const handleAddcategories = async (e) => {
        e.preventDefault();

        const formData = new FormData(); // Tạo form data để gửi kèm hình ảnh
        formData.append('name', categories.name);  // Gửi trường name
        formData.append('slug', categories.slug);  // Gửi trường link
        formData.append('description', categories.description);  // Gửi trường description
        formData.append('parent_id', categories.parent_id);  // Gửi trường hình ảnh
        formData.append('image', categories.image); // Gửi hình ảnh với tên image
        formData.append('sort_order', categories.sort_order);  // Gửi trường sort_order
        formData.append('status', categories.status);
        try {
            await CategoryService.add(formData); // Gọi API thêm categories
            navigate('/admin/category'); // Điều hướng về trang danh sách categories sau khi thêm thành công
        } catch (error) {
            setError('Có lỗi xảy ra khi thêm categories');
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Created categories</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleAddcategories} className="space-y-4">

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Tên categories:</label>
                    <input
                        type="text"
                        name="name"
                        value={categories.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">slug:</label>
                    <input
                        type="text"
                        name="slug"
                        value={categories.slug}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Mô tả:</label>
                    <textarea
                        name="description"
                        value={categories.description}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Hình ảnh:</label>
                    <input
                        type="file"
                        name="image" // Sử dụng tên image
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">parent_id:</label>
                    <input
                        type="text"
                        name="parent_id"
                        value={categories.parent_id}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">sort_order:</label>
                    <input
                        type="number"
                        name="sort_order"
                        value={categories.sort_order}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Trạng thái:</label>
                    <select
                        name="status"
                        value={categories.status}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn trạng thái</option>
                        <option value="1">Hoạt động</option>
                        <option value="0">Không hoạt động</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Thêm categories
                </button>
            </form>
        </div>
    );
}

export default CreateCategory;
