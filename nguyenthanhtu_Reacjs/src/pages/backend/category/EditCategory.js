import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryService from '../../../services/CategoryService';

function EditCategory() {
    const [category, setCategory] = useState({
        name: '',
        slug: '',
        description: '',
        image: null,
        parent_id: '',
        sort_order: '',
        status: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const categoryId = useParams().id; // Get the category id from the URL params

    useEffect(() => {
        getCategoryById(categoryId);
    }, [categoryId]);


    const getCategoryById = async (id) => {
        try {
            const response = await CategoryService.getById(id);
            setCategory(response.category);
        } catch (error) {
            setError('Có lỗi xảy ra khi lấy dữ liệu danh mục');
            console.error(error);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value,
        });
    };
    const handleFileChange = (e) => {
        setCategory({
            ...category,
            image: e.target.files[0],
        });
    };

    const updateCategory = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', category.name);
        formData.append('slug', category.slug);
        formData.append('description', category.description);
        formData.append('image', category.image);
        formData.append('parent_id', category.parent_id);
        formData.append('sort_order', category.sort_order);
        formData.append('status', category.status);

        try {
            await CategoryService.update(categoryId, formData);
            navigate('/admin/category');
        } catch (error) {
            setError('Có lỗi xảy ra khi cập nhật danh mục');
            console.error(error);
        }
    };
    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Created categories</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={updateCategory} className="space-y-4">

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Tên categories:</label>
                    <input
                        type="text"
                        name="name"
                        value={category.name}
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
                        value={category.slug}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Mô tả:</label>
                    <textarea
                        name="description"
                        value={category.description}
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
                        value={category.parent_id}
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
                        value={category.sort_order}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Trạng thái:</label>
                    <select
                        name="status"
                        value={category.status}
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
                    Thêm category
                </button>
            </form>
        </div>
    );
}

export default EditCategory;
