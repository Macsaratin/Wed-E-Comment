import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BrandService from '../../../services/BrandService';

const ShowBrand = () => {
    const { id } = useParams(); // Get ID from URL
    const navigate = useNavigate();
    const [brand, setBrand] = useState(null); // To store brand information
    const [error, setError] = useState(''); // To store error messages

    useEffect(() => {
        // Fetch brand information based on ID
        const fetchBrand = async () => {
            try {
                const response = await BrandService.show(id); // Assuming 'show' returns a single brand
                setBrand(response.brand); // Adjust based on your API response structure
            } catch (error) {
                setError('Lỗi khi lấy thông tin thương hiệu.');
                console.error(error);
            }
        };
        fetchBrand();
    }, [id]);

    return (
        <div className="p-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            {brand ? (
                <div className='flex flex-row'>
                    <div className='flex-shrink-0 pr-4'>
                        {brand.image ? (
                            <img
                                src={`http://localhost:8000/images/brand/${brand.image}`}
                                alt={brand.name}
                                className="max-w-xs"
                            />
                        ) : (
                            <p>Không có hình ảnh</p>
                        )}
                    </div>
                    <div className='flex-grow'>
                        <h1 className='text-2xl uppercase text-green-800 mb-4'>THÔNG TIN THƯƠNG HIỆU</h1>
                        <h2 className='text-xl font-bold mb-2'>Tên thương hiệu: {brand.name}</h2>
                        <p className='mb-2'><strong>Mô tả:</strong> {brand.description}</p>
                        <p className='mb-2'><strong>Slug:</strong> {brand.slug}</p>
                        <p className='mb-2'><strong>Thứ tự:</strong> {brand.sort_order}</p>
                        <p className='mb-2'><strong>Trạng thái:</strong> {brand.status === '1' ? 'Xuất bản' : 'Chưa xuất bản'}</p>
                        <button
                            onClick={() => navigate('/admin/brand')}
                            className='bg-blue-500 text-white py-2 px-4 rounded'>
                            Quay lại danh sách
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center">Đang tải thông tin thương hiệu...</div>
            )}
        </div>
    );
};

export default ShowBrand;
