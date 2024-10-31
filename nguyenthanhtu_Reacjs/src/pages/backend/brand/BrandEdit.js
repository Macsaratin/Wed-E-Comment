import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BrandService from '../../../services/BrandService';

function BrandEdit() {
    const { id } = useParams();
    const [brand, setbrand] = useState({
        name: '',       // Thêm trường name
        slug: '',
        description: '', // Thêm trường description
        image: null,
        sort_order: '',  // Thêm trường sort_order
        status: '',      // Có thể là 'active' hoặc 'inactive'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setbrand({
            ...brand,
            [name]: value,
        });
    };
    const handleFileChange = (e) => {
        setbrand({
            ...brand,
            image: e.target.files[0], // Đổi từ thumbnail sang image
        });
    };

    const handleAddbrand = async (e) => {
        e.preventDefault();

        const formData = new FormData(); // Tạo form data để gửi kèm hình ảnh
        formData.append('name', brand.name);  // Gửi trường name
        formData.append('slug', brand.slug);  // Gửi trường link
        formData.append('description', brand.description);  // Gửi trường description
        formData.append('image', brand.image); // Gửi hình ảnh với tên image
        formData.append('sort_order', brand.sort_order);  // Gửi trường sort_order
        formData.append('status', brand.status);

        try {
            await BrandService.update(id, formData); // Gọi API thêm brand
            navigate('/admin/brand'); // Điều hướng về trang danh sách brand sau khi thêm thành công
        } catch (error) {
            setError('Có lỗi xảy ra khi thêm brand');
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Edit brand</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleAddbrand} className="space-y-4">

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Tên brand:</label>
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
                    <label className="block text-gray-600 mb-1">Link:</label>
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
                        name="image" // Sử dụng tên image
                        accept="image"
                        onChange={handleFileChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* <div className="form-group">
                    <label className="block text-gray-600 mb-1">Vị trí:</label>
                    <input
                        type="text"
                        name="position"
                        value={brand.position}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div> */}

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
                    Thêm brand
                </button>
            </form>
        </div>
    );
}

export default BrandEdit;
