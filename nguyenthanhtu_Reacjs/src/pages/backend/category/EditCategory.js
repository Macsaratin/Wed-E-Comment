import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryService from '../../../services/CategoryService';

function EditCategory() {
    const { id } = useParams();
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

    useEffect(() => {
        // Fetch category data when component mounts
        const fetchCategory = async () => {
            try {
                const response = await CategoryService.show(id); // Fetch category by ID
                setCategory(response.category); // Adjust based on your API response structure
            } catch (error) {
                setError('Lỗi khi lấy thông tin danh mục.');
                console.error(error);
            }
        };
        fetchCategory();
    }, [id]);

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
            image: e.target.files[0], // Set image
        });
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();

        const formData = new FormData(); // Create FormData for image upload
        formData.append('name', category.name);
        formData.append('slug', category.slug);
        formData.append('parent_id', category.parent_id);
        formData.append('description', category.description);
        formData.append('image', category.image);
        formData.append('sort_order', category.sort_order);
        formData.append('status', category.status);

        try {
            await CategoryService.update(id, formData); // Update category via API
            navigate('/admin/category'); // Redirect to category list
        } catch (error) {
            setError('Có lỗi xảy ra khi cập nhật danh mục.');
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Cập nhật danh mục</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleUpdateCategory} className="space-y-4">
                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Tên danh mục:</label>
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
                    <label className="block text-gray-600 mb-1">Slug:</label>
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
                    <label className="block text-gray-600 mb-1">Parent ID:</label>
                    <input
                        type="number"
                        name="parent_id"
                        value={category.parent_id}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Thứ tự:</label>
                    <input
                        type="number"
                        name="sort_order"
                        value={category.sort_order}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Hình ảnh:</label>
                    <input
                        type="file"
                        name="image"
                        accept="image"
                        onChange={handleFileChange}
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
                    Cập nhật danh mục
                </button>
            </form>
        </div>
    );
}

export default EditCategory;
