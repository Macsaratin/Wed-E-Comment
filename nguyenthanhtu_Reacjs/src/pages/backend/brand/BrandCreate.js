import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandService from '../../../services/BrandService';

function BrandCreate() {
    const [brand, setBrand] = useState({
        name: '',
        slug: '', // Slug field
        description: '',
        image: null,
        sort_order: '',
        status: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedBrand = { ...brand, [name]: value };

        // Generate slug from name
        if (name === 'name') {
            updatedBrand.slug = value.toLowerCase().replace(/ /g, '-'); // Create slug from name
        }

        setBrand(updatedBrand);
    };

    const handleFileChange = (e) => {
        setBrand({
            ...brand,
            image: e.target.files[0],
        });
    };

    const handleAddBrand = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', brand.name);
        formData.append('slug', brand.slug); // Include slug
        formData.append('description', brand.description);
        formData.append('image', brand.image);
        formData.append('sort_order', brand.sort_order);
        formData.append('status', brand.status);

        try {
            await BrandService.add(formData);
            navigate('/admin/brand');
        } catch (error) {
            setError('Có lỗi xảy ra khi thêm brand');
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Tạo Brand</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleAddBrand} className="space-y-4">
                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Tên Brand:</label>
                    <input
                        type="text"
                        name="name"
                        value={brand.name}
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
                        value={brand.slug}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Mô tả:</label>
                    <textarea
                        name="description"
                        value={brand.description}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Hình ảnh:</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Thứ tự:</label>
                    <input
                        type="number"
                        name="sort_order"
                        value={brand.sort_order}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Trạng thái:</label>
                    <select
                        name="status"
                        value={brand.status}
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
                    Thêm Brand
                </button>
            </form>
        </div>
    );
}

export default BrandCreate;
