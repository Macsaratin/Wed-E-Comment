import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CategoryService from '../../../services/CategoryService';

const ShowCategory = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await CategoryService.show(id); // Fetch the category by ID
                setCategory(response.category); // Adjust based on your API response structure
            } catch (error) {
                setError('Lỗi khi lấy thông tin danh mục.');
                console.error(error);
            }
        };
        fetchCategory();
    }, [id]);

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {category ? (
                <div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Chi tiết danh mục</h2>
                    <div className="flex flex-col items-center mb-4">
                        {category.image ? (
                            <img src={`http://localhost:8000/images/category/${category.image}`} alt={category.name} className="max-w-xs" />
                        ) : (
                            <p>Không có hình ảnh</p>
                        )}
                    </div>
                    <p><strong>Tên danh mục:</strong> {category.name}</p>
                    <p><strong>Slug:</strong> {category.slug}</p>
                    <p><strong>Mô tả:</strong> {category.description}</p>
                    <p><strong>Parent ID:</strong> {category.parent_id}</p>
                    <p><strong>Thứ tự:</strong> {category.sort_order}</p>
                    <p><strong>Trạng thái:</strong> {category.status === 1 ? 'Hoạt động' : 'Không hoạt động'}</p>
                    <Link to="/admin/category" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
                        Quay lại danh sách
                    </Link>
                </div>
            ) : (
                <div className="text-center">Đang tải thông tin danh mục...</div>
            )}
        </div>
    );
};

export default ShowCategory;
